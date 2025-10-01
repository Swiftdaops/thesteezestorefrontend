import React from 'react'

export default function About(){
  return (
    <section className="max-w-3xl mx-auto px-4 py-10 space-y-4 text-black dark:text-white">
      <h1 className="text-2xl font-bold">About The Steeze Store</h1>
      <p className="opacity-80">
        The Steeze Store is where culture meets premium streetwear. We craft high-quality basics and
        limited drops inspired by the pulse of the city. Our mission is simple: help you express your
        style with ease — every day.
      </p>
      <div className="glass p-4 rounded-2xl">
        <h2 className="font-semibold mb-1">Our Promise</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90 text-sm">
          <li>Comfort-first fits and premium fabrics</li>
          <li>Thoughtful sizing — we’ll help you pick if you’re not sure</li>
          <li>Fast support via WhatsApp</li>
        </ul>
      </div>
    </section>
  )
}
