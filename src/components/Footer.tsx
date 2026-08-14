import { Link } from "react-router-dom";
import logo from "../assets/logo/logo1.png";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { useState } from "react";
const Footer = () => {
  const [setIsOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Tournaments", path: "/Tournaments" },
    { name: "Leaderboard", path: "/Leaderboard" },
    { name: "Contact", path: "/Contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/" },
    { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/neparena/"},
    { name: "Tiktok", icon: FaTiktok, url: "https://www.tiktok.com/@neparena" },
  ];
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" onClick={() => setIsOpen}>
              <img
                src={logo}
                alt="NepArena"
                className="h-12 w-auto sm:h-14 hover:scale-105"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Nepal's esports tournament platform built to connect teams,
              players, and competitive opportunities.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
                Quiks Link
            </h3>

            <ul className="mt-4 space-y-3">
              {navItems.map((items) => (
                <li key={items.name}>
                  <Link
                    to={items.path}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {items.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">
                Get In Touch
            </h3>

            <div className="mt-4 space-y-3 grid grid-cols-1">
              <a href="tel:+977 9810402146"> +977 9810402146</a>
              <a href="tel:+977 9713262249"> +977 9713262249</a>
              <a href="mailto:sugamstha619@gmail.com">neparena1@gmail.com</a>
            </div>

          </div>
          <div>
            <h3 className="font-semibold">Follow Us</h3>

            <div className="mt-4 flex gap-3">
              {socialLinks.map((media) => {
                const Icon = media.icon;

                return (
                  <a
                    key={media.name}
                    href={media.url}
                    aria-label={media.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-[#E50914] hover:text-[#E50914]">
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 NepArena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
