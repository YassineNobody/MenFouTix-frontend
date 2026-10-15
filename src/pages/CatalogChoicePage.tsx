import { ArrowUpRight, Clapperboard, Globe2, Languages } from "lucide-react";
import { Link } from "react-router";

export default function CatalogChoicePage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black px-5 py-16 font-manrope text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[650px] -translate-x-1/2 rounded-full bg-red-700/10 blur-[120px]" />
      <div className="relative w-full max-w-4xl">
        <div className="mb-12 text-center">
          <Clapperboard className="mx-auto mb-6 text-red-500" size={32} />
          <p className="mb-4 text-sm font-extrabold tracking-[0.25em]"><span className="text-red-500">MENFOU</span>TIX</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">À chacun sa version.</h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-zinc-400">Choisis ton catalogue et retrouve tes films et séries.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {([
            { version: "vf", title: "Version française", badge: "VF", text: "Films et séries en français.", icon: Languages },
            { version: "vo", title: "Version originale", badge: "VO", text: "Les voix originales. Sous-titres selon les options disponibles sur YouTube.", icon: Globe2 },
          ] as const).map(({ version, title, badge, text, icon: Icon }) => (
            <Link key={version} to={`/${version}`} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-red-500/50 hover:bg-red-500/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 sm:p-9">
              <div className="mb-10 flex items-center justify-between"><Icon size={28} className="text-red-400" /><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold tracking-widest text-zinc-300">{badge}</span></div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">{text}</p>
              <span className="mt-7 flex items-center gap-2 text-sm font-semibold text-red-400">Explorer le catalogue <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-zinc-600">Tu peux changer de catalogue à tout moment depuis la navigation.</p>
      </div>
    </main>
  );
}
