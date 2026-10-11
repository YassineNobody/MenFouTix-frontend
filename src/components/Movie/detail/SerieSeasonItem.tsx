import { useState } from "react";
import type { SeriesDetailResponse } from "../../../interfaces/series/series";
import { SeasonEpisodeList } from "../../Series/details/SeasonEpisodeList";

export const SerieSeasonItems = ({ serie }: { serie: SeriesDetailResponse }) => {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const seasons = [...serie.seasons].sort(
    (first, second) => first.seasonNumber - second.seasonNumber,
  );

  if (seasons.length === 0) return null;

  return (
    <section className="mt-10 mb-8" aria-labelledby="seasons-heading">
      <h3 id="seasons-heading" className="mb-4 text-xl font-bold">
        Saisons
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {seasons.map((season) => {
          const name =
            season.nameFr ??
            season.nameEn ??
            (season.seasonNumber === 0
              ? "Épisodes spéciaux"
              : `Saison ${season.seasonNumber}`);

          return (
            <button
              key={season.seasonNumber}
              type="button"
              onClick={() =>
                setSelectedSeason((current) =>
                  current === season.seasonNumber ? null : season.seasonNumber,
                )
              }
              aria-expanded={selectedSeason === season.seasonNumber}
              aria-controls={
                selectedSeason === season.seasonNumber
                  ? `season-episodes-${serie.tmdbId}`
                  : undefined
              }
              className="group min-w-0 cursor-pointer rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              <div className={`relative aspect-2/3 overflow-hidden rounded-lg border bg-zinc-900 transition-colors group-hover:border-red-500/60 ${
                selectedSeason === season.seasonNumber
                  ? "border-red-500"
                  : "border-white/10"
              }`}>
                {season.posterUrl ?? serie.posterUrl ? (
                  <img
                    src={season.posterUrl ?? serie.posterUrl ?? undefined}
                    alt={`Affiche de ${name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-3 text-center text-sm text-zinc-500">
                    Aucune affiche
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/80 to-transparent px-3 pb-3 pt-12">
                  <h4 className="line-clamp-2 text-sm font-semibold text-white" title={name}>
                    {name}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-200">
                    {season.episodeCount} épisode{season.episodeCount > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {selectedSeason !== null && (
        <div id={`season-episodes-${serie.tmdbId}`}>
          <SeasonEpisodeList
            tmdbId={serie.tmdbId}
            seasonNumber={selectedSeason}
          />
        </div>
      )}
    </section>
  );
};
