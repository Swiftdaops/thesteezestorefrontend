import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-coverflow";

// Build the models endpoint from available envs
const ENV = import.meta.env;
const API_URL = (ENV.VITE_API_URL || "").replace(/\/$/, ""); // e.g. http://localhost:5000/api
const API_BASE = (ENV.VITE_API_BASE_URL || ENV.VITE_BASE_URL || "").replace(/\/$/, ""); // e.g. http://localhost:3001
const MODELS_PREFIX = (ENV.VITE_CLOUDINARY_MODELS_PREFIX || "").trim(); // optional, e.g. steezemodels/
const MODELS_QUERY = MODELS_PREFIX ? `?prefix=${encodeURIComponent(MODELS_PREFIX)}` : "";
const MODELS_ENDPOINT = API_URL
  ? `${API_URL}/models${MODELS_QUERY}`
  : API_BASE
  ? `${API_BASE}/api/models${MODELS_QUERY}`
  : `/api/models${MODELS_QUERY}`;

// Insert Cloudinary transforms into a full URL (between /upload/ and the public_id)
const withCldTransform = (url, t = "f_auto,q_auto,dpr_auto,ar_3:4,c_fill,g_auto,w_1200") =>
  url.includes("/upload/") ? url.replace("/upload/", `/upload/${t}/`) : url;

export default function ModelsSection() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const r = await fetch(MODELS_ENDPOINT);
        const data = await r.json();
        if (!cancelled) setUrls((data.urls || []).filter(Boolean));
      } catch (e) {
        console.error("Failed to load images", e);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const headline = "The Steeze Store Featured Models";
  const sub = "Where individuality meets Steeze — timeless, bold, and unapologetic.";
  // Ensure the slideshow moves even with a small list by duplicating slides (only from valid URLs)
  const MIN_SLIDES_FOR_LOOP = 4;
  const valid = (urls || []).filter(Boolean);
  let slides = valid;
  if (valid.length > 0 && valid.length < MIN_SLIDES_FOR_LOOP) {
    const times = Math.ceil(MIN_SLIDES_FOR_LOOP / valid.length);
    slides = Array.from({ length: valid.length * times }, (_, i) => valid[i % valid.length]);
  }
  const loopEnabled = slides.length > 1;
  const autoplayEnabled = slides.length > 1;

  // Cap slidesPerView dynamically so it's always less than the number of slides
  const svCap = Math.max(1, slides.length - 0.1);
  const svBase = Math.min(1.1, svCap);
  const sv640 = Math.min(1.25, svCap);
  const sv768 = Math.min(1.8, svCap);
  const sv1024 = Math.min(2.1, svCap);
  const sv1280 = Math.min(2.4, svCap);

  return (
    <section
      className="
        relative w-screen left-1/2 right-1/2 -mx-[50vw]
        m-2 md:pt-12 lg:pt-16 pb-0
        overflow-hidden
        text-stone-950 dark:text-white
        mb-8 md:mb-12 lg:mb-16
      "
    >
      <div className="max-w-none lg:max-w-7xl mx-auto px-0 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="
            p-4 sm:p-6 md:p-8 lg:p-10
            rounded-none border-0
            lg:rounded-2xl lg:border
            dark
            relative overflow-hidden
            mb-6 md:mb-8 lg:mb-10
          "
        >
          <div className="pointer-events-none absolute inset-0 rounded-none lg:rounded-2xl bg-gradient-to-tr from-white/20 to-transparent dark:from-white/5 dark:to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-start gap-3 mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">{headline}</h2>
            <p className="text-stone-700 dark:text-white text-lg max-w-3xl">{sub}</p>
          </motion.div>

          {/* Carousel (no pagination or arrows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-10 mb-6 md:mb-8"
          >
            <Swiper
              key={`swiper-${slides.length}-${loopEnabled ? 'loop' : 'noloop'}`}
              modules={[Autoplay, EffectCoverflow]}
              centeredSlides
              loop={loopEnabled}
              rewind={!loopEnabled}
              autoplay={autoplayEnabled ? { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: false } : false}
              speed={900}
              effect="coverflow"
              coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 0.9, slideShadows: false }}
              observer
              observeParents
              resizeObserver
              watchOverflow={false}
              loopAdditionalSlides={Math.max(2, Math.min(6, slides.length))}
              slidesPerGroup={1}
              slidesPerView={svBase}
              spaceBetween={16}
              breakpoints={{
                640: { slidesPerView: sv640, spaceBetween: 18 },
                768: { slidesPerView: sv768, spaceBetween: 20 },
                1024: { slidesPerView: sv1024, spaceBetween: 22 },
                1280: { slidesPerView: sv1280, spaceBetween: 24 },
              }}
            >
              {slides.map((rawUrl, idx) => {
                if (!rawUrl) return null;
                const src = withCldTransform(rawUrl, "f_auto,q_auto,dpr_auto,ar_3:4,c_fill,g_auto,w_1200");
                const srcMd = withCldTransform(rawUrl, "f_auto,q_auto,dpr_auto,ar_3:4,c_fill,g_auto,w_900");
                const srcSm = withCldTransform(rawUrl, "f_auto,q_auto,dpr_auto,ar_3:4,c_fill,g_auto,w_600");
                return (
                  <SwiperSlide key={`${rawUrl}-${idx}`}>
                    <div
                      className="
                        relative h-[400px] sm:h-[460px] md:h-[560px]
                        rounded-none lg:rounded-2xl overflow-hidden
                        ring-0 lg:ring-1 lg:ring-stone-200/60 dark:lg:ring-stone-800/60
                        bg-white/70 dark:bg-neutral-900/60 backdrop-blur
                        shadow-none lg:shadow-[0_16px_48px_rgba(0,0,0,0.12)]
                        transition-all
                        mb-4
                      "
                    >
                      <img
                        src={src}
                        srcSet={`${srcSm} 600w, ${srcMd} 900w, ${src} 1200w`}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 800px"
                        alt="Steeze Model"
                        className="absolute inset-0 h-full w-full object-cover select-none"
                        draggable="false"
                        loading="lazy"
                        decoding="async"
                        onError={() => setUrls((prev) => prev.filter((u) => u !== rawUrl))}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative z-10 mt-10 flex justify-center"
          >
            <Link
              to="/shop"
              className="
                inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold
                text-white bg-gradient-to-r from-stone-900 to-stone-700
                dark:from-stone-900 dark:to-stone-700 dark:text-white
                shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all
                mb-2
              "
            >
              Start Shopping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
