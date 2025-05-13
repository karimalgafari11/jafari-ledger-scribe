
import React from "react";
import { ThemeSettings } from "@/types/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Moon, Sun, ChevronRight, Home, User, Settings, Search, Menu } from "lucide-react";

interface ThemePreviewProps {
  theme: ThemeSettings;
  mode: 'light' | 'dark';
  onTogglePreviewMode: () => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, mode, onTogglePreviewMode }) => {
  // Convert color to HSL for CSS variables
  const colorToHsl = (hex: string) => {
    // Simple conversion from hex to HSL string (this is simplified)
    return hex;
  };

  // Apply font size based on theme setting
  const getFontSize = (baseSize: number) => {
    const scale = theme.fonts.size === 'small' ? 0.85 : 
                  theme.fonts.size === 'large' ? 1.15 : 
                  theme.fonts.size === 'xlarge' ? 1.35 : 1;
    return `${baseSize * scale}px`;
  };

  // Get shadow based on theme setting
  const getShadow = () => {
    return theme.effects.shadows === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : 
           theme.effects.shadows === 'medium' ? '0 4px 8px rgba(0,0,0,0.15)' : 
           theme.effects.shadows === 'heavy' ? '0 8px 16px rgba(0,0,0,0.2)' : 'none';
  };

  // Get border radius based on theme setting
  const getBorderRadius = () => {
    return theme.roundness.size === 'small' ? '0.25rem' : 
           theme.roundness.size === 'medium' ? '0.5rem' : 
           theme.roundness.size === 'large' ? '1rem' : 
           theme.roundness.size === 'full' ? '9999px' : '0';
  };

  // Base styles for the preview container
  const previewContainerStyle: React.CSSProperties = {
    backgroundColor: mode === 'light' ? theme.colors.background : '#1a1f2c',
    color: mode === 'light' ? theme.colors.textPrimary : '#ffffff',
    fontFamily: theme.fonts.family,
    padding: '1rem',
    borderRadius: getBorderRadius(),
    overflow: 'hidden',
    height: '700px',
    fontSize: getFontSize(14),
    position: 'relative',
    border: '1px solid ' + (mode === 'light' ? '#e2e8f0' : '#2d3748')
  };

  // Sidebar styles
  const sidebarStyle: React.CSSProperties = {
    backgroundColor: theme.colors.sidebar.background,
    color: theme.colors.sidebar.foreground,
    width: '200px',
    height: '100%',
    padding: '1rem 0',
    position: 'absolute',
    right: '0',
    top: '0',
    boxShadow: getShadow()
  };

  // Content area styles
  const contentStyle: React.CSSProperties = {
    marginRight: '200px',
    padding: '1rem'
  };

  // Card styles
  const cardStyle: React.CSSProperties = {
    backgroundColor: mode === 'light' ? '#ffffff' : '#2d3748',
    borderRadius: getBorderRadius(),
    boxShadow: getShadow(),
    overflow: 'hidden',
    marginBottom: '1rem'
  };

  // Header styles
  const headerStyle: React.CSSProperties = {
    backgroundColor: theme.colors.header,
    color: '#ffffff',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    boxShadow: getShadow()
  };

  // Button styles
  const buttonStyle: React.CSSProperties = {
    backgroundColor: theme.colors.button,
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: getBorderRadius(),
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: getFontSize(14)
  };

  // Secondary button styles
  const secondaryButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    color: theme.colors.textPrimary,
    border: '1px solid ' + (mode === 'light' ? '#e2e8f0' : '#2d3748'),
    padding: '0.5rem 1rem',
    borderRadius: getBorderRadius(),
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: getFontSize(14)
  };

  // Sidebar item styles
  const sidebarItemStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: theme.colors.sidebar.item.text,
    cursor: 'pointer'
  };

  // Active sidebar item styles
  const activeSidebarItemStyle: React.CSSProperties = {
    ...sidebarItemStyle,
    backgroundColor: theme.colors.sidebar.item.active,
    color: theme.colors.sidebar.item.activeText
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">معاينة المظهر</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onTogglePreviewMode}
          className="h-8 w-8 p-0"
        >
          {mode === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div style={previewContainerStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <div className="flex items-center gap-2">
              <Menu className="h-5 w-5" />
              <span style={{ fontFamily: theme.fonts.family, fontWeight: 'bold' }}>
                نظام المحاسبة
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <User className="h-4 w-4" />
              {mode === 'light' ? 
                <Moon className="h-4 w-4" /> : 
                <Sun className="h-4 w-4" />
              }
            </div>
          </div>
          
          {/* Main container with sidebar */}
          <div style={{ display: 'flex', height: 'calc(100% - 60px)' }}>
            {/* Sidebar */}
            <div style={sidebarStyle}>
              <div className="px-4 py-2 mb-4 font-bold" style={{ 
                fontFamily: theme.fonts.headings.family,
                fontWeight: theme.fonts.headings.weight === 'normal' ? 400 : 
                           theme.fonts.headings.weight === 'medium' ? 500 : 
                           theme.fonts.headings.weight === 'semibold' ? 600 : 700  
              }}>
                القائمة الرئيسية
              </div>
              <div style={activeSidebarItemStyle}>
                <Home className="h-4 w-4" />
                <span>الرئيسية</span>
              </div>
              <div style={sidebarItemStyle}>
                <User className="h-4 w-4" />
                <span>الحسابات</span>
              </div>
              <div style={sidebarItemStyle}>
                <Settings className="h-4 w-4" />
                <span>الإعدادات</span>
              </div>
            </div>
            
            {/* Content area */}
            <div style={contentStyle}>
              <h1 style={{ 
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.headings.family,
                fontSize: getFontSize(24),
                marginBottom: '1rem',
                fontWeight: theme.fonts.headings.weight === 'normal' ? 400 : 
                           theme.fonts.headings.weight === 'medium' ? 500 : 
                           theme.fonts.headings.weight === 'semibold' ? 600 : 700 
              }}>
                لوحة التحكم
              </h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {/* Card 1 */}
                <div style={cardStyle}>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ 
                      color: mode === 'light' ? theme.colors.textPrimary : '#ffffff',
                      fontFamily: theme.fonts.headings.family,
                      fontSize: getFontSize(18),
                      marginBottom: '0.5rem',
                      fontWeight: theme.fonts.headings.weight === 'normal' ? 400 : 
                              theme.fonts.headings.weight === 'medium' ? 500 : 
                              theme.fonts.headings.weight === 'semibold' ? 600 : 700 
                    }}>
                      البيانات الأخيرة
                    </h3>
                    <p style={{ 
                      color: mode === 'light' ? theme.colors.textSecondary : '#a0aec0',
                      marginBottom: '1rem',
                      fontSize: getFontSize(14)
                    }}>
                      آخر تحديث: اليوم
                    </p>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '1rem'
                    }}>
                      <button style={buttonStyle}>
                        عرض التفاصيل
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Card 2 */}
                <div style={cardStyle}>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ 
                      color: mode === 'light' ? theme.colors.textPrimary : '#ffffff',
                      fontFamily: theme.fonts.headings.family,
                      fontSize: getFontSize(18),
                      marginBottom: '0.5rem',
                      fontWeight: theme.fonts.headings.weight === 'normal' ? 400 : 
                              theme.fonts.headings.weight === 'medium' ? 500 : 
                              theme.fonts.headings.weight === 'semibold' ? 600 : 700 
                    }}>
                      الإحصائيات
                    </h3>
                    <p style={{ 
                      color: mode === 'light' ? theme.colors.textSecondary : '#a0aec0',
                      marginBottom: '1rem',
                      fontSize: getFontSize(14)
                    }}>
                      ملخص البيانات الشهرية
                    </p>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '1rem'
                    }}>
                      <button style={secondaryButtonStyle}>
                        تصدير
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form elements */}
              <div style={cardStyle}>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ 
                    color: mode === 'light' ? theme.colors.textPrimary : '#ffffff',
                    fontFamily: theme.fonts.headings.family,
                    fontSize: getFontSize(18),
                    marginBottom: '1rem',
                    fontWeight: theme.fonts.headings.weight === 'normal' ? 400 : 
                            theme.fonts.headings.weight === 'medium' ? 500 : 
                            theme.fonts.headings.weight === 'semibold' ? 600 : 700 
                  }}>
                    نموذج إدخال
                  </h3>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <Label htmlFor="name" style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontSize: getFontSize(14)
                    }}>
                      الاسم
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="أدخل الاسم" 
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        borderRadius: getBorderRadius(),
                        border: '1px solid ' + (mode === 'light' ? '#e2e8f0' : '#2d3748'),
                        backgroundColor: mode === 'light' ? '#ffffff' : '#1a202c',
                        color: mode === 'light' ? theme.colors.textPrimary : '#ffffff',
                        fontSize: getFontSize(14)
                      }}
                    />
                  </div>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <Label htmlFor="active" style={{ fontSize: getFontSize(14) }}>
                      نشط
                    </Label>
                    <Switch id="active" />
                  </div>
                  
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '0.5rem'
                  }}>
                    <button style={secondaryButtonStyle}>
                      إلغاء
                    </button>
                    <button style={buttonStyle}>
                      حفظ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
