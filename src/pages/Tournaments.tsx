import { useNavigate } from "react-router-dom";

const tournaments = [
  {
    id: 1,
    name: "Nepal Championship",
    status: "Upcoming",
    teams: "288 Slots",
    date: "Aug 20, 2026",
  },
  {
    id: 2,
    name: "Everest Clash",
    status: "Upcoming",
    teams: "144 Slots",
    date: "Aug 28, 2026",
  },
  {
    id: 3,
    name: "Summer Cup",
    status: "Ongoing",
    teams: "144 Slots",
    date: "Sep 05, 2026",
  },
  {
    id: 4,
    name: "Nepal Championship",
    status: "Completed",
    teams: "248 Slots",
    date: "Sep 05, 2026",
  },
];

const Tournament = () => {
  const navigate = useNavigate();

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

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <input
            type="text"
            placeholder="Search tournaments..."
            className="w-full rounded-lg border border-white/10 bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#E50914] md:max-w-sm"
          />

          <div className="flex flex-wrap gap-2">
            <button className="rounded-lg bg-[#E50914] px-4 py-2 text-sm font-semibold">
              All
            </button>

            <button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:border-[#E50914] hover:text-white">
              Upcoming
            </button>

            <button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:border-[#E50914] hover:text-white">
              Ongoing
            </button>

            <button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:border-[#E50914] hover:text-white">
              Completed
            </button>
          </div>

        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 transition hover:border-[#E50914]/50"
              >

                <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914]">
                  Free Fire
                </span>

                <h2 className="mt-4 text-xl font-bold">
                  {tournament.name}
                </h2>

                <div className="mt-5 space-y-2 text-sm text-gray-400">
                  <p>👥 {tournament.teams}</p>
                  <p>📅 {tournament.date}</p>
                  <p>🎮 Squad</p>
                </div>

                <p className="mt-4 text-sm font-semibold text-[#E50914]">
                  {tournament.status}
                </p>

                <button
                  onClick={() =>
                    navigate(`/tournaments/${tournament.id}`)
                  }
                  className="mt-6 w-full rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold transition hover:border-[#E50914] hover:text-[#E50914]"
                >
                  View Details
                </button>

              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
};

export default Tournament;