export interface GenreResponse {
  /** Identifiant TMDB, utilisé par le filtre genreId du catalogue. */
  id: number;
  name: string;
  backdropUrl: string | null;
}
