import type { WorkDetailResponse } from "../work/workDetails";


export interface FilmDetailResponse extends WorkDetailResponse {
  type: 'film';
  video: {
    videoId: string;
    sourceTitle: string;
    thumbnailUrl: string | null;
    definition: string | null;
  } | null;
}
