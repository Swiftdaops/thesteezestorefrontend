import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// small helper: unwrap data or throw a readable error
export const request = async (p) => {
  try { const r = await p; return r.data }
  catch (e) {
    const msg = e?.response?.data?.message || e.message || 'Request failed'
    throw new Error(msg)
  }
}

// Attach x-cid from localStorage or cookie for cross-device recognition
api.interceptors.request.use((config) => {
  try {
    let cid = null
    if (typeof window !== 'undefined') {
      cid = window.localStorage?.getItem('cid') || null
      if (!cid && typeof document !== 'undefined') {
        const m = document.cookie.match(/(?:^|; )cid=([^;]+)/)
        if (m) cid = decodeURIComponent(m[1])
      }
      // Write-back to localStorage for stability
      if (cid && !window.localStorage?.getItem('cid')) {
        window.localStorage.setItem('cid', cid)
      }
    }
    if (cid) {
      config.headers = config.headers || {}
      config.headers['x-cid'] = cid
    }
  } catch { /* no-op */ }
  return config
})
