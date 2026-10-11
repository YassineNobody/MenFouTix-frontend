import { useQuery } from "@tanstack/react-query";
import { getRecentReleasesFilms } from "../../../services/films";
import { HeroCarousel } from "./HeroCarousel";
import { HeroCarouselSkeleton } from "./HeroCarouselSkeleton";

export const RecentReleasesCarousel = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "releaseDate"],
    queryFn: async () => getRecentReleasesFilms(1, 7),
  });

  if (isLoading) return <HeroCarouselSkeleton />;
  if (isError || !data || data.items.length === 0) return null;

  return (
    <div className="px-6 lg:px-20">
      <HeroCarousel movies={data.items} />
    </div>
  );
};
