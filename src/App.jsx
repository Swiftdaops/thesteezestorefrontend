import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ProductDetails from '@/pages/ProductDetails'
import Checkout from './pages/Checkout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import AdminLogin from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import Products from '@/pages/Admin/Products'
import Orders from '@/pages/Admin/Orders'
import Customers from '@/pages/Admin/Customers'
import RequireAdmin from '@/components/admin/RequireAdmin'
import { ThemeProvider } from './components/theme/theme-provider'

import { motion, AnimatePresence } from 'framer-motion'

function PageTransitionWrapper({ children }) {
  const loc = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={loc.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: .18 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function Shell() {
  return (
  <div className=" text-black dark:text-white">
      <Navbar />
      <main className="">
        <PageTransitionWrapper>
          <Outlet />
        </PageTransitionWrapper>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:id" element={<ProductDetails />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route element={<RequireAdmin />}>
              <Route path="admin" element={<Dashboard />} />
              <Route path="admin/products" element={<Products />} />
              <Route path="admin/orders" element={<Orders />} />
              <Route path="admin/customers" element={<Customers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
