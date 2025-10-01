import { createContext, useContext } from 'react'

export const ThemeProviderContext = createContext({
  theme: 'system',
  setTheme: () => {},
})

export const useTheme = () => {
  const ctx = useContext(ThemeProviderContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
