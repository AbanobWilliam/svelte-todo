<script lang="ts">
	import '../app.scss';
	import { folders } from '$lib/stores/FolderStore.ts';
	import AddFolder from '$lib/components/folder/AddFolder.svelte';
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
						</li>
					{/each}
				</div>
			</div>
			<div class="col-md-4">
				<slot />
			</div>
		</div>
	</div>
</div>
