import { writable } from "svelte/store";
import { ImageStatus } from "../types.d";

export const imageStatus = writable(ImageStatus.READY);
export const originalImage = writable(null as unknown as string);
export const modifiedImage = writable(null as unknown as string);
