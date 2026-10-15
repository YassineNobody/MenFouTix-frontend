import { ArrowLeft, Home } from "lucide-react";
import { Link } from "../../catalog/navigation";
import { useNavigate } from "../../catalog/useCatalogNavigate";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-28 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-red-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-lg text-center">
        <p className="font-manrope text-8xl font-extrabold tracking-tighter text-red-500 sm:text-9xl">
          404
        </p>

        <h1 className="mt-6 font-manrope text-2xl font-bold sm:text-3xl">
          Cette page est hors champ.
        </h1>

        <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base">
          La page que tu recherches n’existe pas ou a été déplacée. Retrouvons
          quelque chose à regarder.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
          >
            <ArrowLeft size={18} />
            Retour
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
          >
            <Home size={18} />
            Accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
