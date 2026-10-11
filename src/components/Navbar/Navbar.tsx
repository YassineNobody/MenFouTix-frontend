import { Link } from "react-router";
import { motion } from "framer-motion";
import { NavbarDesktop } from "./NavbarDestop";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarSearch } from "./NavbarSearch";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/90 via-black/70 to-transparent" />
      <div className="relative mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 md:gap-5 md:px-6 lg:gap-3 lg:px-8 xl:gap-5 2xl:max-w-[1600px] max-[360px]:gap-1 max-[360px]:px-2">
        {/* Logo et navigation desktop */}
        <div className="flex shrink-0 items-center gap-3 xl:gap-5">
          <Link to="/" className="group flex shrink-0 items-center gap-2 transition-transform duration-300 hover:scale-105">
            <h1
              className="
                            text-xl
                            font-black
                            tracking-tight
                            md:text-2xl
                        "
            >
              <span className="text-red-500">MenFou</span>
              <span className="text-white">Tix</span>
            </h1>
          </Link>
          <NavbarDesktop />
        </div>

        <div className="min-w-0 flex-1" />
        <div className="flex shrink-0 items-center gap-3 md:gap-5 lg:gap-3 xl:gap-5">
          <NavbarSearch />
          <NavbarMobileMenu />
        </div>
      </div>
    </motion.nav>
  );
};
