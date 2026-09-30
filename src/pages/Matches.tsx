import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGamepad, FaTrophy } from "react-icons/fa6";

interface MatchRegistration {
  _id: string;
  tournamentId: string;
  tournamentTitle: string;
  game: string;
  group: string;
  round: string;
  team: { _id: string; name: string; tag: string; game: string };
}

export default function MatchesPage() {
  const [registrations, setRegistrations] = useState<MatchRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api`;

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const token = localStorage.getItem("neparena_token");
        const response = await fetch(`${apiUrl}/registrations`, { headers: { Authorization: `Bearer ${token || ""}` } });
        const result = await response.json() as { registrations?: MatchRegistration[]; message?: string };
        if (!response.ok) throw new Error(result.message || "Unable to load your match groups.");
        setRegistrations(result.registrations || []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load your match groups.");
      } finally {
        setIsLoading(false);
      }
    };
    loadRegistrations();
  }, [apiUrl]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div className="flex flex-col items-start gap-3">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 transition hover:text-white"><FaArrowRight className="rotate-180" size={12} /> Back to dashboard</Link>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ed1b2f]">Player hub</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight">My Matches</h1>
              <p className="mt-2 text-sm text-gray-500">Your tournament group placements and current round.</p>
            </div>
          </div>
          <Link to="/tournaments" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#ffb2a7] hover:text-white">
            Browse tournaments <FaArrowRight size={12} />
          </Link>
        </header>

        {isLoading ? <p className="py-10 text-sm text-gray-500">Loading your group placements...</p> : error ? (
          <p role="alert" className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">{error}</p>
        ) : registrations.length === 0 ? (
          <section className="mt-8 border-y border-white/10 py-12 text-center">
            <FaTrophy className="mx-auto text-3xl text-gray-600" />
            <h2 className="mt-4 text-lg font-black">No group placements yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">Register one of your teams for an open tournament to receive a group and round assignment.</p>
            <Link to="/tournaments" className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#ed1b2f] px-4 py-2.5 text-xs font-black uppercase tracking-wider hover:bg-[#c91427]">
              Find a tournament <FaArrowRight size={11} />
            </Link>
          </section>
        ) : (
          <section className="divide-y divide-white/10">
            {registrations.map((registration) => (
              <article key={registration._id} className="grid gap-5 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">{registration.tournamentTitle}</p>
                  <h2 className="mt-2 text-2xl font-black text-[#ffb2a7]">Group {registration.group}</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-400"><FaGamepad className="text-[#ed1b2f]" /> {registration.team.name} [{registration.team.tag}] <span className="text-gray-700">·</span> {registration.game}</p>
                </div>
                <div className="flex items-center gap-3 sm:justify-end">
                  <span className="rounded-md border border-[#ed1b2f]/30 bg-[#ed1b2f]/10 px-3 py-2 text-xs font-black uppercase tracking-wider text-[#ffb2a7]">{registration.round}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Group stage</span>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}