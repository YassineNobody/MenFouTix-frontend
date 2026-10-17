import axios, { type AxiosInstance } from "axios";
import { currentCatalog } from "../catalog/catalog";
import { videoVersion } from "../catalog/media";
import type {
  ContentType,
  QueryParams,
  PaginationResponse,
} from "../interfaces/common";

class Api {
  private readonly request: AxiosInstance;

  constructor(baseURL: string) {
    this.request = axios.create({ baseURL });
  }

  async getAll<T>(
    contentType: ContentType,
    params: QueryParams = {},
  ): Promise<PaginationResponse<T>> {
    const response = await this.request.get<PaginationResponse<T>>(
      `/api/${contentType}`,
      {
        params: {
          ...params,
          version: params.version ?? videoVersion(currentCatalog()),
        },
      },
    );

    return response.data;
  }

  async getOne<T>(
    contentType: ContentType,
    tmdbId: number,
    params: Pick<QueryParams, "version"> = {},
  ): Promise<T> {
    const response = await this.request.get<T>(
      `/api/${contentType}/${tmdbId}`,
      { params: { version: params.version ?? videoVersion(currentCatalog()) } },
    );

    return response.data;
  }

  async getSeasonEpisodes<T>(tmdbId: number, seasonNumber: number): Promise<T> {
    const response = await this.request.get<T>(
      `/api/series/${tmdbId}/seasons/${seasonNumber}/episodes`,
      { params: { version: videoVersion(currentCatalog()) } },
    );

    return response.data;
  }
}
export const api = new Api(
  import.meta.env.VITE_API_URL ?? "http://localhost:3000",
);
