import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Link } from "../../catalog/navigation";
import { getFilmByTmdbId } from "../../services/films";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function WatchMoviePage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getFilmByTmdbId(Number(id)),
    enabled: id !== undefined && Number.isInteger(Number(id)),
  });

  return (
    <div className="fixed inset-0 h-dvh overflow-hidden bg-black text-white">
      <div>
        <Link
          to={`/movie/${id}`}
          className="fixed top-6 left-8 z-[9999] flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 hover:bg-black/90 text-white shadow-lg transition-all duration-200"
        >
          <ArrowLeft size={16} />
          Retour
        </Link>
        {data && data.video && (
          <div className="fixed top-6 right-8 z-[10000] flex items-center gap-2">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/90 border border-gray-600 hover:bg-gray-700/90 text-white font-medium text-sm transition-all duration-200"
              to={`https://www.youtube.com/watch?v=${encodeURIComponent(data.video.videoId)}`}
            >
              <ExternalLink size={14} />
            </Link>
          </div>
        )}
      </div>
      {(!data?.video?.videoId || isLoading || isError) && (
        <div className="flex h-full items-center justify-center px-6 pt-24 text-center text-zinc-400" role="status">
          {isLoading
            ? "Chargement du film…"
            : isError
              ? "Impossible de charger le film."
              : "Aucun lien vidéo n’est disponible pour ce film pour le moment."}
        </div>
      )}
      {!isLoading && !isError && data?.video?.videoId && (
        <div className="h-full w-full overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${encodeURIComponent(data.video.videoId)}`}
            title="lecture YouTube"
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
    </div>
  );
}
