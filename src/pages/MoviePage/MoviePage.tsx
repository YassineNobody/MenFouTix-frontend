import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { MovieItem } from "../../components/Movie/detail/MovieItem";
import { MovieItemSkeleton } from "../../components/Movie/detail/MovieItemSkeleton";
import { getFilmByTmdbId } from "../../services/films";

export default function MoviePage() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getFilmByTmdbId(Number(id)),
    enabled: id !== undefined && Number.isInteger(Number(id)),
  });

  const backgroundImage = data?.backdropUrl;

  return (
    <div className="relative min-h-screen bg-black pt-20">
      {/* Image fixe : zoomée sur mobile, largeur complète sur desktop */}
      {backgroundImage && (
        <div
          className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat opacity-50 lg:bg-top lg:bg-size-[100%_auto]"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
        />
      )}

      {/* Dégradé pour garder le texte lisible */}
      {backgroundImage && (
        <div className="pointer-events-none fixed inset-0 bg-linear-to-b from-black/40 via-black/65 to-black" />
      )}

      {/* Contenu */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-6">
        {isLoading ? <MovieItemSkeleton /> : data && <MovieItem movie={data} />}
      </div>
    </div>
  );
}
