<style>
.body {
	max-width: 600px;
	margin: auto;
}

.nav {
	height: 80px;
	display: flex;
	align-items: center;
}

.nav a {
	text-decoration: none;
	display: inline-flex;
	align-items: center;
}

:global(.nav a svg) {
	margin-right: 5px;
	width: 16px !important;
}

.boards {
	background-color: var(--page-background-light);
	padding: 0;
	border-radius: 5px;
	list-style: none;
	margin: 0;
	display: flex;
	flex-direction: column;
}

.boards__vendor-divider {
	border-bottom: 2px solid rgb(60, 60, 60);
	padding: 10px 15px;
	color: var(--text-color-dark);
}

.boards__board {
	padding: 12px 15px;
	display: flex;
	border: none;
	font: inherit;
	cursor: pointer;
	width: 100%;
	transition: 0.4s;
	color: var(--text-color-dark);
	background-color: var(--page-background-light);
	align-items: center;
}

:global(.boards__board svg) {
	width: 14px !important;
}

.boards__board:hover,
.boards__board:focus {
	color: var(--text-color-light);
	background-color: var(--page-background-dark);
}

.board-checkbox {
	width: 23px;
	height: 23px;
	border-radius: 50%;
	background-color: var(--accent-color);
	color: var(--accent-contrast-color);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	border: 2px solid transparent;
}

.board-checkbox--disabled {
	background-color: transparent;
	border-color: var(--text-color);
}
</style>

<script lang="ts">
import BackArrowIcon from "../components/icons/BackArrowIcon.svelte";
import CheckIcon from "../components/icons/CheckIcon.svelte";
import { TToggleBoardDisabledProps, useSettingsStore } from "../stores/settings";
import { link } from "svelte-spa-router";

const { settings, toggleBoardDisabled } = useSettingsStore;

const handleToggleBoard = (props: TToggleBoardDisabledProps) =>
	toggleBoardDisabled(props);
</script>

<template>
	<div class="body">
		<div class="nav">
			<a use:link href="/">
				<BackArrowIcon />
				open player
			</a>
		</div>

		<ul class="boards">
			{#each $settings as { vendor, boards }}
				<li class="boards__vendor-divider">Настройки для {vendor}</li>
				{#each boards as { name, description, disabled }}
					<li>
						<button
							on:click="{() => handleToggleBoard({ vendor, name })}"
							class="boards__board">
							<span class="board-checkbox" class:board-checkbox--disabled="{disabled}">
								{#if !disabled}
									<CheckIcon />
								{/if}
							</span>
							{description} :: {name}
						</button>
					</li>
				{/each}
			{/each}
		</ul>
	</div>
</template>
