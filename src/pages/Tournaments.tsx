import Footer from "../components/Footer";

const Tournament = () => {
   const tournaments = [
  {
    name: "Nepal Championship",
    status: "Upcoming",
    teams: "32 / 48 Teams",
    date: "Aug 20, 2026",
  },
  {
    name: "Everest Clash",
    status: "Upcoming",
    teams: "18 / 24 Teams",
    date: "Aug 28, 2026",
  },
  {
    name: "Summer Cup",
    status: "Ongoing",
    teams: "40 / 48 Teams",
    date: "Sep 05, 2026",
  },
];
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <section className="px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
            Tournaments
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Compete. Conquer. Become a Champion
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Discover upcoming esports tournaments, register your team,
            and compete against the best teams in Nepal.
          </p>

        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <input type="text" 
            placeholder="Search tournaments ....."
            className="w-full rounded-lg border border-white/10 bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#E50914] md:max-w-sm"/>
          
          <div className="flex flex-wrap gap-2">
            <button className="rounded-lg bg-[#E50914] px-4 py-2 text-sm font-semibold">
              All
            </button>
            <button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-[#E50914] hover:text-white">
              Upcoming
            </button>
            <button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-[#E50914] hover:text-white">
              Ongoing
            </button>
            <button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-[#E50914] hover:text-white">
              Completed
            </button>
          </div>
          </div>
        </div>
      </section>

      <section>
        <div>

          <div>
            {tournaments.map((tournament) =>
            <div key={tournament.name}>
              <span>
                Free Fire
              </span>

              <h2>
                {tournament.name}
              </h2>

              <div className="mt-5 space-y-2 text-sm text-gray-400">
                <p>👥 {tournament.teams}</p>
                <p>📅 {tournament.date}</p>
                <p>🎮 Squad</p>
              </div>

              <button className="mt-6 w-full rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold transition hover:border-[#E50914] hover:text-[#E50914]">
                View Details
              </button>

            </div>
            )}
          </div>

        </div>
      </section>
      <Footer />

    </main>
  );
};

export default Tournament;