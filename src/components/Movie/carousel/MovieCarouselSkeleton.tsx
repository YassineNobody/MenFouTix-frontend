const MovieCardSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Poster */}
            <div
                className="
                    aspect-[2/3]
                    w-full
                    rounded-xl
                    bg-zinc-800
                "
            />

            {/* Titre */}
            <div
                className="
                    mt-3
                    h-4
                    w-3/4
                    rounded-md
                    bg-zinc-800
                "
            />

            {/* Année / genre */}
            <div
                className="
                    mt-2
                    h-3
                    w-1/2
                    rounded-md
                    bg-zinc-800/70
                "
            />
        </div>
    );
};


export const MovieCarouselSkeleton = () => {
    return (
        <section className="py-6">

            {/* Header */}
            <div
                className="
                    mb-4
                    flex
                    items-center
                    justify-between
                    px-5
                    md:px-8
                "
            >
                {/* Faux titre */}
                <div
                    className="
                        h-6
                        w-44
                        animate-pulse
                        rounded-md
                        bg-zinc-800
                    "
                />

                {/* Fausses flèches */}
                <div className="flex gap-2">
                    <div
                        className="
                            size-9
                            animate-pulse
                            rounded-full
                            bg-zinc-800
                        "
                    />

                    <div
                        className="
                            size-9
                            animate-pulse
                            rounded-full
                            bg-zinc-800
                        "
                    />
                </div>
            </div>

            {/* Cartes */}
            <div className="overflow-hidden">
                <div
                    className="
                        flex
                        gap-4
                        px-5
                        md:px-8
                    "
                >
                    {Array.from({ length: 8 }).map(
                        (_, index) => (
                            <div
                                key={index}
                                className="
                                    min-w-0
                                    flex-[0_0_42%]
                                    sm:flex-[0_0_28%]
                                    md:flex-[0_0_21%]
                                    lg:flex-[0_0_16%]
                                    xl:flex-[0_0_13%]
                                "
                            >
                                <MovieCardSkeleton />
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};