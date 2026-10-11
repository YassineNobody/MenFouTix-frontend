import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { WorkListItemResponse } from "../../../interfaces/work/work";
import { MovieCard } from "./MovieCard";

interface Props {
  title: string;
  movies: WorkListItemResponse[];
}

export const MovieCarousel = ({ title, movies }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      dragFree: true,
    },
    [WheelGesturesPlugin()],
  );
  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  return (
    <section className="py-6">
      {/* Header */}
      <div
        className="
                    mb-4
                    flex
                    items-center
                    justify-between
                    px-5
                    md:px-8
                "
      >
        <div className="group/title inline-block cursor-default">
          <h2
            className="
            font-cormorant
            text-xl
            uppercase
            font-semibold
            tracking-tight
            text-white
        "
          >
            {title}
          </h2>

          <span
            className="
                                mt-1
                                block
                                h-[3px]
                                w-8
                                rounded-full

                                bg-linear-to-r
                                from-red-600
                                via-red-500
                                to-red-800

                                transition-all
                                duration-300
                                ease-out

                                group-hover/title:w-5/6
                                group-hover/title:shadow-[0_0_8px_rgba(239,68,68,0.45)]
                            "
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="
                            flex size-9
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-full
                            border border-white/10
                            bg-zinc-900
                            text-zinc-400
                            transition
                            hover:border-white/20
                            hover:bg-zinc-800
                            hover:text-white
                        "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={scrollNext}
            className="
                            flex size-9
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-full
                            border border-white/10
                            bg-zinc-900
                            text-zinc-400
                            transition
                            hover:border-white/20
                            hover:bg-zinc-800
                            hover:text-white
                        "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={emblaRef}
        className="
        overflow-hidden
        cursor-grab
        active:cursor-grabbing
        touch-pan-y
    "
      >
        <div
          className="
                        flex
                        gap-4
                        px-5
                        md:px-8
                    "
        >
          {movies.map((movie) => (
            <div
              key={`${movie.type}-${movie.tmdbId}`}
              className="flex-none
                            "
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
