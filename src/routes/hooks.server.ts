import { db } from '$lib/server/db';
import { user, type User } from '$lib/server/db/schema';
import type { MyLocals } from '$lib/types';
import type { Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (!token) {
		// If no token exists, set user to null
		(event.locals as MyLocals).user = null;
		return resolve(event);
	}

	// If token exists, retrieve user data

	const u = db.select().from(user).where(eq(user.token, token)).get();

	if (!u) {
		(event.locals as MyLocals).user = null;
		return resolve(event);
	}

	// Set user data in locals for use in the application
	(event.locals as MyLocals).user = u;
	return resolve(event);
};
