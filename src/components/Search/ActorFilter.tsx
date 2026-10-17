import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { ContentType } from "../../interfaces/common";
import { useCatalogVersion } from "../../catalog/context";

interface Actor { id: number; name: string; profileUrl: string | null; }
interface Props { initialId: string; type?: "film" | "série"; }

export function ActorFilter({ initialId, type }: Props) {
  const catalog = useCatalogVersion();
  const [selectedId, setSelectedId] = useState(initialId);
  const [selectedName, setSelectedName] = useState("");
  const [input, setInput] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => { const timer = setTimeout(() => setDebounced(input.trim()), 350); return () => clearTimeout(timer); }, [input]);
  const selected = useQuery({
    queryKey: ["actor-selected", catalog, selectedId],
    queryFn: () => api.getAll<Actor>(ContentType.ACTORS, { id: Number(selectedId), limit: 1 }),
    enabled: Boolean(selectedId) && !selectedName,
  });
  const { data, isFetching, isError } = useQuery({
    queryKey: ["actor-options", catalog, type, debounced],
    queryFn: () => api.getAll<Actor>(ContentType.ACTORS, { q: debounced, type, limit: 10 }),
    enabled: debounced.length >= 2 && debounced === input.trim(),
    staleTime: 60_000,
  });
  return (
    <div className="text-sm text-zinc-400">
      <label htmlFor="actor-search">Acteur</label>
      <input type="hidden" name="actorId" value={selectedId} />
      {selectedId && <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-red-500/10 p-2 text-red-200">
        <span>{selectedName || selected.data?.items[0]?.name || `Acteur #${selectedId}`}</span>
        <button type="button" aria-label="Retirer le filtre acteur" onClick={() => { setSelectedId(""); setSelectedName(""); }}>✕</button>
      </div>}
      <input id="actor-search" type="search" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Rechercher un acteur…" autoComplete="off" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-red-500" />
      <div aria-live="polite">
        {input.trim().length >= 2 && isFetching && <p className="mt-2 text-xs">Recherche…</p>}
        {input.trim().length >= 2 && isError && <p className="mt-2 text-xs text-red-300">Impossible de charger les acteurs.</p>}
        {debounced === input.trim() && debounced.length >= 2 && data && !isFetching && (
          <ul className="mt-2 max-h-52 overflow-y-auto rounded-xl border border-white/10 bg-zinc-900">
            {data.items.length === 0 && <li className="p-3 text-xs">Aucun acteur trouvé dans ce catalogue.</li>}
            {data.items.map((actor) => <li key={actor.id}><button type="button" onClick={() => { setSelectedId(String(actor.id)); setSelectedName(actor.name); setInput(""); }} className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-white/10 focus-visible:bg-white/10">
              {actor.profileUrl && <img src={actor.profileUrl} alt="" className="h-9 w-7 rounded object-cover" />}{actor.name}
            </button></li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
