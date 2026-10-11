import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";

import type { FilmDetailResponse } from "../../../interfaces/film/film";
import { MovieOverview } from "./MovieOverview";
import { MovieDetails } from "./MovieDetails";
import type { SeriesDetailResponse } from "../../../interfaces/series/series";
import { SerieSeasonItems } from "./SerieSeasonItem";

interface Props {
  movie: FilmDetailResponse | SeriesDetailResponse;
}

type Tab = "overview" | "details";

export const MovieTabs = ({ movie }: Props) => {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <section className="min-w-0 flex-1">
      <div className="mb-6 flex gap-6 border-b border-white/10">
        <TabButton
          active={tab === "overview"}
          onClick={() => setTab("overview")}
        >
          Aperçu
        </TabButton>

        <TabButton active={tab === "details"} onClick={() => setTab("details")}>
          Détails
        </TabButton>
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {tab === "overview" ? (
          <MovieOverview movie={movie} />
        ) : (
          <MovieDetails movie={movie} />
        )}
      </motion.div>
      {movie.type == "série" && <SerieSeasonItems serie={movie} />}
    </section>
  );
};

interface TabButtonProps {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ children, active, onClick }: TabButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative cursor-pointer pb-3 text-sm font-medium transition-colors ${
      active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
    }`}
  >
    {children}

    {active && (
      <motion.span
        layoutId="movie-tab"
        className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-linear-to-r from-red-600 to-red-400"
      />
    )}
  </button>
);
