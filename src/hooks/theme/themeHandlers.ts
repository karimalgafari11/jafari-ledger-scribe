
import { ThemeColors, ThemeSettings, ThemePreset } from "@/types/theme";
import { toast } from "sonner";
import { defaultDarkTheme, defaultLightTheme } from "./themeDefaults";
import { applyThemeToDOM, exportTheme, importTheme, loadSavedPresets, savePresets, saveTheme } from "./themeUtils";
import { v4 as uuidv4 } from "uuid";

export interface ThemeHandlersParams {
  currentTheme: ThemeSettings;
  setCurrentTheme: (theme: ThemeSettings) => void;
  setIsResetDialogOpen: (isOpen: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  systemToggleTheme: () => void;
  presets: ThemePreset[];
  setPresets: (presets: ThemePreset[]) => void;
}

export const createThemeHandlers = ({
  currentTheme,
  setCurrentTheme,
  setIsResetDialogOpen,
  setIsSaving,
  systemToggleTheme,
  presets,
  setPresets
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

  // Change sidebar color in theme
  const handleSidebarColorChange = (path: string, value: string) => {
    const updatedTheme = {...currentTheme};
    const parts = path.split('.');
    
    if (parts.length === 1) {
      // Direct property on sidebar object
      updatedTheme.colors.sidebar = {
        ...updatedTheme.colors.sidebar,
        [parts[0]]: value
      };
    } else if (parts.length === 2 && parts[0] === 'item') {
      // Nested property in sidebar.item
      updatedTheme.colors.sidebar = {
        ...updatedTheme.colors.sidebar,
        item: {
          ...updatedTheme.colors.sidebar.item,
          [parts[1]]: value
        }
      };
    }
    
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
  const handleFontSizeChange = (value: 'small' | 'medium' | 'large' | 'xlarge') => {
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

  // Change heading font family
  const handleHeadingFontFamilyChange = (value: string) => {
    const updatedTheme = {
      ...currentTheme,
      fonts: {
        ...currentTheme.fonts,
        headings: {
          ...currentTheme.fonts.headings,
          family: value
        }
      }
    };
    
    setCurrentTheme(updatedTheme);
    applyThemeToDOM(updatedTheme);
  };

  // Change heading font weight
  const handleHeadingFontWeightChange = (value: 'normal' | 'medium' | 'semibold' | 'bold') => {
    const updatedTheme = {
      ...currentTheme,
      fonts: {
        ...currentTheme.fonts,
        headings: {
          ...currentTheme.fonts.headings,
          weight: value
        }
      }
    };
    
    setCurrentTheme(updatedTheme);
    applyThemeToDOM(updatedTheme);
  };

  // Change spacing compact mode
  const handleSpacingCompactChange = (value: boolean) => {
    const updatedTheme = {
      ...currentTheme,
      spacing: {
        ...currentTheme.spacing,
        compact: value
      }
    };
    
    setCurrentTheme(updatedTheme);
    applyThemeToDOM(updatedTheme);
  };

  // Change spacing size
  const handleSpacingSizeChange = (value: string) => {
    const updatedTheme = {
      ...currentTheme,
      spacing: {
        ...currentTheme.spacing,
        size: value as 'compact' | 'medium' | 'large'
      }
    };
    
    setCurrentTheme(updatedTheme);
    applyThemeToDOM(updatedTheme);
  };

  // Change roundness
  const handleRoundnessChange = (value: 'none' | 'small' | 'medium' | 'large' | 'full') => {
    const updatedTheme = {
      ...currentTheme,
      roundness: {
        size: value
      }
    };
    
    setCurrentTheme(updatedTheme);
    applyThemeToDOM(updatedTheme);
  };

  // Change shadows
  const handleShadowsChange = (value: 'none' | 'light' | 'medium' | 'heavy') => {
    const updatedTheme = {
      ...currentTheme,
      effects: {
        ...currentTheme.effects,
        shadows: value
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
      colors: {
        ...currentTheme.colors,
        background: newMode === 'light' ? defaultLightTheme.colors.background : defaultDarkTheme.colors.background,
        textPrimary: newMode === 'light' ? defaultLightTheme.colors.textPrimary : defaultDarkTheme.colors.textPrimary,
        textSecondary: newMode === 'light' ? defaultLightTheme.colors.textSecondary : defaultDarkTheme.colors.textSecondary
      }
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

  // Save current theme as a preset
  const handleSaveAsPreset = (name: string) => {
    const newPreset: ThemePreset = {
      id: uuidv4(),
      name,
      settings: currentTheme
    };
    
    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    savePresets(updatedPresets);
    
    toast.success(`تم حفظ السمة "${name}" بنجاح`);
  };

  // Delete a preset
  const handleDeletePreset = (id: string) => {
    const updatedPresets = presets.filter(preset => preset.id !== id);
    setPresets(updatedPresets);
    savePresets(updatedPresets);
    
    toast.success("تم حذف السمة بنجاح");
  };

  // Apply a preset
  const handleApplyPreset = (preset: ThemePreset) => {
    setCurrentTheme(preset.settings);
    applyThemeToDOM(preset.settings);
    
    toast.success(`تم تطبيق سمة "${preset.name}" بنجاح`);
  };

  // Export theme
  const handleExportTheme = () => {
    exportTheme(currentTheme);
  };

  // Import theme
  const handleImportTheme = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      const importedTheme = await importTheme(file);
      setCurrentTheme(importedTheme);
      applyThemeToDOM(importedTheme);
      
      // Reset file input
      event.target.value = '';
    } catch (error) {
      console.error('خطأ في استيراد السمة:', error);
      toast.error('حدث خطأ أثناء استيراد السمة');
    }
  };

  return {
    handleColorChange,
    handleSidebarColorChange,
    handleFontFamilyChange,
    handleFontSizeChange,
    handleHeadingFontFamilyChange,
    handleHeadingFontWeightChange,
    handleSpacingCompactChange,
    handleSpacingSizeChange,
    handleRoundnessChange,
    handleShadowsChange,
    handleThemeModeToggle,
    handleSaveTheme,
    handleResetTheme,
    handleSaveAsPreset,
    handleDeletePreset,
    handleApplyPreset,
    handleExportTheme,
    handleImportTheme
  };
};
