<script lang="ts">
import Player from "../components/Player.svelte";
import PlayerHeader from "../components/PlayerHeader.svelte";
import { isFilesFromCacheExpired, useMediaStore } from "../stores/media";
import { useSettingsStore } from "../stores/settings";
import { onMount } from "svelte";
import { derived } from "svelte/store";

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
	nextFile,
	previousFile,
} = useMediaStore();

const { settings } = useSettingsStore;

onMount(() => {
	window.stop();
	isFilesFromCacheExpired() && fetchFiles($settings);
});

const file = derived(
	[currentIndex, files],
	([currentIndex, files]) => files[currentIndex]
);
</script>

<template>
	<PlayerHeader
		status="{$status}"
		isWorked="{$isWorked}"
		isUpdated="{$isUpdated}"
		fetchMode="{$fetchMode}"
		countTotal="{$countTotal}"
		countCurrent="{$countCurrent}" />

	<Player on:previousVideo="{previousFile}" on:nextVideo="{nextFile}" file="{$file}" />
</template>
