
export interface SidebarColors {
  background: string;
  foreground: string;
  item: {
    active: string;
    hover: string;
    text: string;
    activeText: string;
  };
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  button: string;
  header: string;
  textPrimary: string;
  textSecondary: string;
  link: string;
  sidebar: SidebarColors;
}

export interface HeadingFonts {
  family: string;
  weight: 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface ThemeFonts {
  family: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  headings: HeadingFonts;
}

export interface ThemeSpacing {
  compact: boolean;
  size: 'compact' | 'medium' | 'large';
}

export interface ThemeRoundness {
  size: 'none' | 'small' | 'medium' | 'large' | 'full';
}

export interface ThemeEffects {
  shadows: 'none' | 'light' | 'medium' | 'heavy';
}

export interface ThemeSettings {
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  roundness: ThemeRoundness;
  effects: ThemeEffects;
  mode: 'light' | 'dark';
}

export interface FontOption {
  value: string;
  label: string;
}

export interface FontWeightOption {
  value: 'normal' | 'medium' | 'semibold' | 'bold';
  label: string;
}

export interface FontSizeOption {
  value: 'small' | 'medium' | 'large' | 'xlarge';
  label: string;
  scale: number;
}

export interface ThemeSizeOption {
  value: string;
  label: string;
  scale: number;
}

export interface SpacingOption {
  value: string;
  label: string;
}

export interface RoundnessOption {
  value: 'none' | 'small' | 'medium' | 'large' | 'full';
  label: string;
  scale: number;
}

export interface ShadowOption {
  value: 'none' | 'light' | 'medium' | 'heavy';
  label: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  settings: ThemeSettings;
  isPredefined?: boolean;
}
