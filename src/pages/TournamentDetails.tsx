import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const tournaments = [
  {
    id: 1,
    name: "Nepal Championship",
    status: "Upcoming",
    teams: "288 Slots",
    date: "Aug 20, 2026",
    prize: "Rs. 50,000",
  },
  {
    id: 2,
    name: "Everest Clash",
    status: "Upcoming",
    teams: "144 Slots",
    date: "Aug 28, 2026",
    prize: "Rs. 30,000",
  },
  {
    id: 3,
    name: "Summer Cup",
    status: "Ongoing",
    teams: "144 Slots",
    date: "Sep 05, 2026",
    prize: "Rs. 25,000",
  },
  {
    id: 4,
    name: "Nepal Championship",
    status: "Completed",
    teams: "248 Slots",
    date: "Sep 05, 2026",
    prize: "Rs. 40,000",
  },
];

const TournamentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tournament = tournaments.find(
    (tournament) => tournament.id === Number(id)
  );

  if (!tournament) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <section className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              Tournament Not Found
            </h1>

            <p className="mt-3 text-gray-400">
              The tournament you are looking for does not exist.
            </p>

            <button
              onClick={() => navigate("/Tournaments")}
              className="mt-6 rounded-lg bg-[#E50914] px-5 py-3 text-sm font-semibold"
            >
              Back to Tournaments
            </button>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* Header */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
            Free Fire • Squad
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {tournament.name}
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Compete against teams from across Nepal and fight for
            the championship.
          </p>

        </div>
      </section>

      {/* Tournament Information */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Status */}
            <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-5">
              <p className="text-sm text-gray-400">
                Status
              </p>

              <p className="mt-2 font-semibold text-[#E50914]">
                {tournament.status}
              </p>
            </div>

            {/* Slots */}
            <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-5">
              <p className="text-sm text-gray-400">
                Available Slots
              </p>

              <p className="mt-2 font-semibold">
                {tournament.teams}
              </p>
            </div>

            {/* Date */}
            <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-5">
              <p className="text-sm text-gray-400">
                Tournament Date
              </p>

              <p className="mt-2 font-semibold">
                {tournament.date}
              </p>
            </div>

            {/* Prize */}
            <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-5">
              <p className="text-sm text-gray-400">
                Prize Pool
              </p>

              <p className="mt-2 font-semibold">
                {tournament.prize}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Tournament Description */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 sm:p-8">

            <h2 className="text-2xl font-bold">
              About This Tournament
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-gray-400">
              Join NepArena's Free Fire squad tournament and compete
              against teams from across Nepal. Register your team,
              prove your skills, and compete for the championship.
            </p>

            <button
              className="mt-6 rounded-lg bg-[#E50914] px-6 py-3 text-sm font-semibold transition hover:bg-red-700"
            >
              Register Your Team
            </button>

          </div>

        </div>
      </section>

      <Footer />

    </main>
  );
};

export default TournamentDetails;