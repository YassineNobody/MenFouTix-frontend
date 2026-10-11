import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";

import type { QueryParams } from "../../../interfaces/common";

export interface GenreMovieFilterValues {
  sort: NonNullable<QueryParams["sort"]>;
  releaseYear?: number;
  minTmdbRating?: number;
}

export type GenreMovieView = "grid" | "list";
export type GenreMovieColumns = 4 | 5 | 6;

interface Props {
  open: boolean;
  onToggle: () => void;
  value: GenreMovieFilterValues;
  onApply: (filters: GenreMovieFilterValues) => void;
  columns: GenreMovieColumns;
  onColumnsChange: (columns: GenreMovieColumns) => void;
  view: GenreMovieView;
  onViewChange: (view: GenreMovieView) => void;
}

export function GenreMovieFiltersButton({
  open,
  onToggle,
  value,
}: Pick<Props, "open" | "onToggle" | "value">) {
  const activeCount = Number(value.sort !== "recentlyAdded") +
    Number(value.releaseYear != null) + Number(value.minTmdbRating != null);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="genre-movie-filters"
      className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors sm:h-11 sm:px-5 ${
        open
          ? "border-red-500 bg-red-600 text-white hover:bg-red-500"
          : "border-white/15 bg-zinc-950 text-zinc-200 hover:border-white/30 hover:bg-zinc-900"
      }`}
    >
      <SlidersHorizontal size={17} /> Filtres
      {activeCount > 0 && (
        <span className="flex size-5 items-center justify-center rounded-full bg-white/20 text-[10px]">
          {activeCount}
        </span>
      )}
    </button>
  );
}

function FilterPanel({
  value,
  onApply,
  columns,
  onColumnsChange,
  view,
  onViewChange,
}: Omit<Props, "open" | "onToggle">) {
  const [year, setYear] = useState(value.releaseYear?.toString() ?? "");
  const [rating, setRating] = useState(value.minTmdbRating?.toString() ?? "");

  const applyAdvanced = () => {
    const parsedYear = Number(year);
    const parsedRating = Number(rating);
    onApply({
      ...value,
      releaseYear: year && Number.isInteger(parsedYear) && parsedYear >= 1900 && parsedYear <= 2100
        ? parsedYear
        : undefined,
      minTmdbRating: rating && parsedRating > 0 && parsedRating <= 10
        ? parsedRating
        : undefined,
    });
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-[#101010] p-4 shadow-xl shadow-black/30 sm:p-5">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <label className="block min-w-0 text-xs font-bold uppercase tracking-wider text-zinc-500">
          Tri
          <select
            value={value.sort}
            onChange={(event) => onApply({ ...value, sort: event.target.value as GenreMovieFilterValues["sort"] })}
            className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-slate-700 px-3 text-sm font-semibold normal-case tracking-normal text-white outline-none focus:border-red-500"
          >
            <option value="recentlyAdded">Ajouts récents ↓</option>
            <option value="releaseDate">Date de sortie ↓</option>
            <option value="tmdbRating">Note TMDB ↓</option>
            <option value="title">Titre A–Z</option>
          </select>
        </label>

        <label className="block min-w-0 text-xs font-bold uppercase tracking-wider text-zinc-500">
          Affiches par rangée
          <select
            value={columns}
            onChange={(event) => onColumnsChange(Number(event.target.value) as GenreMovieColumns)}
            disabled={view === "list"}
            className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-slate-700 px-3 text-sm font-semibold normal-case tracking-normal text-white outline-none focus:border-red-500 disabled:opacity-50"
          >
            <option value={4}>4 par rangée</option>
            <option value={5}>5 par rangée</option>
            <option value={6}>6 par rangée</option>
          </select>
        </label>

        <div className="flex gap-2" role="group" aria-label="Mode d’affichage">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            aria-pressed={view === "grid"}
            className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors md:flex-none ${
              view === "grid"
                ? "border-red-600 bg-red-600 text-white"
                : "border-white/15 bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            <LayoutGrid size={16} /> Grille
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            aria-pressed={view === "list"}
            className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors md:flex-none ${
              view === "list"
                ? "border-red-600 bg-red-600 text-white"
                : "border-white/15 bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            <List size={17} /> Liste
          </button>
        </div>
      </div>

      <details className="mt-4 border-t border-white/10 pt-3 text-sm text-zinc-400">
        <summary className="w-fit cursor-pointer select-none hover:text-white">Plus de filtres</summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="block text-xs font-medium text-zinc-400">
            Année de sortie
            <input
              type="number"
              min="1900"
              max="2100"
              placeholder="Toutes les années"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="mt-2 h-10 w-full rounded-lg border border-white/15 bg-zinc-900 px-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
            />
          </label>
          <label className="block text-xs font-medium text-zinc-400">
            Note TMDB minimale
            <select
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              className="mt-2 h-10 w-full rounded-lg border border-white/15 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-red-500"
            >
              <option value="">Toutes les notes</option>
              <option value="5">5/10</option>
              <option value="6">6/10</option>
              <option value="7">7/10</option>
              <option value="8">8/10</option>
            </select>
          </label>
          <button
            type="button"
            onClick={applyAdvanced}
            className="h-10 rounded-lg bg-red-700 px-4 text-xs font-semibold text-white hover:bg-red-600"
          >
            Appliquer
          </button>
        </div>
      </details>
    </div>
  );
}

export function GenreMovieFiltersPanel({ open, subject = "films", ...props }: Omit<Props, "onToggle"> & { subject?: "films" | "séries" }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id="genre-movie-filters"
          role="region"
          aria-label={`Filtres des ${subject}`}
          initial={{ height: 0, opacity: 0, y: -8 }}
          animate={{ height: "auto", opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mb-7 overflow-hidden"
        >
          <FilterPanel {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
