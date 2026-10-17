// Contrat client vérifié sans connexion au backend ni à YouTube.
import assert from "node:assert/strict";
import { createServer } from "vite";
import axios from "axios";

const calls = [];
const originalAdapter = axios.defaults.adapter;
const originalWindow = globalThis.window;
axios.defaults.adapter = async config => {
  calls.push(config);
  return { data: { items: [], page: 1, limit: 20, total: 0, pages: 0 },
    status: 200, statusText: "OK", headers: {}, config };
};
globalThis.window = { location: { pathname: "/vf/movies" } };
const server = await createServer({
  server: { middlewareMode: true, watch: null, hmr: false }, appType: "custom",
});
try {
  const { api } = await server.ssrLoadModule("/src/services/api.ts");
  const { selectMedia } = await server.ssrLoadModule("/src/catalog/media.ts");
  const { catalogPath } = await server.ssrLoadModule("/src/catalog/catalog.ts");
  for (const catalog of ["vf", "vo"]) {
    window.location.pathname = `/${catalog}/movies`;
    const version = catalog.toUpperCase();
    for (const endpoint of ["films", "series", "genres", "search", "catalog"]) {
      await api.getAll(endpoint, { q: "John", page: 2, genreId: 28 });
      const request = calls.at(-1);
      assert.equal(request.url, `/api/${endpoint}`);
      assert.deepEqual(request.params, { q: "John", page: 2, genreId: 28, version });
    }
    for (const endpoint of ["films", "series"]) {
      await api.getOne(endpoint, 123);
      assert.equal(calls.at(-1).url, `/api/${endpoint}/123`);
      assert.equal(calls.at(-1).params.version, version);
    }
    await api.getSeasonEpisodes(123, 2);
    assert.equal(calls.at(-1).url, "/api/series/123/seasons/2/episodes");
    assert.equal(calls.at(-1).params.version, version);
    assert.equal(catalogPath(catalog, "/watch/movie/123"), `/${catalog}/watch/movie/123`);
  }
  await api.getAll("films", { version: "VF,VO" });
  assert.equal(calls.at(-1).params.version, "VF,VO");

  const videos = [{ videoId: "french", version: "VF" }, { videoId: "original", version: "VO" }];
  assert.equal(selectMedia(videos, "vf").videoId, "french");
  assert.equal(selectMedia(videos, "vo").videoId, "original");
  assert.equal(selectMedia([videos[0]], "vo"), undefined);
  assert.equal(selectMedia([], "vf"), undefined);
  assert.equal(selectMedia([{ playlistId: "vo-playlist", version: "VO" }], "vo").playlistId, "vo-playlist");
  console.log(`OK : ${calls.length} appels interceptés, routes conservées, sélection vidéo/playlist VF/VO validée. Aucun appel réseau.`);
} finally {
  await server.close();
  axios.defaults.adapter = originalAdapter;
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
}
