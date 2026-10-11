export const GenreCarouselSkeleton = () => (
  <section className="py-6" role="status" aria-label="Chargement des genres">
    <div className="mb-4 flex items-center justify-between px-5 md:px-8">
      <div className="h-6 w-40 animate-pulse rounded-md bg-zinc-800" />
      <div className="flex gap-2">
        <div className="size-9 animate-pulse rounded-full bg-zinc-800" />
        <div className="size-9 animate-pulse rounded-full bg-zinc-800" />
      </div>
    </div>
    <div className="overflow-hidden">
      <div className="flex gap-3 px-5 md:gap-4 md:px-8">
        {Array.from({ length: 7 }, (_, index) => (
          <div
            key={index}
            className="h-[100px] w-[180px] flex-none animate-pulse rounded-xl border border-white/10 bg-zinc-800 md:h-[120px] md:w-[220px]"
          />
        ))}
      </div>
    </div>
    <span className="sr-only">Chargement des genres…</span>
  </section>
);
