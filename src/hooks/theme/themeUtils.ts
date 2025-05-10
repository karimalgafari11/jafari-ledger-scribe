
import { ThemeSettings } from "@/types/theme";
import { fontSizeOptions } from "./themeDefaults";

// Convert color to HSL format
export const themeColorToHsl = (color: string): string => {
  // Simple conversion function - in real app would convert hex to HSL
  return color;
};

// Apply theme to DOM elements
export const applyThemeToDOM = (theme: ThemeSettings): void => {
  const root = document.documentElement;
  
  // Apply colors
  root.style.setProperty('--primary', themeColorToHsl(theme.colors.primary));
  root.style.setProperty('--secondary', themeColorToHsl(theme.colors.secondary));
  root.style.setProperty('--background', themeColorToHsl(theme.colors.background));
  root.style.setProperty('--foreground', themeColorToHsl(theme.colors.textPrimary));
  
  // Apply font size
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

// Load theme from local storage
export const loadSavedTheme = (defaultTheme: ThemeSettings): ThemeSettings => {
  if (localStorage.getItem('appThemeSettings')) {
    try {
      return JSON.parse(localStorage.getItem('appThemeSettings') || '');
    } catch (e) {
      console.error('خطأ في استرجاع إعدادات السمة:', e);
      return defaultTheme;
    }
  }
  
  return defaultTheme;
};

// Save theme to local storage
export const saveTheme = (theme: ThemeSettings): void => {
  localStorage.setItem('appThemeSettings', JSON.stringify(theme));
};
