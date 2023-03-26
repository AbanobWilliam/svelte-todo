<script lang="ts">
	import { page } from '$app/stores';
	import AddTodo from '$lib/components/todo/AddTodo.svelte';
	import { todos } from '$lib/stores/TodoStore';

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
		</li>
	{/each}
</div>
<slot />
