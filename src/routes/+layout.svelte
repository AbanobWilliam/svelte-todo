<script lang="ts">
	import '../app.scss';
	import { folders } from '$lib/stores/FolderStore.ts';
	import AddFolder from '$lib/components/folder/AddFolder.svelte';
	import { deleteFolder } from '$lib/stores/FolderStore';
	import EditModal from '$lib/components/folder/EditModal.svelte';

	let showPopup = false;
	let folderId: string = '';
	const onShowPopup = (id: string) => {
		showPopup = true;
		folderId = id;
	};
	const onPopupClose = () => {
		showPopup = false;
	};
</script>

<div class="content">
	<div class="container-fluid py-5">
		<div class="row">
			<div class="col-md-4">
				<h2>Folders</h2>
				<AddFolder />
				<div class="list-group">
					{#each $folders as folder (folder.id)}
						<li
							class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
						>
							<a href="/folder/{folder.id}" class="text-decoration-none">{folder.name}</a>
							<div class="buttons">
								<button class="btn btn-danger" on:click={() => deleteFolder(folder.id)}
									>Delete</button
								>
								<button class="btn btn-primary" on:click={onShowPopup(folder.id)}>Update</button>
							</div>
						</li>
					{/each}
				</div>
			</div>
			<EditModal open={showPopup} onClosed={() => onPopupClose()} {folderId} />
			<div class="col-md-4">
				<slot />
			</div>
		</div>
	</div>
</div>
