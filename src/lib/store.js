// src/lib/store.js
import { create } from 'zustand'

const persistKey = 'steeze_cart_v2'
const canUseStorage = () => typeof window !== 'undefined' && 'localStorage' in window

const load = () => {
  if (!canUseStorage()) return []
  try {
    const raw = window.localStorage.getItem(persistKey)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    if (import.meta.env.DEV) console.warn('cart load failed:', e)
    return []
  }
}

const save = (items) => {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(persistKey, JSON.stringify(items))
  } catch (e) {
    if (import.meta.env.DEV) console.warn('cart save failed:', e)
  }
}

const key = (id, size) => `${id}:${size || 'NOT_SURE'}`

export const useCart = create((set, get) => ({
  open: false,
  setOpen: (v) => set({ open: v }),

  items: load(),

  add: (item) => {
    const k = key(item.id, item.size)
    const arr = [...get().items]
    const i = arr.findIndex((x) => key(x.id, x.size) === k)
    if (i >= 0) arr[i] = { ...arr[i], qty: arr[i].qty + (item.qty || 1) }
    else arr.push({ ...item, qty: item.qty || 1 })
    save(arr)
    set({ items: arr, open: true })
  },

  remove: (id, size) => {
    const arr = get().items.filter((i) => key(i.id, i.size) !== key(id, size))
    save(arr)
    set({ items: arr })
  },

  inc: (id, size) => {
    const arr = get().items.map((i) =>
      key(i.id, i.size) === key(id, size) ? { ...i, qty: i.qty + 1 } : i
    )
    save(arr)
    set({ items: arr })
  },

  dec: (id, size) => {
    const arr = get().items.map((i) =>
      key(i.id, i.size) === key(id, size) ? { ...i, qty: Math.max(1, i.qty - 1) } : i
    )
    save(arr)
    set({ items: arr })
  },

  clear: () => {
    save([])
    set({ items: [] })
  },
}))
