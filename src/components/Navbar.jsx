import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";
import { useCart } from "@/lib/store";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCart((s) => s.items);
  const setCartOpen = useCart((s) => s.setOpen);
  const count = items.reduce((n, it) => n + (it.qty || 0), 0);

  return (
    <nav
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-stone-200/70 dark:border-stone-800/70
  bg-gradient-to-r from-amber-50/80 via-yellow-50/70 to-amber-100/70
  dark:bg-stone-950/80
        backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150
        text-black dark:text-white
      "
    >
      <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div
            className="
              p-[6px] rounded-full overflow-hidden
              bg-white/90
              ring-1 ring-stone-300/70 dark:ring-stone-700/70
              backdrop-blur
            "
            title="The Steeze Store"
          >
            <img
              src="/src/assets/logo-light.svg"
              alt="The Steeze Store Logo"
              className="h-10 w-10 block dark:hidden select-none"
              draggable={false}
            />
            <img
              src="/src/assets/dark.png"
              alt="The Steeze Store Logo (Dark)"
              className="h-10 w-10 hidden dark:block select-none"
              draggable={false}
            />
          </div>
          <span className="font-bold text-lg lg:text-2xl">The Steeze Store</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1.5 ml-8">
          {[
            { to: "/", label: "Home" },
            { to: "/shop", label: "Shop" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="
                  block px-3 py-2 rounded-lg
                  hover:bg-white/60 dark:hover:bg-stone-800/60
                  ring-1 ring-transparent hover:ring-stone-200/70 dark:hover:ring-stone-700/60
                  transition
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Cart (opens drawer) */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setCartOpen(true)}
            className="
              relative rounded-lg p-2
              ring-1 ring-stone-300/70 dark:ring-stone-700/60
              bg-white/70 dark:bg-neutral-900/50
              hover:bg-white/90 dark:hover:bg-neutral-900/70
              text-stone-950 dark:text-white
              backdrop-blur transition
            "
            aria-label="Open cart"
          >
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-[10px] font-bold h-5 min-w-[1.25rem] px-1.5 rounded-full flex items-center justify-center shadow">
                {count}
              </span>
            )}
            <BsCart2 size={22} />
          </motion.button>

          {/* Theme toggle */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <ModeToggle />
          </motion.div>

          {/* Mobile menu button */}
          <button
            className="
              md:hidden rounded-lg p-2
              ring-1 ring-stone-300/70 dark:ring-stone-700/60
              bg-white/70 dark:bg-neutral-900/50
              hover:bg-white/90 dark:hover:bg-neutral-900/70
              transition
            "
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="
            md:hidden border-t border-stone-200/60 dark:border-stone-800/60
            bg-gradient-to-b from-amber-50/80 to-amber-100/70
            dark:bg-stone-950/80 backdrop-blur-xl
          "
        >
          <ul className="px-4 py-3 space-y-1">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="
                    block px-3 py-2 rounded-lg
                    hover:bg-white/60 dark:hover:bg-stone-800/60
                    ring-1 ring-transparent hover:ring-stone-200/70 dark:hover:ring-stone-700/60
                    transition
                  "
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setCartOpen(true);
                }}
                className="
                  w-full text-left px-3 py-2 rounded-lg
                  ring-1 ring-stone-300/70 dark:ring-stone-700/60
                  bg-white/70 dark:bg-neutral-900/50
                  hover:bg-white/90 dark:hover:bg-neutral-900/70
                  transition
                "
              >
                Open Cart {count > 0 ? `(${count})` : ""}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
