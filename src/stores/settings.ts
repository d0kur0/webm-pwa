import { get, writable } from "svelte/store";

export type TBoard = {
	name: string;
	description: string;
	disabled: boolean;
};

export type TSettings = {
	vendor: string;
	boards: TBoard[];
}[];

export type TToggleBoardDisabledProps = {
	vendor: string;
	name: string;
};

function getDefaultSettings(): TSettings {
	return [
		{
			vendor: "2ch.hk",
			boards: [
				{ name: "b", description: "Бред", disabled: false },
				{ name: "a", description: "Аниме", disabled: false },
				{ name: "media", description: "Медиа", disabled: false },
			],
		},
		{
			vendor: "4chan.org",
			boards: [
				{ name: "b", description: "Random", disabled: false },
				{ name: "h", description: "Hentai", disabled: false },
				{ name: "ec", description: "Ecchi", disabled: false },
				{ name: "hc", description: "Hard Core", disabled: false },
			],
		},
	];
}

function getLocalOverridedSettings(): TSettings {
	if (!localStorage.boardsOverrides) return [];

	try {
		const boardsOverrides = JSON.parse(localStorage.boardsOverrides) as TSettings;
		return Array.isArray(boardsOverrides) ? boardsOverrides : [];
	} catch (error) {
		localStorage.removeItem("boardsOverrides");
		console.warn("error on getLocalOverridedSettings");
		console.error(error);
		return [];
	}
}

function setLocalOverridedSettings(settings: TSettings) {
	try {
		localStorage.boardsOverrides = JSON.stringify(settings);
	} catch (error) {
		console.warn("error on setLocalOverridedSettings");
		console.error(error);
		return [];
	}
}

function getMergedSettings(): TSettings {
	const defaultSettings = getDefaultSettings();
	const localOverrides = getLocalOverridedSettings();

	return defaultSettings.map(settings => {
		const { vendor, boards } = settings;
		const overridedVendor = localOverrides.find(s => s.vendor === vendor);
		if (!overridedVendor) return settings;

		const mergedBoards = boards.map(board => {
			const overridedBoard = overridedVendor.boards.find(b => b.name === board.name);
			if (!overridedBoard) return board;

			return {
				name: overridedBoard?.name || "??? err",
				description: overridedBoard?.description || "??? err",
				disabled: Boolean(overridedBoard?.disabled),
			} as TBoard;
		});

		return { vendor, boards: mergedBoards };
	});
}

function createStore() {
	const settings = writable<TSettings>(getMergedSettings());

	const toggleBoardDisabled = ({ vendor, name }: TToggleBoardDisabledProps) => {
		settings.update(currentSettings => {
			return currentSettings.map(settings => {
				if (settings.vendor !== vendor) return settings;

				const boards = settings.boards.map(board => {
					if (board.name !== name) return board;
					return { ...board, disabled: !board.disabled };
				});

				return { ...settings, boards };
			});
		});

		setLocalOverridedSettings(get(settings));
		localStorage.lastFilesUpdate = 0;
	};

	return { settings, toggleBoardDisabled };
}

export const useSettingsStore = createStore();
