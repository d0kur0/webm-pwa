import { writable } from "svelte/store";

export function usePlayerStore() {
	const paused = writable(true);
	const duration = writable(0);
	const volume = writable(0.4);
	const currentTime = writable(1);

	const togglePaused = () => paused.update(paused => !paused);

	return { paused, duration, volume, currentTime, togglePaused };
}
