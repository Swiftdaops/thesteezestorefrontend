import { useCart } from '@/lib/store'
import { AnimatePresence, motion } from 'framer-motion'

export default function CartDrawer(){
  const open = useCart(s=>s.open)
  const setOpen = useCart(s=>s.setOpen)
  const items = useCart(s=>s.items)
  const remove = useCart(s=>s.remove)
  const inc = useCart(s=>s.inc)
  const dec = useCart(s=>s.dec)
  const total = items.reduce((s,i)=>s+i.price*i.qty,0)
  const count = items.reduce((s,i)=>s+i.qty,0)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)} />
          <motion.aside className="fixed right-0 top-0 bottom-0 w-[88%] sm:w-[420px] z-50 p-4 bg-white dark:bg-neutral-900 shadow-xl"
            initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button onClick={()=>setOpen(false)} className="px-3 py-2 rounded-xl glass text-sm">Close</button>
            </div>
            <div className="space-y-3 max-h-[70vh] overflow-auto pr-2">
              {items.length===0 && <p className="opacity-70">Cart is empty</p>}
              {items.map(it=>(
                <div key={`${it.id}:${it.size}`} className="flex gap-3 items-center">
                  <div className="w-16 h-24 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    {it.image && <img src={it.image} alt={it.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{it.title}</p>
                    <p className="text-xs opacity-70">Size: {it.size==='NOT_SURE'?'Not sure':it.size}</p>
                    <p className="text-xs opacity-70">₦{(it.price*it.qty).toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="px-2 py-1 rounded glass text-xs" onClick={()=>dec(it.id,it.size)}>-</button>
                      <span className="text-sm">{it.qty}</span>
                      <button className="px-2 py-1 rounded glass text-xs" onClick={()=>inc(it.id,it.size)}>+</button>
                      <button className="ml-3 text-xs opacity-70 underline" onClick={()=>remove(it.id,it.size)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₦{total.toLocaleString()}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={()=>setOpen(false)}
                  className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800"
                  type="button"
                >
                  Continue shopping
                </button>
                <a
                  href="/checkout"
                  onClick={()=>setOpen(false)}
                  className="flex-1 text-center px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black disabled:opacity-40"
                  aria-disabled={count===0}
                >
                  Checkout
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
