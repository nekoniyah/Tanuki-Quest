import { db } from '$lib/server/db/index.js';
import { room, user } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load() {
	const rooms = await db.select().from(room).orderBy(room.createdAt);

	return {
		rooms
	};
}

export const actions = {
	room: async ({ request, locals, cookies }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const token = cookies.get('token');

		let u = db.select({ id: user.id }).from(user).where(eq(user.token, token!)).get();

		if (!u) redirect(303, '/login');

		await db.insert(room).values({
			name,
			ownerId: u.id
		});

		return {
			status: 303,
			headers: {
				location: '/rooms'
			}
		};
	}
};
