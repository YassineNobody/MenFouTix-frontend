export function SeasonEpisodeListSkeleton() {
  return (
    <div className="space-y-4" aria-label="Chargement des épisodes">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="flex gap-4 rounded-xl border border-white/10 bg-zinc-950/70 p-3"
        >
          <div className="aspect-video w-28 shrink-0 animate-pulse rounded-lg bg-zinc-800 sm:w-40" />
          <div className="min-w-0 flex-1 space-y-3 py-1">
            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
