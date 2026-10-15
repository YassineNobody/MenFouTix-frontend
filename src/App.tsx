import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";
import CatalogChoicePage from "./pages/CatalogChoicePage";
import { CatalogBoundary } from "./catalog/CatalogBoundary";
import { LayoutRouter } from "./components/Layout/Layout";
import { ScrollToTop } from "./components/Layout/ScrollToTop";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MoviesPage from "./pages/MoviePage/MoviesPage";
import GenreMoviesPage from "./pages/MoviePage/GenreMoviesPage";
import SeriePage from "./pages/SeriePage/SeriePage";
import TvShowsPage from "./pages/SeriePage/TvShowsPage";
import GenreSeriesPage from "./components/Series/GenreSeriesPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import WatchMoviePage from "./pages/WatchPage/WatchMoviePage";
import WatchSeriePage from "./pages/WatchPage/WatchSeriePage";

function LegacyRedirect() {
  const location = useLocation();
  return <Navigate replace to={`/vf${location.pathname}${location.search}${location.hash}`} />;
}
export function CatalogRoutes() {
  return (
        <Routes>
          <Route path="/" element={<CatalogChoicePage />} />
          <Route path="/:catalog" element={<CatalogBoundary />}>
          <Route element={<LayoutRouter />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="movie/:id" element={<MoviePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="tv-shows" element={<TvShowsPage />} />
            <Route
              path="genre/movie/:idCategorieTmbd"
              element={<GenreMoviesPage />}
            />
            <Route path="tv/:id" element={<SeriePage />} />
            <Route
              path="genre/tv/:idCategorieTmbd"
              element={<GenreSeriesPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="watch/movie/:id" element={<WatchMoviePage />} />
          <Route
            path="watch/tv/:id/s/:season/e/:episode"
            element={<WatchSeriePage />}
          />
          </Route>
          {['movies', 'tv-shows', 'search', 'movie/:id', 'tv/:id', 'genre/movie/:idCategorieTmbd', 'genre/tv/:idCategorieTmbd', 'watch/movie/:id', 'watch/tv/:id/s/:season/e/:episode'].map(path => (
            <Route key={path} path={`/${path}`} element={<LegacyRedirect />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
  );
}

function App() {
  return <BrowserRouter><ScrollToTop /><CatalogRoutes /></BrowserRouter>;
}

export default App;
