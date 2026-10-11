import { Outlet } from "react-router";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

export const LayoutRouter = () => {
  return (
    <div
      className="
                relative
                min-h-screen
                bg-black
                font-manrope
                text-white
                overflow-clip
                flex flex-col
            "
    >
      {/* Navbar */}
      <div className="fixed inset-x-0 top-0 z-[11000]">
        <Navbar />
      </div>

      {/* Pages */}
      <main className="min-h-screen flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};
