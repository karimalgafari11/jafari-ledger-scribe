
import { useState, useEffect } from "react";
import { ThemeSettings, ThemeColors, ThemeFonts } from "@/types/theme";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/AppContext";

// Default theme values
const defaultLightTheme: ThemeSettings = {
  colors: {
    primary: '#0a6e78',
    secondary: '#f3f4f6',
    background: '#ffffff',
    button: '#0a6e78',
    header: '#0a6e78',
    textPrimary: '#1f2937',
    textSecondary: '#4b5563',
    link: '#0a6e78',
  },
  fonts: {
    family: 'Tajawal',
    size: 'medium'
  },
  mode: 'light'
};

const defaultDarkTheme: ThemeSettings = {
  colors: {
    primary: '#0a6e78',
    secondary: '#2d3748',
    background: '#1a202c',
    button: '#0a6e78',
    header: '#1a202c',
    textPrimary: '#f7fafc',
    textSecondary: '#a0aec0',
    link: '#4fd1c5',
  },
  fonts: {
    family: 'Tajawal',
    size: 'medium'
  },
  mode: 'dark'
};

// Convert color to HSL format
export const themeColorToHsl = (color: string): string => {
  // Simple conversion function - in real app would convert hex to HSL
  return color;
};

export const useThemeCustomization = () => {
  const { themeMode: systemThemeMode, toggleTheme: systemToggleTheme } = useAppContext();
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>(
    systemThemeMode === 'dark' ? defaultDarkTheme : defaultLightTheme
  );
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");
  
  // Load saved theme on component mount
  useEffect(() => {
    if (localStorage.getItem('appThemeSettings')) {
      try {
        const savedTheme = JSON.parse(localStorage.getItem('appThemeSettings') || '');
        setCurrentTheme(savedTheme);
        applyThemeToDOM(savedTheme);
      } catch (e) {
        console.error('خطأ في استرجاع إعدادات السمة:', e);
        // Use default theme if there's an error
        const defaultTheme = systemThemeMode === 'dark' ? defaultDarkTheme : defaultLightTheme;
        setCurrentTheme(defaultTheme);
        applyThemeToDOM(defaultTheme);
      }
    } else {
      // Apply default theme if no saved settings
      const defaultTheme = systemThemeMode === 'dark' ? defaultDarkTheme : defaultLightTheme;
      applyThemeToDOM(defaultTheme);
    }
  }, [systemThemeMode]);

  // Apply theme to DOM elements
  const applyThemeToDOM = (theme: ThemeSettings) => {
    const root = document.documentElement;
    
    // Apply colors
    root.style.setProperty('--primary', themeColorToHsl(theme.colors.primary));
    root.style.setProperty('--secondary', themeColorToHsl(theme.colors.secondary));
    root.style.setProperty('--background', themeColorToHsl(theme.colors.background));
    root.style.setProperty('--foreground', themeColorToHsl(theme.colors.textPrimary));
    
    // Apply font size
    const fontSizeOptions = [
      { value: 'small', label: 'صغير', scale: 0.85 },
      { value: 'medium', label: 'متوسط', scale: 1 },
      { value: 'large', label: 'كبير', scale: 1.15 },
    ];
    const fontSizeScale = fontSizeOptions.find(option => option.value === theme.fonts.size)?.scale || 1;
    root.style.setProperty('--font-scale', fontSizeScale.toString());
    
    // Apply font family
    if (theme.fonts.family !== 'Tajawal') {
      // Check if font link already exists to avoid duplicates
      const existingFontLink = document.querySelector(`link[href*="${theme.fonts.family}"]`);
      
      if (!existingFontLink) {
        // Add font if it doesn't exist
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = `https://fonts.googleapis.com/css2?family=${theme.fonts.family}:wght@300;400;500;700&display=swap`;
        document.head.appendChild(fontLink);
      }
    }
    
    document.body.style.fontFamily = `'${theme.fonts.family}', sans-serif`;
    
    // Apply theme mode
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
      localStorage.setItem('appThemeSettings', JSON.stringify(currentTheme));
      
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
    currentTheme,
    isResetDialogOpen,
    setIsResetDialogOpen,
    isSaving,
    activeTab,
    setActiveTab,
    handleColorChange,
    handleFontFamilyChange,
    handleFontSizeChange,
    handleThemeModeToggle,
    handleSaveTheme,
    handleResetTheme,
    defaultLightTheme,
    defaultDarkTheme
  };
};

// Font options
export const fontOptions = [
  { value: 'Tajawal', label: 'Tajawal' },
  { value: 'Cairo', label: 'Cairo' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Arial', label: 'Arial' },
];

// Font size options
export const fontSizeOptions = [
  { value: 'small', label: 'صغير', scale: 0.85 },
  { value: 'medium', label: 'متوسط', scale: 1 },
  { value: 'large', label: 'كبير', scale: 1.15 },
];
