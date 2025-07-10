import { db } from '$lib/server/db/index.js';
import { user, verificationCode } from '$lib/server/db/schema.js';
import { sendVerificationEmail } from '$lib/server/nodemailer';
import { redirect } from '@sveltejs/kit';
import { and, eq, or } from 'drizzle-orm';

export async function load({ cookies }) {
	let error = cookies.get('error');
	let validate = cookies.get('validate');
	let token = cookies.get('token');

	if (token) {
		// If the user is already logged in, redirect to the home page
		// Check if the token exists in the database

		const userExists = db.select().from(user).where(eq(user.token, token)).get();

		if (!userExists) {
			cookies.delete('error', {
				path: '/'
			});
			return;
		}

		redirect(302, '/');
	}

	return {
		error,
		toValidate: validate === 'true' ? true : false
	};
}
export const actions = {
	login: async ({ request, cookies }) => {
		async function sendVerificationCode(email: string, username: string) {
			// Send verification code

			const code = Math.floor(100000 + Math.random() * 900000).toString();

			await db.insert(verificationCode).values({
				email,
				username,
				code
			});

			await sendVerificationEmail(email, code);
		}

		const formData = await request.formData();

		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const isRegistering = formData.get('do-register') === 'on';

		if (!isRegistering && !email) {
			cookies.set('error', 'Email is required for login', {
				path: '/'
			});

			return;
		}

		if (isRegistering && (!email || !username)) {
			cookies.set('error', 'Email and username are required for registration', {
				path: '/'
			});

			return;
		}

		const userExists = db.select().from(user).where(eq(user.email, email)).get();

		// Check if user exists

		if (isRegistering) {
			if (userExists) {
				cookies.set('error', 'User already exists', {
					path: '/'
				});
				return;
			}

			await sendVerificationCode(email, username);
			cookies.set('validate', 'true', {
				path: '/',
				maxAge: 60 * 60 // 1 hour
			});
		} else {
			if (!userExists) {
				cookies.set('error', 'User does not exist', {
					path: '/',
					maxAge: 60 * 60 // 1 hour
				});
				return;
			}

			await sendVerificationCode(email, username);
			cookies.set('validate', 'true', {
				path: '/',
				maxAge: 60 * 60 // 1 hour
			});
		}
	},
	validate: async ({ request, cookies }) => {
		const formData = await request.formData();

		const code = formData.get('code') as string;
		const email = formData.get('email') as string;

		if (!code || !email) {
			cookies.set('error', 'Email and verification code are required', {
				path: '/'
			});
			return;
		}

		const verification = db
			.select()
			.from(verificationCode)
			.where(and(eq(verificationCode.email, email), eq(verificationCode.code, code)))
			.all()
			.at(-1);

		if (!verification) {
			cookies.set('error', 'Invalid verification code', {
				path: '/'
			});
			return;
		}

		// If verification code is valid, create user

		const [newUser] = await db
			.insert(user)
			.values({
				email,
				username: verification.username,
				token: Math.random().toString(36).substring(2, 15) // Generate a random token
			})
			.returning();

		cookies.set('token', newUser.token, {
			path: '/'
		});
	}
};
