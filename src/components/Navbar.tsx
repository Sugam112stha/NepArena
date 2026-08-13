import { Link } from "react-router-dom";
import logo from "../assets/logo/logo1.png";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
const Navbar = () => { 
    const[isOpen, setIsOpen] = useState(false);
    
const navItems = [
    { name: "Home", path: "/Home"},
    { name: "About", path: "/About" },
    { name: "Tournaments", path: "/Tournaments" },
    { name: "Leaderboard", path: "/Leaderboard" },
    { name: "Contact", path: "/Contact" },
  ];
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link to="/Home" onClick={() => setIsOpen}>
          <img src={logo} alt="NepArena" className="h-12 w-auto sm:h-14 hover:scale-105" />
        </Link>

       <div className="hidden items-center gap-6 lg:flex">
         {navItems.map((items) => (
          <Link key={items.name} to={items.path} className="text-sm text-gray-300 transition hover:text-white hover:scale-105">
            {items.name}
          </Link>
        ))}
       </div>

       <div className="hidden items-center gap-3 lg:flex">
        <Link to = "/login" className="px-4 py-2 text-sm bg-[#E50914] text-gray-300 font-semibold rounded-lg transition hover:text-white hover:scale-105 hover:bg-[#FF1E2D]">
            Login
        </Link>

        <Link to="/signup" className="px-4 py-2 text-sm bg-[#E50914] text-gray-300 font-semibold rounded-lg transition hover:text-white hover:scale-105 hover:bg-[#FF1E2D]">
            Sign Up
        </Link>
       </div>

       <button onClick={() => setIsOpen(!isOpen)} 
       className="rounded-lg p-2 text-2xl text-white lg:hidden"
        aria-label = "Toggle navigation menu">
        {isOpen ? <FiX /> : <FiMenu />}
       </button>

      </div>

      {isOpen && (
        <div className="border-t border-white/10 text-white bg-[#0D0D0D] px-4 py-10 lg:hidden">
            <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                    <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)}>
                        {item.name}
                    </Link>
                ))}
            <div className="my-2 border-t border-white/10" />    
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-1 rounded-lg bg-[#E50914] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#FF1E2D]">
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="mt-1 rounded-lg bg-[#E50914] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#FF1E2D]">
              Sign Up
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;