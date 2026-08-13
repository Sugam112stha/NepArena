const LeaderboardPreview = () => {
  return (
    <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
            Rankings
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            National Leaderboard
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            See which teams are leading the Nepali esports scene.
          </p>
        </div>

      </div>
    </section>
  );
};

export default LeaderboardPreview;