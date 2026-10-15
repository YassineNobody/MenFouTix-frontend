import { useCallback } from "react";
import { useNavigate as useRouterNavigate, type NavigateOptions, type To } from "react-router";
import { useCatalogVersion } from "./context";
import { catalogPath } from "./catalog";

export function useNavigate() {
  const navigate = useRouterNavigate();
  const version = useCatalogVersion();
  return useCallback((to: To | number, options?: NavigateOptions) => {
    if (typeof to === "number") return navigate(to);
    const destination = typeof to === "string" ? catalogPath(version, to)
      : { ...to, pathname: to.pathname ? catalogPath(version, to.pathname) : to.pathname };
    return navigate(destination, options);
  }, [navigate, version]);
}
