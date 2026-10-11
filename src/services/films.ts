import { ContentType, type QueryParams } from "../interfaces/common";
import type { FilmDetailResponse } from "../interfaces/film/film";
import type { WorkListItemResponse } from "../interfaces/work/work";
import { api } from "./api";

export function getLatestMovies(page: number, limit: number) {
  return api.getAll<WorkListItemResponse>(ContentType.FILMS, {
    sort: "recentlyAdded",
    page,
    limit,
  });
}

export function getFilmByTmdbId(tmdbId: number) {
  return api.getOne<FilmDetailResponse>(ContentType.FILMS, tmdbId);
}

export function getRecentReleasesFilms(page: number, limit: number) {
  return api.getAll<WorkListItemResponse>(ContentType.FILMS, {
    page,
    limit,
    sort: "releaseDate",
  });
}

export function getMoviesByGenre(
  genreId: number,
  limit = 10,
  page = 1,
  filters: Pick<QueryParams, "sort" | "releaseYear" | "minTmdbRating"> = {},
) {
  return api.getAll<WorkListItemResponse>(ContentType.FILMS, {
    genreId,
    page,
    limit,
    sort: filters.sort ?? "recentlyAdded",
    releaseYear: filters.releaseYear,
    minTmdbRating: filters.minTmdbRating,
  });
}
