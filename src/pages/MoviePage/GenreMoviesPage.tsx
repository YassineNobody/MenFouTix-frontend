import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useParams, useSearchParams } from "react-router";
import { Link } from "../../catalog/navigation";

import { MovieGridCard } from "../../components/Movie/carousel/MovieGridCard";
import { MovieListCard } from "../../components/Movie/carousel/MovieListCard";
import {
  GenreMovieFiltersButton,
  GenreMovieFiltersPanel,
  type GenreMovieColumns,
  type GenreMovieFilterValues,
  type GenreMovieView,
} from "../../components/Movie/filters/GenreMovieFilters";
import { Pagination } from "../../components/Pagination/Pagination";
import { useGenres } from "../../hooks/useGenres";
import { getMoviesByGenre } from "../../services/films";
import { getSeriesByGenre } from "../../services/series";

const PAGE_SIZE = 18;
const SORT_OPTIONS = [
  "recentlyAdded",
  "releaseDate",
  "tmdbRating",
  "title",
] as const;

export default function GenreMoviesPage({
  contentType = "movie",
}: {
  contentType?: "movie" | "tv";
}) {
  const isSeries = contentType === "tv";
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { idCategorieTmbd } = useParams();
  const genreId = Number(idCategorieTmbd);
  const validId = Number.isSafeInteger(genreId) && genreId > 0;
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  const requestedSort = searchParams.get("sort");
  const sort =
    SORT_OPTIONS.find((option) => option === requestedSort) ?? "recentlyAdded";
  const requestedYear = Number(searchParams.get("year"));
  const releaseYear =
    Number.isInteger(requestedYear) &&
    requestedYear >= 1900 &&
    requestedYear <= 2100
      ? requestedYear
      : undefined;
  const requestedRating = Number(searchParams.get("rating"));
  const minTmdbRating =
    requestedRating > 0 && requestedRating <= 10 ? requestedRating : undefined;
  const requestedColumns = Number(searchParams.get("columns"));
  const columns: GenreMovieColumns =
    requestedColumns === 4 || requestedColumns === 5 ? requestedColumns : 6;
  const view: GenreMovieView =
    searchParams.get("view") === "list" ? "list" : "grid";
  const {
    data: genres,
    isLoading: genresLoading,
    isError: genresError,
  } = useGenres(isSeries ? "série" : "film");
  const genre = genres?.find((item) => item.id === genreId);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      contentType,
      "genre",
      genreId,
      "page",
      page,
      sort,
      releaseYear,
      minTmdbRating,
    ],
    queryFn: () =>
      (isSeries ? getSeriesByGenre : getMoviesByGenre)(genreId, PAGE_SIZE, page, {
        sort,
        releaseYear,
        minTmdbRating,
      }),
    enabled: validId && !!genre,
  });

  useEffect(() => {
    if (data && data.pages > 0 && page > data.pages) {
      const next = new URLSearchParams(searchParams);
      next.set("page", String(data.pages));
      setSearchParams(next, { replace: true });
    }
  }, [data, page, searchParams, setSearchParams]);

  const changePage = (nextPage: number) => {
    if (nextPage === page) return;
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyFilters = (filters: GenreMovieFilterValues) => {
    const next = new URLSearchParams(searchParams);
    next.delete("page");
    next.delete("sort");
    next.delete("year");
    next.delete("rating");
    if (filters.sort !== "recentlyAdded") next.set("sort", filters.sort);
    if (filters.releaseYear != null)
      next.set("year", String(filters.releaseYear));
    if (filters.minTmdbRating != null)
      next.set("rating", String(filters.minTmdbRating));
    setSearchParams(next);
  };

  const changeColumns = (nextColumns: GenreMovieColumns) => {
    const next = new URLSearchParams(searchParams);
    if (nextColumns === 6) next.delete("columns");
    else next.set("columns", String(nextColumns));
    setSearchParams(next);
  };

  const changeView = (nextView: GenreMovieView) => {
    const next = new URLSearchParams(searchParams);
    if (nextView === "grid") next.delete("view");
    else next.set("view", nextView);
    setSearchParams(next);
  };

  const gridColumnsClass =
    columns === 4
      ? "lg:grid-cols-4"
      : columns === 5
        ? "lg:grid-cols-5"
        : "lg:grid-cols-6";

  const works = data?.items ?? [];


  return (
    <div className="relative min-h-screen overflow-hidden pt-20 lg:px-16 bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_50%_0%,rgba(95,15,15,0.16),transparent_65%)]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <main className="relative mx-auto max-w-[1700px] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4 sm:mb-9">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Link
              to={isSeries ? "/tv-shows" : "/movies"}
              aria-label={isSeries ? "Retour aux séries" : "Retour aux films"}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-zinc-950 text-zinc-300 transition hover:border-white/35 hover:text-white sm:size-11"
            >
              <ArrowLeft size={19} />
            </Link>
            <h1 className="truncate font-manrope text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl lg:text-4xl">
              {genre?.name ?? (isSeries ? "Séries par genre" : "Films par genre")}
            </h1>
            <span className="shrink-0 rounded-full border border-white/15 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-400 sm:text-sm">
              {isSeries ? "Séries" : "Films"}
            </span>
          </div>

          <GenreMovieFiltersButton
            open={filtersOpen}
            onToggle={() => setFiltersOpen((current) => !current)}
            value={{ sort, releaseYear, minTmdbRating }}
          />
        </header>

        <GenreMovieFiltersPanel
          subject={isSeries ? "séries" : "films"}
          open={filtersOpen}
          value={{ sort, releaseYear, minTmdbRating }}
          onApply={applyFilters}
          columns={columns}
          onColumnsChange={changeColumns}
          view={view}
          onViewChange={changeView}
        />

        {!validId || (!genresLoading && !genresError && !genre) ? (
          <p className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
            Ce genre est introuvable.
          </p>
        ) : genresError || isError ? (
          <p className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
            Impossible de charger les {isSeries ? "séries" : "films"} de ce genre pour le moment.
          </p>
        ) : (
          <>
            {view === "grid" ? (
              <div
                className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-5 ${gridColumnsClass}`}
              >
                {works.map((movie) => (
                  <MovieGridCard key={movie.tmdbId} movie={movie} />
                ))}
                {(genresLoading || isLoading) &&
                  Array.from({ length: 12 }, (_, index) => (
                    <div
                      key={index}
                      className="animate-pulse"
                      aria-hidden="true"
                    >
                      <div className="aspect-2/3 w-full rounded-xl bg-zinc-800" />
                      <div className="mt-3 h-4 w-4/5 rounded bg-zinc-800" />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-3">
                {works.map((movie) => (
                  <MovieListCard key={movie.tmdbId} movie={movie} />
                ))}
                {(genresLoading || isLoading) &&
                  Array.from({ length: 8 }, (_, index) => (
                    <div
                      key={index}
                      className="h-36 animate-pulse rounded-xl bg-zinc-800"
                      aria-hidden="true"
                    />
                  ))}
              </div>
            )}

            {data && works.length === 0 && (
              <p className="py-16 text-center text-zinc-400">
                Aucune {isSeries ? "série" : "œuvre"} dans ce genre pour le moment.
              </p>
            )}

            {data && (
              <Pagination
                page={page}
                pages={data.pages}
                onPageChange={changePage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
