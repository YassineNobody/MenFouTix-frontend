import type { WorkDetailResponse } from "../work/workDetails";
export interface SeasonSummaryResponse {
  tmdbSeasonId: number | null;
  seasonNumber: number;
  nameFr: string | null;
  nameEn: string | null;
  synopsisFr: string | null;
  synopsisEn: string | null;
  airDate: string | null;
  posterUrl: string | null;
  episodeCount: number;
}

export interface SeriesDetailResponse extends WorkDetailResponse {
  type: "série";
  seasons: SeasonSummaryResponse[];
}

export interface EpisodeResponse {
  tmdbEpisodeId: number;
  episodeNumber: number;
  titleFr: string | null;
  titleEn: string | null;
  synopsisFr: string | null;
  synopsisEn: string | null;
  airDate: string | null;
  runtimeMinutes: number | null;
  stillUrl: string | null;
  tmdbVoteAverage: number | null;
  tmdbVoteCount: number | null;
  directors: string[];
  video: {
    videoId: string;
    sourceTitle: string;
    thumbnailUrl: string | null;
    definition: string | null;
  } | null;
}

export interface SeasonEpisodesResponse {
  seasonNumber: number;
  episodes: EpisodeResponse[];
}
