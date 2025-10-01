import { useEffect, useMemo, useState } from 'react'
import { api } from '@/lib/api'
import ProductCard from './ProductCard'

export default function ProductGrid({ category, onCategories }){
  const [items, setItems] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    (async ()=>{
      try {
        const d = await api.get('/products')
        const list = d.data?.items || d.items || []
        setItems(list)
        // Emit unique categories for parent filter (case-insensitive de-dupe, preserve first seen casing)
        if (typeof onCategories === 'function') {
          const seen = new Map()
          for (const p of list) {
            const raw = (p.category || '').toString().trim()
            if (!raw) continue
            const key = raw.toLowerCase()
            if (!seen.has(key)) seen.set(key, raw)
          }
          const cats = Array.from(seen.values())
          onCategories(cats)
        }
      }
      catch(e){ setErr(e?.response?.data?.message || 'Failed to load') }
    })()
  }, [onCategories])

  const visible = useMemo(()=>{
    if (!items) return null
    if (!category || category === 'All') return items
    const c = String(category).toLowerCase()
    return items.filter(p => String(p.category || '').toLowerCase() === c)
  }, [items, category])

  if (err) return <p className="text-sm text-red-600">{err}</p>
  if (!items) return <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {Array.from({length:6}).map((_,i)=>(
      <div key={i} className="space-y-2">
        <div className="portrait-box bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-2xl" />
        <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
      </div>
    ))}
  </div>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {(visible || []).map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  )
}
