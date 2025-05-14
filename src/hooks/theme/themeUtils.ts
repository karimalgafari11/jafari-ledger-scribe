import { ThemeColors, ThemeSettings, ThemePreset } from "@/types/theme";
import { defaultDarkTheme, defaultLightTheme } from "./themeDefaults";

// Convert theme color values to HSL for CSS variables
export const themeColorToHsl = (color: string) => {
  // This is a simplified conversion - in a real app you would implement 
  // a proper hex to HSL conversion function here
  return color;
};

// Apply theme to DOM 
export const applyThemeToDOM = (theme: ThemeSettings) => {
  const root = document.documentElement;
  
  // Set the CSS variables for colors
  // Note: In a real app, you should convert hex colors to HSL here
  
  // Apply primary color
  root.style.setProperty('--primary', themeColorToHsl(theme.colors.primary));
  
  // Apply font settings
  document.body.style.fontFamily = theme.fonts.family;
  
  // Apply font size
  let fontSizeScale = 1;
  if (theme.fonts.size === 'small') fontSizeScale = 0.85;
  else if (theme.fonts.size === 'large') fontSizeScale = 1.15;
  else if (theme.fonts.size === 'xlarge') fontSizeScale = 1.35;
  
  document.body.style.fontSize = `${fontSizeScale}rem`;
  
  // Apply headings font
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(heading => {
    (heading as HTMLElement).style.fontFamily = theme.fonts.headings.family;
    
    // Apply font weight
    let fontWeight = '600'; // semibold default
    if (theme.fonts.headings.weight === 'normal') fontWeight = '400';
    else if (theme.fonts.headings.weight === 'medium') fontWeight = '500';
    else if (theme.fonts.headings.weight === 'bold') fontWeight = '700';
    
    (heading as HTMLElement).style.fontWeight = fontWeight;
  });
  
  // Apply border radius
  let borderRadius = '0.5rem'; // medium default
  if (theme.roundness.size === 'none') borderRadius = '0';
  else if (theme.roundness.size === 'small') borderRadius = '0.25rem';
  else if (theme.roundness.size === 'large') borderRadius = '1rem';
  else if (theme.roundness.size === 'full') borderRadius = '9999px';
  
  root.style.setProperty('--radius', borderRadius);
  
  // Apply shadows (could be extended for more comprehensive shadow application)
  // Currently just applying the setting but not actually changing shadows
  
  // Apply sidebar colors
  root.style.setProperty('--sidebar-background', themeColorToHsl(theme.colors.sidebar.background));
  root.style.setProperty('--sidebar-foreground', themeColorToHsl(theme.colors.sidebar.foreground));
  
  // Apply text colors
  if (theme.mode === 'light') {
    root.style.setProperty('--foreground', themeColorToHsl(theme.colors.textPrimary));
    // Other light mode specific colors
  } else {
    // Dark mode specific colors
    root.style.setProperty('--foreground', themeColorToHsl(theme.colors.textPrimary));
  }
  
  // Apply background
  root.style.setProperty('--background', themeColorToHsl(theme.colors.background));
  
  // Apply additional color variables
  // This would be more extensive in a real application
};

// Save theme to local storage
export const saveTheme = (theme: ThemeSettings) => {
  localStorage.setItem('savedTheme', JSON.stringify(theme));
};

// Load saved theme from local storage
export const loadSavedTheme = (defaultTheme: ThemeSettings): ThemeSettings => {
  try {
    const savedTheme = localStorage.getItem('savedTheme');
    if (savedTheme) {
      return JSON.parse(savedTheme);
    }
  } catch (error) {
    console.error('Error loading saved theme:', error);
  }
  return defaultTheme;
};

// Save presets to local storage
export const savePresets = (presets: ThemePreset[]) => {
  // Filter out predefined presets before saving
  const userPresets = presets.filter(preset => !preset.isPredefined);
  localStorage.setItem('themePresets', JSON.stringify(userPresets));
};

// Load saved presets from local storage
export const loadSavedPresets = (): ThemePreset[] => {
  try {
    const savedPresets = localStorage.getItem('themePresets');
    if (savedPresets) {
      return JSON.parse(savedPresets);
    }
  } catch (error) {
    console.error('Error loading saved presets:', error);
  }
  return [];
};

// Export theme to JSON file
export const exportTheme = (theme: ThemeSettings) => {
  const themeString = JSON.stringify(theme, null, 2);
  const blob = new Blob([themeString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `theme-${theme.mode}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Import theme from JSON file
export const importTheme = async (file: File): Promise<ThemeSettings> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (event.target?.result) {
          const imported = JSON.parse(event.target.result as string) as ThemeSettings;
          
          // Basic validation - check for required properties
          if (!imported.colors || !imported.fonts || !imported.spacing || !imported.roundness || !imported.effects) {
            reject(new Error('Invalid theme file format'));
            return;
          }
          
          resolve(imported);
        } else {
          reject(new Error('Failed to read file'));
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};
