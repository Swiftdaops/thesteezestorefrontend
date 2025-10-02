import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '@/lib/api'
import { useCart } from '@/lib/store'
import { buildCloudinaryUrl } from '@/lib/cloudinary'
import { toast } from 'sonner'
import CartDrawer from '@/components/CartDrawer'
export default function ProductDetails(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [size, setSize] = useState('Not sure')
  const add = useCart(s=>s.add)

  useEffect(()=>{ (async()=>{
    const d = await api.get(`/products/${id}`)
    setP(d.data || d)
  })().catch(()=>{}) },[id])

  // Build array of image URLs (Cloudinary or direct)
  const allImgs = useMemo(() => {
    const arr = ((p?.images) || []).map((img) => img?.publicId ? buildCloudinaryUrl(img.publicId, { w: 1200, h: 1800 }) : img?.url).filter(Boolean)
    return arr.length ? arr : [null]
  }, [p])
  const [active, setActive] = useState(0)
  useEffect(()=>{ setActive(0) }, [p?._id])
  const img = allImgs[active]
  const sizes = (p?.sizes?.length ? p.sizes : ['XL','XXL','XXXL'])

  if (!p) return <p className="opacity-70">Loading…</p>

  const addToCart = () => {
    const sizeVal = size === 'Not sure' ? 'NOT_SURE' : size
    add({ id: p._id, title: p.title, price: p.price, image: img, size: sizeVal, qty: 1 })
    toast.success(`Added (${size})`)
  }

  const like = async () => {
    try { await api.post(`/products/${p._id}/like`); toast.success('Liked') }
    catch { toast.error('Like failed') }
  }

  return (
  <section className="grid sm:grid-cols-2 gap-6 text-black dark:text-white mt-20">
      <div className="space-y-3">
        {/* Main image with prev/next controls */}
        <div className="relative portrait-box glass">
          {img ? (
            <img src={img} alt={p.title} />
          ) : (
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
          )}
          {allImgs.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActive((i) => (i - 1 + allImgs.length) % allImgs.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-white/80 dark:bg-neutral-900/80 border tap"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setActive((i) => (i + 1) % allImgs.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-white/80 dark:bg-neutral-900/80 border tap"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {allImgs.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {allImgs.map((u, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative w-16 sm:w-20 aspect-[2/3] rounded-lg overflow-hidden border tap ${i===active ? 'ring-2 ring-stone-900 dark:ring-white' : ''}`}
                aria-label={`View image ${i+1}`}
              >
                {u ? (
                  <img src={u} alt={`${p.title} ${i+1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{p.title}</h1>
        <p className="opacity-70">₦{p.price?.toLocaleString()}</p>
        <div className="flex items-center gap-3">
          <label className="text-sm">Size</label>
          <select className="text-sm px-3 py-2 rounded-xl glass" value={size} onChange={e=>setSize(e.target.value)}>
            {sizes.map(s=><option key={s}>{s}</option>)}
            <option>Not sure</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={addToCart} className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black tap">Add to cart</button>
          <button onClick={like} className="underline opacity-70">Like</button>
        </div>
        <CartDrawer />
      </div>
    </section>
  )
}
