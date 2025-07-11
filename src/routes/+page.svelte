<script lang="ts">
	import { enhance } from '$app/forms';
	import { trans } from '$lib/langs/lib';
	export let data;

	//Landing page for the Tanuki Quest website

	let tr: (key: string) => string;

	(async () => {
		tr = await trans();
	})();
</script>

<div class="container">
	{#if tr}
		{#if data.authenticated}
			<div>
				<form action="?/room" method="post" use:enhance>
					<input type="text" name="name" placeholder="Name of the room" required />
					<button type="submit">Create</button>
				</form>
			</div>
		{:else}
			<h1>{tr('landing.title')}</h1>
			<p>{tr('landing.subtitle')}</p>

			<div class="cta">
				<button>{tr('landing.cta.login')}</button>
				<button>{tr('landing.cta.register')}</button>
			</div>
		{/if}

		<div class="rooms">
			{#if data.rooms && data.rooms.length > 0}
				<h2>Rooms</h2>
				<ul>
					{#each data.rooms as room}
						<li>
							<a href="/{room.id}">{room.name}</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p>{tr('landing.no_rooms')}</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.container {
		text-align: center;
		margin-top: 50px;
	}

	h1 {
		font-size: 2.5em;
		color: #333;
	}

	p {
		font-size: 1.2em;
		color: #666;
	}
</style>
