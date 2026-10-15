import { Play } from "lucide-react";
import { Link } from "../../../catalog/navigation";
import { YoutubeIcon } from "../../Icon/YoutubeIcon";
import type { SeriesDetailResponse } from "../../../interfaces/series/series";
import { useSeriesWatchProgress } from "../../../hooks/useSeriesWatchProgress";

export const SerieItemBtnGroup = ({
  serie,
}: {
  serie: SeriesDetailResponse;
}) => {
  const progress = useSeriesWatchProgress(serie.tmdbId);
  const seasonNumber = serie.seasons.some((season) => season.seasonNumber === progress.seasonNumber)
    ? progress.seasonNumber : 1;
  const episodeNumber = seasonNumber === progress.seasonNumber ? progress.episodeNumber : 1;
  const playlistUrl = serie.youtubePlaylistId
    ? `https://www.youtube.com/playlist?list=${encodeURIComponent(serie.youtubePlaylistId)}`
    : null;
  return (
    <div className="flex flex-wrap gap-3 w-full min-w-0">
      <Link
        to={`/watch/tv/${serie.tmdbId}/s/${seasonNumber}/e/${episodeNumber}`}
        className="flex flex-col items-center gap-1 px-4 sm:px-6 py-4 sm:py-5 bg-red-600 hover:bg-red-700 rounded-lg flex-1 min-w-0 justify-center text-xs sm:text-sm cursor-pointer"
      >
        <Play size={24} />
        Regarder
        <span className="text-[11px] text-white/75 sm:text-xs">
          Saison {seasonNumber} · Épisode {episodeNumber}
        </span>
      </Link>
      {playlistUrl ? <Link
        to={playlistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 px-4 sm:px-6 py-4 sm:py-5 bg-green-600 hover:bg-green-700 rounded-lg flex-1 min-w-0 justify-center text-xs sm:text-sm cursor-pointer"
      >
        <YoutubeIcon size={30} />
        Playlist YouTube
      </Link>
      : <button type="button" disabled className="flex flex-1 min-w-0 flex-col items-center justify-center gap-1 rounded-lg bg-green-600/30 px-4 py-4 text-xs text-white/50 sm:px-6 sm:py-5 sm:text-sm" title="Aucune playlist YouTube disponible">
          <YoutubeIcon size={30} /> Playlist indisponible
        </button>}
    </div>
  );
};
