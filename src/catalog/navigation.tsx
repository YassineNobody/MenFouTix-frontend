import { forwardRef } from "react";
import {
  Link as RouterLink, NavLink as RouterNavLink,
  type LinkProps, type NavLinkProps, type To,
} from "react-router";
import { useCatalogVersion } from "./context";
import { catalogPath } from "./catalog";

function scopedTo(version: "vf" | "vo", to: To): To {
  return typeof to === "string" ? catalogPath(version, to)
    : { ...to, pathname: to.pathname ? catalogPath(version, to.pathname) : to.pathname };
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function CatalogLink({ to, ...props }, ref) {
  const version = useCatalogVersion();
  return <RouterLink ref={ref} to={scopedTo(version, to)} {...props} />;
});
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function CatalogNavLink({ to, ...props }, ref) {
  const version = useCatalogVersion();
  return <RouterNavLink ref={ref} to={scopedTo(version, to)} {...props} />;
});
