import React, { useEffect, useRef } from 'react'
import { buildWhatsAppRedirect } from '@/lib/whatsapp'
import { FaUndoAlt, FaLock, FaShippingFast, FaMapMarkerAlt } from 'react-icons/fa'

const whatsappLink = buildWhatsAppRedirect(
  'Hello, my name is .... I would like to know where THESTEEZESTORE is located.',
  '2349018318911'
)

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    try {
      const v = videoRef.current
      if (!v) return
      // Ensure inline playback attributes for iOS
      v.setAttribute('playsinline', '')
      v.setAttribute('webkit-playsinline', '')
      // Ensure muted before attempting to play (required for autoplay on many mobile browsers)
      v.muted = true
      const p = v.play()
      if (p && typeof p.then === 'function') p.catch(() => {})
    } catch (e) {
      // no-op
    }
  }, [])
  return (
    <section className="text-stone-950 dark:text-stone-100 p-0 m-0">
  <div className="relative w-screen min-h-[100svh] overflow-hidden p-0 m-0">
        {/* Full-bleed video */}
        <video
          ref={videoRef}
          className="absolute inset-0 -z-0 w-full h-full object-cover pointer-events-none"
          src="https://res.cloudinary.com/dnitzkowt/video/upload/v1759317802/steeze_eleoxe.mov"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />

        {/* Light scrim for readability (no yellow) */}
        <div className="absolute inset-0 -z-0 pointer-events-none bg-gradient-to-b from-white/20 via-white/10 to-white/20 dark:from-black/10 dark:via-black/20 dark:to-black/30" />

        {/* Content grid: center content + bottom badges */}
        <div className="absolute inset-0 z-10 flex flex-col">
          {/* Centered content */}
          <div className="flex-1 grid place-items-center px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">Welcome to The Steeze Store</h1>
              <p className="text-base md:text-lg mb-5 font-extrabold">Style with Ease at our store.</p>

              <div>
                <h3 className="text-sm md:text-base">
                  Store Location - NOS14 & 15 KAMSMIC PLAZA, IFITE, AWKA, ANAMBRA.
                </h3>
                <div className="flex justify-center items-center gap-3 py-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 md:px-6 py-2 md:py-3 rounded-xl text-base md:text-lg font-semibold flex items-center
                               border border-neutral-200 dark:border-neutral-800
                               bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20
                               backdrop-blur transition"
                  >
                    GET DIRECTION
                    <span className="ml-2 flex items-center">
                      <FaMapMarkerAlt className="w-5 h-5 opacity-80" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom badges (fixed to bottom, no layout shift) */}
          <div className="w-full pb-6 md:pb-8 px-4">
            <div className="mx-auto max-w-5xl flex flex-wrap justify-center gap-4 md:gap-20">
              <span className="flex items-center text-xs md:text-sm">
                <FaUndoAlt className="w-4 h-4 md:w-5 md:h-5 mr-1" /> 30-Day Returns
              </span>
              <span className="flex items-center text-xs md:text-sm">
                <FaLock className="w-4 h-4 md:w-5 md:h-5 mr-1" /> Secure Checkout
              </span>
              <span className="flex items-center text-xs md:text-sm">
                <FaShippingFast className="w-4 h-4 md:w-5 md:h-5 mr-1" /> Fast Shipping
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
