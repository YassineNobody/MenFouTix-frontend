import { useQuery } from "@tanstack/react-query";

import { MovieCarousel } from "../Movie/carousel/MovieCarousel";
import { MovieCarouselSkeleton } from "../Movie/carousel/MovieCarouselSkeleton";
import { getLatestSeries } from "../../services/series";

export const LatestSeriesCarousel = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["series", "latest"],
    queryFn: () => getLatestSeries(1, 20),
  });

  if (isLoading) return <MovieCarouselSkeleton />;
  if (isError || !data || data.items.length === 0) return null;

  return <MovieCarousel title="Dernières séries ajoutées" movies={data.items} />;
};
