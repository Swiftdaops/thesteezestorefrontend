import ProductGrid from '@/components/ProductGrid'
import CartDrawer from '@/components/CartDrawer'
import Hero from '@/components/Hero'
import NewDropSection from "@/components/NewDropSection";
import ModelsSection from "@/components/ModelsSection.jsx";

export default function Home(){
  return (
  <div className="space-y-10 text-stone-950 dark:text-white">
      <Hero />
      <NewDropSection />
      <ModelsSection />
      <CartDrawer />
    </div>
  )
}
