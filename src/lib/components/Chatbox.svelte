<script lang="ts">
	import { enhance } from '$app/forms';

	export let data: {
		room: {
			id: number;
			name: string;
		};
		members: {
			id: number;
			username: string;
		}[];
		messages: {
			content: string;
			timestamp: number;
			userId: number;
			author:
				| {
						id: number;
						username: string;
				  }
				| undefined;
		}[];
	};
</script>

<div class="chatbox">
	<div class="header">
		<h1>{data.room.name}</h1>
	</div>
	<div class="messages">
		{#each data.messages as message (message.timestamp)}
			<div class="message">
				<span class="username">{message.author?.username}:</span>
				<span class="content">{message.content}</span>
				<span class="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
			</div>
		{/each}
	</div>

	<form class="footer" on:submit|preventDefault use:enhance action="?/send-message" method="post">
		<input type="text" placeholder="Type your message..." />
		<button>Send</button>
	</form>
</div>

<style>
	.chatbox {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f0f0f0;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.header {
		padding: 10px;
		background-color: #6200ea;
		color: white;
		border-radius: 8px 8px 0 0;
	}

	.messages {
		flex-grow: 1;
		padding: 10px;
		overflow-y: auto;
	}

	.message {
		margin-bottom: 10px;
	}

	.username {
		font-weight: bold;
	}

	.content {
		margin-left: 5px;
	}

	.timestamp {
		font-size: small;
		color: gray;
		margin-left: 5px;
	}

	.message:nth-child(odd) {
		background-color: #e0e0e0;
	}

	.message:nth-child(even) {
		background-color: #f0f0f0;
	}

	.message:hover {
		background-color: #d0d0d0;
	}
</style>
