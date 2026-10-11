import { useQuery } from "@tanstack/react-query";
import { MovieCarousel } from "../Movie/carousel/MovieCarousel";
import { MovieCarouselSkeleton } from "../Movie/carousel/MovieCarouselSkeleton";
import { getRecentReleasesSeries } from "../../services/series";

export function RecentSeriesCarousel() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["series", "releaseDate", 1, 20],
    queryFn: () => getRecentReleasesSeries(1, 20),
  });

  if (isLoading) return <MovieCarouselSkeleton />;
  if (isError || !data || data.items.length === 0) return null;

  return <MovieCarousel title="Séries aux sorties les plus récentes" movies={data.items} />;
}
