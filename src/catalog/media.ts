import type { CatalogVersion } from "./catalog";
import type { VideoVersion } from "../interfaces/work/video";

export function videoVersion(catalog: CatalogVersion): VideoVersion {
  return catalog === "vo" ? "VO" : "VF";
}

/** Ne jamais basculer silencieusement sur l'autre version. */
export function selectMedia<T extends { version: VideoVersion }>(
  items: readonly T[], catalog: CatalogVersion,
): T | undefined {
  return items.find(item => item.version === videoVersion(catalog));
}
