import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/logo1.png";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => { 
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
    
  const navItems = [
    { name: "Home", path: "/"},
    { name: "About", path: "/About" },
    { name: "Tournaments", path: "/Tournaments" },
    { name: "Leaderboard", path: "/Leaderboard" },
    { name: "Contact", path: "/Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link to="/" onClick={() => setIsOpen(false)} className="z-50">
          <img src={logo} alt="NepArena" className="h-12 w-auto sm:h-14 transition hover:scale-105" />
        </Link>

        {/* DESKTOP NAV ITEMS */}
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-sm font-semibold transition hover:text-white ${
                  isActive ? "text-[#E50914]" : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link 
            to="/login" 
            className="px-4 py-2 text-sm text-gray-300 font-semibold border border-white/20 rounded-lg transition hover:text-white hover:border-white"
          >
            Login
          </Link>

          <Link 
            to="/signup" 
            className="px-4 py-2 text-sm bg-[#E50914] text-white font-bold rounded-lg transition hover:bg-[#b80710] shadow-lg shadow-[#E50914]/20"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="z-50 rounded-lg p-2 text-2xl text-white lg:hidden focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* MOBILE FULL-SCREEN MENU DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[#050505] flex flex-col justify-between px-6 py-8 lg:hidden animate-in fade-in slide-in-from-top duration-300">
          
          {/* NAVIGATION LINKS */}
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-bold tracking-wider uppercase transition ${
                    isActive 
                      ? "bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/30" 
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-[#E50914]" />}
                </Link>
              );
            })}
          </div>

          {/* ACTION BUTTONS AT BOTTOM */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full block text-center rounded-xl border border-white/20 py-3.5 text-sm font-bold text-white uppercase tracking-wider transition active:scale-95"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full block text-center rounded-xl bg-[#E50914] py-3.5 text-sm font-bold text-white uppercase tracking-wider transition active:scale-95 shadow-lg shadow-[#E50914]/30"
            >
              Sign Up
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;