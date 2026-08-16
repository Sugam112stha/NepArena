import { useNavigate } from "react-router-dom";
import Partner from "../components/Partner";

const Home = () => {
  const navigate = useNavigate();
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Register on NepArena.",
    },
    {
      number: "02",
      title: "Create Team",
      description: "Build your team with your player.",
    },
    {
      number: "03",
      title: "Verify Team",
      description: "Verify your player with their IGN and UID.",
    },
    {
      number: "04",
      title: "Join Tournament",
      description: "Register and compite with your rivals.",
    },
    {
      number: "05",
      title: "Complete & Rank",
      description: "Rise your team in the Top of the Nation.",
    },
  ];

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
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute left-1/2 top-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E50914]/10 blur-[120px]" />
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#E50914] sm:text-base">
            Nepal's Esports Platform
          </p>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Compete.
            <br />
            <span className="text-[#E50914]">Represent.</span>
            <br />
            Conquer.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Join competitive esports tournaments, represent your team, and climb
            the national leaderboard.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/Tournaments")}
              className="w-full rounded-lg bg-[#E50914] px-7 py-3.5 font-semibold text-white transition duration-300 hover:bg-[#ff1e2d] sm:w-auto">
              Explore Tournaments
            </button>

            <button
              onClick={() => navigate("/Login")}
              className="w-full rounded-lg border border-white/20 px-7 py-3.5 font-semibold text-white transition duration-300 hover:border-[#E50914] hover:text-[#E50914] sm:w-auto">
              Create Your Team
            </button>
          </div>

        </div>
      </section>

      <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 sm-py-20">
        <div className="mx-auto max-w-6xl">
          
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
              How it Works
            </p>

            <h2 className="mt-3 text-3xl font-bold  sm:text-4xl">
              Start Your Journey With Us
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
              Create your team, join tournaments, and compete for the top spot.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6"
              >
                <span className="font-bold text-[#E50914] text-sm">
                  {step.number}
                </span>

                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 transition hover:border-[#E50914]/50"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914]">
                  Free Fire
                </span>

                <h3 className="mt-4 text-xl font-bold">{tournament.name}</h3>

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
            <button
              onClick={() => navigate("/Tournaments")}
              className="rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold transition hover:border-[#E50914] hover:text-[#E50914]"
            >
              View More Tournaments
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
              Rankings
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Neparena Ranking
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
                    className="border-b border-white/10 bg-[#0D0D0D] transition"
                  >
                    <td className="px-5 py-5 font-semibold">#{team.rank}</td>

                    <td className="px-5 py-5 font-semibold">{team.name}</td>

                    <td className="px-5 py-5 text-gray-300">{team.points}</td>

                    <td className="px-5 py-5 text-gray-300">{team.wins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/Leaderboard")}
                className="rounded-lg border bg-[#E50914] border-white/10 px-6 py-3 mb-5 text-sm font-semibold transition] hover:bg-[#ff1e2d]"
              >
                See More Team
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
              Our Partners
            </p>

            <h2 className="mt-3 font-bold text-3xl sm:text-4xl">
              Grow Esport With NepArena
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
              Partner with NepArena to support competitive esports and help
              create more opportunities for teams and players across Nepal.
            </p>

            <button
              onClick={() => navigate("/Contact")}
              className="mt-8 rounded-lg bg-[#E50914] px-6 py-3 text-sm font-semibold transition hover:bg-[#ff1e2d]"
            >
              Become a Partner
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
