<script lang="ts">
	import { todos, updateTodo } from '$lib/stores/TodoStore';

	export let open = false;
	export let showBackdrop = true;
	export let onClosed;
	export let todoId: string;

	const modalClose = () => {
		open = false;
		if (onClosed) {
			onClosed();
		}
	};

	type Todo = {
		id: string;
		name: string;
		description: string;
		completed: boolean;
		folderId: string;
	};
	let todo: Todo[];

	$: {
		todos.subscribe((todos) => {
			return (todo = todos.filter((todo: Todo) => {
				return todo.id == todoId;
			}));
		});
	}

	let disabled: boolean = false;
	let todoName: string = '';
	let todoDesc: string = '';
	let todoCompleted: string;
	let completedTodo: boolean;
	const checkTodoName = (e) => {
		todoName = e.target.value;
		if (todoName.length > 5 && todoDesc.length > 5) {
			disabled = false;
		} else {
			disabled = true;
		}
	};
	const checkTodoDesc = (e) => {
		todoDesc = e.target.value;
		if (todoName.length > 5 && todoDesc.length > 5) {
			disabled = false;
		} else {
			disabled = true;
		}
	};
	const checkTodoCheckedValue = (e) => {
		todoCompleted = e.target.value;
		if (todoCompleted == 'false') {
			completedTodo = false;
		} else {
			completedTodo = true;
		}
	};
</script>

<!-- Modal -->
{#if open}
	<div
		class="modal d-block"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="false"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">
						Edit - {todo[0].name}
					</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
						on:click={modalClose}
					/>
				</div>
				<div class="modal-body">
					<input
						type="text"
						class="form-control mb-3"
						value={todo[0].name}
						on:input={checkTodoName}
					/>
					<textarea
						class="form-control mb-3"
						value={todo[0].description}
						on:input={checkTodoDesc}
					/>
					<select
						class="form-select mb-3"
						bind:value={todo[0].completed}
						on:change={checkTodoCheckedValue}
					>
						<option value={true}>Completed</option>
						<option value={false}>Not Completed</option>
					</select>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-primary"
						{disabled}
						on:click={() => {
							updateTodo(todoId, todoName, todoDesc, completedTodo);
							modalClose();
						}}>Update</button
					>
				</div>
			</div>
		</div>
	</div>
	{#if showBackdrop}
		<div class="modal-backdrop show" />
	{/if}
{/if}
