import { useQuery } from "@tanstack/react-query";
import { Link } from "../../../catalog/navigation";
import { getSeasonEpisodes } from "../../../services/series";
import { SeasonEpisodeListSkeleton } from "../Skeleton/SeasonEpisodeListSkeleton";
import { useCatalogVersion } from "../../../catalog/context";
import { selectMedia } from "../../../catalog/media";

interface Props {
  tmdbId: number;
  seasonNumber: number;
}

export function SeasonEpisodeList({ tmdbId, seasonNumber }: Props) {
  const version = useCatalogVersion();
  const { data, isPending, isError } = useQuery({
    queryKey: ["seasonEpisodes", tmdbId, seasonNumber],
    queryFn: () => getSeasonEpisodes(tmdbId, seasonNumber),
    enabled: Number.isInteger(tmdbId) && Number.isInteger(seasonNumber),
  });

  return (
    <section className="mt-8" aria-label={`Épisodes de la saison ${seasonNumber}`}>
      <h3 className="mb-4 text-xl font-bold text-white">
        {seasonNumber === 0 ? "Épisodes spéciaux" : `Saison ${seasonNumber} · Épisodes`}
      </h3>

      {isPending ? (
        <SeasonEpisodeListSkeleton />
      ) : isError ? (
        <p role="alert" className="rounded-lg border border-red-900/60 bg-red-950/20 p-4 text-sm text-red-200">
          Impossible de charger les épisodes de cette saison.
        </p>
      ) : data.episodes.length === 0 ? (
        <p className="text-sm text-zinc-400">Aucun épisode renseigné pour cette saison.</p>
      ) : (
        <ol className="space-y-4">
          {data.episodes.map((episode) => {
            const title =
              episode.titleFr ??
              episode.titleEn ??
              `Épisode ${episode.episodeNumber}`;
            const synopsis = episode.synopsisFr ?? episode.synopsisEn;
            const video = selectMedia(episode.videos, version);
            const image = episode.stillUrl ?? video?.thumbnailUrl;

            return (
              <li
                key={episode.episodeNumber}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-zinc-950/70 p-3 sm:flex-row"
              >
                <div className="aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-zinc-900 sm:w-40">
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-zinc-500">
                      Aucune image
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white">
                    <span className="mr-2 text-red-400">{episode.episodeNumber}.</span>
                    {title}
                  </h4>
                  {(episode.airDate || episode.runtimeMinutes != null) && (
                    <p className="mt-1 text-xs text-zinc-400">
                      {[episode.airDate, episode.runtimeMinutes != null
                        ? `${episode.runtimeMinutes} min`
                        : null].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {synopsis && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-300">
                      {synopsis}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-zinc-400">
                    {video ? "Vidéo disponible" : "Vidéo pas encore disponible"}
                  </p>
                  <Link
                    to={`/watch/tv/${tmdbId}/s/${seasonNumber}/e/${episode.episodeNumber}`}
                    className="mt-3 inline-flex rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition-colors hover:bg-white/10"
                  >
                    {video?.videoId ? "Regarder l’épisode" : "Ouvrir l’épisode"}
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
