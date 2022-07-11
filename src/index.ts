import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env['PORT']) || 7000;
const API_KEY = process.env['API_KEY'];
const app = express();

import { PreferredAPI, BackupAPI, Shared } from './types';

if (!API_KEY) {
	console.error('Missing API key');
	process.exit(1);
}

interface UserMetadata {
	secUID: string;
	name: string;
	username: string;
	avatarURL: string;
	followerCount: number;
	followingCount: number;
	isPreferredAPI: boolean;
}

interface UserFeedStats {
	averageEngagement: number; // likes + comments
	averageEngagementRate: number; // avg engagement / avg views
	averageViews: number;
}

async function preferredUserFetch(username: string): Promise<UserMetadata | null> {
	const url = new URL('/live/user', 'https://social-media-data-tt.p.rapidapi.com');
	url.searchParams.append('username', username);
	url.searchParams.append('fresh', '1');

	const request = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': API_KEY!,
			'X-RapidAPI-Host': 'social-media-data-tt.p.rapidapi.com',
		},
	});

	if (!request.ok) {
		console.warn('Failed to fetch from preferred API:', request.statusText);
		return null;
	}

	const body: PreferredAPI.UserMetadataResponse | null = await request
		.json()
		.catch(err => {
			console.warn('Failed to parse body from preferred API:', err);
			return null;
		});
	
	if (!body) return body;
	
	return {
		secUID: body.sec_uid,
		name: body.nickname,
		username: body.unique_id,
		avatarURL: body.avatar_larger,
		followerCount: body.follower_count,
		followingCount: body.following_count,
		isPreferredAPI: true,
	};
}

async function backupUserFetch(username: string): Promise<UserMetadata | null> {
	const url = new URL('/get-user', 'https://scraptik.p.rapidapi.com');
	url.searchParams.append('keyword', username);
	url.searchParams.append('count', '1');

	const request = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': API_KEY!,
			'X-RapidAPI-Host': 'scraptik.p.rapidapi.com',
		},
	});

	if (!request.ok) {
		console.warn('Failed to fetch from backup API:', request.statusText);
		return null;
	}

	const body: BackupAPI.UserSearchResponse = await request
		.json()
		.catch(err => {
			console.warn('Failed to parse body from backup API:', err);
			return null;
		});
	
	if (!body) return body;

	const user = body.user_list[0]?.user_info;

	if (!user) {
		console.error('User not found:', username);
		return null;
	}
	
	return {
		secUID: user.sec_uid,
		name: user.nickname,
		username: user.unique_id,
		avatarURL: user.avatar_larger.url_list[0]!,
		followerCount: user.follower_count,
		followingCount: user.following_count,
		isPreferredAPI: true,
	};
}

async function preferredUserFeedStats({ secUID, username }: { secUID?: string | undefined; username?: string | undefined }): Promise<UserFeedStats | null> {
	const url = new URL('/live/user/feed/v2', 'https://social-media-data-tt.p.rapidapi.com');
	if (secUID) url.searchParams.append('sec_uid', secUID);
	if (username) url.searchParams.append('username', username);

	const request = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': API_KEY!,
			'X-RapidAPI-Host': 'social-media-data-tt.p.rapidapi.com',
		},
	});

	if (!request.ok) {
		console.warn('Failed to fetch from preferred API:', request.statusText);

		return null;
	}

	const body: PreferredAPI.Page<Shared.Post> | null = await request
		.json()
		.catch(err => {
			console.warn('Failed to parse body from preferred API:', err);
			return null;
		});

	console.log(body);
	
	if (!body || body.media.length === 0) return null;

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
	const url = new URL('/username-to-id', 'https://scraptik.p.rapidapi.com');
	url.searchParams.append('username', username);

	const request = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': API_KEY!,
			'X-RApidAPI-Host': 'scraptik.p.rapidapi.com',
		},
	});

	if (!request.ok) {
		console.warn('Failed to fetch from backup API:', request.statusText);
		return null;
	}

	const body: BackupAPI.UsernameToSecUIDResponse | null = await request
		.json()
		.catch(err => {
			console.warn('Failed to parse body from baclup API:', err);
			return null;
		});
	
	if (!body) return body;

	if (!body.success) {
		console.warn('Backup API request was unsuccessful:', body);
		return null;
	}

	return body.sec_uid!;
}

async function backupUserFeedStatistics(secUID: string): Promise<UserFeedStats | null> {
	const url = new URL('/user-posts', 'https://scraptik.p.rapidapi.com');
	url.searchParams.append('sec_user_id', secUID);

	const request = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': API_KEY!,
			'X-RapidAPI-Host': 'scraptik.p.rapidapi.com',
		},
	});

	if (!request.ok) {
		console.warn('Failed to fetch from backup API:', request.statusText);
		return null;
	}

	const body: BackupAPI.Page<Shared.Post> = await request
		.json()
		.catch(err => {
			console.warn('Failed to parse body from backup API:', err);
			return null;
		});
	
	if (!body) return null;

	return calculateUserFeedStatistics(body.aweme_list);
}

app.use((request, response, next) => {
	const authorization = request.header('authorization');

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

app.get('/tiktok/user/:username', async (request, response) => {
	const username = request.params.username;

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
	const username = request.query['username'] as string | undefined;

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

app.listen(PORT, 'localhost', () => {
	console.log('Listening on localhost:' + PORT);
});
