import { useQuery } from "@tanstack/react-query";

import { MovieCarousel } from "./MovieCarousel";
import { MovieCarouselSkeleton } from "./MovieCarouselSkeleton";
import { getRecentReleasesFilms } from "../../../services/films";

export const LatestReleasesMoviesCarousel = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "latest-movies"],

    queryFn: () => getRecentReleasesFilms(1, 20),
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
return <MovieCarousel title="Dernières sorties" movies={data.items} />;
};
