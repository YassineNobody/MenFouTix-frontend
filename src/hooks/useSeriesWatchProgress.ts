import { useCallback, useSyncExternalStore } from "react";

const EVENT = "series-watch-progress";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

export function useSeriesWatchProgress(tmdbId: number) {
  const key = `moviefun:series-progress:${tmdbId}`;
  const snapshot = useSyncExternalStore(subscribe, () => {
    try { return localStorage.getItem(key); } catch { return null; }
  }, () => null);

  let seasonNumber = 1;
  let episodeNumber = 1;
  try {
    const value = snapshot ? JSON.parse(snapshot) : null;
    if (value && Number.isSafeInteger(value.seasonNumber) && value.seasonNumber >= 0
      && Number.isSafeInteger(value.episodeNumber) && value.episodeNumber > 0) {
      seasonNumber = value.seasonNumber;
      episodeNumber = value.episodeNumber;
    }
  } catch { /* Un stockage invalide revient à S01E01. */ }

  const saveEpisode = useCallback((season: number, episode: number) => {
    if (!Number.isSafeInteger(tmdbId) || tmdbId <= 0
      || !Number.isSafeInteger(season) || season < 0
      || !Number.isSafeInteger(episode) || episode < 1) return;
    try {
      const previous = localStorage.getItem(key);
      if (previous) {
        const value = JSON.parse(previous);
        if (value.seasonNumber === season && value.episodeNumber === episode) return;
      }
    } catch { /* Remplacer une entrée invalide si possible. */ }
    try {
      localStorage.setItem(key, JSON.stringify({ seasonNumber: season, episodeNumber: episode }));
      window.dispatchEvent(new Event(EVENT));
    } catch { /* La lecture reste possible si le stockage est désactivé. */ }
  }, [key, tmdbId]);

  return { seasonNumber, episodeNumber, saveEpisode };
}
