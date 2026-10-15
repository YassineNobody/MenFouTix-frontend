import { GenreCarousel } from "../../components/Movie/carousel/GenreCarousel.tsx";
import { GenreCarouselSkeleton } from "../../components/Movie/carousel/GenreCarouselSkeleton.tsx";
import { GenresMoviesCarousel } from "../../components/Movie/carousel/GenresMoviesCarousel.tsx";
import { LatestMoviesCarousel } from "../../components/Movie/carousel/LatestMoviesCarousel.tsx";
import { LatestReleasesMoviesCarousel } from "../../components/Movie/carousel/LatestReleasesMoviesCarousel.tsx";
import { RecentReleasesCarousel } from "../../components/Movie/hero/RecentReleasesCarousel.tsx";
import { useGenres } from "../../hooks/useGenres.tsx";
import type { GenreResponse } from "../../interfaces/genre/genre.ts";
import { useNavigate } from "../../catalog/useCatalogNavigate";
export default function MoviesPage() {
  const navigate = useNavigate();
  const { data: genres, isLoading, isError } = useGenres("film");
  const handleClickGenre = (genre: GenreResponse) => {
    navigate(`/genre/movie/${genre.id}`);
  };
  return (
    <div className="relative min-h-screen bg-black pt-20">
      <RecentReleasesCarousel />
      {isLoading ? (
        <GenreCarouselSkeleton />
      ) : !isError && genres ? (
        <GenreCarousel genres={genres} onSelect={handleClickGenre} />
      ) : null}
      <LatestMoviesCarousel />
      <LatestReleasesMoviesCarousel />
      <GenresMoviesCarousel />
    </div>
  );
}
