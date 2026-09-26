import {
  FaArrowRight,
  FaBolt,
  FaChartLine,
  FaChevronRight,
  FaGamepad,
  FaHouse,
  FaPenToSquare,
  FaRightFromBracket,
  FaFloppyDisk,
  FaShieldHalved,
  FaTrashCan,
  FaXmark,
  FaTrophy,
  FaUsers,
  FaCamera,
} from "react-icons/fa6";
import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { IoIosNotifications } from "react-icons/io";

const sidebarLinks = [
  { label: "Overview", icon: FaHouse, path: "/dashboard" },
  { label: "Team Management", icon: FaUsers, path: "/createteam" },
  { label: "My Matches", icon: FaGamepad, path: "/tournaments" },
  { label: "Leaderboard", icon: FaChartLine, path: "/leaderboard" },
];

const tournaments = [
  { name: "Nepal Esports League", game: "PUBG Mobile", date: "Oct 18, 2026", status: "Registration open", tone: "red" },
  { name: "Gorkhali Clash S2", game: "Free Fire", date: "Oct 24, 2026", status: "Team required", tone: "slate" },
];

const profileGames = ["Free Fire", "PUBG Mobile", "Mobile Legends", "eFootball"];

interface GameProfile {
  game: string;
  ign: string;
  uid: string;
}

interface TeamPlayer {
  username: string;
  inGameId: string;
  role: string;
}

interface Team {
  _id: string;
  name: string;
  tag: string;
  game: string;
  slogan?: string;
  logo?: string;
  players: TeamPlayer[];
}

interface NotificationItem {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const Dashboard = () => {
  const { user, logout, updateProfile } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editTeam, setEditTeam] = useState<Team | null>(null);
  const [teamMessage, setTeamMessage] = useState("");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [profileName, setProfileName] = useState(user?.fullName || "");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
  const [gameProfiles, setGameProfiles] = useState<GameProfile[]>(profileGames.map((game) => ({
    game,
    ign: user?.gameProfiles?.find((profile) => profile.game === game)?.ign || "",
    uid: user?.gameProfiles?.find((profile) => profile.game === game)?.uid || "",
  })));
  const [profileError, setProfileError] = useState("");
  const [profileSaved, setProfileSaved] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const apiUrl = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api`;
  const location = useLocation();
  const navigate = useNavigate();
  const firstName = user?.fullName.split(" ")[0] || "Player";
  const initials = (user?.fullName || "Player")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const openProfileEditor = () => {
    setProfileName(user?.fullName || "");
    setProfilePicture(user?.profilePicture || "");
    setGameProfiles(profileGames.map((game) => ({
      game,
      ign: user?.gameProfiles?.find((profile) => profile.game === game)?.ign || "",
      uid: user?.gameProfiles?.find((profile) => profile.game === game)?.uid || "",
    })));
    setProfileError("");
    setProfileSaved("");
    setShowProfileEditor(true);
  };

  const handleProfilePicture = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setProfileError("Choose an image file.");
      return;
    }
    if (file.size > 1_500_000) {
      setProfileError("Choose an image smaller than 1.5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfilePicture(reader.result);
        setProfileError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    setProfileError("");
    setProfileSaved("");
    setIsSavingProfile(true);
    try {
      await updateProfile({ fullName: profileName, profilePicture, gameProfiles });
      setProfileSaved("Profile saved successfully.");
      setShowProfileEditor(false);
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : "Unable to save your profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const token = localStorage.getItem("neparena_token");
        const response = await fetch(`${apiUrl}/teams`, { headers: { Authorization: `Bearer ${token || ""}` } });
        const result = await response.json() as { teams?: Team[] };
        if (response.ok) setTeams(result.teams || []);
      } finally {
        setIsLoadingTeams(false);
      }
    };
    loadTeams();
  }, [apiUrl]);

  useEffect(() => {
    const loadNotifications = async () => {
      const token = localStorage.getItem("neparena_token");
      const response = await fetch(`${apiUrl}/notifications`, { headers: { Authorization: `Bearer ${token || ""}` } });
      const result = await response.json() as { notifications?: NotificationItem[] };
      if (response.ok) setNotifications(result.notifications || []);
    };
    loadNotifications();
  }, [apiUrl]);

  const markNotificationsRead = async () => {
    const token = localStorage.getItem("neparena_token");
    await fetch(`${apiUrl}/notifications/read`, { method: "PATCH", headers: { Authorization: `Bearer ${token || ""}` } });
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  };

  const deleteTeam = async (team: Team) => {
    if (!window.confirm(`Delete ${team.name}? This cannot be undone.`)) return;
    setTeamMessage("");
    const token = localStorage.getItem("neparena_token");
    const response = await fetch(`${apiUrl}/teams/${team._id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token || ""}` } });
    const result = await response.json() as { success?: boolean; message?: string };
    if (!response.ok || !result.success) {
      setTeamMessage(result.message || "Unable to delete team.");
      return;
    }
    setTeams((current) => current.filter((currentTeam) => currentTeam._id !== team._id));
    setTeamMessage(`${team.name} was deleted.`);
    setNotifications((current) => [{ _id: `local-${Date.now()}`, message: `${team.name} was deleted.`, read: false, createdAt: new Date().toISOString() }, ...current]);
  };

  const startEditingTeam = (team: Team) => {
    setTeamMessage("");
    setEditingTeamId(team._id);
    setEditTeam({ ...team, players: team.players.map((player) => ({ ...player })) });
  };

  const saveTeam = async () => {
    if (!editTeam) return;
    setTeamMessage("");
    try {
      const token = localStorage.getItem("neparena_token");
      const response = await fetch(`${apiUrl}/teams/${editTeam._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
        body: JSON.stringify({ name: editTeam.name, tag: editTeam.tag, slogan: editTeam.slogan || "", players: editTeam.players }),
      });
      const result = await response.json() as { success?: boolean; team?: Team; message?: string };
      if (!response.ok || !result.team) throw new Error(result.message || "Unable to update team.");
      setTeams((current) => current.map((team) => team._id === result.team!._id ? result.team! : team));
      setEditingTeamId(null);
      setEditTeam(null);
      setTeamMessage("Team details saved.");
    } catch (error) {
      setTeamMessage(error instanceof Error ? error.message : "Unable to update team.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ed1b2f] selection:text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0d0d0d] lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-7 py-7">
            <Link to="/" className="block">
              <span className="block text-xl font-black leading-none tracking-tight text-[#ffb2a7]">NEPARENA</span>
              <span className="mt-1 block text-xl font-black leading-none tracking-tight text-white">ESPORTS</span>
            </Link>
          </div>

          <div className="mx-5 mt-7 flex items-center gap-3 rounded-xl border border-white/10 bg-[#151515] p-3">
            <button onClick={openProfileEditor} aria-label="Edit profile" className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#252525] text-sm font-black text-[#ffb2a7]">
              {user?.profilePicture ? <img src={user.profilePicture} alt="" className="h-full w-full object-cover" /> : initials}
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{user?.fullName || "Player"}</p>
              <p className="truncate text-[11px] text-gray-500">@{user?.username || "player"}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#ffb2a7]">Rookie tier</p>
            </div>
          </div>

          <nav className="mt-8 flex-1 px-4">
            <p className="px-3 pb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Player hub</p>
            <div className="space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition ${active ? "bg-[#ed1b2f] text-white shadow-lg shadow-[#ed1b2f]/20" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                  >
                    <Icon size={15} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-white/10 p-5">
            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-gray-400 transition hover:bg-white/5 hover:text-white">
              <FaRightFromBracket size={15} /> Log out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-8 lg:px-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ed1b2f]">Player dashboard</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">Welcome back, <span className="text-[#ed1b2f]">{firstName}</span></h1>
              <p className="mt-1 text-xs text-gray-500">@{user?.username || "player"} <span className="mx-1 text-gray-700">•</span> Season 14 <span className="mx-1 text-gray-700">•</span> Global rank pending</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
              <button onClick={() => { setShowNotifications((current) => !current); if (notifications.some((notification) => !notification.read)) markNotificationsRead(); }} className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#111] text-gray-400 transition hover:text-white" aria-label="Notifications">
                {notifications.some((notification) => !notification.read) && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#ed1b2f]" />}
                <IoIosNotifications size={16} />
              </button>
              {showNotifications && <div className="absolute right-0 top-12 z-30 w-80 rounded-xl border border-white/10 bg-[#151515] p-3 shadow-2xl"><div className="flex items-center justify-between border-b border-white/10 px-2 pb-3"><p className="text-xs font-black uppercase tracking-wider text-white">Notifications</p><button onClick={markNotificationsRead} className="text-[10px] font-bold text-[#ed1b2f]">Mark read</button></div><div className="max-h-72 overflow-y-auto pt-2">{notifications.length === 0 ? <p className="px-2 py-5 text-xs text-gray-500">No updates yet.</p> : notifications.map((notification) => <div key={notification._id} className={`rounded-lg px-2 py-3 text-xs ${notification.read ? "text-gray-500" : "bg-[#ed1b2f]/10 text-gray-200"}`}><p>{notification.message}</p><p className="mt-1 text-[10px] text-gray-600">{new Date(notification.createdAt).toLocaleString()}</p></div>)}</div></div>}
              </div>
              <button onClick={openProfileEditor} aria-label="Edit user profile" title="Edit profile" className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#ed1b2f]/30 bg-[#ed1b2f]/10 text-sm font-black text-[#ffb2a7] transition hover:border-[#ed1b2f]">
                {user?.profilePicture ? <img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover" /> : initials}
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-8 lg:p-12">
            <section className="grid gap-5 xl:grid-cols-[1.45fr_0.75fr]">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#101010] p-6 sm:p-8">
                <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-28 border-[#ed1b2f]/10" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">Current tier</p>
                    <h2 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">Unranked</h2>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">Create your first team and compete in an official tournament to start your ranking journey.</p>
                  </div>
                  <span className="rounded border border-[#ed1b2f]/30 bg-[#ed1b2f]/10 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#ffb2a7]">New season</span>
                </div>
                <div className="relative mt-8">
                  <div className="mb-2 flex justify-between text-xs font-bold"><span className="text-gray-500">Rank progress</span><span className="text-gray-400">0 / 100 RP</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-0 rounded-full bg-[#ed1b2f]" /></div>
                  <p className="mt-3 text-xs text-gray-600">Your first match win will unlock your placement track.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-[#101010] p-6 text-center">
                <FaTrophy className="mx-auto text-2xl text-[#ed1b2f]" />
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">Tournament points</p>
                <p className="mt-2 text-5xl font-black tracking-tight text-white">0</p>
                <p className="mt-2 text-xs font-bold text-gray-500">Start competing to earn points</p>
              </div>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-xl border border-white/10 bg-[#101010] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">My teams</p><h2 className="mt-1 text-xl font-black text-white">Your competitive roster</h2></div>
                  <Link to="/createteam" className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#ed1b2f] hover:text-white">Create <FaArrowRight size={11} /></Link>
                </div>
                {isLoadingTeams ? <p className="mt-5 text-sm text-gray-500">Loading your teams...</p> : teams.length === 0 ? (
                  <div className="mt-5 flex items-center gap-4 rounded-lg border border-dashed border-white/15 bg-[#0b0b0b] p-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#ed1b2f]/30 bg-[#ed1b2f]/10 text-[#ed1b2f]"><FaShieldHalved size={22} /></div>
                    <div className="flex-1"><p className="font-bold text-white">No active team yet</p><p className="mt-1 text-xs leading-5 text-gray-500">Choose a game, add your players, and unlock tournament registration.</p></div>
                    <Link to="/createteam" className="hidden rounded-lg bg-[#ed1b2f] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#c91427] sm:block">Get started</Link>
                  </div>
                ) : teams.map((team) => (
                  <div key={team._id} className="mt-5 rounded-lg border border-white/10 bg-[#0b0b0b] p-5">
                    {editingTeamId === team._id && editTeam ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between"><p className="text-sm font-black text-white">Edit team details</p><button onClick={() => { setEditingTeamId(null); setEditTeam(null); }} className="text-gray-500 hover:text-white"><FaXmark /></button></div>
                        <div className="grid gap-3 sm:grid-cols-2"><input value={editTeam.name} onChange={(event) => setEditTeam({ ...editTeam, name: event.target.value })} className="rounded-lg border border-white/10 bg-[#151515] px-3 py-2 text-sm text-white" placeholder="Team name" /><input value={editTeam.tag} onChange={(event) => setEditTeam({ ...editTeam, tag: event.target.value.toUpperCase() })} maxLength={4} className="rounded-lg border border-white/10 bg-[#151515] px-3 py-2 text-sm uppercase text-white" placeholder="Tag" /></div>
                        <textarea value={editTeam.slogan || ""} onChange={(event) => setEditTeam({ ...editTeam, slogan: event.target.value })} className="w-full resize-none rounded-lg border border-white/10 bg-[#151515] px-3 py-2 text-sm text-white" placeholder="Team slogan" rows={2} />
                        <div className="space-y-2"><p className="text-[10px] font-black uppercase tracking-wider text-gray-500">Player details</p>{editTeam.players.map((player, index) => <div key={`${team._id}-${index}`} className="grid gap-2 sm:grid-cols-[1fr_1fr_120px]"><input value={player.username} onChange={(event) => { const players = [...editTeam.players]; players[index] = { ...player, username: event.target.value }; setEditTeam({ ...editTeam, players }); }} className="rounded-lg border border-white/10 bg-[#151515] px-3 py-2 text-xs text-white" placeholder="Username" /><input value={player.inGameId} onChange={(event) => { const players = [...editTeam.players]; players[index] = { ...player, inGameId: event.target.value }; setEditTeam({ ...editTeam, players }); }} className="rounded-lg border border-white/10 bg-[#151515] px-3 py-2 text-xs text-white" placeholder="In-game ID" /><select value={player.role} onChange={(event) => { const players = [...editTeam.players]; players[index] = { ...player, role: event.target.value }; setEditTeam({ ...editTeam, players }); }} className="rounded-lg border border-white/10 bg-[#151515] px-3 py-2 text-xs text-white"><option>Captain</option><option>IGL</option><option>Player</option><option>Substitute</option></select></div>)}</div>
                        <button onClick={saveTeam} className="flex items-center gap-2 rounded-lg bg-[#ed1b2f] px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#c91427]"><FaFloppyDisk size={12} /> Save changes</button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-4"><div><p className="text-lg font-black text-white">{team.name} <span className="text-[#ed1b2f]">[{team.tag}]</span></p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-500">{team.game} <span className="mx-1 text-gray-700">•</span> {team.players.length}/6 players</p></div><div className="flex gap-2"><button onClick={() => startEditingTeam(team)} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-gray-400 hover:border-[#ed1b2f]/50 hover:text-white"><FaPenToSquare size={12} /> Edit</button><button onClick={() => deleteTeam(team)} className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10"><FaTrashCan size={12} /> Delete</button></div></div>
                        {team.slogan && <p className="mt-3 text-xs italic text-gray-500">“{team.slogan}”</p>}
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">{team.players.map((player) => <div key={player.username} className="flex items-center justify-between rounded-lg border border-white/5 bg-[#151515] px-3 py-2.5"><div><p className="text-xs font-bold text-white">@{player.username}</p><p className="mt-1 text-[10px] text-gray-500">UID: {player.inGameId}</p></div><span className="text-[10px] font-black uppercase tracking-wider text-[#ed1b2f]">{player.role}</span></div>)}</div>
                      </>
                    )}
                  </div>
                ))}
                {teamMessage && <p className="mt-3 text-xs font-semibold text-emerald-400">{teamMessage}</p>}
              </div>

              <div className="rounded-xl border border-white/10 bg-[#101010] p-6">
                <div className="flex items-start justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">Performance</p><h2 className="mt-1 text-xl font-black text-white">Your season snapshot</h2></div><FaBolt className="text-[#ed1b2f]" /></div>
                <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 text-center">
                  <div><p className="text-2xl font-black text-white">0</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">Matches</p></div>
                  <div><p className="text-2xl font-black text-white">0%</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">Win rate</p></div>
                  <div><p className="text-2xl font-black text-white">0</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">Wins</p></div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-[#101010] p-6">
              <div className="flex items-end justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">Open competitions</p><h2 className="mt-1 text-xl font-black text-white">Find your first arena</h2></div><Link to="/tournaments" className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#ed1b2f] hover:text-white">View all <FaChevronRight size={10} /></Link></div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {tournaments.map((tournament) => (
                  <Link key={tournament.name} to="/tournaments" className="group flex items-center gap-4 rounded-lg border border-white/10 bg-[#0b0b0b] p-4 transition hover:border-[#ed1b2f]/50">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tournament.tone === "red" ? "bg-[#ed1b2f]/15 text-[#ed1b2f]" : "bg-white/5 text-gray-400"}`}><FaGamepad size={18} /></div>
                    <div className="min-w-0 flex-1"><p className="truncate font-bold text-white group-hover:text-[#ffb2a7]">{tournament.name}</p><p className="mt-1 text-xs text-gray-500">{tournament.game} <span className="mx-1 text-gray-700">•</span> {tournament.date}</p></div>
                    <span className="hidden text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:block">{tournament.status}</span><FaChevronRight className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-[#ed1b2f]" size={12} />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      {showProfileEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowProfileEditor(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="profile-editor-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/10 bg-[#111] shadow-2xl">
            <header className="flex items-start justify-between border-b border-white/10 p-5 sm:p-6">
              <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ed1b2f]">Player account</p><h2 id="profile-editor-title" className="mt-1 text-xl font-black text-white">Edit your profile</h2><p className="mt-1 text-xs text-gray-500">Manage your identity and game accounts.</p></div>
              <button onClick={() => setShowProfileEditor(false)} aria-label="Close profile editor" className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-white"><FaXmark /></button>
            </header>
            <div className="space-y-6 p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#ed1b2f]/40 bg-[#1b1b1b] text-2xl font-black text-[#ffb2a7]">
                  {profilePicture ? <img src={profilePicture} alt="Profile preview" className="h-full w-full object-cover" /> : initials}
                </div>
                <div className="flex-1"><label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Profile picture</label><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-[#191919] px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#ed1b2f]/50"><FaCamera /> Choose image<input type="file" accept="image/*" onChange={handleProfilePicture} className="hidden" /></label><p className="mt-2 text-[11px] text-gray-600">Image files only, up to 1.5 MB.</p></div>
              </div>
              <div><label htmlFor="profile-display-name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Display name</label><input id="profile-display-name" value={profileName} onChange={(event) => setProfileName(event.target.value)} maxLength={80} className="w-full rounded-lg border border-white/10 bg-[#080808] px-3 py-3 text-sm text-white outline-none focus:border-[#ed1b2f]" /></div>
              <div><div className="mb-3"><h3 className="text-xs font-black uppercase tracking-wider text-white">Game identities</h3><p className="mt-1 text-[11px] text-gray-500">Add the IGN and UID you use for each game.</p></div><div className="space-y-3">{gameProfiles.map((gameProfile, index) => <div key={gameProfile.game} className="grid gap-2 rounded-lg border border-white/10 bg-[#0a0a0a] p-3 sm:grid-cols-[140px_1fr_1fr] sm:items-center"><p className="text-xs font-bold text-gray-300">{gameProfile.game}</p><input aria-label={`${gameProfile.game} IGN`} value={gameProfile.ign} onChange={(event) => setGameProfiles((current) => current.map((profile, profileIndex) => profileIndex === index ? { ...profile, ign: event.target.value } : profile))} maxLength={50} placeholder="In-game name (IGN)" className="min-w-0 rounded-md border border-white/10 bg-[#151515] px-3 py-2.5 text-xs text-white outline-none focus:border-[#ed1b2f]" /><input aria-label={`${gameProfile.game} UID`} value={gameProfile.uid} onChange={(event) => setGameProfiles((current) => current.map((profile, profileIndex) => profileIndex === index ? { ...profile, uid: event.target.value } : profile))} maxLength={80} placeholder="Player UID" className="min-w-0 rounded-md border border-white/10 bg-[#151515] px-3 py-2.5 text-xs text-white outline-none focus:border-[#ed1b2f]" /></div>)}</div></div>
              {profileError && <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs font-semibold text-red-300">{profileError}</p>}
              <footer className="flex flex-col-reverse justify-end gap-2 border-t border-white/10 pt-4 sm:flex-row"><button onClick={() => setShowProfileEditor(false)} className="rounded-lg border border-white/10 px-4 py-2.5 text-xs font-bold text-gray-300 hover:text-white">Cancel</button><button onClick={saveProfile} disabled={isSavingProfile || !profileName.trim()} className="flex items-center justify-center gap-2 rounded-lg bg-[#ed1b2f] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#c91427] disabled:cursor-not-allowed disabled:opacity-50"><FaFloppyDisk /> {isSavingProfile ? "Saving..." : "Save profile"}</button></footer>
            </div>
          </section>
        </div>
      )}
      {profileSaved && <div role="status" className="fixed bottom-5 right-5 z-40 rounded-lg border border-emerald-500/30 bg-[#101a13] px-4 py-3 text-xs font-semibold text-emerald-300 shadow-xl">{profileSaved}</div>}
    </div>
  );
};

export default Dashboard;
