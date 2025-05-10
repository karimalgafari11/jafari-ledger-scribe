
import { ThemeSettings, ThemeSizeOption } from "@/types/theme";

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
    sidebar: {
      background: '#222222', // لون أسود غامق
      foreground: '#ffffff',
      item: {
        active: '#333333',
        hover: '#444444',
        text: '#ffffff',
        activeText: '#ffffff'
      }
    }
  },
  fonts: {
    family: 'Tajawal',
    size: 'medium',
    headings: {
      family: 'Tajawal',
      weight: 'semibold'
    }
  },
  spacing: {
    compact: false,
    size: 'medium',
  },
  roundness: {
    size: 'medium'
  },
  effects: {
    shadows: 'medium'
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
    sidebar: {
      background: '#000000', // لون أسود غامق للوضع الليلي
      foreground: '#ffffff',
      item: {
        active: '#222222',
        hover: '#333333',
        text: '#ffffff',
        activeText: '#ffffff'
      }
    }
  },
  fonts: {
    family: 'Tajawal',
    size: 'medium',
    headings: {
      family: 'Tajawal',
      weight: 'semibold'
    }
  },
  spacing: {
    compact: false,
    size: 'medium',
  },
  roundness: {
    size: 'medium'
  },
  effects: {
    shadows: 'medium'
  },
  mode: 'dark'
};

// Font options
export const fontOptions = [
  { value: 'Tajawal', label: 'Tajawal' },
  { value: 'Cairo', label: 'Cairo' },
  { value: 'Almarai', label: 'Almarai' },
  { value: 'Amiri', label: 'Amiri' },
  { value: 'Lateef', label: 'Lateef' },
  { value: 'Scheherazade', label: 'Scheherazade' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Arial', label: 'Arial' },
];

// Font weight options
export const fontWeightOptions = [
  { value: 'normal', label: 'عادي' },
  { value: 'medium', label: 'متوسط' },
  { value: 'semibold', label: 'شبه عريض' },
  { value: 'bold', label: 'عريض' },
];

// Font size options
export const fontSizeOptions = [
  { value: 'small', label: 'صغير', scale: 0.85 },
  { value: 'medium', label: 'متوسط', scale: 1 },
  { value: 'large', label: 'كبير', scale: 1.15 },
  { value: 'xlarge', label: 'كبير جداً', scale: 1.35 },
];

// Spacing options
export const spacingOptions = [
  { value: 'compact', label: 'متراص' },
  { value: 'medium', label: 'متوسط' },
  { value: 'large', label: 'متباعد' },
];

// Roundness options
export const roundnessOptions = [
  { value: 'none', label: 'بدون', scale: 0 },
  { value: 'small', label: 'قليل', scale: 0.5 },
  { value: 'medium', label: 'متوسط', scale: 1 },
  { value: 'large', label: 'كبير', scale: 1.5 },
  { value: 'full', label: 'دائري', scale: 2 },
];

// Shadow options
export const shadowOptions = [
  { value: 'none', label: 'بدون' },
  { value: 'light', label: 'خفيف' },
  { value: 'medium', label: 'متوسط' },
  { value: 'heavy', label: 'كثيف' },
];

// Size options
export const sizeOptions: ThemeSizeOption[] = [
  { value: 'small', label: 'صغير', scale: 0.85 },
  { value: 'medium', label: 'متوسط', scale: 1 },
  { value: 'large', label: 'كبير', scale: 1.15 },
  { value: 'xlarge', label: 'كبير جداً', scale: 1.35 },
];
