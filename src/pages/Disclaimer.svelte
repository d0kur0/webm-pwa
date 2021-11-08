<script lang="ts">
	import { push } from "svelte-spa-router";

	function handleAccept() {
		localStorage.disclaimerChecked = true;
		push("/");
	}
</script>

<template>
	<h1>Дисклеймер</h1>
	<p>
		Просматривая контент Вы можете встретить порно, аниме, расчлененку и подобное.<br
		/>Даже выбрав в настройках только "музыку", Вы не получите никакой гарантии, что
		случайно не увидите гей-порно.
	</p>
	<p>
		Приложение не хранит показываемый контент, а работает по принципу поисковой системы.<br
		/>
		Весь контент берется их открытых источников:
		<a target="_blank" href="https://2ch.hk">2ch.hk</a>
		и <a target="_blank" href="https://4chan.org">4chan.org</a>.<br />
	</p>
	<p>В случае чего жалобы можете отправлять владельцам данных сервисов.</p>

	<button on:click={handleAccept} class="accept">Понятно, открыть сайт</button>
</template>

<style>
	h1 {
		margin-top: 100px;
	}

	.accept {
		font: inherit;
		font-size: 2em;
		margin-top: 30px;
		padding: 5px 17px;
		cursor: pointer;
		background-color: var(--accept-background);
		color: var(--accept-color);
		border: none;
		transition: 0.3s;
		border-radius: 6px;
	}

	.accept:hover {
		opacity: 0.9;
	}
</style>
