import CartDrawer from '@/components/CartDrawer'
import ProductGrid from '@/components/ProductGrid'
import { useEffect, useState } from 'react'

export default function Shop(){
  const [category, setCategory] = useState('All')
  const [categories, setCategories] = useState(['All'])

  // Handle emitted categories from ProductGrid to build chips dynamically
  const handleCats = (cats) => {
    const unique = Array.from(new Set([...(cats || [])].map(String)))
    unique.sort((a,b)=> a.localeCompare(b))
    setCategories(['All', ...unique])
    // If a previously selected category no longer exists, fall back to All
    if (category !== 'All' && !unique.includes(category)) setCategory('All')
  }
  return (
    <section className="mx-auto space-y-6 text-black dark:text-white pt-24">
      <div className="space-y-1 text-center max-w-2xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome to our online Shop</h1>
        <p className="text-sm sm:text-base opacity-80">Style with ease.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={()=>setCategory(c)}
              className={`px-3 py-1.5 rounded-xl border text-sm tap ${category===c ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white dark:bg-neutral-900'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
  <ProductGrid category={category} onCategories={handleCats} />
      <CartDrawer />
    </section>
  )
}
