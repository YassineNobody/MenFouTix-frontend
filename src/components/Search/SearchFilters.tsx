import { useState } from "react";
import type { FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { getGenres } from "../../services/genre";
import { useCatalogVersion } from "../../catalog/context";
import { ActorFilter } from "./ActorFilter";

interface Props {
  params: URLSearchParams;
  onApply: (values: URLSearchParams) => void;
}

const fields = ["type", "genreId", "actorId", "releaseYear", "releaseYearFrom", "releaseYearTo", "minTmdbRating", "minOurRating", "sort"];
const control = "mt-2 h-11 w-full rounded-xl border border-white/15 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-red-500";

export function SearchFilters({ params, onApply }: Props) {
  const [open, setOpen] = useState(false);
  const activeCount = fields.filter((field) => params.has(field)).length;
  return (
    <div>
      <button type="button" aria-expanded={open} aria-controls="search-filters" onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
        <SlidersHorizontal size={17} /> Filtres {activeCount > 0 && `(${activeCount})`}
      </button>
      {open && <FilterForm key={params.toString()} params={params} onApply={onApply} />}
    </div>
  );
}

function FilterForm({ params, onApply }: Props) {
  const catalog = useCatalogVersion();
  const initialType = params.get("type");
  const [type, setType] = useState<"film" | "série" | "">(initialType === "film" || initialType === "série" ? initialType : "");
  const { data: genres, isPending, isError } = useQuery({
    queryKey: ["search-genres", catalog, type],
    queryFn: () => getGenres(type || undefined),
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const from = String(values.get("releaseYearFrom") ?? "");
    const to = String(values.get("releaseYearTo") ?? "");
    const end = form.elements.namedItem("releaseYearTo") as HTMLInputElement;
    end.setCustomValidity(from && to && Number(from) > Number(to) ? "L’année de fin doit être supérieure ou égale à l’année de début." : "");
    if (!form.reportValidity()) return;
    const next = new URLSearchParams(params);
    for (const field of fields) {
      const value = String(values.get(field) ?? "").trim();
      if (value) next.set(field, value);
      else next.delete(field);
    }
    next.delete("page");
    onApply(next);
  }

  return (
    <form id="search-filters" onSubmit={submit} className="mt-4 rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm text-zinc-400">Type d’œuvre
          <select name="type" value={type} onChange={(event) => setType(event.target.value as typeof type)} className={control}>
            <option value="">Films et séries</option><option value="film">Films</option><option value="série">Séries</option>
          </select>
        </label>
        <label className="text-sm text-zinc-400">Genre
          <select key={type} name="genreId" defaultValue={type === (initialType ?? "") ? params.get("genreId") ?? "" : ""} className={control}>
            <option value="">Tous les genres</option>
            {params.get("genreId") && !genres?.items.some((genre) => String(genre.id) === params.get("genreId")) && <option value={params.get("genreId")!}>Genre #{params.get("genreId")}</option>}
            {genres?.items.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
          </select>
          {isPending && <span className="text-xs">Chargement des genres…</span>}
          {isError && <span role="alert" className="text-xs text-red-300">Genres indisponibles pour le moment.</span>}
        </label>
        <label className="text-sm text-zinc-400">Trier par
          <select name="sort" defaultValue={params.get("sort") ?? ""} className={control}>
            <option value="">Titre A–Z (par défaut)</option><option value="title">Titre A–Z</option><option value="recentlyAdded">Derniers ajouts</option><option value="releaseDate">Dernières sorties</option><option value="tmdbRating">Meilleures notes TMDB</option><option value="ourRating">Nos meilleures notes</option>
          </select>
        </label>
        <ActorFilter initialId={params.get("actorId") ?? ""} type={type || undefined} />
        {([['minTmdbRating', 'Note TMDB minimale /10', 0, 10], ['minOurRating', 'Notre note minimale /5', 1, 5]] as const).map(([name, label, min, max]) => (
          <label key={name} className="text-sm text-zinc-400">{label}
            <input name={name} type="number" min={min} max={max} step="any" defaultValue={params.get(name) ?? ""} placeholder="Toutes les notes" className={control} />
          </label>
        ))}
        {([['releaseYear', 'Année exacte'], ['releaseYearFrom', 'À partir de l’année'], ['releaseYearTo', 'Jusqu’à l’année']] as const).map(([name, label]) => (
          <label key={name} className="text-sm text-zinc-400">{label}
            <input name={name} type="number" min="1" max="9999" step="1" defaultValue={params.get(name) ?? ""} onChange={(event) => { event.currentTarget.form?.querySelector<HTMLInputElement>('[name="releaseYearTo"]')?.setCustomValidity(""); }} placeholder="Toutes les années" className={control} />
          </label>
        ))}
      </div>
      <p className="mt-4 text-xs text-zinc-500">Les critères se combinent. Une année exacte doit aussi appartenir à la période choisie.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold hover:bg-red-500">Appliquer</button>
        <button type="button" onClick={() => { const next = new URLSearchParams(params); fields.forEach((field) => next.delete(field)); next.delete("page"); onApply(next); }} className="rounded-xl border border-white/15 px-5 py-2.5 text-sm text-zinc-300 hover:bg-white/5">Réinitialiser les filtres</button>
      </div>
    </form>
  );
}
