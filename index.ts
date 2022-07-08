import express from 'express';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 7000;
const API_KEY = process.env.API_KEY;
const app = express();

if (!API_KEY) {
	console.error('Missing API key');
	process.exit(1);
}

interface UserMetadata {
	name: string;
	username: string;
	avatarURL: string;
	follower_count: number;
	following_count: number;
	isPreferredAPI: boolean;
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

	const body = await request
		.json()
		.catch(err => {
			console.warn('Failed to parse body from preferred API:', err);
			return null;
		});
	
	if (!body) return body;
	
	return {
		name: body.nickname,
		username: body.unique_id,
		avatarURL: body.avatar_larger,
		follower_count: body.follower_count,
		following_count: body.following_count,
		isPreferredAPI: true,
	};
}

async function backupUserFetch(username: string): Promise<UserMetadata | null> {
	const url = new URL('/live/user', 'https://scraptik.p.rapidapi.com');
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

	const body = await request
		.json()
		.catch(err => {
			console.warn('Failed to parse body from backup API:', err);
			return null;
		});
	
	if (!body) return body;
	
	return {
		name: body.nickname,
		username: body.unique_id,
		avatarURL: body.avatar_larger,
		follower_count: body.follower_count,
		following_count: body.following_count,
		isPreferredAPI: true,
	};
}

app.get('/users/:username', async (request, response) => {
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

app.listen(PORT, 'localhost', () => {
	console.log('Listening on localhost:' + PORT);
});
