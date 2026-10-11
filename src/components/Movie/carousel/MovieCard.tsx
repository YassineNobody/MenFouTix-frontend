import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router";

import type { WorkListItemResponse } from "../../../interfaces/work/work";

interface Props {
  movie: WorkListItemResponse;
  variant?: "carousel" | "grid";
}

export const MovieCard = ({ movie, variant = "carousel" }: Props) => {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);

  const title =
    movie.titleFr ?? movie.localTitle ?? movie.originalTitle ?? "Sans titre";

  const rating =
    movie.tmdbRating != null ? `${movie.tmdbRating.toFixed(1)}/10` : null;

  const handleClick = () => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    if (isTouchDevice && !revealed) {
      setRevealed(true);
      return;
    }

    if (movie.type === "film") {
      navigate(`/movie/${movie.tmdbId}`);
    } else if (movie.type === "série") {
      navigate(`/tv/${movie.tmdbId}`);
    } else {
      setRevealed((current) => !current);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      aria-label={`${title} — ${movie.type === "film" ? "film" : "série"}`}
      className={`group relative block aspect-2/3 cursor-pointer overflow-hidden bg-zinc-900 text-left transition-shadow hover:shadow-xl hover:shadow-black/50 ${
        variant === "grid"
          ? "w-full rounded-xl border border-white/10 hover:border-white/25"
          : "w-[144px] rounded-lg md:w-[192px]"
      }`}
    >
      {movie.posterUrl ? (
        <img
          src={movie.posterUrl}
          alt={`Affiche de ${title}`}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-3 text-center text-xs text-zinc-500">
          Aucune affiche
        </div>
      )}

      {/* Étiquette toujours visible */}
      <span className="pointer-events-none absolute left-2 top-2 z-10 rounded border border-white/20 bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
        {movie.type === "film" ? "Film" : "Série"}
      </span>

      {/* Informations visibles au survol ou après un appui mobile */}
      <div
        className={`
          pointer-events-none absolute inset-0 flex flex-col justify-end
          bg-linear-to-t from-black via-black/85 to-black/20 p-3
          transition-opacity duration-300
          group-hover:opacity-100 group-focus-visible:opacity-100
          ${revealed ? "opacity-100" : "opacity-0"}
        `}
      >
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
          {title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-zinc-300">
          {rating && (
            <span className="flex items-center gap-1">
              <Star size={11} className="fill-current text-yellow-400" />
              {rating}
            </span>
          )}

          {movie.releaseDate && (
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {movie.releaseDate.slice(0, 4)}
            </span>
          )}
        </div>

        {movie.synopsis && (
          <p className="mt-2 line-clamp-3 text-[10px] leading-relaxed text-zinc-300">
            {movie.synopsis}
          </p>
        )}
      </div>
    </motion.button>
  );
};
