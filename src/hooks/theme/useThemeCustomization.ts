
import { useState, useEffect } from "react";
import { ThemePreset, ThemeSettings } from "@/types/theme";
import { useAppContext } from "@/contexts/AppContext";
import { defaultDarkTheme, defaultLightTheme } from "./themeDefaults";
import { applyThemeToDOM, loadSavedPresets, loadSavedTheme } from "./themeUtils";
import { createThemeHandlers } from "./themeHandlers";
import { v4 as uuidv4 } from 'uuid';

export const useThemeCustomization = () => {
  const { themeMode: systemThemeMode, toggleTheme: systemToggleTheme } = useAppContext();
  
  // States
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>(
    systemThemeMode === 'dark' ? defaultDarkTheme : defaultLightTheme
  );
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");
  
  // Presets state
  const [presets, setPresets] = useState<ThemePreset[]>([
    {
      id: 'default-light',
      name: 'الوضع النهاري الافتراضي',
      settings: defaultLightTheme,
      isPredefined: true
    },
    {
      id: 'default-dark',
      name: 'الوضع الليلي الافتراضي',
      settings: defaultDarkTheme,
      isPredefined: true
    }
  ]);
  
  // Load saved theme and presets on component mount
  useEffect(() => {
    const defaultTheme = systemThemeMode === 'dark' ? defaultDarkTheme : defaultLightTheme;
    const savedTheme = loadSavedTheme(defaultTheme);
    
    // Load saved presets
    const savedPresets = loadSavedPresets();
    if (savedPresets.length > 0) {
      setPresets(prev => [
        ...prev.filter(p => p.isPredefined), // Keep predefined presets
        ...savedPresets // Add user presets
      ]);
    }
    
    setCurrentTheme(savedTheme);
    applyThemeToDOM(savedTheme);
  }, [systemThemeMode]);

  // Create theme handlers
  const handlers = createThemeHandlers({
    currentTheme,
    setCurrentTheme,
    setIsResetDialogOpen,
    setIsSaving,
    systemToggleTheme,
    presets,
    setPresets
  });

  return {
    currentTheme,
    isResetDialogOpen,
    setIsResetDialogOpen,
    isSaving,
    activeTab,
    setActiveTab,
    presets,
    ...handlers,
    defaultLightTheme,
    defaultDarkTheme
  };
};

// Export constants for external use
export { fontOptions, fontSizeOptions } from "./themeDefaults";
export { themeColorToHsl } from "./themeUtils";
