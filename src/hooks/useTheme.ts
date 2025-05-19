import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  // Check if user has a preferred theme in localStorage
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const savedTheme = window.localStorage.getItem('theme') as Theme | null;
      if (savedTheme) return savedTheme;
      
      // Check system preference
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      return prefersLight ? 'light' : 'dark';
    }
    return 'light'; // Default theme
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Update theme in localStorage and document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Store in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle system theme preference change
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Only change if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}