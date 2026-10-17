import { useEffect, useRef, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { useLocation } from "react-router";
import { useNavigate } from "../../catalog/useCatalogNavigate";
import { WorkListSearch } from "../Movie/search/WorkListSearch";
import { searchInDatabase } from "../../services/search";

function SearchSuggestions({
  query,
  loading,
  error,
  items,
  total,
  onSelect,
  onMore,
}: {
  query: string;
  loading: boolean;
  error: boolean;
  items: Awaited<ReturnType<typeof searchInDatabase>>["items"];
  total: number;
  onSelect: (type: "film" | "série", tmdbId: number) => void;
  onMore: () => void;
}) {
  if (!query.trim()) return null;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/15 bg-zinc-950 shadow-2xl">
      {loading ? (
        <p className="px-4 py-5 text-sm text-zinc-400">Recherche en cours…</p>
      ) : error ? (
        <p className="px-4 py-5 text-sm text-red-300">
          Impossible de charger les résultats.
        </p>
      ) : items.length === 0 ? (
        <p className="px-4 py-5 text-sm text-zinc-400">Aucun titre trouvé.</p>
      ) : (
        <WorkListSearch
          items={items}
          total={total}
          onSelect={onSelect}
          onMore={onMore}
        />
      )}
    </div>
  );
}

export function NavbarSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [draft, setDraft] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const query =
    draft ??
    (location.pathname.endsWith("/search")
      ? (new URLSearchParams(location.search).get("q") ?? "")
      : "");
  const trimmedQuery = query.trim();
  const { data, isPending, isError } = useQuery({
    queryKey: ["navbar-search", debouncedQuery],
    queryFn: () =>
      searchInDatabase({ query: debouncedQuery, params: { limit: 5 } }),
    enabled: debouncedQuery.length > 0,
    staleTime: 60_000,
  });

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (
        desktopRef.current &&
        !desktopRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(
    () => () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    },
    [],
  );

  const updateQuery = (value: string) => {
    setDraft(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    const trimmed = value.trim();
    if (!trimmed) {
      setDebouncedQuery("");
      return;
    }
    searchTimer.current = setTimeout(() => {
      setDebouncedQuery(trimmed);
    }, 450);
  };

  const openResults = () => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    setFocused(false);
    setOpen(false);
    navigate(
      trimmedQuery
        ? `/search?q=${encodeURIComponent(trimmedQuery)}`
        : "/search",
    );
    setDraft(null);
  };

  const selectWork = (type: "film" | "série", tmdbId: number) => {
    setFocused(false);
    setOpen(false);
    setDraft(null);
    navigate(`/${type === "film" ? "movie" : "tv"}/${tmdbId}`);
  };

  useEffect(() => {
    if (!open) return;
    mobileInputRef.current?.focus();
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openResults();
  };

  return (
    <>
      <div
        ref={desktopRef}
        className="relative hidden w-[14rem] md:block lg:w-[15rem] xl:w-[20rem] 2xl:w-[22rem]"
      >
        <form
          onSubmit={submit}
          role="search"
          className="relative"
        >
          <label htmlFor="navbar-search-desktop" className="sr-only">
            Rechercher un film ou une série
          </label>
          <input
            id="navbar-search-desktop"
            type="text"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            onFocus={() => {
              setFocused(true);
              if (trimmedQuery && trimmedQuery !== debouncedQuery)
                updateQuery(query);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setFocused(false);
            }}
            placeholder="Rechercher un film, une série…"
            autoComplete="off"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 transition-all focus:border-red-500/50 focus:bg-white/10 focus:ring-1 focus:ring-red-500/30 focus:outline-none"
          />
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </form>
        {focused && trimmedQuery && (
          <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-72">
            <SearchSuggestions
              query={trimmedQuery}
              loading={trimmedQuery !== debouncedQuery || isPending}
              error={isError}
              items={trimmedQuery === debouncedQuery ? (data?.items ?? []) : []}
              total={data?.total ?? 0}
              onSelect={selectWork}
              onMore={openResults}
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setOpen(true);
          if (trimmedQuery && trimmedQuery !== debouncedQuery)
            updateQuery(query);
        }}
        aria-label="Ouvrir la recherche"
        className="flex size-9 cursor-pointer items-center justify-center text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-red-500 md:hidden"
      >
        <Search size={21} />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[11002] bg-transparent md:hidden"
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Rechercher un film ou une série"
              className="fixed inset-x-0 top-0 bg-[#080808] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-20 after:bg-linear-to-b after:from-[#080808] after:to-transparent"
            >
              <div className="max-h-[100dvh] overflow-y-auto px-4 pt-4 pb-4">
              <div className="flex items-center gap-3">
                <form
                  onSubmit={submit}
                  role="search"
                  className="relative flex-1"
                >
                  <label htmlFor="navbar-search-mobile" className="sr-only">
                    Rechercher un film ou une série
                  </label>
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    id="navbar-search-mobile"
                    ref={mobileInputRef}
                    type="search"
                    value={query}
                    onChange={(event) => updateQuery(event.target.value)}
                    placeholder="Rechercher un film ou une série…"
                    autoComplete="off"
                    className="w-full rounded-xl border border-white/15 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none"
                  />
                </form>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer la recherche"
                  className="cursor-pointer p-2 text-gray-400 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="mt-3">
                <SearchSuggestions
                  query={trimmedQuery}
                  loading={trimmedQuery !== debouncedQuery || isPending}
                  error={isError}
                  items={
                    trimmedQuery === debouncedQuery ? (data?.items ?? []) : []
                  }
                  total={data?.total ?? 0}
                  onSelect={selectWork}
                  onMore={openResults}
                />
              </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
