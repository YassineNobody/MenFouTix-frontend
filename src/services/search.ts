import { ContentType, type QueryParams } from "../interfaces/common";
import type { WorkListItemResponse } from "../interfaces/work/work";
import { api } from "./api";

type SearchParams = {
  query: string;
  params?: QueryParams;
};

export function searchInDatabase(params: SearchParams) {
  return api.getAll<WorkListItemResponse>(ContentType.SEARCH, {
    ...params.params,
    q: params.query,
  });
}
