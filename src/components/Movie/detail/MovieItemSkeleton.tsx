export const MovieItemSkeleton = () => {
  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >
      {/* Title */}
      <div className="mb-6">
        <div
          className="
            h-7
            w-64
            max-w-[80%]
            animate-pulse
            rounded-md
            bg-zinc-800
          "
        />

        <div
          className="
            mt-2
            h-1
            w-20
            animate-pulse
            rounded-full
            bg-zinc-800
          "
        />
      </div>

      {/* Main content */}
      <div
        className="
          flex
          flex-col
          gap-8
          lg:flex-row
          lg:items-start
        "
      >
        {/* Poster */}
        <aside
          className="
            w-full
            shrink-0
            lg:w-106
          "
        >
          <div
            className="
              aspect-2/3
              w-full
              animate-pulse
              rounded-lg
              bg-zinc-900
            "
          />
        </aside>

        {/* Right */}
        <section className="min-w-0 flex-1">
          {/* Tabs */}
          <div
            className="
              mb-6
              flex
              gap-6
              border-b
              border-white/10
            "
          >
            <div className="relative pb-3">
              <div
                className="
                  h-4
                  w-20
                  animate-pulse
                  rounded
                  bg-zinc-800
                "
              />

              <div
                className="
                  absolute
                  inset-x-0
                  -bottom-px
                  h-0.5
                  rounded-full
                  bg-zinc-700
                "
              />
            </div>

            <div className="pb-3">
              <div
                className="
                  h-4
                  w-16
                  animate-pulse
                  rounded
                  bg-zinc-800
                "
              />
            </div>
          </div>

          {/* TMDB warning */}
          <div
            className="
              mt-8
              flex
              items-start
              gap-3
              rounded-md
              border
              border-zinc-800
              bg-zinc-900/30
              p-3
            "
          >
            <div
              className="
                h-5
                w-5
                shrink-0
                animate-pulse
                rounded
                bg-zinc-800
              "
            />

            <div className="flex-1 space-y-2">
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-11/12" />
              <SkeletonLine width="w-3/5" />
            </div>
          </div>

          {/* Synopsis */}
          <div className="mt-6">
            <SkeletonHeading />

            <div className="mt-3 space-y-2">
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-11/12" />
              <SkeletonLine width="w-3/4" />
            </div>
          </div>

          {/* Duration */}
          <div className="mt-6">
            <SkeletonHeading />

            <div
              className="
                mt-3
                h-4
                w-24
                animate-pulse
                rounded
                bg-zinc-800
              "
            />
          </div>

          {/* TMDB Rating */}
          <div className="mt-6">
            <SkeletonHeading />

            <div className="mt-3 flex items-center gap-2">
              <div
                className="
                  size-5
                  animate-pulse
                  rounded
                  bg-zinc-800
                "
              />

              <div
                className="
                  h-5
                  w-16
                  animate-pulse
                  rounded
                  bg-zinc-800
                "
              />
            </div>
          </div>

          {/* Classification + Director */}
          <div
            className="
              mt-6
              flex
              flex-col
              gap-6
              md:flex-row
              md:justify-between
            "
          >
            {/* Classification */}
            <div className="w-full md:w-1/2">
              <SkeletonHeading />

              <div
                className="
                  mt-4
                  h-9
                  w-32
                  animate-pulse
                  rounded-lg
                  bg-zinc-800
                "
              />
            </div>

            {/* Director */}
            <div className="w-full md:w-1/2">
              <SkeletonHeading />

              <div
                className="
                  mt-4
                  h-4
                  w-36
                  animate-pulse
                  rounded
                  bg-zinc-800
                "
              />
            </div>
          </div>

          {/* Genres */}
          <div className="mt-6">
            <SkeletonHeading />

            <div className="mt-4 flex flex-wrap gap-4">
              <SkeletonBadge width="w-20" />
              <SkeletonBadge width="w-24" />
              <SkeletonBadge width="w-16" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const SkeletonHeading = () => {
  return (
    <div
      className="
        h-6
        w-32
        animate-pulse
        rounded
        bg-zinc-800
      "
    />
  );
};

const SkeletonLine = ({ width }: { width: string }) => {
  return (
    <div
      className={`
        h-3
        ${width}
        animate-pulse
        rounded
        bg-zinc-800
      `}
    />
  );
};

const SkeletonBadge = ({ width }: { width: string }) => {
  return (
    <div
      className={`
        h-9
        ${width}
        animate-pulse
        rounded-lg
        bg-zinc-800
      `}
    />
  );
};
