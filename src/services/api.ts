import axios, { type AxiosInstance } from "axios";
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
      { params },
    );

    return response.data;
  }

  async getOne<T>(contentType: ContentType, tmdbId: number): Promise<T> {
    const response = await this.request.get<T>(`/api/${contentType}/${tmdbId}`);

    return response.data;
  }

  async getSeasonEpisodes<T>(
    tmdbId: number,
    seasonNumber: number,
  ): Promise<T> {
    const response = await this.request.get<T>(
      `/api/series/${tmdbId}/seasons/${seasonNumber}/episodes`,
    );

    return response.data;
  }
}
export const api = new Api(
  "http://localhost:3000",
);