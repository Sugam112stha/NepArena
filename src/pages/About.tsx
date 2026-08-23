import React from 'react';
import { 
  FaTrophy, 
  FaShieldHalved, 
  FaGlobe, 
  FaUsers, 
  FaBullseye, 
  FaEye, 
  FaHandshake, 
  FaGamepad 
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

const VALUES = [
  {
    title: 'Fair Play & Integrity',
    desc: 'Strict player identity verification and transparent rules ensure an authentic competitive environment without ringers or cheaters.',
    icon: FaShieldHalved
  },
  {
    title: 'Regional Empowerment',
    desc: 'Creating direct opportunities for grassroots Nepali teams to gain national visibility and rise through structured rankings.',
    icon: FaGlobe
  },
  {
    title: 'Community First',
    desc: 'Building an inclusive ecosystem that bridges players, team managers, and tournament organizers under one unified platform.',
    icon: FaUsers
  },
  {
    title: 'Standardized Excellence',
    desc: 'Elevating regional esports production standards through automated brackets, live tracking, and verified statistics.',
    icon: FaTrophy
  }
];

const PLATFORM_STATS = [
  { label: 'Active Teams Registered', value: '100+' },
  { label: 'Verified Players', value: '500+' },
  { label: 'Tournaments Hosted', value: '25+' },
  { label: 'Supported Titles', value: 'Multi-Game Architecture' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-5 bg-[#050505] text-white font-sans selection:bg-[#E50914] selection:text-white">
      
      {/* 1. HERO / BANNER SECTION */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden border-b border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 filter grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-4 py-1.5 rounded-full mb-6">
            <HiSparkles size={16} className="text-[#E50914]" />
            <span className="text-xs font-bold tracking-widest text-[#E50914] uppercase">ABOUT NEPARENA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase mb-6 leading-none">
            Empowering Nepal's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] to-red-500">
              Esports Ecosystem
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-400 text-base sm:text-lg leading-relaxed">
            NepArena is a dedicated tournament management and ranking platform built to organize, standardize, and elevate competitive gaming across Nepal.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY & MISSION / VISION */}
      <section className="py-20 border-b border-white/10 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6">
                Bridging the Gap in <span className="text-[#E50914]">Nepali Esports</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Despite Nepal's massive competitive gaming talent—demonstrated on international stages—the local ecosystem has historically suffered from fragmented tournament communication, unverified rosters, and a lack of standardized national rankings.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                NepArena was designed to provide a robust technological backbone for competitive play. Beginning with titles like Free Fire, our game-independent infrastructure is built to scale across PUBG Mobile, Valorant, Mobile Legends, and future esports titles.
              </p>
              <div className="inline-flex items-center gap-3 bg-[#050505] border border-white/10 p-4 rounded-xl">
                <FaGamepad className="text-[#E50914] text-2xl" />
                <span className="text-xs font-semibold text-gray-300">
                  Game-Independent Platform Architecture
                </span>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="space-y-6">
              <div className="bg-[#050505] border border-white/10 p-8 rounded-xl hover:border-[#E50914]/40 transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#E50914]/10 border border-[#E50914]/20 p-3 rounded-lg text-[#E50914]">
                    <FaBullseye size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">Our Mission</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  To empower Nepali players and teams with a centralized platform that simplifies tournament registration, guarantees player identity verification, and delivers transparent performance statistics.
                </p>
              </div>

              <div className="bg-[#050505] border border-white/10 p-8 rounded-xl hover:border-[#E50914]/40 transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#E50914]/10 border border-[#E50914]/20 p-3 rounded-lg text-[#E50914]">
                    <FaEye size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">Our Vision</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  To become the definitive national esports infrastructure for Nepal—a launchpad where grassroots teams evolve into recognized professional organizations competing globally.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#050505] border border-white/10 rounded-xl p-6 text-center">
            {PLATFORM_STATS.map((stat, idx) => (
              <div key={idx}>
                <p className="text-2xl sm:text-3xl font-black text-[#E50914]">{stat.value}</p>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="py-20 border-b border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              Core <span className="text-[#E50914]">Pillars</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">The principles driving the development of NepArena.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-[#0D0D0D] border border-white/10 p-8 rounded-xl hover:border-[#E50914]/50 transition group">
                  <div className="bg-[#E50914]/10 border border-[#E50914]/20 w-12 h-12 rounded-lg flex items-center justify-center text-[#E50914] mb-6 group-hover:bg-[#E50914] group-hover:text-white transition duration-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-20 bg-[#0D0D0D] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
            Ready to Prove Your <span className="text-[#E50914]">Squad?</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Create your team, verify your roster, and start competing for national rankings on NepArena today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto bg-[#E50914] hover:bg-[#c20711] text-white font-bold px-8 py-4 rounded transition shadow-xl shadow-[#E50914]/25">
              Register Your Team
            </button>
            <button className="w-full sm:w-auto bg-[#050505] hover:bg-white/10 text-white border border-white/10 font-bold px-8 py-4 rounded transition">
              Explore Tournaments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}