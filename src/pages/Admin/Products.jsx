import { useEffect, useMemo, useState } from 'react'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const ALL_SIZES = ['XL','XXL','XXXL']

// Format numbers as Nigerian Naira without decimals, e.g., ₦30,000
const formatNaira = (val) => {
  const n = Number(val || 0)
  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n)
  } catch {
    return `₦${(n || 0).toLocaleString('en-NG')}`
  }
}

export default function Products(){
  const [items,setItems]=useState([])
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [category,setCategory]=useState('Standard')
  const [price,setPrice]=useState('')
  const [sizes,setSizes]=useState([...ALL_SIZES])
  const [files,setFiles]=useState([])
  const [previews,setPreviews]=useState([])
  const [submitting,setSubmitting]=useState(false)
  const [loading,setLoading]=useState(true)
  const [err,setErr]=useState('')

  const load = async ()=> {
    setLoading(true); setErr('')
    try {
      const d = await api.get('/admin/products')
      setItems(d.data?.items || d.items || [])
    } catch (e) {
      setErr(e?.response?.data?.message || 'Load failed')
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=>{ load() },[])

  // image previews
  useEffect(()=>{
    const urls = files.map(f=>URL.createObjectURL(f))
    setPreviews(urls)
    return () => urls.forEach(u=>URL.revokeObjectURL(u))
  },[files])

  const toggleSize = (s) => {
    setSizes(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s])
  }

  const validForCreate = useMemo(()=> title.trim() && files.length>0 && Number(price)>0, [title, files, price])

  const submit = async (e)=> {
    e.preventDefault()
    if (!validForCreate) {
      toast.error('Please add a title and at least one portrait image.')
      return
    }
    const fd = new FormData()
    fd.append('title', title.trim())
    fd.append('description', description.trim())
    fd.append('category', category.trim() || 'Standard')
  fd.append('price', String(price))
    fd.append('sizes', JSON.stringify(sizes))
    for (const f of files) fd.append('images', f)

    try {
      setSubmitting(true)
      await api.post('/admin/products', fd, { headers: { 'Content-Type':'multipart/form-data' } })
      toast.success('Product created')
  setTitle(''); setDescription(''); setCategory('Standard'); setPrice(''); setSizes([...ALL_SIZES]); setFiles([])
      await load()
      // scroll to list to show result
      document.getElementById('admin-products-list')?.scrollIntoView({ behavior:'smooth' })
    } catch (e){ 
      const msg = e?.response?.data?.issues?.join('; ') || e?.response?.data?.message || 'Create failed'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
  <section className="space-y-8 relative z-10 text-stone-950 dark:text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="text-sm text-stone-600 dark:text-stone-300">Create new items and manage existing ones</div>
      </div>

      {/* CREATE CARD */}
      <form onSubmit={submit} className="glass p-5 space-y-5 relative">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Title<span className="text-red-500">*</span></label>
            <input
              className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900"
              placeholder="e.g. Oversized Steeze Tee"
              value={title} onChange={e=>setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Category (type to create)</label>
            <input
              className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900"
              placeholder="Standard or New Drop or your own..."
              value={category} onChange={e=>setCategory(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Price (₦)<span className="text-red-500">*</span></label>
            <input
              type="number" min="0" step="1"
              className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900"
              placeholder="e.g. 30000"
              value={price}
              onChange={e=>setPrice(e.target.value)}
            />
            {Number(price)>0 && (
              <div className="text-xs text-stone-600 dark:text-stone-300">Preview: {formatNaira(price)}</div>
            )}
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900"
              rows={3}
              placeholder="Short description customers will see"
              value={description} onChange={e=>setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sizes</label>
          <div className="flex flex-wrap gap-3">
            {ALL_SIZES.map(s=>(
              <label key={s} className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900">
                <input type="checkbox" checked={sizes.includes(s)} onChange={()=>toggleSize(s)} />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Images (portrait)</label>
            <span className="text-xs text-stone-600 dark:text-stone-300">1000×1500–1500×2000 • JPG/PNG/WebP</span>
          </div>
          <input
            type="file" multiple accept="image/*"
            className="w-full"
            onChange={e=>setFiles([...e.target.files].slice(0,8))}
          />
          {previews.length>0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
              {previews.map((u,i)=>(
                <div key={i} className="w-full aspect-[2/3] overflow-hidden rounded-xl border bg-white dark:bg-neutral-900">
                  <img src={u} alt={`preview-${i}`} className="w-full h-full object-cover"/>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky actions bar */}
        <div className="sticky bottom-2 left-0">
          <div className="mt-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl border p-3 flex items-center justify-end gap-3 shadow">
            <Button
              type="button"
              variant="outline"
              onClick={() => { setTitle(''); setDescription(''); setCategory('Standard'); setPrice(''); setSizes([...ALL_SIZES]); setFiles([]) }}
            >Reset</Button>
            <Button
              type="submit"
              disabled={!validForCreate || submitting}
              className="px-5"
            >
              {submitting ? 'Uploading…' : 'Create product'}
            </Button>
          </div>
        </div>
      </form>

      {/* LIST */}
      <div id="admin-products-list" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Existing products</h2>
          {loading && <span className="text-sm text-stone-600 dark:text-stone-300">Loading…</span>}
        </div>
        {err && <p className="text-sm text-red-600">{err}</p>}
        {(!loading && items.length===0) && <p className="text-stone-600 dark:text-stone-300">No products yet.</p>}
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map(p=>(
            <ProductCardAdmin key={p._id} product={p} onChange={load}/>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCardAdmin({ product, onChange }){
  const [title,setTitle] = useState(product.title)
  const [description,setDescription] = useState(product.description||'')
  const [category,setCategory] = useState(product.category||'Standard')
  const [price,setPrice] = useState(product.price || 0)
  const [sizes,setSizes] = useState(product.sizes?.length?product.sizes:['XL','XXL','XXXL'])
  const [addFiles,setAddFiles] = useState([])
  const [delIds,setDelIds] = useState(new Set())
  const [saving,setSaving] = useState(false)

  const toggleSize = (s)=> setSizes(prev => prev.includes(s)? prev.filter(x=>x!==s) : [...prev, s])
  const toggleDelete = (publicId) => {
    setDelIds(prev => {
      const cp = new Set(prev)
      cp.has(publicId) ? cp.delete(publicId) : cp.add(publicId)
      return cp
    })
  }

  const save = async () => {
    const fd = new FormData()
    fd.append('title', title)
    fd.append('description', description)
    fd.append('category', category)
  if (Number(price)>0) fd.append('price', String(price))
    fd.append('sizes', JSON.stringify(sizes))
    if (delIds.size) fd.append('deletePublicIds', Array.from(delIds).join(','))
    for (const f of addFiles) fd.append('images', f)
    try {
      setSaving(true)
      await api.put(`/admin/products/${product._id}`, fd, { headers:{'Content-Type':'multipart/form-data'} })
      toast.success('Saved')
      setAddFiles([]); setDelIds(new Set())
      onChange && onChange()
    } catch (e){
      toast.error(e?.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const remove = async ()=>{
    if (!confirm('Delete this product?')) return
    try { await api.delete(`/admin/products/${product._id}`); toast.success('Deleted'); onChange&&onChange() }
    catch { toast.error('Delete failed') }
  }

  return (
  <div className="glass p-4 space-y-3 text-stone-950 dark:text-white">
      <div className="relative">
  <div className="grid grid-cols-3 gap-2 text-stone-950 dark:text-white">
          {product.images?.map(img=>(
            <button
              key={img.publicId}
              type="button"
              className={`relative w-full aspect-[2/3] rounded-lg overflow-hidden border tap ${delIds.has(img.publicId)?'opacity-60 ring-2 ring-red-500':''}`}
              title="Click to mark for deletion"
              onClick={()=>toggleDelete(img.publicId)}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover"/>
              {delIds.has(img.publicId) && (
                <span className="absolute inset-0 grid place-items-center text-xs bg-black/40 text-white">Remove</span>
              )}
            </button>
          ))}
        </div>
        <div className="absolute -top-2 -left-2">
          <span className="inline-flex items-center rounded-xl px-3 py-1 text-xs font-semibold bg-white/80 dark:bg-neutral-900/80 backdrop-blur border text-stone-900 dark:text-white shadow">
            {formatNaira(price || product.price)}
          </span>
        </div>
      </div>

      <div className="grid gap-2">
  <input className="px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900" value={title} onChange={e=>setTitle(e.target.value)} />
  <textarea className="px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900" rows={2} value={description} onChange={e=>setDescription(e.target.value)} />
  <input className="px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900" value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category"/>
  <input type="number" min="0" step="1" className="px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price (₦)"/>

        <div className="flex flex-wrap gap-3 text-sm">
          {ALL_SIZES.map(s=>(
            <label key={s} className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900">
              <input type="checkbox" checked={sizes.includes(s)} onChange={()=>toggleSize(s)} /> {s}
            </label>
          ))}
        </div>

        <div>
          <label className="text-sm font-medium">Add more images</label>
          <input type="file" multiple accept="image/*" className="w-full mt-1" onChange={e=>setAddFiles([...e.target.files].slice(0,8))}/>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <Button type="button" variant="outline" onClick={remove}>Delete</Button>
        <Button type="button" onClick={save} disabled={saving}>{saving?'Saving…':'Save'}</Button>
      </div>
    </div>
  )
}
