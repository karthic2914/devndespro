import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {}
});

function readTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem('siteTheme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo(() => {
    const setTheme = (next) => {
      const active = next === 'dark' ? 'dark' : 'light';
      setThemeState(active);
      try { localStorage.setItem('siteTheme', active); } catch { /* ignore */ }
      applyTheme(active);
    };
    return {
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark')
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
