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
  const [step, setStep] = useState(1);
  const [selectedGame, setSelectedGame] = useState('');
  
  // Team Details
  const [teamName, setTeamName] = useState('');
  const [teamTag, setTeamTag] = useState('');
  const [teamSlogan, setTeamSlogan] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Players Roster
  const [players, setPlayers] = useState([
    { name: '', inGameId: '', role: 'Captain' }
  ]);

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
      setPlayers([...players, { name: '', inGameId: '', role: 'Player' }]);
    }
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updated = [...players];
    updated[index] = { ...updated[index], [field]: value };
    setPlayers(updated);
  };

  const handleSubmit = () => {
    alert(`Team "${teamName}" created successfully for ${selectedGame}!`);
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0D0D0D] border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Create New Team</h2>
            <p className="text-xs text-gray-400 mt-1">
              Step {step}: {
                step === 1 ? 'Select the game for your team' :
                step === 2 ? 'Provide basic squad information' :
                step === 3 ? 'Add player roster details' : 'Review & confirm team details'
              }
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white p-2 bg-white/5 rounded-lg border border-white/10 transition"
          >
            <FaXmark size={18} />
          </button>
        </div>

        {/* STEPPER PROGRESS */}
        <div className="px-8 py-4 bg-[#050505] border-b border-white/10">
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
        </div>

        {/* STEP CONTENT BODY */}
        <div className="p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: GAME SELECTION */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {GAMES.map((game) => (
                <div
                  key={game.id}
                  onClick={() => setSelectedGame(game.name)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all h-44 ${
                    selectedGame === game.name ? 'border-[#E50914] ring-2 ring-[#E50914]/30' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-black text-lg text-white uppercase">{game.name}</h3>
                </div>
              ))}
            </div>
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
              {players.map((player, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-3 bg-[#050505] p-4 border border-white/10 rounded-xl">
                  <input 
                    type="text"
                    placeholder="Player Name"
                    value={player.name}
                    onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                    className="flex-1 w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                  <input 
                    type="text"
                    placeholder="In-Game ID (UID)"
                    value={player.inGameId}
                    onChange={(e) => handlePlayerChange(index, 'inGameId', e.target.value)}
                    className="flex-1 w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                  <select
                    value={player.role}
                    onChange={(e) => handlePlayerChange(index, 'role', e.target.value)}
                    className="w-full sm:w-32 bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
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
            <div className="max-w-xl mx-auto bg-[#050505] border border-white/10 p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                {logoPreview ? (
                  <img src={logoPreview} alt="Team Logo" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                ) : (
                  <div className="w-16 h-16 bg-[#0D0D0D] border border-white/10 rounded-xl flex items-center justify-center font-black text-xl text-[#E50914]">
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
                    <div key={i} className="flex justify-between items-center bg-[#0D0D0D] px-3 py-2 rounded text-xs">
                      <span className="font-bold text-white">{p.name || 'Unnamed Player'} <span className="text-gray-500">({p.inGameId || 'No ID'})</span></span>
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
              className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white uppercase tracking-wider transition flex items-center gap-2"
            >
              <FaShieldHalved size={14} /> Create Team
            </button>
          )}
        </div>

      </div>
    </div>
  );
}