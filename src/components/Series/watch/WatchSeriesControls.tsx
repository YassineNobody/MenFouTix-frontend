import { ArrowLeft } from "lucide-react";
import { Link } from "../../../catalog/navigation";
import {
  WatchSeriesNavigation,
  type WatchSeriesNavigationProps,
} from "./WatchSeriesNavigation";

type Props = WatchSeriesNavigationProps & { id: string | undefined };

export function WatchSeriesControls({ id, ...navigation }: Props) {
  return (
    <header>
      <Link
        to={`/tv/${id}`}
        className="fixed top-6 left-4 sm:left-8 z-[9999] flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 hover:bg-black/90 text-white shadow-lg transition-all duration-200"
      >
        <ArrowLeft size={16} /> Retour
      </Link>
      <div className="fixed top-6 right-4 sm:right-8 z-[10000] flex w-[calc(100%-2rem)] max-w-sm flex-col items-end gap-2 pt-12 sm:w-auto sm:max-w-lg sm:pt-0">
        <WatchSeriesNavigation {...navigation} />
      </div>
    </header>
  );
}
