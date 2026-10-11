import { useWatchSeries } from "../../hooks/useWatchSeries";
import { WatchSeriesControls } from "../../components/Series/watch/WatchSeriesControls";
import { WatchSeriesPlayer } from "../../components/Series/watch/WatchSeriesPlayer";

export default function WatchSeriePage() {
  const watch = useWatchSeries();

  return (
    <main className="fixed inset-0 h-dvh overflow-hidden bg-black text-white">
      <WatchSeriesControls {...watch} />
      <WatchSeriesPlayer {...watch} />
    </main>
  );
}
