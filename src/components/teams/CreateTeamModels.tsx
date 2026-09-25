import { useState, type ChangeEvent} from 'react';
import { 
  FaXmark, 
  FaArrowRight, 
  FaArrowLeft, 
  FaCheck, 
  FaUserPlus, 
  FaTrashCan,
  FaShieldHalved,
  FaImage,
  FaUsers,
  FaQuoteLeft
} from 'react-icons/fa6';
import FreeFire from "../../assets/gameLogo/freefire.png";
import PubG from "../../assets/gameLogo/pubg.png";
import MobileLegend from "../../assets/gameLogo/mobileLegend.png";
import eFootabll from "../../assets/gameLogo/eFootball.png";
import { useAuth } from "../../auth/authContext";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GAMES = [
  { id: 'free-fire', name: 'Free Fire', image: FreeFire },
  { id: 'pubg-mobile', name: 'PUBG Mobile', image: PubG },
  { id: 'mobile-legends', name: 'Mobile Legends', image: MobileLegend },
  { id: 'efootball', name: 'eFootball', image: eFootabll },
];

export default function CreateTeamModal({ isOpen, onClose }: CreateTeamModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedGame, setSelectedGame] = useState('');
  
  // Team Details
  const [teamName, setTeamName] = useState('');
  const [teamTag, setTeamTag] = useState('');
  const [teamSlogan, setTeamSlogan] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Players Roster
  const [players, setPlayers] = useState([
    { username: user?.username || '', inGameId: '', role: 'Captain', verified: Boolean(user?.username) }
  ]);
  const [inviteStatus, setInviteStatus] = useState<Record<number, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedGameDetails = GAMES.find((game) => game.name === selectedGame);
  const completedPlayers = players.filter((player) => player.verified && player.inGameId.trim()).length;
  const setupProgress = Math.round(
    ([Boolean(selectedGame), Boolean(teamName.trim() && teamTag.trim()), completedPlayers > 0, step === 4].filter(Boolean).length / 4) * 100
  );

  if (!isOpen) return null;

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPlayer = () => {
    if (players.length < 6) {
      setPlayers([...players, { username: '', inGameId: '', role: 'Player', verified: false }]);
    }
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updated = [...players];
    updated[index] = { ...updated[index], [field]: value, ...(field === 'username' ? { verified: false } : {}) };
    setPlayers(updated);
    if (field === 'username') setInviteStatus((current) => ({ ...current, [index]: '' }));
  };

  const verifyPlayerUsername = async (index: number) => {
    const username = players[index].username.trim().toLowerCase();
    if (!username) return;

    setInviteStatus((current) => ({ ...current, [index]: 'Checking username...' }));
    try {
      const token = localStorage.getItem('neparena_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/users/${encodeURIComponent(username)}`, {
        headers: { Authorization: `Bearer ${token || ''}` },
      });
      const result = await response.json() as { success?: boolean; player?: { fullName: string; username: string }; message?: string };
      if (!response.ok || !result.player) throw new Error(result.message || 'Player not found.');

      const invitedPlayer = result.player;
      setPlayers((current) => current.map((player, playerIndex) => playerIndex === index ? { ...player, username: invitedPlayer.username, verified: true } : player));
      setInviteStatus((current) => ({ ...current, [index]: `${invitedPlayer.fullName} invited` }));
    } catch (error) {
      setInviteStatus((current) => ({ ...current, [index]: error instanceof Error ? error.message : 'Player not found.' }));
    }
  };

  const handleSubmit = async () => {
    setSubmitError('');
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('neparena_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || ''}` },
        body: JSON.stringify({
          name: teamName,
          tag: teamTag,
          game: selectedGame,
          slogan: teamSlogan,
          logo: logoPreview,
          players: players.map(({ username, inGameId, role }) => ({ username, inGameId, role })),
        }),
      });
      const result = await response.json() as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to create the team.');
      alert(`Team "${teamName}" created successfully for ${selectedGame}!`);
      onClose();
      setStep(1);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to create the team.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0D0D0D] border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-white/10 bg-[#0b0b0b] p-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#E50914]">
              <FaShieldHalved size={11} /> NepArena Team Forge
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">Create New Team</h2>
            <p className="mt-1 text-xs text-gray-400">
              Step {step}: {
                step === 1 ? 'Select the game for your team' :
                step === 2 ? 'Provide basic squad information' :
                step === 3 ? 'Add player roster details' : 'Review & confirm team details'
              }
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Setup progress</p>
              <p className="text-sm font-black text-white">{setupProgress}% ready</p>
            </div>
            <button 
            onClick={onClose} 
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-400 transition hover:text-white"
            >
              <FaXmark size={18} />
            </button>
          </div>
        </div>

        {/* STEPPER PROGRESS */}
        <div className="border-b border-white/10 bg-[#050505] px-8 py-5">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {['Game', 'Info', 'Players', 'Review'].map((label, index) => {
              const currentStep = index + 1;
              const isActive = step === currentStep;
              const isDone = step > currentStep;

              return (
                <div key={label} className="flex flex-col items-center gap-1.5 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition ${
                    isActive ? 'bg-[#E50914] text-white border-[#E50914]' :
                    isDone ? 'bg-emerald-500 text-white border-emerald-500' :
                    'bg-[#0D0D0D] text-gray-500 border-white/10'
                  }`}>
                    {isDone ? <FaCheck size={12} /> : currentStep}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-[#E50914]' : 'text-gray-500'}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mx-auto mt-4 h-1 max-w-xl overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#E50914] transition-all duration-500" style={{ width: `${step * 25}%` }} />
          </div>
        </div>

        {/* STEP CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-r from-[#151515] to-[#0b0b0b] p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E50914]/40 bg-[#050505] text-lg font-black text-[#E50914] shadow-lg shadow-[#E50914]/10">
              {logoPreview ? <img src={logoPreview} alt="Team logo preview" className="h-full w-full object-cover" /> : teamTag || 'N'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-black uppercase text-white">{teamName || 'Your team name'}</p>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                {selectedGameDetails && <img src={selectedGameDetails.image} alt="" className="mr-1 inline-block h-4 w-4 rounded object-cover align-middle" />}
                {selectedGame || 'Choose your battlefield'} {teamTag && <span className="text-[#E50914]"> · {teamTag}</span>}
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Roster</p>
              <p className="text-sm font-black text-white">{completedPlayers}<span className="text-gray-500">/6</span></p>
            </div>
          </div>
          
          {/* STEP 1: GAME SELECTION */}
          {step === 1 && (
            <>
              <div className="mb-5">
                <p className="text-sm font-bold text-white">Pick the game your squad is built to dominate.</p>
                <p className="mt-1 text-xs text-gray-500">Your game selection will shape your team profile and tournament eligibility.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {GAMES.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => setSelectedGame(game.name)}
                    className={`group relative h-40 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                      selectedGame === game.name ? 'border-[#E50914] ring-2 ring-[#E50914]/30' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={game.image} alt={game.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    {selectedGame === game.name && <div className="absolute right-3 top-3 rounded-full bg-[#E50914] p-2 text-white"><FaCheck size={11} /></div>}
                    <div className="absolute bottom-4 left-4"><p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Arena title</p><h3 className="text-lg font-black uppercase text-white">{game.name}</h3></div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STEP 2: TEAM INFO */}
          {step === 2 && (
            <div className="space-y-5 max-w-xl mx-auto">
              {/* TEAM LOGO UPLOAD */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Team Logo</label>
                <div className="flex items-center justify-center w-full">
                  <label className="relative flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-white/20 hover:border-[#E50914] rounded-2xl cursor-pointer bg-[#050505] transition group overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Team Logo Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="p-3 bg-white/5 rounded-full text-gray-400 group-hover:text-[#E50914] group-hover:scale-110 transition">
                          <FaImage size={22} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 group-hover:text-white mt-2">Upload Logo</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* TEAM NAME */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Team Name <span className="text-[#E50914]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <FaUsers size={14} />
                  </div>
                  <input 
                    type="text" 
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Abrupt Slayers"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition"
                  />
                </div>
              </div>

              {/* TEAM TAG */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Team Tag (3–4 Chars) <span className="text-[#E50914]">*</span>
                </label>
                <input 
                  type="text" 
                  maxLength={4}
                  value={teamTag}
                  onChange={(e) => setTeamTag(e.target.value.toUpperCase())}
                  placeholder="e.g. AS"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition uppercase"
                />
              </div>

              {/* TEAM SLOGAN / DESCRIPTION */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase">Team Description / Slogan</label>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase">Optional</span>
                </div>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-gray-500">
                    <FaQuoteLeft size={12} />
                  </div>
                  <textarea 
                    rows={3}
                    value={teamSlogan}
                    onChange={(e) => setTeamSlogan(e.target.value)}
                    placeholder="Describe your team's playstyle, history, or goals..."
                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PLAYERS ROSTER */}
          {step === 3 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Build your active roster.</p>
                    <p className="mt-1 text-xs text-gray-500">Invite registered players by username and add their game IDs for verification.</p>
                </div>
                <span className="text-xs font-black text-[#E50914]">{completedPlayers}/6 ready</span>
              </div>
              {players.map((player, index) => (
                <div key={index} className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-[#050505] p-4 sm:flex-row">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-black ${index === 0 ? 'bg-[#E50914] text-white' : 'bg-white/10 text-gray-400'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="w-full flex-1">
                    <input 
                    type="text"
                    placeholder="Invite by username"
                    value={player.username}
                    onChange={(e) => handlePlayerChange(index, 'username', e.target.value)}
                    onBlur={() => verifyPlayerUsername(index)}
                    className="w-full flex-1 rounded-lg border border-white/10 bg-[#0D0D0D] px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none"
                    />
                    {inviteStatus[index] && <p className={`mt-1 text-[10px] font-bold ${player.verified ? 'text-emerald-400' : 'text-red-400'}`}>{inviteStatus[index]}</p>}
                  </div>
                  <input 
                    type="text"
                    placeholder="In-Game ID (UID)"
                    value={player.inGameId}
                    onChange={(e) => handlePlayerChange(index, 'inGameId', e.target.value)}
                    className="w-full flex-1 rounded-lg border border-white/10 bg-[#0D0D0D] px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none"
                  />
                  <select
                    value={player.role}
                    onChange={(e) => handlePlayerChange(index, 'role', e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#0D0D0D] px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none sm:w-32"
                  >
                    <option value="IGL">IGL</option>
                    <option value="Player">Player</option>
                    <option value="Substitute">Substitute</option>
                  </select>

                  {index > 0 && (
                    <button 
                      onClick={() => handleRemovePlayer(index)}
                      className="text-red-500 hover:text-red-400 p-2"
                    >
                      <FaTrashCan size={14} />
                    </button>
                  )}
                </div>
              ))}

              {players.length < 6 && (
                <button 
                  onClick={handleAddPlayer}
                  className="w-full py-3 border border-dashed border-white/20 hover:border-[#E50914] text-gray-400 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <FaUserPlus size={14} /> Add Player
                </button>
              )}
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM */}
          {step === 4 && (
            <div className="mx-auto max-w-xl space-y-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#171717] to-[#080808] p-6 shadow-2xl">
              <div className="mb-1 flex items-center justify-between">
                <div><p className="text-sm font-bold text-white">Final team check</p><p className="mt-1 text-xs text-gray-500">Everything look right before you enter the arena?</p></div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-400">Ready</span>
              </div>
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                {logoPreview ? (
                  <img src={logoPreview} alt="Team Logo" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#E50914]/30 bg-[#0D0D0D] text-xl font-black text-[#E50914]">
                    {teamTag || 'TAG'}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-black text-white">{teamName || 'Squad Name'}</h3>
                  <span className="text-xs text-gray-400 font-bold uppercase">{selectedGame}</span>
                  {teamSlogan && <p className="text-xs text-gray-400 italic mt-1">"{teamSlogan}"</p>}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Roster Summary ({players.length} Players)</h4>
                <div className="space-y-2">
                  {players.map((p, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 bg-[#0D0D0D] px-3 py-2.5 text-xs">
                      <span className="font-bold text-white">@{p.username || 'username'} <span className="text-gray-500">({p.inGameId || 'No ID'})</span></span>
                      <span className="text-[#E50914] font-semibold">{p.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between bg-[#050505]">
          <button 
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-5 py-2.5 rounded-lg border border-white/10 text-xs font-bold text-gray-400 hover:text-white disabled:opacity-30 transition flex items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back
          </button>

          <div className="flex items-center gap-4">
            {submitError && <p className="max-w-xs text-right text-xs font-semibold text-red-400">{submitError}</p>}
          {step < 4 ? (
            <button 
              disabled={step === 1 && !selectedGame}
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-xs font-bold text-white uppercase tracking-wider disabled:opacity-50 transition flex items-center gap-2"
            >
              Next Step <FaArrowRight size={12} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaShieldHalved size={14} /> {isSubmitting ? 'Creating...' : 'Create Team'}
            </button>
          )}
          </div>
        </div>

      </div>
    </div>
  );
}