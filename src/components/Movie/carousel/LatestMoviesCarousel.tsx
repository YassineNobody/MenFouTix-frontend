import { useQuery } from "@tanstack/react-query";

import { MovieCarousel } from "./MovieCarousel";
import { MovieCarouselSkeleton } from "./MovieCarouselSkeleton";
import { getLatestMovies } from "../../../services/films";

export const LatestMoviesCarousel = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "latest-added"],

    queryFn: () => getLatestMovies(1, 20),
  });

  if (isLoading) {
    return <MovieCarouselSkeleton />;
  }

  if (isError) {
    return null;
  }

  if (!data || data.items.length === 0) {
    return null;
  }

  return <MovieCarousel title="Derniers films ajoutés" movies={data.items} />;
};
