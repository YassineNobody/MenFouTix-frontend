import { useQuery } from "@tanstack/react-query";
import { HeroCarousel } from "../Movie/hero/HeroCarousel";
import { HeroCarouselSkeleton } from "../Movie/hero/HeroCarouselSkeleton";
import { getRecentReleasesSeries } from "../../services/series";

export function RecentSeriesHero() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["series", "hero", "releaseDate"],
    queryFn: () => getRecentReleasesSeries(1, 7),
  });

  if (isLoading) return <HeroCarouselSkeleton />;
  if (isError || !data || data.items.length === 0) return null;

  return (
    <div className="px-6 lg:px-20">
      <HeroCarousel movies={data.items} />
    </div>
  );
}
