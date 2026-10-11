import { ContentType } from "../interfaces/common";
import type { GenreResponse } from "../interfaces/genre/genre";
import { api } from "./api";

export function getGenres(typeWork: "film" | "série") {
  return api.getAll<GenreResponse>(ContentType.GENRES, { type: typeWork });
}
