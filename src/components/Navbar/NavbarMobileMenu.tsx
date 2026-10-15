import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, Menu, Search, Tv2, X } from "lucide-react";
import { NavLink } from "../../catalog/navigation";

const links = [
  { label: "Films", path: "/movies", icon: Clapperboard },
  { label: "Séries", path: "/tv-shows", icon: Tv2 },
  { label: "Rechercher", path: "/search", icon: Search },
];

export function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        className="flex size-9 cursor-pointer items-center justify-center text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-red-500"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-white/15 bg-zinc-950/95 p-1 shadow-2xl backdrop-blur-xl"
          >
            {links.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive ? "bg-red-600/15 text-white" : "text-zinc-300 hover:bg-white/10 hover:text-white"}`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
