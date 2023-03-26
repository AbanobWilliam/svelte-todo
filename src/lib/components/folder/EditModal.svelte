<script lang="ts">
	import { folders, updateFolder } from '$lib/stores/FolderStore';

	export let open = false;
	export let showBackdrop = true;
	export let onClosed;
	export let folderId: string;

	const modalClose = () => {
		open = false;
		if (onClosed) {
			onClosed();
		}
	};

	type Folder = {
		id: string;
		name: string;
	};
	let folder: Folder[];

	$: {
		folders.subscribe((folders) => {
			return (folder = folders.filter((folder: Folder) => {
				return folder.id == folderId;
			}));
		});
	}

	let disabled: boolean = false;
	let folderName: string;
	const checkFolderName = (e) => {
		console.log(e.target.value);
		if (e.target.value.length > 5) {
			disabled = false;
			folderName = e.target.value;
		} else {
			disabled = true;
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
						Edit - {folder[0].name}
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
						class="form-control"
						value={folder[0].name}
						on:input={checkFolderName}
					/>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-primary"
						{disabled}
						on:click={() => {
							updateFolder(folderId, folderName);
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
