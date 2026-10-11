import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { CalendarDays, Info, Pause, Play, Star } from "lucide-react";
import { Link } from "react-router";

import type { WorkListItemResponse } from "../../../interfaces/work/work";
import "./HeroCarousel.css";

const SLIDE_DELAY = 5000;
const MAX_SLIDES = 7;

interface Props {
  movies: WorkListItemResponse[];
}

export const HeroCarousel = ({ movies }: Props) => {
  const slides = movies
    .slice(0, MAX_SLIDES);
  const isSeries = slides[0]?.type === "série";

  const [autoplay] = useState(() =>
    Autoplay({
      delay: SLIDE_DELAY,
      playOnInit: false,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const [viewportRef, emblaApi] = useEmblaCarousel(
    { loop: slides.length > 1, align: "start" },
    [autoplay],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressCycle, setProgressCycle] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setProgressCycle((cycle) => cycle + 1);
    };

    const onPlay = () => {
      setIsPlaying(true);
      setProgressCycle((cycle) => cycle + 1);
    };

    const onStop = () => setIsPlaying(false);

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("autoplay:play", onPlay);
    emblaApi.on("autoplay:stop", onStop);

    if (
      slides.length > 1 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      autoplay.play();
    }

    return () => {
      autoplay.stop();
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("autoplay:play", onPlay);
      emblaApi.off("autoplay:stop", onStop);
    };
  }, [autoplay, emblaApi, slides.length]);

  if (slides.length === 0) return null;

  const selectSlide = (index: number) => {
    emblaApi?.scrollTo(index);

    if (autoplay.isPlaying()) {
      autoplay.reset();
      setProgressCycle((cycle) => cycle + 1);
    }
  };

  const toggleAutoplay = () => {
    if (autoplay.isPlaying()) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  };

  return (
    <section
      aria-label={isSeries ? "Séries à la une" : "Films à la une"}
      aria-roledescription="carrousel"
      className="relative mx-auto w-full"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
        <div ref={viewportRef} className="overflow-hidden">
          <div className="flex touch-pan-y" aria-live="off">
            {slides.map((movie, index) => {
              const title =
                movie.titleFr ??
                movie.localTitle ??
                movie.originalTitle ??
                "Sans titre";

              const image = movie.backdropUrl ?? movie.posterUrl;

              const rating =
                movie.tmdbRating != null
                  ? `${movie.tmdbRating.toFixed(1)}/10`
                  : null;

              return (
                <article
                  key={movie.tmdbId}
                  className="relative h-[450px] min-w-0 flex-[0_0_100%]"
                  aria-roledescription="diapositive"
                  aria-label={`${index + 1} sur ${slides.length} : ${title}`}
                >
                  {image && (
                    <img
                      src={image}
                      alt=""
                      loading={index === 0 ? "eager" : "lazy"}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/65 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/55 lg:to-black/10" />

                  <div className="relative z-10 flex h-full max-w-3xl flex-col justify-end px-5 pb-20 text-white sm:px-8 lg:px-12">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 font-semibold uppercase tracking-wide backdrop-blur-sm">
                        {movie.type === "série" ? "Série" : "Film"}
                      </span>

                      {movie.releaseDate && (
                        <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1">
                          <CalendarDays size={13} />
                          {movie.releaseDate.slice(0, 4)}
                        </span>
                      )}

                      {rating && (
                        <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-amber-300">
                          <Star size={13} fill="currentColor" />
                          {rating}
                        </span>
                      )}
                    </div>

                    <HeroTitle title={title} logoUrl={movie.logoUrl} />

                    {movie.synopsis && (
                      <p className="mt-2 line-clamp-2 max-w-2xl text-xs leading-relaxed text-zinc-200 sm:text-sm">
                        {movie.synopsis}
                      </p>
                    )}

                    <Link
                      to={`/${movie.type === "série" ? "tv" : "movie"}/${movie.tmdbId}`}
                      tabIndex={index === selectedIndex ? 0 : -1}
                      className="mt-3 inline-flex w-fit items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <Info size={16} />
                      Plus d’informations
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-20 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-black/70 px-4 py-2.5 backdrop-blur-md">
            <div
              className="flex items-center gap-1.5"
              aria-label={isSeries ? "Choisir une série" : "Choisir un film"}
            >
              {slides.map((movie, index) => (
                <button
                  key={movie.tmdbId}
                  type="button"
                  onClick={() => selectSlide(index)}
                  aria-label={`Afficher ${isSeries ? "la série" : "le film"} ${index + 1}`}
                  aria-current={index === selectedIndex ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${
                    index === selectedIndex
                      ? "w-7 bg-white"
                      : "w-2 bg-white/45 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <span className="h-5 w-px bg-white/25" aria-hidden="true" />

            <div
              className="h-1 w-16 overflow-hidden rounded-full bg-white/20 sm:w-24"
              aria-hidden="true"
            >
              <div
                key={progressCycle}
                className="hero-carousel-progress h-full rounded-full bg-red-500"
                style={{
                  animationDuration: `${SLIDE_DELAY}ms`,
                  animationPlayState: isPlaying ? "running" : "paused",
                }}
              />
            </div>

            <button
              type="button"
              onClick={toggleAutoplay}
              aria-label={
                isPlaying
                  ? "Mettre le carrousel en pause"
                  : "Reprendre le carrousel"
              }
              className="rounded-full p-1 text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

function HeroTitle({
  title,
  logoUrl,
}: {
  title: string;
  logoUrl: string | null;
}) {
  const [logoFailed, setLogoFailed] = useState(false);

  if (logoUrl && !logoFailed) {
    return (
      <h2>
        <img
          src={logoUrl}
          alt={title}
          onError={() => setLogoFailed(true)}
          className="max-h-20 max-w-[min(75vw,26rem)] object-contain object-left drop-shadow-lg sm:max-h-24"
        />
      </h2>
    );
  }

  return (
    <h2 className="font-montserrat text-2xl font-bold leading-tight drop-shadow-lg sm:text-4xl">
      {title}
    </h2>
  );
}
