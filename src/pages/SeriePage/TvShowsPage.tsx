import { useNavigate } from "react-router";
import { GenreCarousel } from "../../components/Movie/carousel/GenreCarousel";
import { GenreCarouselSkeleton } from "../../components/Movie/carousel/GenreCarouselSkeleton";
import { GenresSeriesCarousel } from "../../components/Series/GenresSeriesCarousel";
import { LatestSeriesCarousel } from "../../components/Series/LatestSeriesCarousel";
import { RecentSeriesCarousel } from "../../components/Series/RecentSeriesCarousel";
import { RecentSeriesHero } from "../../components/Series/RecentSeriesHero";
import { useGenres } from "../../hooks/useGenres";

export default function TvShowsPage() {
  const navigate = useNavigate();
  const { data: genres, isLoading, isError } = useGenres("série");

  return (
    <main className="relative min-h-screen bg-black pt-20">
      <RecentSeriesHero />
      {isLoading ? (
        <GenreCarouselSkeleton />
      ) : !isError && genres ? (
        <GenreCarousel
          genres={genres}
          onSelect={(genre) => navigate(`/genre/tv/${genre.id}`)}
        />
      ) : null}
      <LatestSeriesCarousel />
      <RecentSeriesCarousel />
      <GenresSeriesCarousel />
    </main>
  );
}
