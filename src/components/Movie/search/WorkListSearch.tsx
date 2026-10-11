import type { WorkListItemResponse } from "../../../interfaces/work/work";
import { WorkItemSearch } from "./WorkItemSearch";

interface Props {
  items: WorkListItemResponse[];
  total: number;
  onSelect: (type: "film" | "série", tmdbId: number) => void;
  onMore: () => void;
}

export const WorkListSearch = ({ items, total, onSelect, onMore }: Props) => (

    <div className="py-2">
      <ul>
        {items.map((work) => (
          <WorkItemSearch
            key={`${work.type}-${work.tmdbId}`}
            work={work}
            onSelect={onSelect}
          />
        ))}
        <li className="mt-1 pt-1 border-t border-white/10">
          <button
            type="button"
            onClick={onMore}
            className="block w-full text-center py-2 text-sm text-gray-400 hover:text-white"
          >
            Voir tous les résultats ({total})
          </button>
        </li>
      </ul>
    </div>
);
