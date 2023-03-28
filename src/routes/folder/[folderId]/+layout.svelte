<script lang="ts">
	import { page } from '$app/stores';
	import AddTodo from '$lib/components/todo/AddTodo.svelte';
	import EditModal from '$lib/components/todo/EditModal.svelte';
	import { completeTodo, delteTodo, todos } from '$lib/stores/TodoStore';

	let showPopup = false;
	let todoId: string = '';
	const onShowPopup = (id: string) => {
		showPopup = true;
		todoId = id;
	};
	const onPopupClose = () => {
		showPopup = false;
	};

	let folderId: string;
	page.subscribe((pageId) => {
		folderId = pageId.params.folderId;
	});
</script>

<div class="row">
	<div class="col-md-6">
		<AddTodo {folderId} />
		<div class="list-group">
			{#each $todos as todo (todo.id)}
				{#if todo.folderId == folderId}
					<li
						class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
					>
						<a href="/folder/{folderId}/todo/{todo.id}" class="text-decoration-none">{todo.name}</a>
						<div class="buutons">
							<button class="btn btn-danger" on:click={() => delteTodo(todo.id)}>Delete</button>
							<button class="btn btn-primary" on:click={() => onShowPopup(todo.id)}>Update</button>
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
				{/if}
			{/each}
			<EditModal open={showPopup} onClosed={() => onPopupClose()} {todoId} />
		</div>
	</div>
	<div class="col-md-6">
		<div class="single-todo">
			<slot />
		</div>
	</div>
</div>
