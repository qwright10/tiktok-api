import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const PORT = Number(process.env['PORT']) || 7000;
const API_KEY = process.env['API_KEY'];
const app = express();

app.use(bodyParser.text());

import { PreferredAPI, BackupAPI, Shared, InstagramAPI } from './types';

if (!API_KEY) {
	console.error('Missing API key');
	process.exit(1);
}

interface UserMetadata {
	secUID: string;
	name: string;
	username: string;
	avatarURL: string;
	bio: string;
	followerCount: number;
	followingCount: number;
	isPreferredAPI: boolean;
}

interface UserFeedStats {
	averageEngagement: number; // likes + comments
	averageEngagementRate: number; // avg engagement / avg views
	averageViews: number;
}

interface StatEntry {
	preferredAPI: boolean;
	path: string;
	responseTime: number;
	successful: boolean;
	timestamp: number;
}

let statsEntries = new Set<StatEntry>();

const msInDay = 1000 * 60 * 60 * 24;

setInterval(() => {
	console.log(statsEntries.size, 'entries as of', new Date().toLocaleTimeString());
	for (const entry of statsEntries) {
		if (performance.now() - entry.timestamp > msInDay) {
			statsEntries.delete(entry);
		}
	}
}, 60_000);

async function apiFetch<T>(path: string, {
	preferredAPI,
	headers = {},
	method = 'GET',
	searchParams = {},
	successCheck = () => true,
}: {
	preferredAPI: boolean;
	headers?: { [key: string]: string | undefined };
	method?: string;
	searchParams?: { [key: string]: string | undefined };
	successCheck?: (response: T) => boolean;
}): Promise<T | null> {
	const url = new URL(path, preferredAPI ? 'https://social-media-data-tt.p.rapidapi.com' : 'https://scraptik.p.rapidapi.com');
	for (const [name, value] of Object.entries(searchParams)) {
		if (typeof value === 'string') {
			url.searchParams.append(name, value);
		}
	}

	const beforeRequestTime = performance.now();

	const request = await fetch(url.toString(), {
		method,
		headers: {
			'X-RapidAPI-Key': API_KEY!,
			'X-RapidAPI-Host': preferredAPI ? 'social-media-data-tt.p.rapidapi.com' : 'scraptik.p.rapidapi.com',
			...headers,
		}
	}).catch(err => {
		console.error('Failed to fetch from', preferredAPI ? 'preferred' : 'backup', 'API:', err);
		return null;
	});

	const responseTime = performance.now() - beforeRequestTime;

	if (!request || !request.ok) {
		if (request) console.warn('Failed to fetch from preferred API:', request.statusText);

		statsEntries.add({
			preferredAPI: preferredAPI,
			path,
			responseTime,
			successful: false,
			timestamp: performance.now(),
		});

		return null;
	}

	const body: T | null = await request
		.json()
		.catch(err => {
			console.warn('Failed to parse body from preferred API:', err);
			
			statsEntries.add({
				preferredAPI: preferredAPI,
				path,
				responseTime,
				successful: false,
				timestamp: performance.now(),
			});

			return null;
		});

	if (!body) return null;

	console.log(body);

	if (Reflect.has(body as any, 'messages')) {
		return null;
	}
	
	const isSuccessful = successCheck(body);

	if (isSuccessful) {
		statsEntries.add({
			preferredAPI: preferredAPI,
			path,
			responseTime,
			successful: true,
			timestamp: performance.now(),
		});

		return body;
	} else {
		statsEntries.add({
			preferredAPI: preferredAPI,
			path,
			responseTime,
			successful: true,
			timestamp: performance.now(),
		});

		return null;
	}
}

async function preferredUserFetch(username: string): Promise<UserMetadata | null> {
	const body = await apiFetch<PreferredAPI.UserMetadataResponse>('/live/user', {
		preferredAPI: true,
		searchParams: {
			username,
			fresh: '1',
		},
		successCheck: r => r.sec_uid !== '',
	});

	if (!body) return null;
	
	return {
		secUID: body.sec_uid,
		name: body.nickname,
		username: body.unique_id,
		bio: body.signature,
		avatarURL: body.avatar_larger,
		followerCount: body.follower_count,
		followingCount: body.following_count,
		isPreferredAPI: true,
	};
}

async function backupUserFetch(username: string): Promise<UserMetadata | null> {
	const body = await apiFetch<{ success: boolean } | { user: Shared.User }>('/get-user', {
		preferredAPI: false,
		searchParams: {
			username,
		},
		successCheck: r => 'success' in r ? r.success : 'user' in r,
	});

	if (!body || 'success' in body) return null;

	const user = body.user;

	return user as any;
	
	return {
		secUID: user.sec_uid,
		name: user.nickname,
		username: user.unique_id,
		bio: user.signature,
		avatarURL: user.avatar_larger.url_list[0]!,
		followerCount: user.follower_count,
		followingCount: user.following_count,
		isPreferredAPI: true,
	};
}

async function preferredUserFeedStats({ secUID, username }: { secUID?: string | undefined; username?: string | undefined }): Promise<UserFeedStats | null> {	
	const body = await apiFetch<PreferredAPI.Page<Shared.Post>>('/live/user/feed/v2', {
		preferredAPI: true,
		searchParams: {
			sec_uid: secUID,
			username,
		},
		successCheck: r => r.media.length !== 0,
	});
	
	if (!body) return null;

	return calculateUserFeedStatistics(body.media);
} 

function calculateUserFeedStatistics(media: Shared.Post[]): UserFeedStats {
	const excludeMargin = (media.length * 0.1) | 0;

	return media
		.sort((a, b) => a.statistics.play_count - b.statistics.play_count)
		.slice(excludeMargin, media.length - excludeMargin)
		.map(post => {
			const { comment_count, digg_count, play_count } = post.statistics;
			const totalEngagement = comment_count + digg_count;

			return {
				engagementRate: totalEngagement / play_count,
				totalEngagement,
				views: play_count,
			};
		})
		.reduce((acc, post, _, { length }) => ({
			averageEngagement: acc.averageEngagement + (post.totalEngagement / length),
			averageEngagementRate: acc.averageEngagementRate + (post.engagementRate / length),
			averageViews: acc.averageViews + (post.views / length),
		}), {
			averageEngagement: 0,
			averageEngagementRate: 0,
			averageViews: 0,
		});
}

async function backupUsernameToSecUID(username: string): Promise<string | null> {
	const body = await apiFetch<BackupAPI.UsernameToSecUIDResponse>('/username-to-id', {
		preferredAPI: false,
		searchParams: {
			username,
		},
		successCheck: r => r.success,
	});
	
	if (!body) return body;

	return body.sec_uid!;
}

async function backupUserFeedStatistics(secUID: string): Promise<UserFeedStats | null> {	
	const body = await apiFetch<BackupAPI.Page<Shared.Post>>('/user-posts', {
		preferredAPI: false,
		searchParams: {
			sec_user_id: secUID,
		},
	});
	
	if (!body) return null;

	return calculateUserFeedStatistics(body.aweme_list);
}

app.use((request, response, next) => {
	const authorization = request.header('authorization');

	response.set('Content-Security-Policy', 'default-src \'self\'');

	if (process.env['DEV'] === 'TRUE') return next();

	if (!authorization) {
		return response
			.status(401)
			.json({
				statusCode: 401,
				message: 'Missing Authorization header',
			});
	}

	if (authorization !== API_KEY) {
		return response
			.status(403)
			.json({
				statusCode: 403,
				message: 'Authorization key is not valid',
			});
	}

	return next();
});

/* enum PostType {
	photo = 1,
	carousel = 8,
	igtv = 2,
} */

app.post('/instagram/post', async (request, response) => {
	const id = request.body as string;

	if (typeof id !== 'string' || !/https:\/\/www\.instagram\.com\/p\/[A-Za-z0-9\-_]{11}\/?/i.test(id)) {
		return response
			.status(400)
			.json({
				statusCode: 400,
				message: 'Post ID is invalid',
			});
	}

	const url = new URL('/post/info', 'https://instagram-data1.p.rapidapi.com');
	url.searchParams.append('post', id);

	const post = await fetch(url, {
		headers: {
			'X-RapidAPI-Key': API_KEY!,
			'X-RapidAPI-Host': 'instagram-data1.p.rapidapi.com',
		},
	});

	if (!post.ok) {
		return response
			.status(500)
			.json({
				statusCode: 500,
				message: 'Instagram API request was unsuccessful',
			});
	}

	const body: InstagramAPI.Post = await post
		.json()
		.catch(err => {
			console.error('Failed to parse Instagram API body:', err);
			return null;
		});
	
	if (!body) return response
		.status(500)
		.json({
			statusCode: 500,
			message: 'Instagram API response body decode was unsuccessful',
		});

	if (request.query['raw']) {
		return response
			.status(200)
			.json(body);
	}

	return response
		.status(200)
		.json({
			comment_count: body.comment_count,
			like_count: body.like_count,
			view_count: 'view_count' in body ? body.view_count : 0,
			caption: body.caption.text,
			type: body.media_type,
			thumbnail: 'image_versions2' in body ? body.image_versions2.candidates.reduce((a, b) => a.height > b.height ? a : b).url : 'carousel_media' in body ? body.carousel_media[0]!.image_versions2.candidates.reduce((a, b) => a.height > b.height ? a : b).url : null,
		});
});

app.get('/instagram/user/:username', async (request, response) => {
	const username = request.params.username;

	const url = new URL('/user/info', 'https://instagram-data1.p.rapidapi.com');
	url.searchParams.append('username', username);

	const user = await fetch(url, {
		headers: {
			'X-RapidAPI-Key': API_KEY!,
			'X-RapidAPI-Host': 'instagram-data1.p.rapidapi.com',
		},
	});

	if (!user.ok) {
		return response
			.status(500)
			.json({
				statusCode: 500,
				message: 'Instagram API request was unsuccessful',
			});
	}

	const body: InstagramAPI.User = await user
		.json()
		.catch(err => {
			console.error('Failed to parse Instagram API body:', err);
			return null;
		});
	
	if (!body) return response
		.status(500)
		.json({
			statusCode: 500,
			message: 'Instagram API response body decode was unsuccessful',
		});
	
	if (request.query['raw']) {
		return response
			.status(200)
			.json(body);
	}

	return response
		.status(200)
		.json({
			name: body.full_name,
			username: body.username,
			avatarURL: body.profile_pic_url_hd,
			follower_count: body.edge_followed_by.count,
			following_count: body.edge_follow.count,
			bio: body.biography,
		});
});

app.get('/tiktok/user/:username', async (request, response) => {
	const username = decodeURIComponent(request.params.username);

	if (!username) {
		return response
			.status(400)
			.json({
				statusCode: 400,
				message: 'Missing username query parameter',
			});
	}

	const preferredResponse = await preferredUserFetch(username);
	if (preferredResponse) {
		return response
			.status(200)
			.json(preferredResponse);
	}

	const backupResponse = await backupUserFetch(username);
	if (backupResponse) {
		return response
			.status(200)
			.json(backupResponse);
	}

	return response
		.status(503)
		.header('Retry-After', '30')
		.json({
			statusCode: 503,
			message: 'Neither API returned a valid response. Try again later.',
		});
});

app.get('/tiktok/feed', async (request, response) => {
	let secUID: string | undefined | null = request.query['sec_uid'] as string | undefined;
	let username = request.query['username'] as string | undefined;

	if (username) username = decodeURIComponent(username);

	if (
		!secUID && !username // neither are present
		|| secUID && username // both are present
	) {
		return response
			.status(400)
			.json({
				statusCode: 400,
				message: 'Exactly one of ?sec_uid= or ?username= must be present',
			});
	}

	for (let i = 0; i < 3; i++) {
		const preferredResponse = await preferredUserFeedStats({ secUID, username });

		if (preferredResponse === null) break;

		return response
			.status(200)
			.json(preferredResponse);
	}

	secUID = secUID || await backupUsernameToSecUID(username!);

	const unavailable = () => response
		.status(503)
		.header('Retry-After', '30')
			.json({
				statusCode: 503,
				message: 'Neither API returned a valid response. Try again later.',
			});

	if (!secUID) return unavailable();

	const backupResponse = await backupUserFeedStatistics(secUID);
	if (!backupResponse) return unavailable();

	return response
		.status(200)
		.json(backupResponse);
});

interface APIStats {
	averageResponseTime: number;
	successRate: number;

	endpointStats: {
		path: string;
		averageResponseTime: number;
		successRate: number;
	}[];
	maxAge: number;
}

function calculateAPIStatistics(preferredAPI: boolean, maxAge: number = msInDay): APIStats {
	const now = performance.now();

	let totalEntries = 0;
	let totalResponseTime = 0;
	let totalSuccessfulResponses = 0;

	const endpointBuckets = new Map<string, [number, number, number]>();

	for (const entry of statsEntries) {
		console.log('Looking for preferred?', preferredAPI, 'is preferred?', entry.preferredAPI, entry);
		if (now - entry.timestamp > maxAge) continue;
		if (preferredAPI !== entry.preferredAPI) continue;

		totalEntries++;
		totalResponseTime += entry.responseTime;
		totalSuccessfulResponses += entry.successful ? 1 : 0;

		const bucket = endpointBuckets.get(entry.path);

		endpointBuckets.set(entry.path, [
			bucket?.[0] ?? 0 + 1,
			bucket?.[1] ?? 0 + entry.responseTime,
			bucket?.[2] ?? 0 + (entry.successful ? 1 : 0),
		]);
	}

	const mappedBuckets = [] as APIStats['endpointStats'];

	for (const [path, bucket] of endpointBuckets.entries()) {
		mappedBuckets.push({
			path,
			averageResponseTime: bucket[1] / bucket[0],
			successRate: bucket[2] / bucket[0],
		});
	}

	return {
		averageResponseTime: totalResponseTime / totalEntries,
		successRate: totalSuccessfulResponses / totalEntries,

		endpointStats: mappedBuckets,
		maxAge,
	};
}

app.get('/tiktok/stats', (_, response) => {
	if (!statsEntries.size) {
		return response
			.status(200)
			.json({
				entries: [],
				day: {
					averageResponseTime: 0,
					successRate: 1,
					endpointStats: [],
					maxAge: msInDay,
				},
				week: {
					averageResponseTime: 0,
					successRate: 1,
					endpointStats: [],
					maxAge: msInDay * 7,
				}
			});
	}

	return response
		.status(200)
		.send({
			entries: [...statsEntries],
			preferred: {
				day: calculateAPIStatistics(true, msInDay),
				week: calculateAPIStatistics(true, msInDay * 7),
			},
			backup: {
				day: calculateAPIStatistics(false, msInDay),
				week: calculateAPIStatistics(false, msInDay * 7),
			}
		});
});

app.listen(PORT, 'localhost', () => {
	console.log('Listening on localhost:' + PORT);
});
