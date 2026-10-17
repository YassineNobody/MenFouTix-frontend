import type { Availability, PlaylistResponse } from "./video";

export interface WorkDetailResponse {
  availability: Availability;
  playlists: PlaylistResponse[];
  tmdbId: number;
  type: 'film' | 'série';

  localTitle: string;
  titleFr: string | null;
  titleEn: string | null;
  originalTitle: string | null;
  synopsis: string | null;
  releaseDate: string | null;
  releaseYear: number | null;

  posterUrl: string | null;
  backdropUrl: string | null;
  logoUrl: string | null;
  trailerUrl: string | null;

  tmdbVoteAverage: number | null;
  tmdbVoteCount: number | null;
  note: number | null;
  recommendation: string | null;

  runtimeMinutes: number | null;
  certificationFr: string | null;

  genres: {
    /** Identifiant du genre chez TMDB, pas l'ID SQLite local. */
    id: number;
    name: string;
  }[];
  actors: {
    /** Identifiant de la personne chez TMDB, pas l'ID SQLite local. */
    id: number;
    name: string;
    profileUrl: string | null;
    character: string | null;
  }[];

  directors: unknown[];
  productionCompanies: unknown[];
  creators: unknown[];
}
