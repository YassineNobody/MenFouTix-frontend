import { api } from "./api";
import { ContentType } from "../interfaces/common";
import type { WorkListItemResponse } from "../interfaces/work/work";

export function getRecommandationTmdbRating(
  page: number = 1,
  limit: number = 10,
) {
  return api.getAll<WorkListItemResponse>(ContentType.CATALOG, {
    page,
    limit,
    sort: "tmdbRating",
  });
}
