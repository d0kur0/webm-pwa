import { writable } from "svelte/store";

export function createPlayerStore() {
	const paused = writable(true);
	const duration = writable(0);
	const volume = writable(+localStorage.volume || 0.5);
	const currentTime = writable(1);

	const togglePaused = () => paused.update(paused => !paused);

	volume.subscribe(volume => localStorage.setItem("volume", volume.toString()));

	return { paused, duration, volume, currentTime, togglePaused };
}

export const usePlayerStore = createPlayerStore();
