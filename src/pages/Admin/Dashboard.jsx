import { useAuth } from '@/lib/authStore'
import { Toaster } from 'sonner'
import AdminApiCheck from '@/components/AdminApiCheck'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const { user, logout } = useAuth()
  return (
  <main className="space-y-6 text-stone-950 dark:text-white">
      <Toaster richColors position="top-center" />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-stone-700 dark:text-stone-300">Hi, {user?.username}</span>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/admin/products" className="glass p-4 hover-float">Products</Link>
        <Link to="/admin/orders" className="glass p-4 hover-float">Orders</Link>
        <Link to="/admin/customers" className="glass p-4 hover-float">Customers</Link>
      </div>

      <AdminApiCheck />
    </main>
  )
}
