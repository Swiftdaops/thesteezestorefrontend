import { useEffect, useMemo, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useCart } from '@/lib/store'
import { buildCloudinaryUrl } from '@/lib/cloudinary'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }){
  const add = useCart(s=>s.add)
  const [size, setSize] = useState('Not sure')

  const first = product?.images?.[0]?.publicId || product?.images?.[0]?.url
  const img = first ? (product?.images?.[0]?.publicId ? buildCloudinaryUrl(first, { w: 1000, h: 1500 }) : first) : null

  const addToCart = () => {
    const sizeVal = size === 'Not sure' ? 'NOT_SURE' : size
    add({ id: product._id, title: product.title, price: product.price, image: img, size: sizeVal, qty: 1 })
    toast.success(`Added (${size})`)
  }

  // liked state persisted per product using localStorage (by product id)
  const storageKey = useMemo(()=> `liked:${product._id}`, [product._id])
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(product.likes || 0)

  useEffect(()=>{
    try { setLiked(!!window.localStorage.getItem(storageKey)) } catch {}
  }, [storageKey])

  const like = async (e) => {
    e.preventDefault()
    if (liked) return
    try {
      const r = await api.post(`/products/${product._id}/like`)
      const newLikes = r.data?.likes ?? likes + 1
      setLikes(newLikes)
      setLiked(true)
      try { window.localStorage.setItem(storageKey, '1') } catch {}
      toast.success('Liked')
    } catch {
      toast.error('Like failed')
    }
  }

  const sizes = (product.sizes?.length ? product.sizes : ['XL','XXL','XXXL'])

  return (
  <div className="space-y-2 hover-float text-black dark:text-white">
      <Link to={`/shop/${product._id}`}>
        <div className="portrait-box glass">
          {img ? <img src={img} alt={product.title} loading="lazy" width="1000" height="1500"/> :
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />}
        </div>
      </Link>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-sm">{product.title}</h3>
          <p className="text-xs opacity-70">₦{product.price?.toLocaleString()}</p>
          <div className="mt-1 flex items-center gap-2">
            <select className="text-xs px-2 py-1 rounded-xl glass" value={size} onChange={e=>setSize(e.target.value)}>
              {sizes.map(s=><option key={s} value={s}>{s}</option>)}
              <option>Not sure</option>
            </select>
            <button
              onClick={like}
              disabled={liked}
              className={`px-2 py-1 rounded-lg text-xs inline-flex items-center gap-1 transition tap ${liked ? 'bg-rose-600 text-white opacity-90' : 'glass hover:bg-rose-50 hover:text-rose-700'} `}
              title={liked ? 'You liked this' : 'Like'}
            >
              <FaHeart className={`${liked ? 'fill-current' : 'text-rose-600'}`} size={12} />
              {liked ? 'Liked' : 'Like'}
              <span className="opacity-70">{likes}</span>
            </button>
          </div>
        </div>
        <button onClick={addToCart} className="px-3 py-2 rounded-xl glass text-xs self-end tap">
          Add
        </button>
      </div>
    </div>
  )
}
