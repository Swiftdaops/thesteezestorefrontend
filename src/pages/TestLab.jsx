// src/pages/TestLab.jsx
import { useMemo } from 'react'
import { motion } from 'motion/react'                 // ✅ use Motion for React
import { FaReact } from 'react-icons/fa'
import { Activity, CheckCircle2 } from 'lucide-react'
import { Link, Outlet, NavLink } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { create } from 'zustand'

const useChecks = create((set) => ({
  list: {
    axios: false,
    zustand: false,
    sonner: false,
    reactIcons: false,
    lucide: false,
    framer: false,
    router: false,
    shadcn: false,
  },
  set: (k, v) => set((s) => ({ list: { ...s.list, [k]: v } })),
}))

export default function TestLab() {
  const { list, set } = useChecks()
  const allOk = useMemo(() => Object.values(list).every(Boolean), [list])

  const testAxios = async () => {
    try {
      await api.get('/health')
      set('axios', true)
      toast.success('Axios OK')
    } catch {
      toast.error('Axios failed')
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <Toaster richColors position="top-center" />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Test Lab</h1>
        <NavLink to="/lab/details" className="text-sm underline">
          Router test → details
        </NavLink>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}                // small gesture test
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="glass p-4"
      >
        <div className="flex items-center gap-3">
          <FaReact size={24} className="text-cyan-500" />
          <Activity size={22} />
          <span className="font-semibold">Visual kit</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={testAxios}>Test Axios (/health)</Button>

          <Button variant="outline" onClick={() => { set('zustand', true); toast.success('Zustand OK') }}>
            Test Zustand
          </Button>

          <Button variant="outline" onClick={() => { toast.message('Sonner Toast'); set('sonner', true) }}>
            Test Sonner
          </Button>

          <Button variant="outline" onClick={() => { set('reactIcons', true); toast.success('react-icons OK') }}>
            Test react-icons
          </Button>

          <Button variant="outline" onClick={() => { set('lucide', true); toast.success('lucide-react OK') }}>
            Test lucide-react
          </Button>

          <Button variant="outline" onClick={() => { set('framer', true); toast.success('motion/react OK') }}>
            Test motion
          </Button>

          <Button variant="outline" asChild>
            <Link to="/lab/details" onClick={() => set('router', true)}>Test router</Link>
          </Button>

          <Button variant="outline" onClick={() => { set('shadcn', true); toast.success('shadcn/ui OK') }}>
            Test shadcn/ui
          </Button>
        </div>
      </motion.div>

      <div className="glass p-4">
        <h3 className="font-semibold mb-3">Checklist</h3>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm">
          {Object.entries(list).map(([k, v]) => (
            <li key={k} className="flex items-center gap-2">
              <input type="checkbox" checked={v} readOnly />
              <span className={v ? 'line-through' : ''}>{k}</span>
              {v && <CheckCircle2 size={16} className="text-green-600" />}
            </li>
          ))}
        </ul>
        {allOk
          ? <p className="mt-3 text-green-700 dark:text-green-400">All tools confirmed. You’re ready to build!</p>
          : <p className="mt-3 opacity-70">Click each test to check it off.</p>}
      </div>

      <Outlet />
    </main>
  )
}
