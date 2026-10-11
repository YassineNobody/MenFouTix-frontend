import { ExternalLink } from "lucide-react";
import { WatchSeriesEpisodeMenu } from "./WatchSeriesEpisodeMenu";
import type { useWatchSeries } from "../../../hooks/useWatchSeries";

const controlClass =
  "flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/90 border border-gray-600 hover:bg-gray-700/90 text-white font-medium text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-35";

export type WatchSeriesNavigationProps = Pick<
  ReturnType<typeof useWatchSeries>,
  | "seasonNumber"
  | "episodeNumber"
  | "loading"
  | "failed"
  | "seasons"
  | "episodes"
  | "current"
  | "previous"
  | "next"
  | "videoId"
  | "openEpisode"
>;

export function WatchSeriesNavigation({
  seasonNumber,
  episodeNumber,
  loading,
  failed,
  seasons,
  episodes,
  previous,
  next,
  videoId,
  openEpisode,
}: WatchSeriesNavigationProps) {
  return (
    <>
      <div className="flex w-full min-w-0 items-center justify-end gap-2">
        {videoId && !loading && !failed && (
          <a
            href={`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir sur YouTube"
            title="Ouvrir sur YouTube"
            className={controlClass}
          >
            <ExternalLink size={18} />
          </a>
        )}
        {previous && !loading && !failed && <button
          type="button"
          aria-label="Épisode précédent"
          title="Épisode précédent"
          onClick={() => openEpisode(previous.episodeNumber, previous.seasonNumber)}
          className={controlClass}
        >
          <span>S{previous.seasonNumber}:{String(previous.episodeNumber).padStart(2, "0")}</span>
        </button>}
        <WatchSeriesEpisodeMenu
          seasonNumber={seasonNumber}
          episodeNumber={episodeNumber}
          loading={loading}
          failed={failed}
          seasons={seasons}
          episodes={episodes}
          openEpisode={openEpisode}
          buttonClassName={controlClass}
        />
        {next && !loading && !failed && <button
          type="button"
          aria-label="Épisode suivant"
          title="Épisode suivant"
          onClick={() => openEpisode(next.episodeNumber, next.seasonNumber)}
          className={controlClass}
        >
          <span>S{next.seasonNumber}:{String(next.episodeNumber).padStart(2, "0")}</span>
        </button>}
      </div>
    </>
  );
}
