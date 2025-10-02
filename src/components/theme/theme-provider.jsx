import { useEffect, useState } from 'react'
import { ThemeProviderContext } from './theme-context'
export { useTheme } from './theme-context' // (only if you choose Option B)

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-ui-theme' }) {
  // Start from the provided defaultTheme instead of any previously saved value
  const [theme, setTheme] = useState(defaultTheme)

  // On first mount, if there is a stored preference, apply it
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
        setTheme(saved)
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    let applied = theme
    if (applied === 'system') {
      applied = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    root.classList.add(applied)
    try { localStorage.setItem(storageKey, theme) } catch {}
  }, [theme])

  const value = {
    theme,
    setTheme: (t) => {
      localStorage.setItem(storageKey, t)
      setTheme(t)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
