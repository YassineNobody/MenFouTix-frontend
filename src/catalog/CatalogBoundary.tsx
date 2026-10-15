import { useState } from "react";
import { hashKey, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import type { CatalogVersion } from "./catalog";
import { CatalogContext } from "./context";

function CatalogSession({ version }: { version: CatalogVersion }) {
  // Un client/cache par catalogue, recréé lors du changement de version.
  const [client] = useState(() => new QueryClient({ defaultOptions: {
    queries: { queryKeyHashFn: (key) => hashKey([version, ...key]) },
  } }));
  return (
    <CatalogContext.Provider value={version}>
      <QueryClientProvider client={client}>
        <Outlet />
      </QueryClientProvider>
    </CatalogContext.Provider>
  );
}

export function CatalogBoundary() {
  const { catalog } = useParams();
  if (catalog !== "vf" && catalog !== "vo") return <NotFoundPage />;
  return <CatalogSession key={catalog} version={catalog} />;
}
