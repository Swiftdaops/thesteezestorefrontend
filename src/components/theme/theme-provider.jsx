import { useEffect, useState } from 'react'
import { ThemeProviderContext } from './theme-context'
export { useTheme } from './theme-context' // (only if you choose Option B)

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-ui-theme' }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    if (theme === 'system') {
      const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(sys)
    } else {
      root.classList.add(theme)
    }
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
