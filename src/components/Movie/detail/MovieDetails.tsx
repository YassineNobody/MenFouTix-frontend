import { Link } from "react-router";
import type { FilmDetailResponse } from "../../../interfaces/film/film";
import type { SeriesDetailResponse } from "../../../interfaces/series/series";

interface Props {
  movie: FilmDetailResponse | SeriesDetailResponse;
}

export const MovieDetails = ({ movie }: Props) => {
  const directors = movie.directors.filter(
    (person): person is string => typeof person === "string",
  );
  const companies = movie.productionCompanies.filter(
    (company): company is string => typeof company === "string",
  );

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
        <Detail label="Titre original" value={movie.originalTitle} />
        <Detail label="Date de sortie" value={formatDate(movie.releaseDate)} />
        <Detail
          label="Classification"
          value={formatCertification(movie.certificationFr)}
        />
        <Detail
          label="Durée"
          value={
            movie.runtimeMinutes != null
              ? `${movie.runtimeMinutes} min`
              : null
          }
        />
        <Detail label="Production" value={companies.join(", ")} />
        <Detail
          label="Note TMDB"
          value={
            movie.tmdbVoteAverage != null
              ? `${movie.tmdbVoteAverage.toFixed(1)}/10`
              : null
          }
        />
      </div>

      {directors.length > 0 && (
        <PeopleNames
          label={directors.length > 1 ? "Réalisateurs" : "Réalisateur"}
          names={directors}
        />
      )}

      {movie.actors.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Acteurs
          </h2>

          <div className="flex flex-wrap gap-2">
            {movie.actors.map((actor) => (
              <Link
                key={actor.id}
                to={`/catalog?actorId=${actor.id}`}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-zinc-300 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
              >
                {actor.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="text-sm text-zinc-200">{value || "Non renseigné"}</p>
    </div>
  );
}

function PeopleNames({
  label,
  names,
}: {
  label: string;
  names: string[];
}) {
  return (
    <div>
      <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </h2>
      <p className="text-sm text-zinc-200">{names.join(", ")}</p>
    </div>
  );
}

function formatDate(value: string | null): string | null {
  if (!value) return null;

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(date);
}

function formatCertification(value: string | null): string {
  if (!value) return "Non renseigné";
  if (value === "TP") return "Tous publics";
  if (value === "NR") return "Non classé";
  return `-${value} ans`;
}
