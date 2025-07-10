import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function load({ cookies }) {
	let token = cookies.get('token');

	if (!token) return { error: 'No token provided', authenticated: false };
	// Here you would typically verify the token and fetch user data

	const me = db.select().from(user).where(eq(user.token, token)).get();

	if (!me) return { error: 'User not found', authenticated: false };
	return { user: me, authenticated: true, token };
}
