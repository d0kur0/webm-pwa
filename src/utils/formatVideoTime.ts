export const formatVideoTime = (seconds: number) => {
	if (isNaN(seconds)) return "00:00";

	const minutes = Math.floor(seconds / 60);
	seconds = Math.floor(seconds % 60);

	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
