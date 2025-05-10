
import { ThemeSettings, ThemePreset } from "@/types/theme";
import { fontSizeOptions, roundnessOptions } from "./themeDefaults";
import { toast } from "sonner";

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
  
  // Apply specific colors
  root.style.setProperty('--button', themeColorToHsl(theme.colors.button)); 
  root.style.setProperty('--link', themeColorToHsl(theme.colors.link));
  root.style.setProperty('--header-bg', themeColorToHsl(theme.colors.header));
  
  // Apply sidebar colors - with direct style properties for higher specificity
  document.querySelectorAll('.bg-sidebar').forEach(el => {
    (el as HTMLElement).style.backgroundColor = theme.colors.sidebar.background;
  });
  
  document.querySelectorAll('.text-sidebar-foreground').forEach(el => {
    (el as HTMLElement).style.color = theme.colors.sidebar.foreground;
  });
  
  // Create dynamic CSS for sidebar items
  const style = document.querySelector('#theme-sidebar-style') || document.createElement('style');
  style.id = 'theme-sidebar-style';
  style.textContent = `
    .bg-sidebar { background-color: ${theme.colors.sidebar.background} !important; }
    .text-sidebar-foreground { color: ${theme.colors.sidebar.foreground} !important; }
    .hover\\:bg-sidebar-primary:hover { background-color: ${theme.colors.sidebar.item.hover} !important; }
    .bg-sidebar-accent { background-color: ${theme.colors.sidebar.item.active} !important; }
    .text-sidebar-accent-foreground { color: ${theme.colors.sidebar.item.activeText} !important; }
  `;
  
  if (!document.querySelector('#theme-sidebar-style')) {
    document.head.appendChild(style);
  }
  
  // Apply font size
  const fontSizeScale = fontSizeOptions.find(option => option.value === theme.fonts.size)?.scale || 1;
  root.style.setProperty('--font-scale', fontSizeScale.toString());
  
  // Apply roundness
  const roundnessScale = roundnessOptions.find(option => option.value === theme.roundness.size)?.scale || 1;
  root.style.setProperty('--roundness-scale', roundnessScale.toString());
  root.style.setProperty('--radius', `${8 * roundnessScale}px`);
  
  // Apply shadows
  const shadowValue = getShadowValue(theme.effects.shadows);
  root.style.setProperty('--shadow', shadowValue);

  // Apply spacing
  const spacingValue = getSpacingValue(theme.spacing.size, theme.spacing.compact);
  root.style.setProperty('--spacing-scale', spacingValue);
  
  // Apply font family
  if (theme.fonts.family) {
    // Check if font link already exists to avoid duplicates
    const existingFontLink = document.querySelector(`link[href*="${theme.fonts.family}"]`);
    
    if (!existingFontLink && theme.fonts.family !== 'Tajawal' && theme.fonts.family !== 'Arial') {
      // Add font if it doesn't exist
      try {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = `https://fonts.googleapis.com/css2?family=${theme.fonts.family}:wght@300;400;500;600;700&display=swap`;
        document.head.appendChild(fontLink);
      } catch (error) {
        console.error('Error loading font:', error);
      }
    }
  }
  
  // Apply heading font family if different from regular text
  if (theme.fonts.headings.family && theme.fonts.headings.family !== theme.fonts.family) {
    const existingHeadingFontLink = document.querySelector(`link[href*="${theme.fonts.headings.family}"]`);
    
    if (!existingHeadingFontLink && theme.fonts.headings.family !== 'Tajawal' && theme.fonts.headings.family !== 'Arial') {
      try {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = `https://fonts.googleapis.com/css2?family=${theme.fonts.headings.family}:wght@300;400;500;600;700&display=swap`;
        document.head.appendChild(fontLink);
      } catch (error) {
        console.error('Error loading heading font:', error);
      }
    }
  }
  
  document.body.style.fontFamily = `'${theme.fonts.family}', sans-serif`;
  
  // Apply heading font weight
  const headingFontWeight = getFontWeight(theme.fonts.headings.weight);
  root.style.setProperty('--heading-font-weight', headingFontWeight.toString());
  
  // Apply theme mode
  if (theme.mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Apply custom CSS for headings
  const headingStyle = document.querySelector('#theme-heading-style') || document.createElement('style');
  headingStyle.id = 'theme-heading-style';
  headingStyle.textContent = `
    h1, h2, h3, h4, h5, h6 {
      font-family: '${theme.fonts.headings.family}', sans-serif;
      font-weight: ${headingFontWeight};
    }
  `;
  
  if (!document.querySelector('#theme-heading-style')) {
    document.head.appendChild(headingStyle);
  }
};

// Helper functions
function getFontWeight(weight: string): number {
  switch (weight) {
    case 'normal': return 400;
    case 'medium': return 500;
    case 'semibold': return 600;
    case 'bold': return 700;
    default: return 400;
  }
}

function getShadowValue(size: string): string {
  switch (size) {
    case 'none': return 'none';
    case 'light': return '0 2px 4px rgba(0, 0, 0, 0.1)';
    case 'medium': return '0 4px 8px rgba(0, 0, 0, 0.15)';
    case 'heavy': return '0 8px 16px rgba(0, 0, 0, 0.2)';
    default: return '0 4px 8px rgba(0, 0, 0, 0.15)';
  }
}

function getSpacingValue(size: string, compact: boolean): string {
  const baseValue = compact ? 0.85 : 1;
  switch (size) {
    case 'compact': return (baseValue * 0.85).toString();
    case 'medium': return baseValue.toString();
    case 'large': return (baseValue * 1.15).toString();
    default: return baseValue.toString();
  }
}

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

// Load presets from local storage
export const loadSavedPresets = (): ThemePreset[] => {
  if (localStorage.getItem('appThemePresets')) {
    try {
      return JSON.parse(localStorage.getItem('appThemePresets') || '[]');
    } catch (e) {
      console.error('خطأ في استرجاع السمات المحفوظة:', e);
      return [];
    }
  }
  
  return [];
};

// Save presets to local storage
export const savePresets = (presets: ThemePreset[]): void => {
  localStorage.setItem('appThemePresets', JSON.stringify(presets));
};

// Export theme to JSON file
export const exportTheme = (theme: ThemeSettings): void => {
  try {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `theme-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('تم تصدير السمة بنجاح');
  } catch (error) {
    console.error('خطأ في تصدير السمة:', error);
    toast.error('حدث خطأ أثناء تصدير السمة');
  }
};

// Import theme from JSON file
export const importTheme = (file: File): Promise<ThemeSettings> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const theme = JSON.parse(result);
          
          // Validate theme structure
          if (!theme.colors || !theme.fonts || !theme.mode) {
            reject(new Error('ملف السمة غير صالح'));
            return;
          }
          
          resolve(theme);
          toast.success('تم استيراد السمة بنجاح');
        }
      } catch (error) {
        console.error('خطأ في استيراد السمة:', error);
        reject(error);
        toast.error('حدث خطأ أثناء استيراد السمة');
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
      toast.error('حدث خطأ أثناء قراءة الملف');
    };
    
    reader.readAsText(file);
  });
};
