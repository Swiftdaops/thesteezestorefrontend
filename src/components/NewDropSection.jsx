import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFire, FaLock, FaUndoAlt, FaShieldAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const container = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 16, when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

export default function NewDropSection() {
  return (
    <section className="relative py-0 md:py-6 lg:py-10 text-stone-950 dark:text-stone-100 bg-transparent dark:bg-stone-950">
      {/* Full width on mobile/tablet; constrained on lg+ */}
      <div className="max-w-none lg:max-w-7xl mx-auto px-0 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="
            grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center
            p-4 sm:p-6 md:p-8 lg:p-10
            backdrop-blur-xl
            /* Edge-to-edge look on mobile/tablet */
            rounded-none border-0
            /* Constrain/beautify on large screens */
            lg:rounded-2xl lg:border lg:border-stone-200/60 dark:lg:border-stone-800/60
            /* Plain backgrounds (no gradients) */
            bg-gray-50/90 dark:bg-stone-950
            relative overflow-hidden
          "
        >
          {/* Removed gradient overlay for plain background */}

          {/* LEFT: Copy + CTAs */}
          <div className="relative px-4 sm:px-6 md:px-2 lg:px-0">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
              bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 ring-1 ring-rose-200/70 dark:ring-rose-800/60"
            >
              <FaFire className="opacity-80" />
              New Drop
            </motion.div>

            <motion.h2 variants={item} className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
              Black Stone-Washed Collection
            </motion.h2>

            <motion.p variants={item} className="mt-4 text-stone-700 dark:text-stone-300 text-lg leading-relaxed">
              We’re bringing our first <span className="font-semibold">Stone-Washed</span> collection—crafted for
              everyday flex, engineered for longevity. Built from premium cotton, precision-finished, and styled to
              elevate your <span className="font-semibold">Steeze</span> on and off camera.
            </motion.p>

            <motion.ul variants={item} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <motion.li variants={item} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <FaTruckFast className="shrink-0" /> Same Day Delivery within Ifite, Awka.
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <FaShieldAlt className="shrink-0" /> Premium Build. Verified Quality.
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <FaLock className="shrink-0" /> Secure Checkout
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <FaUndoAlt className="shrink-0" /> 30-Day Returns
              </motion.li>
            </motion.ul>

            <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/shop"
                  className="
                    inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold
                    text-white bg-stone-900 dark:bg-stone-900
                    shadow-lg hover:shadow-xl transition-all
                  "
                >
                  Buy the Drop <FaFire className="ml-2" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/shop"
                  className="
                    inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold
                    ring-1 ring-stone-300/80 dark:ring-stone-700/70
                    text-stone-900 dark:text-stone-100
          bg-white/60 dark:bg-stone-900/60 backdrop-blur
          hover:bg-white/80 dark:hover:bg-stone-900/80 transition
                  "
                >
                  Explore TheSteezeStore
                </Link>
              </motion.div>

              <motion.span
                variants={item}
                className="
                  inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
                  bg-emerald-50 dark:bg-stone-900 text-emerald-700 dark:text-emerald-300
                  ring-1 ring-emerald-200/70 dark:ring-stone-700/60
                "
              >
                <FaTruckFast /> Free Shipping Included
              </motion.span>
            </motion.div>
          </div>

          {/* RIGHT: New Drop Images */}
          <motion.div variants={item} className="relative px-0">
            {/* Light mode image */}
            <img
              src="https://res.cloudinary.com/dnitzkowt/image/upload/v1759301696/steezestore/products/file_qzstmf.jpg"
              alt="Steeze Stone-Washed Drop — Light"
              className="block dark:hidden w-full max-w-none mx-auto rounded-none lg:rounded-2xl shadow-none lg:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
              draggable="false"
              loading="lazy"
            />
            {/* Dark mode image */}
            <img
              src="https://res.cloudinary.com/dnitzkowt/image/upload/v1759301696/steezestore/products/file_e1u5j8.jpg"
              alt="Steeze Stone-Washed Drop — Dark"
              className="hidden dark:block w-full max-w-none mx-auto rounded-none lg:rounded-2xl shadow-none lg:shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
              draggable="false"
              loading="lazy"
            />

            <div
              className="
                absolute -bottom-4 left-1/2 -translate-x-1/2
                px-4 py-2 rounded-xl text-xs font-semibold
                bg-white/70 dark:bg-stone-900 backdrop-blur
                ring-1 ring-stone-200/70 dark:ring-stone-700/60
                text-stone-700 dark:text-stone-200
              "
            >
              Stone-Washed • Limited Release
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
