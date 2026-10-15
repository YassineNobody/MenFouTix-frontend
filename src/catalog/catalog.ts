export type CatalogVersion = "vf" | "vo";

export function catalogFromPath(pathname: string): CatalogVersion | null {
  const first = pathname.split("/")[1];
  return first === "vf" || first === "vo" ? first : null;
}

export function catalogPath(version: CatalogVersion, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || catalogFromPath(path)) return path;
  return `/${version}${path === "/" ? "" : path}`;
}

/** Lecture au début de chaque appel, jamais une sélection globale mutable. */
export function currentCatalog(): CatalogVersion {
  return catalogFromPath(window.location.pathname) ?? "vf";
}
