import { Star, TriangleAlert } from "lucide-react";
import type { FilmDetailResponse } from "../../../interfaces/film/film";
import type { SeriesDetailResponse } from "../../../interfaces/series/series";

interface Props {
  movie: FilmDetailResponse | SeriesDetailResponse;
}

export const MovieOverview = ({ movie }: Props) => {
  const directors = movie.directors.filter(
    (person): person is string => typeof person === "string",
  );
  const seasons =
    movie.type === "série"
      ? movie.seasons.filter((season) => season.seasonNumber > 0)
      : [];
  const episodeCount = seasons.reduce(
    (total, season) => total + season.episodeCount,
    0,
  );

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3 rounded-md border border-red-900/60 bg-red-950/20 p-3">
        <TriangleAlert className="mt-0.5 shrink-0 text-red-500" size={18} />

        <p className="text-xs leading-5 text-zinc-300">
          Les informations proviennent de{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 underline"
          >
            TMDB
          </a>
          . Certaines données peuvent varier selon les pays.
        </p>
      </div>

      <div>
        <h2 className="mb-2 font-montserrat text-xl font-semibold">Synopsis</h2>
        <p className="font-montserrat text-sm leading-6 text-zinc-300">
          {movie.synopsis || "Aucun synopsis disponible."}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1">
        {movie.type === "série" && (
          <div className="flex flex-row justify-between gap-6">
            <div className="w-full">
              <h2 className="mb-2 font-montserrat text-lg font-semibold">
                Saisons
              </h2>
              <p className="text-zinc-300">{seasons.length}</p>
            </div>
            <div className="w-full">
              <h2 className="mb-2 font-montserrat text-lg font-semibold">
                Épisodes
              </h2>
              <p className="text-zinc-300">{episodeCount}</p>
            </div>
          </div>
        )}

        {movie.runtimeMinutes != null && (
          <div>
            <h2 className="mb-2 font-montserrat text-lg font-semibold">
              Durée
            </h2>
            <p className="text-zinc-300">{movie.runtimeMinutes} minutes</p>
          </div>
        )}

        {movie.tmdbVoteAverage != null && (
          <div>
            <h2 className="mb-2 font-montserrat text-lg font-semibold">
              Note TMDB
            </h2>
            <div className="flex items-center gap-2">
              <Star size={20} className="fill-current text-yellow-400" />
              <span className="text-zinc-400">
                <strong className="text-white">
                  {movie.tmdbVoteAverage.toFixed(1)}
                </strong>
                /10
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="w-full">
            <h2 className="mb-2 font-montserrat text-lg font-semibold ">
              Classification
            </h2>
            <div className="flex items-center gap-2">
              <span className="bg-red-600/70 text-white px-3 py-1 rounded-md font-bold uppercase">
                {movie.certificationFr === "TP"
                  ? "Tous publics"
                  : movie.certificationFr === "NR"
                    ? "Non classé"
                    : movie.certificationFr
                      ? `${movie.certificationFr} ans et plus`
                      : "Non renseigné"}
              </span>
            </div>
          </div>

          {directors.length > 0 && (
            <div className="w-full">
              <h2 className="mb-2 font-montserrat text-lg font-semibold">
                {directors.length > 1 ? "Réalisateurs" : "Réalisateur"}
              </h2>
              <p className="text-zinc-300">{directors.join(", ")}</p>
            </div>
          )}
        </div>
      </div>

      {movie.genres.length > 0 && (
        <div>
          <h2 className="mb-3 font-montserrat text-lg font-semibold">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="flex items-center gap-1 px-3 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors border border-gray-700 hover:border-gray-600"
              >
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
