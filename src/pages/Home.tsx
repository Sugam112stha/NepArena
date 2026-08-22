import { 
  FaUsers, 
  FaShieldHalved, 
  FaAward, 
  FaBolt, 
  FaChartSimple, 
  FaGlobe, 
  FaChevronRight 
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const FEATURED_TOURNAMENTS = [
  {
    id: 1,
    title: 'Nepal Championship 2026',
    game: 'Free Fire',
    status: 'Upcoming',
    slots: '288 Slots',
    date: 'Aug 28, 2026',
    prize: 'Rs. 50,000',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Himalayan Esports Invitational',
    game: 'PUBG Mobile',
    status: 'Registration Open',
    slots: '64 Teams',
    date: 'Sep 05, 2026',
    prize: 'Rs. 1,00,000',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Kathmandu Valorant Cup',
    game: 'Valorant',
    status: 'Live Now',
    slots: '16 Teams',
    date: 'Aug 22, 2026',
    prize: 'Rs. 30,000',
    banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800'
  }
];

const LEADERBOARD_PREVIEW = [
  { rank: 1, team: 'DRS Gaming', points: 2450, wins: 14, tournaments: 18 },
  { rank: 2, team: 'Trained to Kill (T2K)', points: 2210, wins: 11, tournaments: 16 },
  { rank: 3, team: 'Abrupt Slayers', points: 1980, wins: 9, tournaments: 15 },
  { rank: 4, team: 'High Voltage', points: 1750, wins: 7, tournaments: 12 },
  { rank: 5, team: 'Elementrix', points: 1620, wins: 6, tournaments: 11 },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Create Your Team',
    desc: 'Build your esports team and add your competitive players to the roster.'
  },
  {
    step: '02',
    title: 'Verify Your Players',
    desc: 'Submit player details and in-game IDs for identity verification.'
  },
  {
    step: '03',
    title: 'Join Tournaments',
    desc: 'Register your verified squad for active and upcoming tournaments.'
  },
  {
    step: '04',
    title: 'Compete & Get Ranked',
    desc: 'Play matches, earn points, and climb the national NepArena leaderboard.'
  }
];

const WHY_US = [
  { title: 'Verified Teams', desc: 'Ensure legitimate competitive teams participate through mandatory ID verification.', icon: FaShieldHalved },
  { title: 'Fair Rankings', desc: 'Dynamic national leaderboards calculated from tournament performance.', icon: FaAward },
  { title: 'Tournament Management', desc: 'End-to-end automated group stages, matches, and bracket management.', icon: FaBolt },
  { title: 'Competitive Community', desc: 'Connecting aspiring players, pros, and tournament organizers across Nepal.', icon: FaGlobe },
  { title: 'Transparent Results', desc: 'Publicly verifiable match scores, points breakdowns, and team logs.', icon: FaChartSimple },
  { title: 'Team Profiles', desc: 'Showcase roster history, tournament wins, career achievements, and stats.', icon: FaUsers }
];

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E50914] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 filter grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1920')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-4 py-1.5 rounded-full mb-6">
            <HiSparkles size={16} className="text-[#E50914]" />
            <span className="text-xs font-bold tracking-widest text-[#E50914] uppercase">NEPAL'S ESPORTS PLATFORM</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase mb-6 leading-none">
            Compete. Conquer. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] to-red-500">
              Get Ranked.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
            Build your team, enter tournaments, compete against Nepal's best teams, and climb the national leaderboard.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <button onClick={() => navigate('/tournaments')}
            className="w-full sm:w-auto bg-[#E50914] hover:bg-[#c20711] text-white font-bold px-8 py-4 rounded transition flex items-center justify-center gap-2 shadow-xl shadow-[#E50914]/25">
              Explore Tournaments <FaChevronRight size={14} />
            </button>
            <button className="w-full sm:w-auto bg-[#0D0D0D] hover:bg-white/10 text-white border border-white/10 font-bold px-8 py-4 rounded transition">
              Create Your Team
            </button>
          </div>

          {/* Trust/Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-[#0D0D0D]/80 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#E50914]">500+</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Players</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">100+</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Teams</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">25+</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Tournaments</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#E50914]">10K+</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Matches</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED TOURNAMENTS */}
      <section className="py-20 border-b border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                Featured <span className="text-[#E50914]">Tournaments</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">Find your next competition and test your squad.</p>
            </div>
            <a href="#" className="mt-4 sm:mt-0 text-sm font-bold text-[#E50914] hover:underline flex items-center gap-1">
              View All Tournaments <FaChevronRight size={12} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_TOURNAMENTS.map((item) => (
              <div key={item.id} className="bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden group hover:border-[#E50914]/50 transition duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.banner} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/10 text-gray-300">
                    {item.game}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#E50914] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                    {item.status}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#E50914] transition">{item.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-4 mb-6 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Available Slots</p>
                      <p className="font-semibold text-gray-200 mt-0.5">{item.slots}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Date</p>
                      <p className="font-semibold text-gray-200 mt-0.5">{item.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Prize Pool</p>
                      <p className="text-lg font-black text-[#E50914]">{item.prize}</p>
                    </div>
                    <button className="bg-white/5 hover:bg-[#E50914] border border-white/10 hover:border-[#E50914] text-white text-xs font-bold px-4 py-2.5 rounded transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW NEPARENA WORKS */}
      <section className="py-20 border-b border-white/10 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              How <span className="text-[#E50914]">NepArena</span> Works
            </h2>
            <p className="text-gray-400 text-sm mt-2">Four simple steps to register, compete, and climb the esports leaderboards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="bg-[#050505] border border-white/10 p-8 rounded-xl relative overflow-hidden group hover:border-[#E50914]/50 transition">
                <span className="text-5xl font-black text-white/5 group-hover:text-[#E50914]/10 transition absolute right-4 top-4">
                  {step.step}
                </span>
                <div className="text-xs font-bold text-[#E50914] tracking-widest uppercase mb-2">Step {step.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY NEPARENA */}
      <section className="py-20 border-b border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              Why <span className="text-[#E50914]">NepArena</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">Built to solve competitive gaming challenges in Nepal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-[#0D0D0D] border border-white/10 p-8 rounded-xl hover:border-white/20 transition">
                  <div className="bg-[#E50914]/10 border border-[#E50914]/20 w-12 h-12 rounded-lg flex items-center justify-center text-[#E50914] mb-6">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LEADERBOARD SECTION */}
      <section className="py-20 border-b border-white/10 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                NepArena <span className="text-[#E50914]">Ranking</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">See the top teams competing across Nepal.</p>
            </div>
            <a href="#" className="mt-4 sm:mt-0 text-sm font-bold text-[#E50914] hover:underline flex items-center gap-1">
              View Full Leaderboard <FaChevronRight size={12} />
            </a>
          </div>

          <div className="bg-[#050505] border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Rank</th>
                    <th className="py-4 px-6">Team</th>
                    <th className="py-4 px-6">Points</th>
                    <th className="py-4 px-6">Tournament Wins</th>
                    <th className="py-4 px-6">Tournaments Played</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm font-medium">
                  {LEADERBOARD_PREVIEW.map((row) => (
                    <tr key={row.rank} className="hover:bg-white/[0.02] transition">
                      <td className="py-4 px-6 font-bold">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                          row.rank === 1 ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          row.rank === 2 ? 'bg-gray-300/10 text-gray-300 border border-gray-300/20' :
                          row.rank === 3 ? 'bg-amber-600/10 text-amber-600 border border-amber-600/20' : 'text-gray-500'
                        }`}>
                          #{row.rank}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-white">{row.team}</td>
                      <td className="py-4 px-6 font-black text-[#E50914]">{row.points}</td>
                      <td className="py-4 px-6 text-gray-300">{row.wins}</td>
                      <td className="py-4 px-6 text-gray-400">{row.tournaments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}