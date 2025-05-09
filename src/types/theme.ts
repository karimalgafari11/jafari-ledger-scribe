
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  button: string;
  header: string;
  textPrimary: string;
  textSecondary: string;
  link: string;
}

export interface ThemeFonts {
  family: string;
  size: 'small' | 'medium' | 'large';
}

export interface ThemeSettings {
  colors: ThemeColors;
  fonts: ThemeFonts;
  mode: 'light' | 'dark';
}

export interface FontOption {
  value: string;
  label: string;
}

export interface FontSizeOption {
  value: 'small' | 'medium' | 'large';
  label: string;
  scale: number;
}
