import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "../catalog/useCatalogNavigate";
import { getSeasonEpisodes, getSerieByTmdbId } from "../services/series";
import { useSeriesWatchProgress } from "./useSeriesWatchProgress";
import { useCatalogVersion } from "../catalog/context";
import { selectMedia } from "../catalog/media";

export function useWatchSeries() {
  const version = useCatalogVersion();
  const { id, season, episode } = useParams();
  const navigate = useNavigate();
  const tmdbId = Number(id);
  const { saveEpisode } = useSeriesWatchProgress(tmdbId);
  const seasonNumber = Number(season);
  const episodeNumber = Number(episode);
  const valid =
    Number.isSafeInteger(tmdbId) &&
    tmdbId > 0 &&
    season !== undefined &&
    Number.isSafeInteger(seasonNumber) &&
    seasonNumber >= 0 &&
    episode !== undefined &&
    Number.isSafeInteger(episodeNumber) &&
    episodeNumber > 0;

  const seriesQuery = useQuery({
    queryKey: ["serie", id],
    queryFn: () => getSerieByTmdbId(tmdbId),
    enabled: valid,
  });
  const episodesQuery = useQuery({
    queryKey: ["seasonEpisodes", tmdbId, seasonNumber],
    queryFn: () => getSeasonEpisodes(tmdbId, seasonNumber),
    enabled: valid,
  });

  const seasons = [...(seriesQuery.data?.seasons ?? [])].sort(
    (a, b) => a.seasonNumber - b.seasonNumber,
  );
  const episodes = [...(episodesQuery.data?.episodes ?? [])].sort(
    (a, b) => a.episodeNumber - b.episodeNumber,
  );
  const index = episodes.findIndex(
    (item) => item.episodeNumber === episodeNumber,
  );
  const current = episodes[index];
  // Les épisodes spéciaux (saison 0) restent séparés des saisons normales.
  const regularSeasons = seasons.filter((item) => item.seasonNumber > 0);
  const seasonIndex = regularSeasons.findIndex((item) => item.seasonNumber === seasonNumber);
  const previousSeason = seasonIndex > 0 ? regularSeasons[seasonIndex - 1] : undefined;
  const nextSeason = seasonIndex >= 0 ? regularSeasons[seasonIndex + 1] : undefined;

  const previousSeasonQuery = useQuery({
    queryKey: ["seasonEpisodes", tmdbId, previousSeason?.seasonNumber],
    queryFn: () => getSeasonEpisodes(tmdbId, previousSeason!.seasonNumber),
    enabled: valid && index === 0 && previousSeason !== undefined,
  });
  const nextSeasonQuery = useQuery({
    queryKey: ["seasonEpisodes", tmdbId, nextSeason?.seasonNumber],
    queryFn: () => getSeasonEpisodes(tmdbId, nextSeason!.seasonNumber),
    enabled: valid && index >= 0 && index === episodes.length - 1 && nextSeason !== undefined,
  });

  const previousSeasonEpisodes = [...(previousSeasonQuery.data?.episodes ?? [])]
    .sort((a, b) => a.episodeNumber - b.episodeNumber);
  const nextSeasonEpisodes = [...(nextSeasonQuery.data?.episodes ?? [])]
    .sort((a, b) => a.episodeNumber - b.episodeNumber);
  const lastPrevious = previousSeasonEpisodes.at(-1);
  const firstNext = nextSeasonEpisodes[0];
  const previous = index > 0
    ? { seasonNumber, episodeNumber: episodes[index - 1].episodeNumber }
    : index === 0 && previousSeason && lastPrevious
      ? { seasonNumber: previousSeason.seasonNumber, episodeNumber: lastPrevious.episodeNumber }
      : undefined;
  const next = index >= 0 && episodes[index + 1]
    ? { seasonNumber, episodeNumber: episodes[index + 1].episodeNumber }
    : index >= 0 && nextSeason && firstNext
      ? { seasonNumber: nextSeason.seasonNumber, episodeNumber: firstNext.episodeNumber }
      : undefined;
  const videoId = selectMedia(current?.videos ?? [], version)?.videoId;
  const loading = valid && (seriesQuery.isPending || episodesQuery.isPending);
  const failed = seriesQuery.isError || episodesQuery.isError;
  const title =
    seriesQuery.data?.titleFr ?? seriesQuery.data?.localTitle ?? "Série";
  useEffect(() => {
    if (valid && !loading && !failed && videoId)
      saveEpisode(seasonNumber, episodeNumber);
  }, [
    valid,
    loading,
    failed,
    videoId,
    seasonNumber,
    episodeNumber,
    saveEpisode,
  ]);

  const openEpisode = (number: number, selectedSeason = seasonNumber) => {
    navigate(`/watch/tv/${tmdbId}/s/${selectedSeason}/e/${number}`);
  };


  return { id, seasonNumber, episodeNumber, valid, seasons, episodes, current,
    previous, next, videoId, loading, failed, title, openEpisode };
}
