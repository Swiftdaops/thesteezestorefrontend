import React from "react";

export default function About() {
  return (
    <section
      className="
        max-w-3xl mx-auto px-4 py-10 md:py-12
  text-stone-950 dark:text-white
        pt-28 md:pt-32
        scroll-mt-28
      "
    >
      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          About The Steeze Store
        </h1>
        <p className="opacity-80 leading-relaxed">
          At The Steeze Store, we design premium streetwear and
          everyday basics that feel good, last long, and look right—without
          trying too hard. From limited drops to daily essentials, everything
          we ship is cut with intention and built for repeat wear.
        </p>
      </header>

      <div
        className="
          mt-8 rounded-2xl border
          border-white/10 dark:border-white/10
          bg-white/40 dark:bg-white/5
          backdrop-blur-xl
          p-5 md:p-6
          shadow-[0_0_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.25)]
        "
      >
        <h2 className="text-xl font-semibold mb-2">Our Promise</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Comfort-first fits and premium fabrics you’ll actually wear.</li>
          <li>Thoughtful sizing guidance—DM us if you’re unsure; we’ll help.</li>
          <li>Fast, human support on WhatsApp—no bots, just people.</li>
        </ul>

        {/* Free shipping notice */}
        <div className="mt-5 flex items-center gap-3">
          <span
            className="
              inline-flex items-center gap-2 rounded-full
              border border-lime-400/50 text-lime-700 dark:text-lime-300
              bg-lime-100/60 dark:bg-lime-500/10
              px-3 py-1 text-sm font-semibold
            "
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M3 7h11v10H3zM14 9h3l4 4v4h-7zM6 19a2 2 0 1 0 0 4a2 2 0 0 0 0-4m10 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4"/>
            </svg>
            Free shipping within Ifite, Awka (Nigeria)
          </span>
          <span className="text-sm opacity-70">
            Same-day drop-off on qualifying orders.
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div
          className="
            rounded-2xl border border-white/10
            bg-white/40 dark:bg-white/5 backdrop-blur-xl p-5
          "
        >
          <h3 className="font-semibold mb-1">Materials & Make</h3>
          <p className="opacity-80 text-sm leading-relaxed">
            We source mid-weight cottons and soft blends for drape and durability.
            Small-batch dyeing and reinforced seams mean they keep shape after wash.
          </p>
        </div>

        <div
          className="
            rounded-2xl border border-white/10
            bg-white/40 dark:bg-white/5 backdrop-blur-xl p-5
          "
        >
          <h3 className="font-semibold mb-1">Drops & Restocks</h3>
          <p className="opacity-80 text-sm leading-relaxed">
            Limited runs keep selections fresh. Core pieces restock on a rolling
            schedule—follow our updates to catch the next drop.
          </p>
        </div>
      </div>
    </section>
  );
}
