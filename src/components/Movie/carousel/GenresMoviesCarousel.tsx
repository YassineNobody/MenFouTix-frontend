import { useQuery } from "@tanstack/react-query";

import { useGenres } from "../../../hooks/useGenres";
import type { GenreResponse } from "../../../interfaces/genre/genre";
import { getMoviesByGenre } from "../../../services/films";
import { MovieCarousel } from "./MovieCarousel";
import { MovieCarouselSkeleton } from "./MovieCarouselSkeleton";

const GENRE_NAMES = [
  "Action",
  "Aventure",
  "Fantastique",
  "Drame",
  "Comédie",
  "Crime",
  "Science-Fiction",
  "Animation",
] as const;

const FILMS_PER_GENRE = 10;

function normalizeGenre(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function GenreMoviesRow({ genre }: { genre: GenreResponse }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "genre", genre.id, FILMS_PER_GENRE],
    queryFn: () => getMoviesByGenre(genre.id, FILMS_PER_GENRE),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <MovieCarouselSkeleton />;
  if (isError || !data || data.items.length === 0) return null;

  return <MovieCarousel title={genre.name} movies={data.items} />;
}

export const GenresMoviesCarousel = () => {
  const { data: genres, isLoading, isError } = useGenres("film");

  if (isLoading) {
    return (
      <>
        <MovieCarouselSkeleton />
        <MovieCarouselSkeleton />
      </>
    );
  }

  if (isError || !genres) return null;

  const genresByName = new Map(
    genres.map((genre) => [normalizeGenre(genre.name), genre]),
  );

  const selectedGenres = GENRE_NAMES
    .map((name) => genresByName.get(normalizeGenre(name)))
    .filter((genre): genre is GenreResponse => genre !== undefined);

  return (
    <>
      {selectedGenres.map((genre) => (
        <GenreMoviesRow key={genre.id} genre={genre} />
      ))}
    </>
  );
};
