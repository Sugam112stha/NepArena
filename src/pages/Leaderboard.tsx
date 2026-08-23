import { useState } from 'react';
import { 
  FaTrophy, 
  FaCrown, 
  FaMagnifyingGlass, 
  FaArrowUp, 
  FaArrowDown, 
  FaMinus 
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

import { LEADERBOARD_DATA, GAME_FILTERS } from '../data/LeaderBoard';

export default function LeaderboardPage() {
  const [search, setSearch] = useState('');
  // Default directly to the first game title
  const [selectedGame, setSelectedGame] = useState('Free Fire');

  // Strict game filtering + text search
  const filteredTeams = (LEADERBOARD_DATA || [])
    .filter((team) => team.game === selectedGame)
    .filter((team) => team.teamName?.toLowerCase().includes(search.toLowerCase().trim()))
    .map((team, index) => ({
      ...team,
      gameRank: index + 1 // Recalculate 1st, 2nd, 3rd spot dynamically for each game
    }));

  const top3 = filteredTeams.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E50914] selection:text-white pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-16 flex items-center justify-center overflow-hidden border-b border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 filter grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1920')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-4 py-1.5 rounded-full mb-4">
            <HiSparkles size={16} className="text-[#E50914]" />
            <span className="text-xs font-bold tracking-widest text-[#E50914] uppercase">NATIONAL STANDINGS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase mb-3">
            {selectedGame} <span className="text-[#E50914]">Leaderboard</span>
          </h1>

          <p className="max-w-xl mx-auto text-gray-400 text-sm">
            Official team standings for {selectedGame} calculated from verified tournament results.
          </p>
        </div>
      </section>

      {/* 2. GAME SELECTION & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0D0D0D] border border-white/10 p-4 rounded-xl">
          
          {/* Game Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {GAME_FILTERS.map((game) => (
              <button
                key={game}
                onClick={() => setSelectedGame(game)}
                className={`text-xs font-bold px-5 py-2.5 rounded-lg transition border whitespace-nowrap ${
                  selectedGame === game
                    ? 'bg-[#E50914] text-white border-[#E50914] shadow-lg shadow-[#E50914]/20'
                    : 'bg-[#050505] text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {game}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <FaMagnifyingGlass className="absolute left-4 top-3.5 text-gray-500 text-sm" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${selectedGame} squad...`}
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E50914] transition"
            />
          </div>

        </div>
      </section>

      {/* 3. PODIUM (TOP 3 SQUADS) */}
      {top3.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
            
            {/* RANK 2 */}
            {top3[1] ? (
              <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-xl text-center relative order-2 md:order-1">
                <span className="absolute top-3 left-3 bg-gray-300/10 text-gray-300 border border-gray-300/20 px-2.5 py-0.5 rounded text-xs font-bold">
                  #2
                </span>
                <img src={top3[1].logo} alt={top3[1].teamName} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-400 object-cover" />
                <h3 className="font-bold text-lg text-white mb-1">{top3[1].teamName}</h3>
                <span className="text-xs text-gray-500 uppercase block mb-3">{top3[1].game}</span>
                <p className="text-xl font-black text-[#E50914]">{top3[1].points} <span className="text-xs text-gray-400 font-normal">pts</span></p>
              </div>
            ) : <div className="hidden md:block order-2 md:order-1" />}

            {/* RANK 1 */}
            {top3[0] && (
              <div className="bg-[#0D0D0D] border-2 border-[#E50914] p-8 rounded-xl text-center relative shadow-2xl shadow-[#E50914]/10 order-1 md:order-2">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E50914] text-white p-2 rounded-full">
                  <FaCrown size={16} />
                </div>
                <span className="absolute top-3 left-3 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2.5 py-0.5 rounded text-xs font-bold">
                  #1
                </span>
                <img src={top3[0].logo} alt={top3[0].teamName} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-yellow-500 object-cover" />
                <h3 className="font-black text-xl text-white mb-1">{top3[0].teamName}</h3>
                <span className="text-xs text-gray-500 uppercase block mb-3">{top3[0].game}</span>
                <p className="text-2xl font-black text-[#E50914]">{top3[0].points} <span className="text-xs text-gray-400 font-normal">pts</span></p>
              </div>
            )}

            {/* RANK 3 */}
            {top3[2] ? (
              <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-xl text-center relative order-3">
                <span className="absolute top-3 left-3 bg-amber-600/10 text-amber-600 border border-amber-600/20 px-2.5 py-0.5 rounded text-xs font-bold">
                  #3
                </span>
                <img src={top3[2].logo} alt={top3[2].teamName} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-amber-700 object-cover" />
                <h3 className="font-bold text-lg text-white mb-1">{top3[2].teamName}</h3>
                <span className="text-xs text-gray-500 uppercase block mb-3">{top3[2].game}</span>
                <p className="text-xl font-black text-[#E50914]">{top3[2].points} <span className="text-xs text-gray-400 font-normal">pts</span></p>
              </div>
            ) : <div className="hidden md:block order-3" />}

          </div>
        </section>
      )}

      {/* 4. RANKING TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filteredTeams.length > 0 ? (
          <div className="bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6 text-center">Rank</th>
                    <th className="py-4 px-6">Team</th>
                    <th className="py-4 px-6">Points</th>
                    <th className="py-4 px-6">Wins / Played</th>
                    <th className="py-4 px-6">Win Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {filteredTeams.map((team) => {
                    const rankDiff = (team.previousRank || team.gameRank) - team.gameRank;

                    return (
                      <tr key={team.teamName} className="hover:bg-white/[0.02] transition">
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`font-black ${
                              team.gameRank === 1 ? 'text-yellow-500' :
                              team.gameRank === 2 ? 'text-gray-300' :
                              team.gameRank === 3 ? 'text-amber-600' : 'text-gray-400'
                            }`}>
                              #{team.gameRank}
                            </span>
                            
                            <span className="text-[10px]">
                              {rankDiff > 0 && <FaArrowUp className="text-emerald-500" />}
                              {rankDiff < 0 && <FaArrowDown className="text-red-500" />}
                              {rankDiff === 0 && <FaMinus className="text-gray-600" />}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img src={team.logo} alt={team.teamName} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                            <span className="font-bold text-white">{team.teamName}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6 font-black text-[#E50914]">{team.points}</td>
                        <td className="py-4 px-6 text-gray-300">
                          {team.wins} <span className="text-gray-600">/</span> {team.played}
                        </td>
                        <td className="py-4 px-6 text-gray-300 font-semibold">{team.winRate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0D0D0D] border border-white/10 rounded-xl">
            <FaTrophy className="text-gray-600 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Squads Listed</h3>
            <p className="text-gray-500 text-xs mt-1">No active squads found for {selectedGame} matching your search.</p>
          </div>
        )}
      </section>

    </div>
  );
}