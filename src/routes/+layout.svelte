<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	export let data;
</script>

<Navbar user={data.user} />
<svelte:head>
	<title>Tanuki.quest</title>
</svelte:head>

<slot />

<style lang="scss">
	:global(html, body) {
		font-family: 'Inter', sans-serif;
		background-color: #f0f0f0;
		color: #333;
		margin: 0;
		padding: 0;
	}

	:global(h1) {
		font-size: 2rem;
		color: #222;
	}

	:global(a) {
		color: #007bff;
		text-decoration: none;

		&:hover {
			opacity: 0.8;
		}
	}
</style>
