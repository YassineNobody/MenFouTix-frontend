import { LatestMoviesCarousel } from "../../components/Movie/carousel/LatestMoviesCarousel";
import { TmdbRatingWorkCarousel } from "../../components/Movie/hero/TmdbRatingWorkCarousel";
import { LatestSeriesCarousel } from "../../components/Series/LatestSeriesCarousel";

export default function HomePage() {
  return (
    <div className="pt-20">
      <TmdbRatingWorkCarousel />
      <LatestMoviesCarousel />
      <LatestSeriesCarousel />
    </div>
  );
}
