<script lang="ts">
	import TiArrowSync from "svelte-icons/ti/TiArrowSync.svelte";
	import TiCogOutline from "svelte-icons/ti/TiCogOutline.svelte";
	import DiGithubAlt from "svelte-icons/di/DiGithubAlt.svelte";
	import { link } from "svelte-spa-router";

	export let status = "";
	export let isUpdated = false;
	export let isWorked = false;
	export let countCurrent = 0;
	export let countTotal = 0;
	export let fetchMode = "";
</script>

<template>
	<header class="header">
		<div class="header__status">
			{status}
			{#if isWorked}
				# {fetchMode} :: {countCurrent} of {countTotal}
			{/if}
			<span
				class={`status ${
					isWorked ? `status--worked` : isUpdated ? `status--updated` : `status--cache`
				}`}
			/>
		</div>

		<div class="header__actions">
			<button class="action-button"><TiArrowSync /> update</button>
			<a use:link href="/settings" class="action-button"><TiCogOutline /> settings</a>
			<a
				href="https://github.com/d0kur0/webm-pwa"
				target="_blank"
				class="action-button action-button--only-icon"
			>
				<DiGithubAlt />
			</a>
		</div>
	</header>
</template>

<style>
	.header {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header__status {
		display: flex;
		align-items: center;
	}

	.status {
		margin-left: 8px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		display: inline-block;
		background-color: #fff;
	}

	.status--worked {
		background-color: rgb(255, 174, 0);
	}

	:global(.status--cache) {
		background-color: rgb(189, 189, 189);
	}

	:global(.status--updated) {
		background-color: rgb(0, 255, 136);
	}

	.header__actions {
		margin: 0 -6px;
		display: flex;
	}

	.action-button {
		text-decoration: none;
		cursor: pointer;
		font: inherit;
		padding: 0 6px;
		height: 35px;
		border: none;
		margin: 0;
		background-color: var(--page-background-light);
		color: var(--text-color-light);
		border-radius: 6px;
		transition: 0.4s;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin: 0 6px;
	}

	.action-button:hover {
		opacity: 0.8;
	}

	:global(.action-button svg) {
		width: 24px !important;
		padding-right: 5px;
	}

	:global(.action-button--only-icon svg) {
		padding-right: 0px;
	}
</style>
