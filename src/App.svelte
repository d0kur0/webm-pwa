<script lang="ts">
	import Router from "svelte-spa-router";
	import { wrap } from "svelte-spa-router/wrap";
	import { push } from "svelte-spa-router";

	import Disclaimer from "./pages/Disclaimer.svelte";
	import NotFound from "./pages/NotFound.svelte";

	import Player from "./pages/Player.svelte";
	import Settings from "./pages/Settings.svelte";

	import type { SvelteComponentDev } from "svelte/internal";

	const routeWithCondition = (component: typeof SvelteComponentDev) =>
		wrap({
			component,
			conditions: [
				() => {
					!localStorage.disclaimerChecked && push("/disclaimer");
					return true;
				},
			],
		});

	const routes = {
		"/": routeWithCondition(Player),
		"/disclaimer": Disclaimer,
		"/settings": routeWithCondition(Settings),
		"*": routeWithCondition(NotFound),
	};
</script>

<Router {routes} />

<style global>
	@import "./styles/variables.css";
	@import "./styles/main.css";
</style>
