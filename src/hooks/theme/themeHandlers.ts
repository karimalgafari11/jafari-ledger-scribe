
import { ThemeColors, ThemeSettings } from "@/types/theme";
import { toast } from "sonner";
import { defaultDarkTheme, defaultLightTheme } from "./themeDefaults";
import { applyThemeToDOM, saveTheme } from "./themeUtils";

export interface ThemeHandlersParams {
  currentTheme: ThemeSettings;
  setCurrentTheme: (theme: ThemeSettings) => void;
  setIsResetDialogOpen: (isOpen: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  systemToggleTheme: () => void;
}

export const createThemeHandlers = ({
  currentTheme,
  setCurrentTheme,
  setIsResetDialogOpen,
  setIsSaving,
  systemToggleTheme
}: ThemeHandlersParams) => {
  // Change color in theme
  const handleColorChange = (colorKey: keyof ThemeColors, value: string) => {
    const updatedTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [colorKey]: value
      }
    };
    
    setCurrentTheme(updatedTheme);
    applyThemeToDOM(updatedTheme);
  };

  // Change font family
  const handleFontFamilyChange = (value: string) => {
    const updatedTheme = {
      ...currentTheme,
      fonts: {
        ...currentTheme.fonts,
        family: value
      }
    };
    
    setCurrentTheme(updatedTheme);
    applyThemeToDOM(updatedTheme);
  };

  // Change font size
  const handleFontSizeChange = (value: 'small' | 'medium' | 'large') => {
    const updatedTheme = {
      ...currentTheme,
      fonts: {
        ...currentTheme.fonts,
        size: value
      }
    };
    
    setCurrentTheme(updatedTheme);
    applyThemeToDOM(updatedTheme);
  };

  // Toggle theme mode (light/dark)
  const handleThemeModeToggle = () => {
    const newMode = currentTheme.mode === 'light' ? 'dark' as const : 'light' as const;
    const newTheme = {
      ...currentTheme,
      mode: newMode,
      colors: newMode === 'light' ? defaultLightTheme.colors : defaultDarkTheme.colors
    };
      
    setCurrentTheme(newTheme);
    applyThemeToDOM(newTheme);
    
    // Sync with system theme
    systemToggleTheme();
  };

  // Save theme settings
  const handleSaveTheme = () => {
    setIsSaving(true);
    
    // Simulate saving data with delay
    setTimeout(() => {
      // Save to local storage (in real app would save to database)
      saveTheme(currentTheme);
      
      // Show success message
      toast.success("تم حفظ إعدادات السمة بنجاح");
      setIsSaving(false);
    }, 600);
  };

  // Reset to default settings
  const handleResetTheme = () => {
    const defaultTheme = currentTheme.mode === 'light' ? defaultLightTheme : defaultDarkTheme;
    setCurrentTheme(defaultTheme);
    applyThemeToDOM(defaultTheme);
    setIsResetDialogOpen(false);
    toast.info("تم إعادة ضبط السمة إلى الإعدادات الافتراضية");
  };

  return {
    handleColorChange,
    handleFontFamilyChange,
    handleFontSizeChange,
    handleThemeModeToggle,
    handleSaveTheme,
    handleResetTheme
  };
};
