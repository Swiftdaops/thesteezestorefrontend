import { useEffect, useMemo, useState } from 'react'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  Area, AreaChart, CartesianGrid
} from 'recharts'

const COLORS = ['#0ea5e9', '#f59e0b', '#22c55e', '#ef4444', '#a78bfa', '#14b8a6', '#f97316']

export default function Customers(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('totalSpent:desc')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [selected, setSelected] = useState(null) // selected customer summary
  const [profile, setProfile] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [orders, setOrders] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const load = async () => {
    setLoading(true); setErr('')
    try {
      const d = await api.get(`/admin/customers`, { params: { search, sort, page, limit } })
      const list = d.data?.items || d.items || []
      setItems(list)
      // Auto-select first on fresh search
      if (!selected && list.length > 0) selectCustomer(list[0])
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() // eslint-disable-next-line
  }, [sort, page, limit])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); load() }, 350)
    return () => clearTimeout(t)
  }, [search])

  const selectCustomer = async (c) => {
    setSelected(c); setDetailLoading(true); setProfile(null); setTimeline([]); setOrders(null)
    try {
      const r = await api.get(`/admin/customers/${c.cid || c.id || c._id}`)
      setProfile(r.data?.profile || r.profile || null)
      setTimeline(r.data?.timeline || r.timeline || [])
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to load profile')
    }
    // Try optional orders for richer charts
    try {
      const q = await api.get(`/admin/orders`, { params: { customerCid: (c.cid || c.id || c._id) } })
      setOrders(q.data?.items || q.items || null)
    } catch {
      // optional, ignore
    } finally {
      setDetailLoading(false)
    }
  }

  // Derived viz data
  const topCategoriesData = useMemo(() => {
    const arr = profile?.topCategories || []
    return arr.map((x, i) => ({ name: x.category, value: x.count, fill: COLORS[i % COLORS.length] }))
  }, [profile])

  const topProductsData = useMemo(() => {
    const arr = (profile?.topProducts || []).slice(0, 7)
    return arr.map((x) => ({ name: x.title, count: x.count }))
  }, [profile])

  // Activity over last 6 months: revenue if orders exist, else order counts from timeline
  const activityData = useMemo(() => {
    const now = new Date()
    const months = Array.from({ length: 6 }).map((_, idx) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - idx), 1)
      return { key: `${d.getFullYear()}-${d.getMonth() + 1}`, label: d.toLocaleString(undefined, { month: 'short' }) }
    })
    const map = new Map(months.map((m) => [m.key, { month: m.label, revenue: 0, orders: 0 }]))
    if (orders?.length) {
      for (const o of orders) {
        const t = new Date(o.createdAt || o.ts || o.date || o.updatedAt || Date.now())
        const key = `${t.getFullYear()}-${t.getMonth() + 1}`
        if (map.has(key)) {
          const row = map.get(key)
          row.revenue += (o.total || 0)
          row.orders += 1
        }
      }
    } else if (timeline?.length) {
      for (const ev of timeline) {
        if (ev.type !== 'ORDER_PLACED') continue
        const t = new Date(ev.ts)
        const key = `${t.getFullYear()}-${t.getMonth() + 1}`
        if (map.has(key)) {
          const row = map.get(key)
          row.orders += 1
        }
      }
    }
    return Array.from(map.values())
  }, [orders, timeline])

  const canPrev = page > 1
  const canNext = items.length === limit // heuristic without totalCount

  return (
    <section className="space-y-4 text-black dark:text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Customers</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search name or phone…"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-52"
          />
          <select
            className="text-sm px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900"
            value={sort}
            onChange={(e)=>{ setSort(e.target.value); setPage(1) }}
          >
            <option value="totalSpent:desc">Spent ↓</option>
            <option value="orderCount:desc">Orders ↓</option>
            <option value="lastSeenAt:desc">Last Seen ↓</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-stone-600 dark:text-stone-300">Page {page}</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={!canPrev}>Prev</Button>
              <Button variant="outline" onClick={()=>setPage(p=>p+1)} disabled={!canNext}>Next</Button>
              <select className="text-sm px-2 py-1 rounded-xl border bg-white dark:bg-neutral-900" value={limit} onChange={(e)=>{setLimit(Number(e.target.value)); setPage(1)}}>
                {[10,20,30].map(n=> <option key={n} value={n}>{n}/page</option>)}
              </select>
            </div>
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <div className="space-y-2">
            {loading && <div className="p-4 rounded-xl border animate-pulse">Loading…</div>}
            {!loading && items.map((c)=>{
              const spent = (c.totalSpent ?? c.rollups?.totalSpent ?? 0)
              const ordersCount = (c.orderCount ?? c.rollups?.orderCount ?? 0)
              return (
                <button
                  key={c.cid || c._id || c.id}
                  onClick={()=>selectCustomer(c)}
                  className={`w-full text-left glass p-4 rounded-xl transition ${selected && (selected.cid||selected._id||selected.id)===(c.cid||c._id||c.id) ? 'ring-2 ring-stone-900 dark:ring-white' : ''}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">{c.latestName || '—'}</div>
                      <div className="text-sm text-stone-600 dark:text-stone-300">{c.primaryPhone || 'No phone'}</div>
                    </div>
                    <div className="text-right text-sm">
                      <div>Orders: {ordersCount}</div>
                      <div>Spent: ₦{spent.toLocaleString()}</div>
                    </div>
                  </div>
                </button>
              )
            })}
            {!loading && items.length===0 && (
              <div className="p-4 rounded-xl border text-sm text-stone-600 dark:text-stone-300">No customers found.</div>
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass p-4 rounded-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-bold">{profile?.latestName || selected?.latestName || 'Customer'}</div>
                <div className="text-sm text-stone-600 dark:text-stone-300">{profile?.primaryPhone || selected?.primaryPhone || '—'}</div>
              </div>
              {profile?.lastSeenAt && (
                <div className="text-sm text-stone-600 dark:text-stone-300">Last seen {new Date(profile.lastSeenAt).toLocaleString()}</div>
              )}
            </div>
            <Separator className="my-3" />
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat title="Orders" value={profile?.orderCount ?? selected?.orderCount ?? 0} />
              <Stat title="Spent" value={`₦${(profile?.totalSpent ?? selected?.totalSpent ?? 0).toLocaleString()}`} />
              <Stat title="Avg Basket" value={profile?.avgBasketSize ?? selected?.avgBasketSize ?? 0} />
              <Stat title="Likes" value={profile?.likeCount ?? selected?.likeCount ?? 0} />
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-4 rounded-2xl">
              <h3 className="font-semibold mb-2">Top Categories</h3>
              {topCategoriesData.length ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={topCategoriesData} dataKey="value" nameKey="name" outerRadius={80} label>
                        {topCategoriesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : <div className="text-sm text-stone-600 dark:text-stone-300">No category data</div>}
            </div>

            <div className="glass p-4 rounded-2xl">
              <h3 className="font-semibold mb-2">Top Products</h3>
              {topProductsData.length ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProductsData} margin={{ top: 10, right: 10, left: 0, bottom: 24 }}>
                      <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} height={50} tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} />
                      <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', borderRadius: 8 }} />
                      <Bar dataKey="count" fill="#0ea5e9" radius={[6,6,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : <div className="text-sm text-stone-600 dark:text-stone-300">No product data</div>}
            </div>
          </div>

          <div className="glass p-4 rounded-2xl">
            <h3 className="font-semibold mb-2">Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', borderRadius: 8 }} />
                  {orders?.length ? (
                    <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" fill="url(#rev)" strokeWidth={2} />
                  ) : (
                    <Area type="monotone" dataKey="orders" stroke="#0ea5e9" fill="url(#rev)" strokeWidth={2} />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ title, value }){
  return (
    <div className="p-3 rounded-xl border">
      <div className="text-xs text-stone-600 dark:text-stone-300">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  )
}
