const LeaderboardPreview = () => {
  const teams = [
    {
    rank : 1,
    name : "Team Nepal",
    points : 1210,
    wins : 131,
  },
  {
    rank : 2,
    name : "Team Phonix",
    points : 1206,
    wins : 129,
  },
  {
    rank : 3,
    name : "Team Hawk",
    points : 1201,
    wins : 134,
  },
  {
    rank : 4,
    name : "Team Lava",
    points : 1189,
    wins : 122,
  },
]
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

        <div className="overflow-x-auto rounded-xl border border-white/10">
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
          className="border-b border-white/10 bg-[#0D0D0D] transition hover:bg-white/[0.03]"
        >
          <td className="px-5 py-5 font-semibold">
            #{team.rank}
          </td>

          <td className="px-5 py-5 font-semibold">
            {team.name}
          </td>

          <td className="px-5 py-5 text-gray-300">
            {team.points}
          </td>

          <td className="px-5 py-5 text-gray-300">
            {team.wins}
          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;