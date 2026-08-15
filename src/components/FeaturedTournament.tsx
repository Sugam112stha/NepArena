import { useNavigate } from "react-router-dom";

const FeaturedTournaments = () => {
    const navigate = useNavigate();
  const tournaments = [
    {
      name: "Nepal Championship",
      teams: "288s Slot",
      date: "Aug 20, 2026",
    },
    {
      name: "Everest Clash",
      teams: "144 slot",
      date: "Aug 28, 2026",
    },
    {
      name: "Summer Cup",
      teams: "144 slot",
      date: "Aug 15, 2026",
    },
  ];

  return (
    <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
  <div className="mx-auto max-w-6xl">

    {/* Heading */}
    <div className="mb-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
        Tournaments
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        Ongoing Tournaments
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
        Find a tournament and compete with teams across Nepal.
      </p>
    </div>

    {/* Tournament Cards */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tournaments.map((tournament) => (
        <div
          key={tournament.name}
          className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 transition hover:border-[#E50914]/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914]">
            Free Fire
          </span>

          <h3 className="mt-4 text-xl font-bold">
            {tournament.name}
          </h3>

          <div className="mt-5 space-y-2 text-sm text-gray-400">
            <p>👥 {tournament.teams}</p>
            <p>📅 {tournament.date}</p>
            <p>🎮 Squad</p>
          </div>
        </div>
      ))}
    </div>

    {/* View More Button */}
    <div className="mt-8 flex justify-center">
      <button onClick={() => navigate("/Tournaments")}
      className="rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold transition hover:border-[#E50914] hover:text-[#E50914]">
        View More Tournaments
      </button>
    </div>

  </div>
</section>
  );
};

export default FeaturedTournaments;