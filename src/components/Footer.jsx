import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { buildWhatsAppRedirect } from '@/lib/whatsapp'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="
        relative mt-0 border-t
        border-stone-200/60 dark:border-stone-800/60
        bg-white/70 dark:bg-stone-950 backdrop-blur-xl
        text-black dark:text-white
      "
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div
              className="
                relative overflow-hidden
                p-[6px] rounded-full
                bg-white/90 dark:bg-neutral-900/90
                ring-1 ring-stone-300/70 dark:ring-stone-700/70
                shadow-[0_8px_28px_rgba(0,0,0,0.08)]
              "
            >
              <img
                src="https://res.cloudinary.com/dnitzkowt/image/upload/v1759360335/ChatGPT_Image_Sep_16__2025__12_40_26_PM-removebg-preview_1_r2xdkl.png"
                alt="The Steeze Store Logo"
                className="h-8 w-8 block select-none object-contain"
                draggable="false"
              />
            </div>
            <span className="font-bold text-xl text-black dark:text-white">
              The Steeze Store
            </span>
          </div>
          <p className="text-black/80 dark:text-white/80 text-sm max-w-xs">
            Style with Ease. Where culture meets premium streetwear.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-black dark:text-white mb-2">
            Quick Links
          </h4>
          {[
            { to: "/", label: "Home" },
            { to: "/shop", label: "Shop" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/admin", label: "Admin" },
          ].map((item) => (
            <motion.div key={item.to} whileHover={{ x: 4 }}>
              <Link
                to={item.to}
                className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Socials (WhatsApp, Instagram, TikTok only) */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-black dark:text-white mb-2">
            Connect With Us
          </h4>
          <div className="flex gap-4 text-black dark:text-white">
            <motion.a
              href={buildWhatsAppRedirect('', '2349018318911')}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 3 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/70 dark:bg-neutral-800/70 ring-1 ring-stone-200/70 dark:ring-stone-700/70"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </motion.a>
            <motion.a
              href="https://instagram.com/steezeupnow"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 3 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/70 dark:bg-neutral-800/70 ring-1 ring-stone-200/70 dark:ring-stone-700/70"
              aria-label="Instagram"
              title="Instagram"
            >
              <FaInstagram size={18} />
            </motion.a>
            <motion.a
              href="https://tiktok.com/@steezethe"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 3 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/70 dark:bg-neutral-800/70 ring-1 ring-stone-200/70 dark:ring-stone-700/70"
              aria-label="TikTok"
              title="TikTok"
            >
              <SiTiktok size={18} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="border-t border-stone-200/60 dark:border-stone-800/60 py-6">
        <p className="text-center text-xs text-black/70 dark:text-white/70">
          © {new Date().getFullYear()} The Steeze Store. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
}
