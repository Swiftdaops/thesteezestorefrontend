import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/lib/authStore'

export default function RequireAdmin(){
  const { user, check } = useAuth()
  const [ready, setReady] = useState(false)
  useEffect(()=>{ (async()=>{ await check(); setReady(true) })() }, [check])
  if (!ready) return <div className="p-6 text-black dark:text-white">Checking session…</div>
  if (!user) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
