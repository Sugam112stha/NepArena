import { useState } from "react";
import Footer from "../components/Footer";

const teams = [
  { rank: 1, name: "Team Nepal", points: 1210, wins: 131 },
  { rank: 2, name: "Team Phonix", points: 1206, wins: 129 },
  { rank: 3, name: "Team Hawk", points: 1201, wins: 134 },
  { rank: 4, name: "Team Lava", points: 1189, wins: 122 },
];

const Leaderboard = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* Header */}
      <section className="px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
            Leaderboard
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            NepArena Ranking
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            See the top Free Fire teams competing across Nepal.
          </p>

        </div>
      </section>

      {/* Leaderboard */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0D0D0D]">

            {/* Table Header */}
            <div className="grid grid-cols-4 border-b border-white/10 px-5 py-5 text-sm font-semibold text-gray-400 sm:px-6">
              <span>Rank</span>
              <span>Team</span>
              <span>Points</span>
              <span>Wins</span>
            </div>

            {/* Teams */}
            {teams.slice(0, showMore ? teams.length : 10).map((team) => (
                <div
                  key={team.rank}
                  className="grid grid-cols-4 border-b border-white/10 px-5 py-5 transition hover:bg-white/[0.02] sm:px-6">
                  <span className="font-semibold">
                    {team.rank}
                  </span>

                  <span className="font-semibold">
                    {team.name}
                  </span>

                  <span className="text-gray-300">
                    {team.points}
                  </span>

                  <span className="text-gray-300">
                    {team.wins}
                  </span>
                </div>
              ))}

          </div>

          {teams.length > 10 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold transition hover:border-[#E50914] hover:text-[#E50914]"
              >
                {showMore ? "Show Less" : "See More"}
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />

    </main>
  );
};

export default Leaderboard;