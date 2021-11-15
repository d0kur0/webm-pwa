import type { UrlOverrider } from "webm-finder";

export const urlOverrider: UrlOverrider = url =>
	`https://cors-suck-my-dick.herokuapp.com/?endpoint=${encodeURI(url)}`;

export const requiredFileTypes = ["webm", "mp4"];

export const wrapVideoUrl = (url: string) =>
	url.includes("i.4cdn.org") ? urlOverrider(url) : url;
