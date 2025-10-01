import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="border-t mt-auto py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} THESTEEZESTORE. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/admin/login" className="opacity-70 hover:opacity-100">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  )
}