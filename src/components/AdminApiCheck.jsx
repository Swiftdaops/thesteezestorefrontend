import { useState } from 'react'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const checks = [
  { key: 'health', label: 'GET /health', call: () => api.get('/health') },
  { key: 'me', label: 'GET /admin/me', call: () => api.get('/admin/me') },
  { key: 'products', label: 'GET /admin/products', call: () => api.get('/admin/products') },
  { key: 'orders', label: 'GET /admin/orders', call: () => api.get('/admin/orders') },
  { key: 'customers', label: 'GET /admin/customers', call: () => api.get('/admin/customers') },
  { key: 'analytics', label: 'GET /admin/analytics/overview', call: () => api.get('/admin/analytics/overview') },
]

export default function AdminApiCheck(){
  const [results, setResults] = useState({})
  const [running, setRunning] = useState(false)

  const run = async () => {
    setRunning(true); const out={}
    for (const c of checks) {
      try { await c.call(); out[c.key]={ok:true} }
      catch(e){ out[c.key]={ok:false, message:e?.response?.data?.message || e.message} }
    }
    setResults(out); setRunning(false)
    const failed = Object.values(out).filter(x=>!x.ok).length
    failed ? toast.error(`${failed} failed`) : toast.success('All checks passed')
  }

  return (
  <div className="p-4 rounded-2xl border text-stone-950 dark:text-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">API Checker</h3>
        <Button onClick={run} disabled={running}>{running?'Checking…':'Run checks'}</Button>
      </div>
      <ul className="space-y-2 text-sm">
        {checks.map(c=>{
          const r=results[c.key]
          return (
            <li key={c.key} className="flex items-center justify-between">
              <span>{c.label}</span>
              <span className={r?(r.ok?'text-green-600':'text-red-600'):'text-stone-500 dark:text-stone-400'}>
                {r?(r.ok?'OK':r.message):'—'}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
