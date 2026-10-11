import { Star } from "lucide-react";
import type { WorkListItemResponse } from "../../../interfaces/work/work";

export const WorkItemSearch = ({
  work,
  onSelect,
}: {
  work: WorkListItemResponse;
  onSelect: (type: "film" | "série", tmdbId: number) => void;
}) => {
  const title =
    work.titleFr ?? work.localTitle ?? work.originalTitle ?? "Sans titre";

  return (
    <li className="px-2">
      <button
        type="button"
        onClick={() => onSelect(work.type, work.tmdbId)}
        className="w-full flex items-center py-2 px-3 hover:bg-white/5 rounded-lg transition-colors"
      >
        <div className="shrink-0 w-10 h-15 rounded overflow-hidden mr-3">
          {work.posterUrl && (
            <img
              src={work.posterUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="text-left flex-1 min-w-0">
          <span className="font-medium text-white text-sm line-clamp-1">
            {title}
          </span>

          <span className="text-xs text-gray-400 flex items-center">
            <span className="capitalize">
              {work.type === "film" ? "Film" : "Série"}
            </span>
            <span className="mx-1.5">•</span>

            {work.tmdbRating != null && (
              <span className="flex items-center">
                <Star
                  className="lucide lucide-star text-yellow-500 mr-0.5"
                  size={12}
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                />
                {work.tmdbRating.toFixed(1)}/10
              </span>
            )}
            <span className="mx-1.5">•</span>
            {work.releaseDate && <span>{work.releaseDate.slice(0, 4)}</span>}
          </span>
        </div>
      </button>
    </li>
  );
};
