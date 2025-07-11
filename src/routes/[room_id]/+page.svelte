<script lang="ts">
	import Chatbox from '$lib/components/Chatbox.svelte';

	// Room page
	// This page displays the content of a specific room based on the room_id parameter.
	export let data;
</script>

<div class="room">
	<div class="members">
		{#each data.members as member}
			<div class="member">
				<span>{member.username}</span>
			</div>
		{/each}
	</div>
	<Chatbox
		data={{
			room: data.room,
			members: data.members,
			messages: data.messages
		}}
	/>
</div>

<style lang="scss">
	.room {
		padding: 1rem;
		background-color: #f9f9f9;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-width: 800px;
		margin: auto;

		.messages {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.message {
				padding: 0.5rem;
				background-color: #fff;
				border-radius: 4px;
				box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

				.author {
					font-weight: bold;
					margin-bottom: 0.25rem;
				}

				.content {
					color: #333;
				}
			}
		}
	}
</style>
