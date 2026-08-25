import { useState } from 'react';
import { Link } from 'react-router-dom'; // or your router link
import { FaXmark, FaBars, FaRightToBracket, FaUserPlus } from 'react-icons/fa6';
import Logo from '../assets/logo/logo1.png'; // Adjust path

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-[#0D0D0D] border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="NepArena Logo" className="h-10 w-auto" />
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#E50914] transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP CTA BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-xs font-bold uppercase text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-5 py-2.5 bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-[#E50914]/20"
            >
              Sign Up
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white focus:outline-none"
            >
              <FaBars size={20} />
            </button>
          </div>

        </div>
      </div>

      {/* FULL SCREEN MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-6 md:hidden transition-all duration-300">
          
          {/* MENU HEADER */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <img src={Logo} alt="NepArena Logo" className="h-9 w-auto" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            >
              <FaXmark size={20} />
            </button>
          </div>

          {/* MENU NAVIGATION LINKS */}
          <div className="flex flex-col gap-6 py-8 my-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-black uppercase text-gray-200 hover:text-[#E50914] transition tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* MOBILE ACTION BUTTONS */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3.5 bg-[#0D0D0D] border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
            >
              <FaRightToBracket size={14} /> Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3.5 bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-[#E50914]/20 flex items-center justify-center gap-2"
            >
              <FaUserPlus size={14} /> Sign Up
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
}