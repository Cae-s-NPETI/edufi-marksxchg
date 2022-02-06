import { writable } from "svelte/store";

/**
 * The current page title.
 */
export const title = writable<string | null>(null);

/**
 * Dark mode.
 * TOOD: let's store this in localStorage.
 */
export const isDarkMode = writable<boolean>(false);
