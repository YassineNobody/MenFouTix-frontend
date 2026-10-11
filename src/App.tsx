import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { LayoutRouter } from "./components/Layout/Layout";
import { ScrollToTop } from "./components/Layout/ScrollToTop";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import RequestPage from "./pages/RequestPage/RequestPage";
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

const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LayoutRouter />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="request" element={<RequestPage />} />
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
          <Route path="/watch/movie/:id" element={<WatchMoviePage />} />
          <Route
            path="/watch/tv/:id/s/:season/e/:episode"
            element={<WatchSeriePage />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
