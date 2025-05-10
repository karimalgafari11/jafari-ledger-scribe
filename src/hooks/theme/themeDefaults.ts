
import { ThemeSettings } from "@/types/theme";

// Default theme values
export const defaultLightTheme: ThemeSettings = {
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

export const defaultDarkTheme: ThemeSettings = {
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
