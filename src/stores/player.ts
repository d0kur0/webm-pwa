import { writable } from "svelte/store";

export function createPlayerStore() {
	const paused = writable(true);
	const duration = writable(0);
	const volume = writable(+localStorage.volume || 0.5);
	const currentTime = writable(1);
	const isMaximize = writable(false);
	const isRepeat = writable(localStorage.isRepeat === "true");

	const togglePaused = () => paused.update(paused => !paused);
	const toggleIsRepeat = () =>
		isRepeat.update(isRepeat => {
			localStorage.isRepeat = !isRepeat;
			return !isRepeat;
		});

	volume.subscribe(volume => localStorage.setItem("volume", volume.toString()));

	return {
		paused,
		duration,
		volume,
		currentTime,
		isMaximize,
		isRepeat,
		togglePaused,
		toggleIsRepeat,
	};
}

export const usePlayerStore = createPlayerStore();
