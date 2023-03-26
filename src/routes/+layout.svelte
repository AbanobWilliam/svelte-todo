<script lang="ts">
	import AddFolder from '$lib/components/folder/AddFolder.svelte';
	import { folders } from '$lib/stores/FolderStore.ts';
</script>

<AddFolder />

<ul>
	{#each $folders as folder}
		<li><a href="/folder/{folder.id}">{folder.id}-{folder.name}</a></li>
	{/each}
</ul>
<slot />
