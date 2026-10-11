import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ListVideo } from "lucide-react";
import type { WatchSeriesNavigationProps } from "./WatchSeriesNavigation";

type Props = Pick<WatchSeriesNavigationProps,
  "seasonNumber" | "episodeNumber" | "loading" | "failed" | "seasons" | "episodes" | "openEpisode"
> & { buttonClassName: string };

export function WatchSeriesEpisodeMenu({
  seasonNumber, episodeNumber, loading, failed, seasons, episodes, openEpisode, buttonClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={container} className="relative">
      <button ref={trigger} type="button" aria-expanded={open} aria-controls={panelId}
        onClick={() => setOpen((value) => !value)} className={buttonClassName}>
        <ListVideo size={18} /> Épisodes
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id={panelId} aria-label="Navigation des saisons et épisodes"
          className="absolute right-0 top-full mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-white/15 bg-zinc-950/95 text-white shadow-2xl backdrop-blur-xl">
          <div className="border-b border-white/10 p-3">
            <label htmlFor={`${panelId}-season`} className="mb-2 block text-xs text-zinc-400">Saison actuelle</label>
            <select id={`${panelId}-season`} value={seasonNumber}
              disabled={loading || seasons.length === 0}
              onChange={(event) => openEpisode(1, Number(event.target.value))}
              className="w-full rounded-lg border border-white/15 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-red-500">
              {!seasons.some((item) => item.seasonNumber === seasonNumber) && <option value={seasonNumber}>Saison {seasonNumber}</option>}
              {seasons.map((item) => <option key={item.seasonNumber} value={item.seasonNumber}>
                {item.nameFr ?? item.nameEn ?? (item.seasonNumber === 0 ? "Épisodes spéciaux" : `Saison ${item.seasonNumber}`)}
              </option>)}
            </select>
          </div>
          <div className="max-h-[min(24rem,55dvh)] overflow-y-auto p-2">
            {loading ? <p role="status" className="p-3 text-sm text-zinc-400">Chargement des épisodes…</p>
              : failed ? <p role="alert" className="p-3 text-sm text-red-300">Impossible de charger les épisodes.</p>
              : episodes.length === 0 ? <p className="p-3 text-sm text-zinc-400">Aucun épisode renseigné.</p>
              : <ul className="space-y-1">{episodes.map((item) => (
                <li key={item.episodeNumber}>
                  <button type="button" aria-current={item.episodeNumber === episodeNumber ? "true" : undefined}
                    onClick={() => { openEpisode(item.episodeNumber); setOpen(false); trigger.current?.focus(); }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-red-500 ${item.episodeNumber === episodeNumber ? "bg-red-600/20 text-red-300" : "text-zinc-200 hover:bg-white/10"}`}>
                    <span className="block font-medium">Épisode {item.episodeNumber}</span>
                    {(item.titleFr ?? item.titleEn) && <span className="mt-0.5 block text-xs text-zinc-400">{item.titleFr ?? item.titleEn}</span>}
                    {!item.video?.videoId && <span className="mt-1 block text-xs text-zinc-500">Lien vidéo indisponible</span>}
                  </button>
                </li>
              ))}</ul>}
          </div>
        </div>
      )}
    </div>
  );
}
