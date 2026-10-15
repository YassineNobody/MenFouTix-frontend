import { Clapperboard, Search, Tv2 } from "lucide-react";
import { NavLink } from "../../catalog/navigation";

const links = [
  {
    label: "Films",
    path: "/movies",
    icon: Clapperboard,
  },
  {
    label: "Séries",
    path: "/tv-shows",
    icon: Tv2,
  },
  {
    label: "Rechercher",
    path: "/search",
    icon: Search,
  },
];

export const NavbarDesktop = () => {
  return (
    <div
      className="hidden items-center gap-1 lg:flex"
      aria-label="Navigation principale"
    >
      {links.map((link) => (
        <NavLink
          key={link.label}
          to={link.path}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm transition-colors duration-200 hover:bg-white/5 hover:text-white xl:px-3 ${isActive ? "text-white bg-white/10 font-medium" : "text-gray-400"}`
          }
        >
          <link.icon size={16} className="hidden shrink-0 xl:block" />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </div>
  );
};
