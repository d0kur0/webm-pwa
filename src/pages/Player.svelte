<script lang="ts">
	import { onMount } from "svelte";
	import { derived } from "svelte/store";
	import type { File } from "webm-finder";
	import Player from "../components/Player.svelte";

	import PlayerHeader from "../components/PlayerHeader.svelte";
	import { isFilesFromCacheExpired, useMediaStore } from "../stores/media";
	import { useSettingsStore } from "../stores/settings";

	const {
		files,
		fetchFiles,
		isUpdated,
		isWorked,
		countCurrent,
		countTotal,
		fetchMode,
		status,
		currentIndex,
	} = useMediaStore();

	const { settings } = useSettingsStore;

	onMount(() => {
		window.stop();
		isFilesFromCacheExpired() && fetchFiles($settings);
	});

	const file = derived(
		[currentIndex, files, isWorked],
		([currentIndex, files, isWorked]) => {
			return files[currentIndex];
		}
	);
</script>

<template>
	<PlayerHeader
		status={$status}
		isWorked={$isWorked}
		isUpdated={$isUpdated}
		fetchMode={$fetchMode}
		countTotal={$countTotal}
		countCurrent={$countCurrent}
	/>

	<Player file={$file} />
</template>
