import { Link } from "react-router-dom";
import logo from "../assets/logo/logo1.png";
import { useState } from "react";
const Navbar = () => { 
    const[isOpen, setIsOpen] = useState(false);
    
const navItems = [
    { name: "About", path: "/about" },
    { name: "Tournaments", path: "/tournaments" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link to="/home" onClick={() => setIsOpen}>
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
        <Link to = "/login" className="px-4 py-2 text-sm text-gray-300 transition hover:text-white hover:scale-105">
            Login
        </Link>

        <Link to="/signup" className="px-4 py-2 text-sm text-gray-300 transition hover:text-white hover:scale-105">
            Sign Up
        </Link>
       </div>

      </div>
    </nav>
  );
};

export default Navbar;
