import { createContext, useContext } from "react";
import type { CatalogVersion } from "./catalog";

export const CatalogContext = createContext<CatalogVersion>("vf");
export function useCatalogVersion() { return useContext(CatalogContext); }
