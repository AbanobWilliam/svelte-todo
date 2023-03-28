<script lang="ts">
	import { page } from '$app/stores';
	import { todos } from '$lib/stores/TodoStore';

	let pageId = $page.params.todoId;
	page.subscribe((url) => {
		pageId = url.params.todoId;
	});
	type Todos = {
		id: string;
		name: string;
		description: string;
		completed: boolean;
		folderId: string;
	};
	let todo: Todos[];
	$: {
		todos.subscribe((todos) => {
			todo = todos.filter((todo: Todos) => {
				return todo.id === pageId;
			});
		});
	}
</script>

<h2 class="mb-3">{todo[0].name}</h2>
<p>{todo[0].description}</p>
