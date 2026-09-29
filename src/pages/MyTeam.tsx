import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaRightFromBracket, FaShieldHalved, FaTrashCan, FaUsers } from "react-icons/fa6";
import CreateTeamModal from "../components/teams/CreateTeamModels";
import { useAuth } from "../auth/authContext";

interface TeamPlayer {
  username: string;
  playerId?: string;
  user?: string | { playerId?: string };
  ign?: string;
  inGameId: string;
  role: string;
}

interface Team {
  _id: string;
  owner: string;
  name: string;
  tag: string;
  game: string;
  slogan?: string;
  logo?: string;
  players: TeamPlayer[];
}

export default function MyTeamPage() {
  const { user } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [isActing, setIsActing] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const apiUrl = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api`;

  const loadTeam = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const token = localStorage.getItem("neparena_token");
      const response = await fetch(`${apiUrl}/teams/mine`, { headers: { Authorization: `Bearer ${token || ""}` } });
      const result = await response.json() as { team?: Team | null; message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to load your team.");
      setTeam(result.team || null);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Unable to load your team.");
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    void loadTeam();
  }, [loadTeam]);

  const updateMembership = async (path: string, action: "leave" | "kick", playerName: string) => {
    if (!team || isActing) return;
    const prompt = action === "leave"
      ? `Leave ${team.name}?${team.owner === user?.id ? " Leadership will transfer to the next player." : ""}`
      : `Remove ${playerName} from ${team.name}?`;
    if (!window.confirm(prompt)) return;

    setIsActing(true);
    setActionMessage("");
    try {
      const token = localStorage.getItem("neparena_token");
      const response = await fetch(`${apiUrl}/teams/${team._id}/members/${path}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token || ""}` },
      });
      const result = await response.json() as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to update team membership.");
      setActionMessage(result.message || "Team membership updated.");
      await loadTeam();
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "Unable to update team membership.");
    } finally {
      setIsActing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ed1b2f]">Player hub</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">My Team</h1>
            <p className="mt-2 text-sm text-gray-500">Your Free Fire squad and registered roster.</p>
          </div>
          {team && <Link to="/matches" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#ffb2a7] hover:text-white">My matches <FaArrowRight size={12} /></Link>}
        </header>
        {actionMessage && <p role="status" className="mt-5 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-gray-300">{actionMessage}</p>}

        {isLoading ? <p className="py-10 text-sm text-gray-500">Loading your team...</p> : loadError ? (
          <p role="alert" className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">{loadError}</p>
        ) : team ? (
          <section className="mt-8">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
              {team.logo ? <img src={team.logo} alt={`${team.name} logo`} className="h-20 w-20 rounded-lg border border-white/10 object-cover" /> : <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-[#ed1b2f]/30 bg-[#ed1b2f]/10 text-xl font-black text-[#ffb2a7]">{team.tag}</div>}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{team.game}</p>
                <h2 className="mt-1 text-2xl font-black">{team.name} <span className="text-[#ed1b2f]">[{team.tag}]</span></h2>
                {team.slogan && <p className="mt-2 text-sm text-gray-400">{team.slogan}</p>}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400"><FaUsers className="text-[#ed1b2f]" /> {team.players.length} players</div>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2"><FaShieldHalved className="text-[#ed1b2f]" /><h3 className="text-sm font-black uppercase tracking-wider">Team roster</h3></div>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {team.players.map((player) => {
                  const playerId = player.playerId || (typeof player.user === "object" ? player.user.playerId : undefined);
                  const isCurrentPlayer = player.username === user?.username;
                  return (
                  <article key={player.username} className="grid gap-3 py-4 sm:grid-cols-[1fr_1fr_120px_auto] sm:items-center">
                    <div><p className="font-bold text-white">{player.ign || player.username}</p><p className="mt-1 text-xs text-gray-500">@{player.username}{playerId && <span> <span className="mx-1 text-gray-700">·</span> Player ID: {playerId}</span>}</p></div>
                    <p className="text-xs text-gray-400">Free Fire UID: <span className="font-semibold text-gray-200">{player.inGameId}</span></p>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#ffb2a7]">{player.role}</span>
                    {isCurrentPlayer ? (
                      <button disabled={isActing} onClick={() => void updateMembership("me", "leave", player.username)} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs font-bold text-gray-300 hover:border-amber-400/40 hover:text-amber-200 disabled:opacity-50"><FaRightFromBracket size={12} /> Leave team</button>
                    ) : team.owner === user?.id && playerId ? (
                      <button disabled={isActing} onClick={() => void updateMembership(encodeURIComponent(playerId), "kick", player.ign || player.username)} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-500/20 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-500/10 disabled:opacity-50"><FaTrashCan size={12} /> Kick</button>
                    ) : <span />}
                  </article>
                );})}
              </div>
            </div>
          </section>
        ) : (
          <section className="mt-8 border-y border-white/10 py-12 text-center">
            <FaShieldHalved className="mx-auto text-3xl text-gray-600" />
            <h2 className="mt-4 text-lg font-black">You’re not on a team yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">Create your Free Fire team and invite players with their NepArena Player IDs.</p>
            <button onClick={() => setShowCreateTeam(true)} className="mt-5 rounded-md bg-[#ed1b2f] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#c91427]">Create your team</button>
          </section>
        )}
      </div>

      {showCreateTeam && <CreateTeamModal isOpen onClose={() => { setShowCreateTeam(false); void loadTeam(); }} />}
      {team && !team.players.some((player) => player.username === user?.username) && <p className="sr-only">Team captain account: {user?.username}</p>}
    </main>
  );
}