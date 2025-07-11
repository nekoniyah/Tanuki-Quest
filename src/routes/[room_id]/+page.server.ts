import { db } from '$lib/server/db/index.js';
import { message, room, roomMember, user } from '$lib/server/db/schema.js';
import type { MyLocals } from '$lib/types.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ params, cookies }) {
	let token = cookies.get('token');

	if (!token) return redirect(302, '/login');

	const me = db.select().from(user).where(eq(user.token, token)).get();

	if (!me) return redirect(302, '/login');

	const { room_id } = params;

	const roomData = db
		.select({
			id: room.id,
			name: room.name
		})
		.from(room)
		.where(eq(room.id, parseInt(room_id)))
		.get();

	if (!roomData) return error(404, 'Room not found');

	const roomMemberData = db
		.select({ userId: roomMember.userId })
		.from(roomMember)
		.where(eq(roomMember.roomId, parseInt(room_id)))
		.all();

	let members = [];

	for (const member of roomMemberData) {
		const userData = db
			.select({ id: user.id, username: user.username })
			.from(user)
			.where(eq(user.id, member.userId))
			.get();

		if (userData) {
			members.push(userData);
		}
	}

	const messageData = db
		.select({
			content: message.content,
			timestamp: message.timestamp,
			userId: message.userId
		})
		.from(message)
		.where(eq(message.roomId, parseInt(room_id)))
		.all()
		.map((msg) => {
			let author = members.find((member) => member.id === msg.userId);

			return {
				author,
				...msg
			};
		});

	return { room: roomData, members, messages: messageData };
}

export const actions = {
	sendMessage: async ({ request, params, locals }) => {
		const formData = await request.formData();
		const msg = formData.get('message') as string;

		if (!msg) {
			return { status: 400, body: { error: 'Message is required' } };
		}

		const room_id = params.room_id;

		// Save the message to the database
		await db.insert(message).values({
			content: msg,
			roomId: parseInt(room_id),
			userId: (locals as MyLocals).user!.id as number
		});

		redirect(303, `/${room_id}`);
	}
};
