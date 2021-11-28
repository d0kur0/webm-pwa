<style>
.player {
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #000;
	border-radius: 5px;
	height: 700px;
}

.player-video {
	max-width: 100%;
	height: 700px;
}
</style>

<script lang="ts">
import { usePlayerStore } from "../stores/player";
import { wrapVideoUrl } from "../utils/webmFinderOptions";
import PlayerControls from "./PlayerControls.svelte";
import { createEventDispatcher } from "svelte";
import type { File } from "webm-finder";

export let file: File;

const dispatch = createEventDispatcher();
const { volume, currentTime, duration, paused, isRepeat } = usePlayerStore;

const handlePreviousVideo = () => dispatch("previousVideo");
const handleNextVideo = () => dispatch("nextVideo");
const handleErrorVideo = () => dispatch("errorVideo");
</script>

<template>
	<div class="player">
		{#if file?.name}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video
				autoplay
				loop="{$isRepeat}"
				bind:paused="{$paused}"
				bind:duration="{$duration}"
				bind:currentTime="{$currentTime}"
				bind:volume="{$volume}"
				on:ended="{handleNextVideo}"
				on:error="{handleErrorVideo}"
				class="player-video"
				src="{wrapVideoUrl(file.url)}"></video>

			<PlayerControls
				on:nextVideo="{handleNextVideo}"
				on:previousVideo="{handlePreviousVideo}"
				file="{file}" />
		{:else}
			file is null
		{/if}
	</div>
</template>
