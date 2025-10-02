import { useState } from 'react'
import { useCart } from '@/lib/store'
import { api } from '@/lib/api'
import { buildWhatsAppPaymentLink } from '@/lib/whatsapp'
import { AnimatePresence, motion } from 'framer-motion'

export default function Checkout(){
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [anim, setAnim] = useState(false)
  const items = useCart(s=>s.items)
  const total = items.reduce((s,i)=> s + (i.price||0)*(i.qty||0), 0)

  const onCheckout = async () => {
    if(!name.trim()) return
    setAnim(true)
    try {
      await api.post('/orders', {
        customerName: name,
        customerPhone: phone,
        items: items.map(i => ({ productId:i.id, title:i.title, price:i.price, qty:i.qty, size:i.size||'NOT_SURE' }))
      }).catch(()=>{})
    } finally {
  const url = buildWhatsAppPaymentLink(name, total, '2349018318911')
      setTimeout(()=>{ window.open(url, '_blank'); setAnim(false) }, 700)
    }
  }

  return (
    <section className="space-y-4 text-black dark:text-white">
      <h1 className="text-xl font-bold">Checkout</h1>
      {/* Order summary */}
      <div className="glass p-4 space-y-3">
        <h2 className="font-semibold">Order Summary</h2>
        {items.length === 0 ? (
          <p className="opacity-70 text-sm">Your cart is empty.</p>
        ) : (
          <div className="space-y-2">
            {items.map((it) => (
              <div key={`${it.id}:${it.size}`} className="flex items-start justify-between gap-3">
                <div className="text-sm">
                  <div className="font-medium">{it.title} × {it.qty}</div>
                  <div className="opacity-70">Size: {it.size === 'NOT_SURE' ? 'Not sure' : it.size}</div>
                </div>
                <div className="text-sm font-semibold">₦{(it.price * it.qty).toLocaleString()}</div>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₦{total.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm">Your Name (required)</label>
        <input className="w-full px-3 py-2 rounded-xl glass" placeholder="Enter name" value={name} onChange={e=>setName(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Phone number (for order updates)</label>
        <input
          className="w-full px-3 py-2 rounded-xl glass"
          inputMode="tel"
          placeholder="e.g. 0803 123 4567"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
        />
        <p className="text-xs opacity-70 mt-1">Adding your phone helps us merge your orders across devices and reach you if needed.</p>
      </div>
      <button disabled={!name.trim() || items.length===0} onClick={onCheckout} className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black disabled:opacity-40">
        Checkout • ₦{total.toLocaleString()}
      </button>

      <AnimatePresence>
        {anim && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className="px-6 py-4 rounded-2xl glass text-2xl font-bold"
              initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.9,opacity:0}}>
              {name.toUpperCase()} SHOPPING...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
