
import { useState, useEffect } from "react";
import { ThemeSettings } from "@/types/theme";
import { useAppContext } from "@/contexts/AppContext";
import { defaultDarkTheme, defaultLightTheme, fontOptions, fontSizeOptions } from "./themeDefaults";
import { applyThemeToDOM, loadSavedTheme } from "./themeUtils";
import { createThemeHandlers } from "./themeHandlers";

export const useThemeCustomization = () => {
  const { themeMode: systemThemeMode, toggleTheme: systemToggleTheme } = useAppContext();
  
  // States
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>(
    systemThemeMode === 'dark' ? defaultDarkTheme : defaultLightTheme
  );
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");
  
  // Load saved theme on component mount
  useEffect(() => {
    const defaultTheme = systemThemeMode === 'dark' ? defaultDarkTheme : defaultLightTheme;
    const savedTheme = loadSavedTheme(defaultTheme);
    
    setCurrentTheme(savedTheme);
    applyThemeToDOM(savedTheme);
  }, [systemThemeMode]);

  // Create theme handlers
  const handlers = createThemeHandlers({
    currentTheme,
    setCurrentTheme,
    setIsResetDialogOpen,
    setIsSaving,
    systemToggleTheme
  });

  return {
    currentTheme,
    isResetDialogOpen,
    setIsResetDialogOpen,
    isSaving,
    activeTab,
    setActiveTab,
    ...handlers,
    defaultLightTheme,
    defaultDarkTheme
  };
};

// Export constants for external use
export { fontOptions, fontSizeOptions };
export { themeColorToHsl } from "./themeUtils";
