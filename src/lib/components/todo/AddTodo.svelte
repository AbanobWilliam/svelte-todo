<script lang="ts">
	import { addTodo } from '$lib/stores/TodoStore';

	export let folderId: string;
	let disabled: boolean = true;
	let todoName: string = '';
	let todoDesc: string = '';
	let todoCompleted: boolean = false;
	const checkTodoNameValue = (e) => {
		todoName = e.target.value;
		if (todoName.length > 3 && todoDesc.length > 10) {
			disabled = false;
			todoName = e.target.value;
		} else {
			disabled = true;
		}
	};
	const checkTodoDescValue = (e) => {
		todoDesc = e.target.value;
		if (todoDesc.length > 10 && todoName.length > 3) {
			disabled = false;
			todoDesc = e.target.value;
		} else {
			disabled = true;
		}
	};
	const checkTodoCheckedValue = (e) => {
		if (e.target.value == 'true') {
			todoCompleted = true;
		} else {
			todoCompleted = false;
		}
	};
</script>

<div class="mb-3">
	<input
		type="text"
		placeholder="Todo Name"
		class="form-control mb-2"
		value={todoName}
		on:input={checkTodoNameValue}
	/>
	<textarea
		placeholder="Todo Description"
		class="form-control mb-2"
		value={todoDesc}
		on:input={checkTodoDescValue}
	/>
	<select class="form-select mb-3" bind:value={todoCompleted} on:change={checkTodoCheckedValue}>
		<option value={true}>Completed</option>
		<option value={false}>Not Completed</option>
	</select>
	<button
		class="btn btn-primary"
		{disabled}
		on:click={addTodo(todoName, todoDesc, todoCompleted, folderId)}>Add Todo</button
	>
</div>
