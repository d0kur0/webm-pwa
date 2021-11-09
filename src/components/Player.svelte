<style>
.controls {
	position: absolute;
	left: 0;
	bottom: 0;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%);
	width: 100%;
	display: flex;
	align-items: center;
	height: 40px;
}

.controls-actions {
	padding: 0 10px;
	display: flex;
}

.controls-time {
	display: flex;
	align-items: center;
	flex: 1 1 0;
}

.controls-time > input {
	width: 100%;
}

.controls-button {
	border: none;
	height: 22px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	cursor: pointer;
	transition: 0.3s;
	color: var(--text-color);
}

.controls-button:hover {
	color: var(--text-color-light);
}

.controls-button:focus {
	color: var(--accent-color);
}

:global(.controls-button svg) {
	width: 20px !important;
}

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

.player-title {
	width: 100%;
	top: 0;
	left: 0;
	position: absolute;
	font-size: 0.8em;
	display: flex;
	justify-content: space-between;
	background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%);
}

.player-title__name,
.player-title__source {
	padding: 10px;
}

.player-title__source a {
	color: var(--accent-color);
	text-decoration: none;
}

.player-title__source a:hover {
	opacity: 0.9;
}
</style>

<script lang="ts">
import { createEventDispatcher } from "svelte";
import type { File } from "webm-finder";
import IoIosPause from "svelte-icons/io/IoIosPause.svelte";
import IoIosPlay from "svelte-icons/io/IoIosPlay.svelte";
import IoMdArrowRoundForward from "svelte-icons/io/IoMdArrowRoundForward.svelte";
import IoMdArrowRoundBack from "svelte-icons/io/IoMdArrowRoundBack.svelte";
import IoMdDownload from "svelte-icons/io/IoMdDownload.svelte";
import TiArrowMaximise from "svelte-icons/ti/TiArrowMaximise.svelte";
import { usePlayerStore } from "../stores/player";

export let file: File;

const dispatch = createEventDispatcher();
const { volume, currentTime, duration, paused, togglePaused } = usePlayerStore();
</script>

<template>
	<div class="player">
		{#if file}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video
				autoplay
				bind:paused="{$paused}"
				bind:duration="{$duration}"
				bind:currentTime="{$currentTime}"
				bind:volume="{$volume}"
				class="player-video"
				src="{file.url}"></video>
			<div class="player-title">
				<div class="player-title__name">{file.name.substring(0, 38)}</div>
				<div class="player-title__source">
					<a href="{file.rootThread.url}" target="_blank">
						{file.rootThread.subject.substring(0, 80)}
					</a>
				</div>
			</div>
			<div class="controls">
				<div class="controls-actions">
					<button on:click="{togglePaused}" class="controls-button">
						{#if $paused}
							<IoIosPlay />
						{:else}
							<IoIosPause />
						{/if}
					</button>
					<button class="controls-button"><IoMdArrowRoundBack /></button>
					<button class="controls-button"><IoMdArrowRoundForward /></button>
				</div>

				<div class="controls-time">
					<input type="range" step="0.1" />
				</div>

				<div class="controls-actions">
					<button class="controls-button"><IoMdDownload /></button>
					<button class="controls-button"><TiArrowMaximise /></button>
				</div>
			</div>
		{:else}
			file is null
		{/if}
	</div>
</template>
