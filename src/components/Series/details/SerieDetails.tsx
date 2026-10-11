import type { SeriesDetailResponse } from "../../../interfaces/series/series";
import { MovieTabs } from "../../Movie/detail/MovieTabs";
import { SerieItemBtnGroup } from "./SeriesItemBtnGroup";

interface Props {
  movie: SeriesDetailResponse
}

export const SerieItem = ({ movie }: Props) => {
  const title =
    movie.titleFr ?? movie.localTitle ?? movie.titleEn ?? "Sans titre";

  return (
    <main className="mx-auto w-full">
      <div className="mb-8">
        <h1 className="font-montserrat py-1 text-2xl font-bold uppercase tracking-wide text-zinc-300 transition-colors hover:text-red-400 md:text-3xl">
          {title}
          {movie.releaseYear != null && <> ({movie.releaseYear})</>}
        </h1>

        <span className="mt-2 block h-1 w-11 rounded-full bg-linear-to-r from-red-600 to-red-800/80" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="flex flex-col gap-4">
          <div className="w-full shrink-0 lg:w-106">
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={`Affiche de ${title}`}
                className="w-full rounded-lg object-contain"
              />
            ) : (
              <div className="flex aspect-2/3 items-center justify-center rounded-lg bg-zinc-900 text-sm text-zinc-500">
                Aucun poster
              </div>
            )}
          </div>
          <SerieItemBtnGroup serie={movie} />
        </aside>

        <MovieTabs movie={movie} />
      </div>
    </main>
  );
};
