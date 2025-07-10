<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import cookie from 'cookie';
	// Login & Register page
	let isRegistering = false;
	export let data;

	// Check if there is a 'register' query parameter

	isRegistering = page.url.searchParams.has('register');

	setTimeout(() => {
		cookie.serialize('error', '', { path: '/' });
		data.error = undefined;
	}, 5000);
</script>

<svelte:head>
	<title>{isRegistering ? 'Register' : 'Login'} - Tanuki Quest</title>
</svelte:head>

<form method="post" action="?/{data.toValidate ? 'validate' : 'login'}" use:enhance>
	<div class="login-form">
		<img src="/favicon.png" alt="" />
		<h1>{isRegistering ? 'Register' : 'Login'}</h1>
		<input type="email" name="email" placeholder="Email" required />
		{#if data.toValidate}
			<input type="text" name="code" placeholder="Code" required />
		{:else}
			<input type="username" name="username" placeholder="Username" required />
			<div>
				<label for="do-register">Register?</label>
				<input type="checkbox" name="do-register" id="do-register" bind:checked={isRegistering} />
			</div>
		{/if}

		<button type="submit" class="login-btn">{isRegistering ? 'Register' : 'Login'}</button>
	</div>
	{#if data.error}
		<p class="error">{data.error}</p>
	{/if}
	{#if data.toValidate}
		<p class="info">Please enter the verification code sent to your email.</p>
	{:else}
		<p class="info">
			If you don't have an account, you can register by checking the "Register?" box.
		</p>
	{/if}
</form>

<style lang="scss">
	.login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 15px;
		position: absolute;

		top: 50%;
		left: 50%;

		transform: translate(-50%, -50%);

		width: 400px;
		margin: 0 auto;
		padding: 20px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		font-family: 'Inter', sans-serif;
		color: #333;

		h1 {
			font-size: 24px;
			margin-bottom: 20px;
			text-align: center;
		}

		input {
			padding: 10px;
			border: 1px solid #ccc;
			border-radius: 4px;
			font-size: 16px;
			width: 100%;
			box-sizing: border-box;
			transition: border-color 0.3s ease;

			&:focus {
				border-color: #007bff;
				outline: none;
			}

			&::placeholder {
				color: #aaa;
			}

			&[type='checkbox'] {
				width: auto;
				margin-right: 10px;
			}
		}

		.login-btn {
			padding: 10px;
			background-color: #007bff;
			color: #fff;
			border: none;
			border-radius: 4px;
			font-size: 16px;
			cursor: pointer;
			transition: background-color 0.3s ease;

			&:hover {
				background-color: #0056b3;
			}
		}

		img {
			width: 100px;
			height: 100px;
		}
	}

	.error {
		color: red;
		font-size: 14px;
		text-align: center;
	}

	.info {
		color: #555;
		font-size: 14px;
		text-align: center;
		margin-top: 10px;
	}
</style>
