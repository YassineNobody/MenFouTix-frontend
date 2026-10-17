export type VideoVersion = "VF" | "VO";

export interface Availability {
  vf: boolean;
  vo: boolean;
}

export interface VideoResponse {
  videoId: string;
  version: VideoVersion;
  sourceTitle: string;
  description: string | null;
  thumbnailUrl: string | null;
  definition: string | null;
  privacyStatus: string | null;
  embeddable: boolean;
  publishedAt: string | null;
  channelId: string | null;
  channelTitle: string | null;
}

export interface PlaylistResponse {
  playlistId: string;
  version: VideoVersion;
}
