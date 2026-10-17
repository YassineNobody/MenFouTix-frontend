import { Play } from "lucide-react";
import type { FilmDetailResponse } from "../../../interfaces/film/film";
import { Link } from "../../../catalog/navigation";
import { YoutubeIcon } from "../../Icon/YoutubeIcon";
import { useCatalogVersion } from "../../../catalog/context";
import { selectMedia } from "../../../catalog/media";

export const MovieItemBtnGroup = ({ movie }: { movie: FilmDetailResponse }) => {
  const version = useCatalogVersion();
  const video = selectMedia(movie.videos, version);
  return (
    <div className="flex flex-wrap gap-3 w-full min-w-0">
      <Link
        to={`/watch/movie/${movie.tmdbId}`}
        className="flex flex-col items-center gap-1 px-4 sm:px-6 py-4 sm:py-5 bg-red-600 hover:bg-red-700 rounded-lg flex-1 min-w-0 justify-center text-xs sm:text-sm cursor-pointer"
      >
        <Play size={24} />
        Regarder
      </Link>
      <Link
        to={
          video
            ? `https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}`
            : "#"
        }
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 px-4 sm:px-6 py-4 sm:py-5 bg-green-600 hover:bg-green-700 rounded-lg flex-1 min-w-0 justify-center text-xs sm:text-sm cursor-pointer"
      >
        <YoutubeIcon size={30} />
        Regarder sur YouTube
      </Link>
    </div>
  );
};
