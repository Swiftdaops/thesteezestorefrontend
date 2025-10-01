import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { toast } from 'sonner'

export default function Orders(){
  const [items,setItems]=useState([])

  const load = async ()=> {
    const d = await api.get('/admin/orders')
    setItems(d.data?.items || d.items || [])
  }
  useEffect(()=>{ load().catch(()=>toast.error('Load failed')) },[])

  const update = async (id, status)=> {
    try { await api.put(`/admin/orders/${id}/status`, { status }); toast.success('Updated'); load() }
    catch { toast.error('Update failed') }
  }

  return (
  <section className="space-y-4 text-black dark:text-white">
      <h1 className="text-xl font-bold">Orders</h1>
      <div className="space-y-3">
        {items.map(o=>(
          <div key={o._id} className="glass p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{o.customerName}</p>
                <p className="text-sm text-stone-600 dark:text-stone-300">₦{o.total?.toLocaleString()} • {o.status}</p>
              </div>
              <select className="text-sm px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900" value={o.status} onChange={e=>update(o._id, e.target.value)}>
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>
            <ul className="mt-2 text-sm table-text text-stone-700 dark:text-stone-300">
              {o.items?.map((it,i)=>(
                <li key={i}>• {it.title} x{it.qty} (Size: {it.size==='NOT_SURE'?'Not sure':it.size})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
