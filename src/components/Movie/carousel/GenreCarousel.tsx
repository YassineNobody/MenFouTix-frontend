import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { GenreResponse } from "../../../interfaces/genre/genre";

export type GenreCardItem = GenreResponse;

interface Props {
  genres: GenreCardItem[];
  onSelect: (genre: GenreCardItem) => void;
  title?: string;
}

export const GenreCarousel = ({
  genres,
  onSelect,
  title = "Explorer par genre",
}: Props) => {
  const [viewportRef, emblaApi] = useEmblaCarousel(
    { align: "start", containScroll: "trimSnaps", dragFree: true },
    [WheelGesturesPlugin()],
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateControls = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(updateControls);
    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
    };
  }, [emblaApi, updateControls]);

  if (genres.length === 0) return null;

  return (
    <section aria-label={title} className="py-6">
      <div className="mb-4 flex items-center justify-between px-5 md:px-8">
        <div>
          <h2 className="font-cormorant text-xl font-semibold uppercase tracking-tight text-white">
            {title}
          </h2>
          <span className="mt-1 block h-[3px] w-8 rounded-full bg-red-600" />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Genres précédents"
            className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Genres suivants"
            className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={viewportRef} className="cursor-grab overflow-hidden active:cursor-grabbing">
        <div className="flex touch-pan-y gap-3 px-5 md:gap-4 md:px-8">
          {genres.map((genre) => (
            <button
              key={genre.id}
              type="button"
              onClick={() => onSelect(genre)}
              aria-label={`Voir le genre ${genre.name}`}
              className="group relative block h-[100px] w-[180px] flex-none select-none overflow-hidden rounded-xl border border-white/10 bg-zinc-900 text-center transition hover:border-white/30 focus-visible:outline-2 focus-visible:outline-red-500 md:h-[120px] md:w-[220px]"
            >
              {genre.backdropUrl && (
                <img
                  src={genre.backdropUrl}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <span className="absolute inset-0 bg-black/55 transition-colors group-hover:bg-black/40" />
              <span className="relative z-10 flex h-full items-center justify-center px-3 font-montserrat text-sm font-semibold text-white drop-shadow-md md:text-base">
                {genre.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
