import type { WorkListItemResponse } from "../../../interfaces/work/work";
import { MovieCard } from "./MovieCard";

interface Props {
  movie: WorkListItemResponse;
}

export function MovieGridCard({ movie }: Props) {
  return <MovieCard movie={movie} variant="grid" />;
}
