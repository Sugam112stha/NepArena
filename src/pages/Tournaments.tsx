import { useState } from 'react';
import { 
  FaMagnifyingGlass, 
  FaFilter, 
  FaTrophy, 
  FaGamepad, 
  FaUsers,
  FaCalendarDays,
  FaXmark,
} from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import { HiSparkles } from 'react-icons/hi2';
import freefireshowdowm from "../assets/tournament/FreeFire.png"
import epicbrawal from "../assets/tournament/EpicBrawl.png"
import counterstrike from "../assets/tournament/Counterzstrike.png"
import pubgcup from "../assets/tournament/PubgCup.png"
import efootball from "../assets/tournament/efootballCup.png"
import eternalleague from "../assets/tournament/EternalLeague.png"

const ALL_TOURNAMENTS = [
  {
    id: 1,
    title: 'Nepal Championship 2026',
    game: 'Free Fire',
    status: 'Upcoming',
    filterCategory: 'Upcoming',
    slots: '288 Slots',
    date: 'Aug 28, 2026',
    prize: 'Rs. 50,000',
    mode: 'Squad (Battle Royale)',
    banner: freefireshowdowm
    },
  {
    id: 2,
    title: 'Counter Strike',
    game: 'PUBG Mobile',
    status: 'Registration Open',
    filterCategory: 'Registration Open',
    slots: '644 Teams',
    date: 'Sep 05, 2026',
    prize: 'Rs. 1,00,000',
    mode: 'Squad (TPP)',
    banner: counterstrike
  },
  {
    id: 3,
    title: 'Pubg Cup',
    game: 'PUBG Mobile',
    status: 'Ongoing',
    filterCategory: 'Ongoing',
    slots: '166 Teams',
    date: 'Aug 22, 2026',
    prize: 'Rs. 30,000',
    mode: '1v1 Competitive',
    banner: pubgcup
  },
  {
    id: 4,
    title: 'Mobile Legends Eternal League',
    game: 'MLBB',
    status: 'Registration Open',
    filterCategory: 'Registration Open',
    slots: '64 Teams',
    date: 'Sep 12, 2026',
    prize: 'Rs. 25,000',
    mode: '5v5 Draft',
    banner: eternalleague
  },
  {
    id: 5,
    title: 'Pokhara Free Fire Showdown',
    game: 'Free Fire',
    status: 'Completed',
    filterCategory: 'Completed',
    slots: '48 Teams',
    date: 'Jul 15, 2026',
    prize: 'Rs. 40,000',
    mode: 'Squad (Clash Squad)',
    banner: epicbrawal
  },
  {
    id: 6,
    title: 'eFootball Tournament',
    game: ' eFootball',
    status: 'Ongoing',
    filterCategory: 'Ongoing',
    slots: '60 Player',
    date: 'Aug 20, 2026',
    prize: 'Rs. 15,000',
    mode: '1v1 (Classic)',
    banner: efootball
  }
];

const FILTER_TABS = ['All', 'Upcoming', 'Registration Open', 'Ongoing', 'Completed'];

interface TournamentTeam {
  _id: string;
  name: string;
  tag: string;
  game: string;
}

const normalizeGame = (game: string) => {
  const normalized = game.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === 'mlbb' ? 'mobilelegends' : normalized;
};

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedTournament, setSelectedTournament] = useState<typeof ALL_TOURNAMENTS[number] | null>(null);
  const [teams, setTeams] = useState<TournamentTeam[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api`;

  const filteredTournaments = ALL_TOURNAMENTS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || item.filterCategory === activeTab;
    return matchesSearch && matchesTab;
  });

  const openRegistration = async (tournament: typeof ALL_TOURNAMENTS[number]) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/tournaments' } });
      return;
    }
    setSelectedTournament(tournament);
    setSelectedTeamId('');
    setRegistrationError('');
    setRegistrationMessage('');
    setIsLoadingTeams(true);
    try {
      const token = localStorage.getItem('neparena_token');
      const response = await fetch(`${apiUrl}/teams`, { headers: { Authorization: `Bearer ${token || ''}` } });
      const result = await response.json() as { teams?: TournamentTeam[]; message?: string };
      if (!response.ok) throw new Error(result.message || 'Unable to load your teams.');
      setTeams(result.teams || []);
    } catch (error) {
      setRegistrationError(error instanceof Error ? error.message : 'Unable to load your teams.');
    } finally {
      setIsLoadingTeams(false);
    }
  };

  const registerTeam = async () => {
    if (!selectedTournament || !selectedTeamId) return;
    setRegistrationError('');
    setIsRegistering(true);
    try {
      const token = localStorage.getItem('neparena_token');
      const response = await fetch(`${apiUrl}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || ''}` },
        body: JSON.stringify({
          tournamentId: String(selectedTournament.id),
          tournamentTitle: selectedTournament.title,
          game: selectedTournament.game.trim(),
          teamId: selectedTeamId,
        }),
      });
      const result = await response.json() as { registration?: { group: string; round: string }; message?: string };
      if (!response.ok || !result.registration) throw new Error(result.message || 'Unable to register your team.');
      const team = teams.find((item) => item._id === selectedTeamId);
      setRegistrationMessage(`${team?.name || 'Your team'} is assigned to Group ${result.registration.group}, ${result.registration.round}.`);
      setSelectedTournament(null);
    } catch (error) {
      setRegistrationError(error instanceof Error ? error.message : 'Unable to register your team.');
    } finally {
      setIsRegistering(false);
    }
  };

  const eligibleTeams = selectedTournament
    ? teams.filter((team) => normalizeGame(team.game) === normalizeGame(selectedTournament.game))
    : [];

  return (
    <div className="min-h-screen pt-5 bg-[#050505] text-white font-sans selection:bg-[#E50914] selection:text-white pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden border-b border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 filter grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1920')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-4 py-1.5 rounded-full mb-6">
            <HiSparkles size={16} className="text-[#E50914]" />
            <span className="text-xs font-bold tracking-widest text-[#E50914] uppercase">TOURNAMENT ARENA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase mb-4 leading-none">
            Compete. Conquer. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] to-red-500">
              Become a Champion.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            Find and join official national esports tournaments across Nepal. Prove your squad's dominance and earn ranking points.
          </p>
        </div>
      </section>

      {registrationMessage && (
        <div role="status" className="mx-auto mt-6 flex max-w-7xl flex-col gap-3 border-y border-emerald-500/20 bg-emerald-500/5 px-5 py-4 text-sm text-emerald-200 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{registrationMessage}</p>
          <Link to="/matches" className="shrink-0 font-black uppercase tracking-wider text-emerald-300 hover:text-white">View My Matches</Link>
        </div>
      )}

      {/* 2. SEARCH & FILTER CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-[#0D0D0D] border border-white/10 p-4 rounded-xl mb-10">
          
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <FaMagnifyingGlass className="absolute left-4 top-3.5 text-gray-500 text-sm" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tournaments or games..."
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E50914] transition"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            <div className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <FaFilter size={12} /> Status:
            </div>
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold px-4 py-2 rounded-lg whitespace-nowrap transition border ${
                  activeTab === tab
                    ? 'bg-[#E50914] text-white border-[#E50914]'
                    : 'bg-[#050505] text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>

        {/* 3. TOURNAMENT CARDS GRID */}
        {filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTournaments.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden group hover:border-[#E50914]/50 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Banner & Badges */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.banner} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/10 text-gray-300 flex items-center gap-1.5">
                      <FaGamepad className="text-[#E50914]" /> {item.game}
                    </div>
                    <div className={`absolute top-3 right-3 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      item.status === 'Live Now' || item.status === 'Ongoing' ? 'bg-emerald-600' :
                      item.status === 'Registration Open' ? 'bg-[#E50914]' :
                      item.status === 'Upcoming' ? 'bg-amber-600' : 'bg-gray-700'
                    }`}>
                      {item.status}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Mode: {item.mode}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#E50914] transition line-clamp-1">
                      {item.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-4 mb-6 text-sm">
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-gray-500" />
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase">Slots</p>
                          <p className="font-semibold text-gray-200 text-xs mt-0.5">{item.slots}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarDays className="text-gray-500" />
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase">Date</p>
                          <p className="font-semibold text-gray-200 text-xs mt-0.5">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Prize Pool</p>
                    <p className="text-lg font-black text-[#E50914]">{item.prize}</p>
                  </div>
                  {item.status === 'Registration Open' ? (
                    <button onClick={() => void openRegistration(item)} className="bg-[#E50914] hover:bg-red-700 border border-[#E50914] text-white text-xs font-bold px-4 py-2.5 rounded transition">
                      Register team
                    </button>
                  ) : (
                    <button disabled className="bg-white/5 border border-white/10 text-gray-500 text-xs font-bold px-4 py-2.5 rounded">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#0D0D0D] border border-white/10 rounded-xl">
            <FaTrophy className="text-gray-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Tournaments Found</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              We couldn't find any tournaments matching your search or filter criteria.
            </p>
          </div>
        )}
      </section>

      {selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedTournament(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="register-team-title" className="w-full max-w-md rounded-xl border border-white/10 bg-[#111] p-6 shadow-2xl">
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E50914]">Tournament registration</p>
                <h2 id="register-team-title" className="mt-2 text-xl font-black text-white">{selectedTournament.title}</h2>
                <p className="mt-1 text-xs text-gray-500">Choose your {selectedTournament.game.trim()} team.</p>
              </div>
              <button onClick={() => setSelectedTournament(null)} aria-label="Close registration" className="rounded-md border border-white/10 p-2 text-gray-400 hover:text-white"><FaXmark /></button>
            </header>

            {isLoadingTeams ? <p className="py-8 text-sm text-gray-500">Loading your teams...</p> : eligibleTeams.length > 0 ? (
              <div className="mt-6 space-y-4">
                <label htmlFor="registration-team" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Team</label>
                <select id="registration-team" value={selectedTeamId} onChange={(event) => setSelectedTeamId(event.target.value)} className="w-full rounded-md border border-white/10 bg-[#080808] px-3 py-3 text-sm text-white outline-none focus:border-[#E50914]">
                  <option value="">Select a team</option>
                  {eligibleTeams.map((team) => <option key={team._id} value={team._id}>{team.name} [{team.tag}]</option>)}
                </select>
                <p className="text-xs leading-5 text-gray-500">Your group will be assigned automatically and will appear in My Matches.</p>
              </div>
            ) : !registrationError ? (
              <div className="mt-6 border-y border-white/10 py-5">
                <p className="text-sm font-bold text-white">No eligible teams found</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">Create a {selectedTournament.game.trim()} team before registering.</p>
                <button onClick={() => navigate('/createteam')} className="mt-4 text-xs font-black uppercase tracking-wider text-[#ffb2a7] hover:text-white">Create a team</button>
              </div>
            ) : null}

            {registrationError && <p role="alert" className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">{registrationError}</p>}
            <footer className="mt-6 flex justify-end gap-2 border-t border-white/10 pt-4">
              <button onClick={() => setSelectedTournament(null)} className="rounded-md border border-white/10 px-4 py-2.5 text-xs font-bold text-gray-300 hover:text-white">Cancel</button>
              <button onClick={() => void registerTeam()} disabled={!selectedTeamId || isRegistering || isLoadingTeams} className="rounded-md bg-[#E50914] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">{isRegistering ? 'Registering...' : 'Register team'}</button>
            </footer>
          </section>
        </div>
      )}

    </div>
  );
}