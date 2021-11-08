import { derived, get, writable } from "svelte/store";
import {
	Files,
	fourChannelFactory,
	Threads,
	twoChannelFactory,
	UrlOverrider,
	VendorMethods,
} from "webm-finder";
import type { TSettings } from "./settings";
import { shuffle } from "lodash";

const requiredFileTypes = ["webm", "mp4"];
const urlOverrider: UrlOverrider = url =>
	`https://cors-suck-my-dick.herokuapp.com/?endpoint=${encodeURI(url)}`;

const vendorsMap = {
	"2ch.hk": twoChannelFactory({ requiredFileTypes, urlOverrider }),
	"4chan.org": fourChannelFactory({ requiredFileTypes, urlOverrider }),
};

function getFilesFromCache(): Files {
	if (!localStorage.filesCache) return [];

	try {
		const files = JSON.parse(localStorage.filesCache);
		return Array.isArray(files) ? (files as Files) : [];
	} catch (error) {
		console.warn("error on getFilesFromCache");
		console.error(error);
	}
}

function setFilestoCache(files: Files) {
	try {
		localStorage.filesCache = JSON.stringify(files);
		localStorage.lastFilesUpdate = Math.floor(Date.now() / 1000);
	} catch (error) {
		console.warn("error on setFilestoCache");
		console.error(error);
	}
}

export function isFilesFromCacheExpired(): boolean {
	return Math.floor(Date.now() / 1000) - (+localStorage.lastFilesUpdate || 0) > 3600 * 2;
}

export function useMediaStore() {
	const files = writable<Files>(shuffle(getFilesFromCache()));
	const fetchMode = writable<"threads" | "files">("threads");

	const countTotal = writable(0);
	const countCurrent = writable(0);

	const isWorked = writable(false);
	const isUpdated = writable(false);

	const currentIndex = writable(0);

	const status = derived([files, isWorked, isUpdated], ([files, isWorked, isUpdated]) => {
		if (isUpdated) return "just updated";
		if (files.length && !isWorked) return "fetched from cache";
		if (isWorked) return "in progress";

		return "unknown status";
	});

	const fetchFiles = async (settings: TSettings) => {
		settings = settings.map(setting => ({
			...setting,
			boards: setting.boards.filter(({ disabled }) => !disabled),
		}));

		files.set([]);
		isWorked.set(true);
		fetchMode.set("threads");
		currentIndex.set(0);
		countCurrent.set(0);

		countTotal.set(settings.reduce((acc, s) => acc + s.boards.length, 0));

		const queueThreads: { vendor: VendorMethods; threads: Threads }[] = [];

		for (const { vendor, boards } of settings) {
			const vendorImplement: VendorMethods = vendorsMap?.[vendor];
			const threads: Threads = [];

			if (!vendorImplement) continue;

			for (const { name } of boards) {
				threads.push(...(await vendorImplement.fetchThreads(name)));
				countCurrent.update(count => count + 1);
			}

			queueThreads.push({ vendor: vendorImplement, threads });
		}

		fetchMode.set("files");
		countTotal.set(queueThreads.reduce((acc, t) => acc + t.threads.length, 0));
		countCurrent.set(0);

		const queueFiles = queueThreads.map(({ vendor, threads }) =>
			threads.map(thread =>
				vendor.fetchFiles(thread).then(fetchedFiles => {
					files.update(currentFiles => [...currentFiles, ...fetchedFiles]);
					countCurrent.update(count => count + 1);
				})
			)
		);

		await Promise.all(queueFiles.flat());

		isWorked.set(false);
		isUpdated.set(true);
		files.update(files => shuffle(files));
		setFilestoCache(get(files));
	};

	return {
		files,
		fetchMode,
		countTotal,
		countCurrent,
		status,
		isWorked,
		isUpdated,
		fetchFiles,
		currentIndex,
	};
}
