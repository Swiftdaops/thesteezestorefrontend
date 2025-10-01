import React, { useState } from 'react'
import { buildWhatsAppContactLink } from '@/lib/whatsapp'

export default function Contact(){
  const [name, setName] = useState('')
  const [message, setMessage] = useState('Hi Steeze team, I have a question about...')
  const [businessNumber] = useState('') // optional: set your WhatsApp business number like '2348012345678'

  const link = buildWhatsAppContactLink(name || 'Customer', message, businessNumber)

  return (
    <section className="max-w-2xl mx-auto px-4 py-10 space-y-5 text-black dark:text-white">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <p className="opacity-80">We usually reply in minutes on WhatsApp.</p>

      <div className="glass p-4 rounded-2xl space-y-3">
        <div>
          <label className="block text-sm">Your Name</label>
          <input className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900" placeholder="e.g. Ade" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Message</label>
          <textarea className="w-full px-3 py-2 rounded-2xl border bg-white dark:bg-neutral-900" rows={4} value={message} onChange={e=>setMessage(e.target.value)} />
        </div>
        <div className="flex items-center gap-3">
          <a href={link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 tap">Chat on WhatsApp</a>
          <span className="text-xs opacity-70">Opens WhatsApp with your message prefilled</span>
        </div>
      </div>
    </section>
  )
}
