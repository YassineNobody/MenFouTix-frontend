import type { useWatchSeries } from "../../../hooks/useWatchSeries";

type Props = Pick<ReturnType<typeof useWatchSeries>,
  "loading" | "failed" | "valid" | "videoId" | "title" | "seasonNumber" |
  "episodeNumber" | "current">;

export function WatchSeriesPlayer({
  loading, failed, valid, videoId, title, seasonNumber, episodeNumber, current,
}: Props) {
  return (
!loading && !failed && valid && videoId ? (
        <div className="h-full w-full overflow-hidden bg-black">
          <iframe
            key={videoId}
            src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}`}
            title={`${title} — Saison ${seasonNumber}, épisode ${episodeNumber}`}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : (
        <div
          role="status"
          className="flex h-full items-center justify-center px-6 pt-48 text-center text-zinc-400"
        >
          {!valid
            ? "Lien de lecture invalide."
            : loading
              ? "Chargement de l’épisode…"
              : failed
                ? "Impossible de charger cette série ou ses épisodes."
                : !current
                  ? "Cet épisode n’est pas renseigné pour cette saison."
                  : "Aucun lien vidéo n’est disponible pour cet épisode pour le moment."}
        </div>
      )
  );
}
