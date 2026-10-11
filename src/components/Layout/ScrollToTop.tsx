import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { pathname, search } = useLocation();
  const page = new URLSearchParams(search).get("page") ?? "1";

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, page]);

  return null;
}
