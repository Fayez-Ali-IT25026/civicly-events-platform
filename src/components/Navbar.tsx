
"use client";

import { useState } from "react";
import { Leaf, Search, Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";

const links = ["Home", "Upcoming Events", "About", "Gallery"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#021d18]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-6 lg:px-12">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white"
        >
          <Leaf
            size={27}
            strokeWidth={1.8}
            className="fill-[#8be37a]/20 text-[#8be37a]"
          />
          Civicly
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden h-full items-center gap-7 md:flex lg:gap-8">
          {links.map((link) => (
            <li key={link} className="h-full">
              <button
                onClick={() => setActive(link)}
                className={`relative flex h-full items-center text-[13px] font-medium transition-all duration-300
                  ${
                    active === link
                      ? "text-[#8be37a] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#8be37a]"
                      : "text-gray-300 hover:text-white"
                  }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="hidden items-center gap-4 md:flex">

          {/* Search */}
          <button
            aria-label="Search"
            className="text-gray-300 transition hover:text-[#8be37a]"
          >
            <Search size={18} strokeWidth={1.8} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            aria-pressed={!dark}
            className="relative ml-1 flex h-[18px] w-[32px] items-center rounded-full border border-white/10 bg-white/10 p-[2px] transition"
          >
            <span
              className={`flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[#8be37a] shadow-sm transition-all duration-300 ${
                dark ? "translate-x-[13px]" : "translate-x-0"
              }`}
            />
          </button>

          {/* Login */}
          <a
            href="/login"
            className="rounded-full border border-emerald-700/50 px-5 py-[7px] text-xs font-medium text-white transition duration-300 hover:border-[#8be37a] hover:text-[#8be37a]"
          >
            Login
          </a>

          {/* Get Started */}
          <a
            href="/register"
            className="rounded-full bg-[#8be37a] px-5 py-[8px] text-xs font-semibold text-[#062b20] shadow-[0_0_15px_rgba(139,227,122,0.15)] transition duration-300 hover:bg-[#a0f08f] hover:shadow-[0_0_20px_rgba(139,227,122,0.3)]"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="text-white md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#021d18] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => {
                  setActive(link);
                  setMenuOpen(false);
                }}
                className={`text-left text-sm transition ${
                  active === link
                    ? "font-semibold text-[#8be37a]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link}
              </button>
            ))}

            <div className="my-1 border-t border-white/10" />

            <a
              href="/login"
              className="rounded-full border border-white/15 py-2.5 text-center text-sm text-white"
            >
              Login
            </a>

            <a
              href="/register"
              className="rounded-full bg-[#8be37a] py-2.5 text-center text-sm font-semibold text-[#062b20]"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
