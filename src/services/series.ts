import { ContentType, type QueryParams } from "../interfaces/common";
import type {
  SeasonEpisodesResponse,
  SeriesDetailResponse,
} from "../interfaces/series/series";
import type { WorkListItemResponse } from "../interfaces/work/work";
import { api } from "./api";

export function getLatestSeries(page: number, limit: number) {
  return api.getAll<WorkListItemResponse>(ContentType.SERIES, {
    sort: "recentlyAdded",
    page,
    limit,
  });
}

export function getSerieByTmdbId(tmdbId: number) {
  return api.getOne<SeriesDetailResponse>(ContentType.SERIES, tmdbId);
}


export function getSeasonEpisodes(tmdbId: number, seasonNumber: number) {
  return api.getSeasonEpisodes<SeasonEpisodesResponse>(tmdbId, seasonNumber);
}

export function getRecentReleasesSeries(page: number, limit: number) {
  return api.getAll<WorkListItemResponse>(ContentType.SERIES, {
    sort: "releaseDate",
    page,
    limit,
  });
}

export function getSeriesByGenre(
  genreId: number,
  limit = 10,
  page = 1,
  filters: Pick<QueryParams, "sort" | "releaseYear" | "minTmdbRating"> = {},
) {
  return api.getAll<WorkListItemResponse>(ContentType.SERIES, {
    genreId,
    page,
    limit,
    sort: filters.sort ?? "recentlyAdded",
    releaseYear: filters.releaseYear,
    minTmdbRating: filters.minTmdbRating,
  });
}
