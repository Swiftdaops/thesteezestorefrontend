import React, { useState } from 'react'

export default function Contact(){
  const [name, setName] = useState('')
  const [message, setMessage] = useState('Hi Steeze team, I have a question about...')

  const contactText = `Hi my name is ${name || 'Customer'}.\n${message || ''}`.trim()
  const link = '/api/whatsapp?text=' + encodeURIComponent(contactText)

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
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="opacity-80 leading-relaxed">We usually reply in minutes on WhatsApp.</p>
      </header>

      <div
        className="
          mt-8 rounded-2xl border
          border-white/10 dark:border-white/10
          bg-white/40 dark:bg-white/5
          backdrop-blur-xl
          p-5 md:p-6
          shadow-[0_0_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.25)]
          space-y-3
        "
      >
        <div>
          <label className="block text-sm mb-1">Your Name</label>
          <input
            className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
            placeholder="e.g. Ade"
            value={name}
            onChange={e=>setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea
            className="w-full px-3 py-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
            rows={4}
            value={message}
            onChange={e=>setMessage(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Chat on WhatsApp
          </a>
          <span className="text-xs opacity-70">Opens WhatsApp with your message prefilled</span>
        </div>
      </div>
    </section>
  )
}
