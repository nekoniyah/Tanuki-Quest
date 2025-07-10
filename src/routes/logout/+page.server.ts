import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	let token = cookies.get('token');
	if (token) {
		cookies.delete('token', { path: '/' });
	}

	cookies.delete('error', { path: '/' });
	cookies.delete('validate', { path: '/' });

	redirect(302, '/login');
}
