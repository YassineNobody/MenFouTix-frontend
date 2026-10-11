import { useState } from "react";
import { Play } from "lucide-react";

interface Props {
  trailerUrl: string;
  backdropUrl: string;
  title: string;
}

function getYouTubeId(trailerUrl: string): string | null {
  try {
    const url = new URL(trailerUrl);
    const host = url.hostname.toLowerCase();

    let id: string | null = null;

    if (host === "youtu.be" || host === "www.youtu.be") {
      id = url.pathname.split("/")[1] ?? null;
    } else if (
      host === "youtube.com" ||
      host === "www.youtube.com" ||
      host === "m.youtube.com"
    ) {
      id = url.searchParams.get("v");
    }

    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export const MovieTrailer = ({ trailerUrl, backdropUrl, title }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeId(trailerUrl);

  if (!videoId) return null;

  return (
    <section className="mx-auto mt-12 w-full">
      <h2 className="mb-4 font-montserrat text-xl font-semibold text-white">
        Bande-annonce
      </h2>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-950">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Bande-annonce du film"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label="Lire la bande-annonce"
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <img
              src={backdropUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />

            <span className="absolute inset-0 flex items-center flex-col justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                <Play className="ml-1 h-7 w-7 fill-current sm:h-9 sm:w-9" />
              </span>
              <span className="flex flex-col gap-1 py-2">
                <p className="text-2xl font-bold text-white tracking-wider">
                  {title}
                </p>
                <p className="text-center text-gray-300">Cliquez sur le bouton pour lancer la bande annonce</p>
              </span>
            </span>
          </button>
        )}
      </div>
    </section>
  );
};
