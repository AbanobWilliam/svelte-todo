<script lang="ts">
	import { page } from '$app/stores';
	import AddTodo from '$lib/components/todo/AddTodo.svelte';
	import { completeTodo, delteTodo, todos } from '$lib/stores/TodoStore';

	let folderId: string;
	page.subscribe((pageId) => {
		folderId = pageId.params.folderId;
		console.log(folderId);
	});
	console.log($todos);
</script>

<AddTodo {folderId} />
<div class="list-group">
	{#each $todos as todo (todo.id)}
		<li
			class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
		>
			<a href="/folder/{todo.id}" class="text-decoration-none">{todo.name}</a>
			<div class="buutons">
				<button class="btn btn-danger" on:click={() => delteTodo(todo.id)}>Delete</button>
				<button
					class="btn"
					class:btn-outline-success={todo.completed}
					class:btn-outline-danger={!todo.completed}
					on:click={() => completeTodo(todo.id)}
				>
					{#if todo.completed}
						Completed
					{:else}
						Not Completed
					{/if}
				</button>
			</div>
		</li>
	{/each}
</div>
<slot />
