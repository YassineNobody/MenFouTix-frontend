import type { WorkDetailResponse } from "../work/workDetails";
import type { VideoResponse } from "../work/video";


export interface FilmDetailResponse extends WorkDetailResponse {
  type: 'film';
  videos: VideoResponse[];
}
