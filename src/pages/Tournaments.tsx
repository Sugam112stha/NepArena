import { useState } from 'react';
import { 
  FaMagnifyingGlass, 
  FaFilter, 
  FaTrophy, 
  FaGamepad, 
  FaUsers, 
  FaCalendarDays 
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import banner1 from "../assets/auth-bg.png"

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
    banner: banner1
    },
  {
    id: 2,
    title: 'Himalayan Esports Invitational',
    game: 'PUBG Mobile',
    status: 'Registration Open',
    filterCategory: 'Registration Open',
    slots: '64 Teams',
    date: 'Sep 05, 2026',
    prize: 'Rs. 1,00,000',
    mode: 'Squad (TPP)',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Kathmandu Valorant Cup',
    game: 'eFootball',
    status: 'Ongoing',
    filterCategory: 'Ongoing',
    slots: '16 Teams',
    date: 'Aug 22, 2026',
    prize: 'Rs. 30,000',
    mode: '1v1 Competitive',
    banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Mobile Legends Community League',
    game: 'MLBB',
    status: 'Registration Open',
    filterCategory: 'Registration Open',
    slots: '32 Teams',
    date: 'Sep 12, 2026',
    prize: 'Rs. 25,000',
    mode: '5v5 Draft',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
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
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'PUBG Mobile Pro Scrims S4',
    game: 'PUBG Mobile',
    status: 'Ongoing',
    filterCategory: 'Ongoing',
    slots: '20 Teams',
    date: 'Aug 20, 2026',
    prize: 'Rs. 15,000',
    mode: 'Squad (Classic)',
    banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800'
  }
];

const FILTER_TABS = ['All', 'Upcoming', 'Registration Open', 'Ongoing', 'Completed'];

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredTournaments = ALL_TOURNAMENTS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || item.filterCategory === activeTab;
    return matchesSearch && matchesTab;
  });

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
                  <button className="bg-white/5 hover:bg-[#E50914] border border-white/10 hover:border-[#E50914] text-white text-xs font-bold px-4 py-2.5 rounded transition">
                    View Details
                  </button>
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

    </div>
  );
}