
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';
type Language = 'ar' | 'en';

interface AppContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const defaultContext: AppContextProps = {
  language: 'ar',
  setLanguage: () => {},
  themeMode: 'light',
  toggleTheme: () => {},
  isDarkMode: false
};

const AppContext = createContext<AppContextProps>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved preferences from localStorage or use defaults
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'ar'
  );
  
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    () => (localStorage.getItem('theme') as ThemeMode) || 'light'
  );

  // Update HTML attributes when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  // Update theme class and save to localStorage
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      themeMode,
      toggleTheme,
      isDarkMode: themeMode === 'dark'
    }}>
      {children}
    </AppContext.Provider>
  );
};
