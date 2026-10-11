export function SerieSeasonItemsSkeleton() {
  return (
    <section className="mb-8 mt-10" aria-label="Chargement des saisons">
      <div className="mb-4 h-6 w-24 animate-pulse rounded bg-zinc-800" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="aspect-2/3 animate-pulse rounded-lg border border-white/10 bg-zinc-900"
          />
        ))}
      </div>
    </section>
  );
}
