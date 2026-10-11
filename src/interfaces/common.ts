export const ContentType = {
  FILMS: "films",
  SERIES: "series",
  GENRES: "genres",
  SEARCH: "search",
  CATALOG: "catalog",
} as const;

export type ContentType = (typeof ContentType)[keyof typeof ContentType];

export type QueryParams = {
  page?: number;
  limit?: number;
  q?: string;
  genreId?: number;
  actorId?: number;
  releaseYear?: number;
  releaseYearFrom?: number;
  releaseYearTo?: number;
  minTmdbRating?: number;
  minOurRating?: number;
  type?: "film" | "série";
  sort?: "title" | "releaseDate" | "tmdbRating" | "ourRating" | "recentlyAdded";
};

export type PaginationResponse<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  pages: number;
};
