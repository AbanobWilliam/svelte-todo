<script lang="ts">
	import { addFolder } from '$lib/stores/FolderStore';

	let disabled: boolean = true;
	let folderName: string = '';
	const checkFolderName = (e) => {
		if (e.target.value != '' && e.target.value.length > 5) {
			disabled = false;
			folderName = e.target.value;
		} else {
			disabled = true;
		}
	};
</script>

<div class="input-group mb-3">
	<input
		type="text"
		placeholder="Folder Name"
		value={folderName}
		on:input={checkFolderName}
		class="form-control"
	/>
	<button
		{disabled}
		class="btn btn-primary"
		on:click={() => {
			addFolder(folderName);
			folderName = '';
			disabled = true;
		}}>Add Folder</button
	>
</div>
