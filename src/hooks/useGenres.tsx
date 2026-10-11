import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../services/genre";

export function useGenres(typeWork: "film" | "série") {
  return useQuery({
    queryKey: ["genres", typeWork],
    queryFn: () => getGenres(typeWork),
    select: (response) => response.items,
    staleTime: 60 * 60 * 1000,
  });
}