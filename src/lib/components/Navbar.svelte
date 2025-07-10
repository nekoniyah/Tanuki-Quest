<script lang="ts">
	import type { User } from '$lib/server/db/schema';

	// Navbar component

	export let user: User | null = null;
</script>

<div class="navbar">
	<div class="logo">
		<a href="/">
			<img src="/favicon.png" alt="Logo" />
			Tanuki
		</a>
	</div>
	<div class="links">
		<a href="/about">About</a>
		<a href="/contact">Contact</a>
	</div>
	<div class="user">
		{#if user}
			<a href="/profile">{user.username}</a>
			<a href="/logout">Logout</a>
		{:else}
			<a href="/login">Login</a>
			<a href="/login?register=true">Register</a>
		{/if}
	</div>
</div>

<style lang="scss">
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #333;
		color: white;

		.logo a {
			color: white;
			text-decoration: none;
			font-size: 1.5rem;
			font-weight: bold;

			display: flex;
			align-items: center;
			img {
				width: 40px;
				height: 40px;
				margin-right: 0.5rem;
			}

			&:hover {
				opacity: 0.8;
			}

			&:visited {
				color: white;
			}
		}

		.links a {
			color: white;
			text-decoration: none;
			margin-right: 1rem;
		}

		.user a {
			color: white;
			text-decoration: none;
			margin-left: 1rem;
		}
	}
</style>
