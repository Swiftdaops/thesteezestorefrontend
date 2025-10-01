import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/authStore'
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function AdminLogin(){
  const nav = useNavigate()
  const { login, loading, error } = useAuth()
  const [username,setUsername] = useState('admin')
  const [password,setPassword] = useState('')

  const submit = async (e)=> {
    e.preventDefault()
    const ok = await login(username, password)
    ok ? (toast.success('Logged in'), nav('/admin')) : toast.error(error || 'Login failed')
  }

  return (
  <main className="max-w-md mx-auto px-4 py-10 text-black dark:text-white">
      <Toaster richColors position="top-center" />
      <form onSubmit={submit} className="glass p-5 space-y-3">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <div>
          <label className="text-sm">Username</label>
          <input className="w-full mt-1 px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input type="password" className="w-full mt-1 px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <Button disabled={loading} className="w-full">{loading?'Signing in…':'Sign in'}</Button>
      </form>
    </main>
  )
}
