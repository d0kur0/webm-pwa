<style>
.title-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}

.title {
	font-size: 0.8em;
	padding: 10px;
	display: flex;
	justify-content: space-between;
}

.title-name,
.title-source a {
	background-color: var(--page-background);
	padding: 3px 8px;
	border-radius: 5px;
	display: inline-block;
	text-decoration: none;
}

.controls-container {
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
}

.controls {
	padding: 10px;
	display: flex;
	margin: 0 -5px;
}

.controls-group {
	margin: 0 5px;
	padding: 1px 6px;
	border-radius: 10px;
	background-color: var(--page-background);
	opacity: 0.8;
	display: flex;
	align-items: center;
	justify-content: center;
}

.controls-button {
	cursor: pointer;
	border: none;
	color: var(--text-color);
	transition: 0.3s;
	border-radius: 50%;
	width: 25px;
	height: 25px;
	margin: 0 2px;
	background-color: transparent;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.controls-button:hover {
	opacity: 0.9;
}

.controls-button-active {
	color: var(--accent-color);
}

.controls-time {
	display: flex;
	flex: 1 1 0;
	align-items: center;
}

.controls-time input {
	width: 100%;
}

.controls-time-value {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
		Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	font-size: 0.8em;
	font-weight: bold;
	padding: 0 8px;
}

.controls-volume {
	display: flex;
	align-items: center;
	padding-right: 10px;
}

.controls-volume input {
	width: 50px;
}

.controls-volume-icon {
	display: flex;
	width: 18px;
	padding: 0 4px;
}
</style>

<script lang="ts">
import { usePlayerStore } from "../stores/player";
import { formatVideoTime } from "../utils/formatVideoTime";
import BackwardIcon from "./icons/BackwardIcon.svelte";
import ForwardIcon from "./icons/ForwardIcon.svelte";
import MaximizeIcon from "./icons/MaximizeIcon.svelte";
import MinimizeIcon from "./icons/MinimizeIcon.svelte";
import PauseIcon from "./icons/PauseIcon.svelte";
import PlayIcon from "./icons/PlayIcon.svelte";
import RepeatIcon from "./icons/RepeatIcon.svelte";
import SoundIcon from "./icons/SoundIcon.svelte";
import { createEventDispatcher } from "svelte";
import type { File } from "webm-finder";

export let file: File;

const {
	volume,
	currentTime,
	duration,
	paused,
	isMaximize,
	isRepeat,
	toggleIsRepeat,
	togglePaused,
} = usePlayerStore;

const dispatch = createEventDispatcher();

const handlePreviousVideo = () => dispatch("previousVideo");
const handleNextVideo = () => dispatch("nextVideo");
const handleFullScreen = () => {
	$isMaximize
		? document.exitFullscreen()
		: document.querySelector(".player")?.requestFullscreen();

	isMaximize.update(isMaximize => !isMaximize);
};
</script>

<div class="title-container">
	<div class="title">
		<div class="title-name">{file.name.substring(0, 32)}</div>
		<div class="title-source">
			<a href="{file.rootThread.url}" target="_blank">
				{file.rootThread.subject.substring(0, 56)}
			</a>
		</div>
	</div>
</div>

<div class="controls-container">
	<div class="controls">
		<div class="controls-group">
			<button
				title="{$paused ? `play` : `pause`}"
				on:click="{togglePaused}"
				class="controls-button">
				{#if $paused}
					<PlayIcon />
				{:else}
					<PauseIcon />
				{/if}
			</button>

			<button
				title="previous video"
				on:click="{handlePreviousVideo}"
				class="controls-button">
				<BackwardIcon />
			</button>

			<button title="next video" on:click="{handleNextVideo}" class="controls-button">
				<ForwardIcon />
			</button>
		</div>

		<div class="controls-group controls-time">
			<div class="controls-time-value">{formatVideoTime($currentTime)}</div>
			<input
				step="0.01"
				min="0"
				max="{$duration}"
				type="range"
				bind:value="{$currentTime}" />
			<div class="controls-time-value">{formatVideoTime($duration)}</div>
		</div>

		<div class="controls-group controls-volume">
			<span class="controls-volume-icon">
				<SoundIcon />
			</span>

			<input step="0.1" min="0" max="1" type="range" bind:value="{$volume}" />
		</div>

		<div class="controls-group">
			<button
				on:click="{toggleIsRepeat}"
				class:controls-button-active="{$isRepeat}"
				class="controls-button"
				title="enable repeat">
				<RepeatIcon />
			</button>
			<button
				on:click="{handleFullScreen}"
				class="controls-button"
				title="{$isMaximize ? `maximize video` : `minimize video`}">
				{#if $isMaximize}
					<MinimizeIcon />
				{:else}
					<MaximizeIcon />
				{/if}
			</button>
		</div>
	</div>
</div>
