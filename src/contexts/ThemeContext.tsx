
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { ThemeSettings } from "@/types/theme";
import { applyThemeToDOM } from "@/hooks/theme/themeUtils";
import { defaultDarkTheme, defaultLightTheme } from "@/hooks/theme/themeDefaults";

type ThemeContextType = {
  theme: ThemeSettings;
  setTheme: (theme: ThemeSettings) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    // Get theme mode from localStorage or AppContext
    const themeMode = localStorage.getItem("themeMode") || "light";
    // Return appropriate default theme
    return themeMode === "dark" ? defaultDarkTheme : defaultLightTheme;
  });

  // Apply theme when it changes
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
