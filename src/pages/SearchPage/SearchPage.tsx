import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { MovieGridCard } from "../../components/Movie/carousel/MovieGridCard";
import { Pagination } from "../../components/Pagination/Pagination";
import { SearchInput } from "../../components/Search/SearchInput";
import { searchInDatabase } from "../../services/search";
import { Film } from "lucide-react";
import { SearchFilters } from "../../components/Search/SearchFilters";
import { ContentType, type QueryParams } from "../../interfaces/common";
import type { WorkListItemResponse } from "../../interfaces/work/work";
import { api } from "../../services/api";

const PAGE_SIZE = 20;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim() ?? "";
  const [draft, setDraft] = useState<string | null>(null);
  const input = draft ?? query;

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestParams = useRef(searchParams);
  useEffect(() => { latestParams.current = searchParams; }, [searchParams]);

  const type = searchParams.get("type");
  const selectedType = type === "film" || type === "série" ? type : undefined;

  const requestedPage = Number(searchParams.get("page") ?? "1");
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  useEffect(
    () => () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    },
    [],
  );

  const updateInput = (value: string) => {
    setDraft(value);

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      const next = new URLSearchParams(latestParams.current);
      const trimmed = value.trim();

      if (trimmed) {
        next.set("q", trimmed);
      } else {
        next.delete("q");
      }

      next.delete("page");
      setSearchParams(next, { replace: true });
      setDraft(null);
    }, 450);
  };

  const filters: QueryParams = { type: selectedType, page, limit: PAGE_SIZE };
  for (const key of ["genreId", "actorId", "releaseYear", "releaseYearFrom", "releaseYearTo", "minTmdbRating", "minOurRating"] as const) {
    const raw = searchParams.get(key);
    const value = Number(raw);
    const isRating = key === "minTmdbRating" || key === "minOurRating";
    const min = key === "minTmdbRating" ? 0 : 1;
    const max = key === "minTmdbRating" ? 10 : key === "minOurRating" ? 5 : key.startsWith("releaseYear") ? 9999 : Number.MAX_SAFE_INTEGER;
    if (raw?.trim() && Number.isFinite(value) && value >= min && value <= max && (isRating || Number.isSafeInteger(value))) filters[key] = value;
  }
  const sort = searchParams.get("sort");
  if (sort && ["title", "releaseDate", "tmdbRating", "ourRating", "recentlyAdded"].includes(sort)) filters.sort = sort as QueryParams["sort"];
  const hasCriteria = Boolean(query || selectedType || filters.sort || Object.keys(filters).some((key) => !["type", "page", "limit"].includes(key)));

  const { data, isPending, isError } = useQuery({
    queryKey: ["search", query, filters],
    queryFn: () =>
      query ? searchInDatabase({ query, params: filters }) : api.getAll<WorkListItemResponse>(ContentType.CATALOG, filters),
    enabled: hasCriteria,
  });

  const changePage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="flex min-h-dvh flex-col bg-black px-4 pb-20 pt-28 text-white sm:px-6 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1700px] flex-1 flex-col gap-6 md:gap-8">
        {/* En-tête */}
        <div className="shrink-0">
          <h1 className="mb-4 px-4 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
            Rechercher des films et séries
          </h1>

          <p className="mx-auto mb-8 max-w-4xl text-center text-sm text-white/40">
            Si vous ne trouvez pas le film ou la série que vous cherchez,
            essayez avec des mots-clés différents ou vérifiez l’orthographe.
          </p>

          <SearchInput value={input} onChange={updateInput} />
        </div>

        <SearchFilters params={searchParams} onApply={(next) => setSearchParams(next)} />

        {/* Espace restant */}
        <div className="flex flex-1 flex-col">
          {!hasCriteria ? (
            <div className="flex flex-1 items-center flex-col justify-center p-6">
              <Film
                size={24}
                className="lucide lucide-film w-16 h-16 text-white opacity-10 mb-4"
              />
              <p className="text-white/40">Rechercher dans le catalogue</p>
              <p className="text-white/40 text-sm mt-2">Saisis un titre ou choisis des filtres.</p>
            </div>
          ) : isError ? (
            <div className="flex flex-1 items-center justify-center p-6">
              <p role="alert" className="text-center text-red-300">
                Impossible de charger les résultats pour le moment.
              </p>
            </div>
          ) : isPending ? (
            <div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
              aria-label="Chargement des résultats"
              aria-busy="true"
            >
              {Array.from({ length: 10 }, (_, index) => (
                <div
                  key={index}
                  className="aspect-2/3 animate-pulse rounded-xl bg-zinc-800"
                />
              ))}
            </div>
          ) : data ? (
            <>
              <p className="mb-5 text-sm text-zinc-400">
                {data.total} résultat{data.total > 1 ? "s" : ""}{query ? ` pour « ${query} »` : " selon vos critères"}
              </p>

              {data.items.length === 0 ? (
                <div className="flex flex-1 items-center justify-center p-6">
                  <p className="text-center text-zinc-400">
                    Aucun titre trouvé.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5 lg:gap-x-5">
                    {data.items.map((work) => (
                      <MovieGridCard
                        key={`${work.type}-${work.tmdbId}`}
                        movie={work}
                      />
                    ))}
                  </div>

                  <Pagination
                    page={page}
                    pages={data.pages}
                    onPageChange={changePage}
                  />
                </>
              )}
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
