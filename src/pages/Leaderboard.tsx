import Footer from "../components/Footer"

const Leaderboard = () => {
  const teams = [
    {
      rank: 1,
      name: "Team Nepal",
      points: 1210,
      wins: 131,
    },
    {
      rank: 2,
      name: "Team Phonix",
      points: 1206,
      wins: 129,
    },
    {
      rank: 3,
      name: "Team Hawk",
      points: 1201,
      wins: 134,
    },
    {
      rank: 4,
      name: "Team Lava",
      points: 1189,
      wins: 122,
    },
    {
      rank: 5,
      name: "Team Salt",
      points: 1182,
      wins: 122,
    },
  ]
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <p className="text-sm uppercase font-semibold tracking-[0.25em] text-[#E50914]">
            LeaderBoard
          </p>
          
          <h1 className="font-bold text-3xl mt-3 sm:text-4xl lg:text-5xl">
            NepArena Ranking
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            See the top Free Fire teams competing across Nepal.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[600px] text-left">
            <thead className="border-b border-white/10 bg-[#0D0D0D]">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-400">
                  Rank
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-400">
                  Team
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-400">
                  Points
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-400">
                  Wins
                </th>
              </tr>
            </thead>

            <tbody>
              {teams.map((team) => (
                <tr
                  key={team.rank}
                  className="border-b border-white/10 bg-[#0D0D0D] transition hover:bg-white]">
                  <td className="px-5 py-5 font-semibold">#{team.rank}</td>

                  <td className="px-5 py-5 font-semibold">{team.name}</td>

                  <td className="px-5 py-5 text-gray-300">{team.points}</td>

                  <td className="px-5 py-5 text-gray-300">{team.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
      <Footer/>
    </main>
  )
}

export default Leaderboard