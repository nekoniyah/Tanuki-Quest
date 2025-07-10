import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	username: text('username').notNull(),
	email: text('email').notNull(),
	token: text('token').notNull(),
	createdAt: integer('created_at')
		.notNull()
		.$defaultFn(() => Date.now()),
	updatedAt: integer('updated_at')
		.notNull()
		.$defaultFn(() => Date.now())
});

export type User = typeof user.$inferInsert;

export const room = sqliteTable('room', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	ownerId: integer('owner_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	createdAt: integer('created_at')
		.notNull()
		.$defaultFn(() => Date.now()),
	updatedAt: integer('updated_at')
		.notNull()
		.$defaultFn(() => Date.now())
});

export type Room = typeof room.$inferInsert;

export const message = sqliteTable('message', {
	id: integer('id').primaryKey(),
	roomId: integer('room_id')
		.notNull()
		.references(() => room.id, { onDelete: 'cascade' }),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	content: text('content').notNull(),
	timestamp: integer('timestamp')
		.notNull()
		.$defaultFn(() => Date.now())
});

export type Message = typeof message.$inferInsert;

export const character = sqliteTable('character', {
	id: integer('id').primaryKey(),
	roomId: integer('room_id')
		.notNull()
		.references(() => room.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description').notNull(),
	createdAt: integer('created_at')
		.notNull()
		.$defaultFn(() => Date.now()),
	updatedAt: integer('updated_at')
		.notNull()
		.$defaultFn(() => Date.now())
});

export type Character = typeof character.$inferInsert;

export const roomMember = sqliteTable('room_member', {
	id: integer('id').primaryKey(),
	roomId: integer('room_id')
		.notNull()
		.references(() => room.id, { onDelete: 'cascade' }),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	joinedAt: integer('joined_at')
		.notNull()
		.$defaultFn(() => Date.now())
});

export type RoomMember = typeof roomMember.$inferInsert;

export const verificationCode = sqliteTable('verification_code', {
	id: integer('id').primaryKey(),
	email: text('email').notNull(),
	username: text('username').notNull(),
	code: text('code').notNull(),
	expiresAt: integer('expires_at')
		.notNull()
		.$defaultFn(() => Date.now() + 10 * 60 * 1000), // 10 minutes
	createdAt: integer('created_at')
		.notNull()
		.$defaultFn(() => Date.now()),
	updatedAt: integer('updated_at')
		.notNull()
		.$defaultFn(() => Date.now())
});

export type VerificationCode = typeof verificationCode.$inferInsert;
