import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="flex items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors">
          <Search
            size={19}
            aria-hidden="true"
            className="ml-4 shrink-0 text-white/40"
          />

          <input
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Film ou série…"
            aria-label="Rechercher un film ou une série"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-4 pl-3 pr-5 text-base text-white placeholder:text-white/30 focus:outline-none md:text-lg"
          />
          <button
            type="submit"
            aria-label="Rechercher"
            className="group/icon flex self-stretch shrink-0 items-center border-l border-white/10 px-4 text-white/60 transition-colors hover:text-white"
          >
            <Search
              size={22}
              className="lucide lucide-search text-white opacity-60 group-hover/icon:opacity-100 transition-[color,opacity]"
            />
          </button>
        </div>
      </form>
    </div>
  );
};
