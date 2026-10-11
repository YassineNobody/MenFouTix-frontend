export interface WorkListItemResponse {
  tmdbId: number;
  type: "film" | "série";

  titleFr: string;
  titleEn: string | null;
  originalTitle: string | null;
  localTitle: string | null;

  releaseDate: string | null;
  synopsis: string | null;
  posterUrl: string | null;
  backdropUrl: string | null;
  logoUrl: string | null;
  genres: string[];

  tmdbRating: number | null; // Note TMDB, généralement sur 10
  ourRating: 1 | 2 | 3 | 4 | 5 | null;
}
