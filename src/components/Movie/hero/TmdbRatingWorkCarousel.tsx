import { useQuery } from "@tanstack/react-query";
import { getRecommandationTmdbRating } from "../../../services/catalog";
import { HeroCarousel } from "./HeroCarousel";
import { HeroCarouselSkeleton } from "./HeroCarouselSkeleton";

export const TmdbRatingWorkCarousel = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["work", "tmdbRating"],
    queryFn: async () => getRecommandationTmdbRating(1, 7),
  });

  if (isLoading) return <HeroCarouselSkeleton />;
  if (isError || !data || data.items.length === 0) return null;

  return (
    <div className="px-6 lg:px-20">
      <HeroCarousel movies={data.items} />
    </div>
  );
};
