
import React from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Paintbrush, Type, Layout as LayoutIcon } from "lucide-react";
import { ColorSection } from "@/components/theme/ColorSection";
import { FontSection } from "@/components/theme/FontSection";
import { LayoutSection } from "@/components/theme/LayoutSection";
import { ThemePreview } from "@/components/theme/ThemePreview";
import { ThemeActions } from "@/components/theme/ThemeActions";
import { useThemeCustomization } from "@/hooks/useThemeCustomization";
import { Header } from "@/components/Header";

const ThemeCustomizationPage: React.FC = () => {
  const {
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
    handleResetTheme
  } = useThemeCustomization();

  return (
    <div className="page-container">
      <Header title="تخصيص المظهر" showBack={true} className="w-full" />
      <div className="page-content rtl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-muted-foreground mt-1">
              خصص ألوان وخطوط النظام حسب تفضيلاتك
            </p>
          </div>
          
          {/* Header Actions */}
          <ThemeActions 
            themeMode={currentTheme.mode}
            isSaving={isSaving}
            isResetDialogOpen={isResetDialogOpen}
            setIsResetDialogOpen={setIsResetDialogOpen}
            onThemeModeToggle={handleThemeModeToggle}
            onSaveTheme={handleSaveTheme}
            onResetTheme={handleResetTheme}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-container">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-2">
                  <TabsTrigger value="colors" className="flex items-center gap-1">
                    <Paintbrush className="h-4 w-4" />
                    الألوان
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="flex items-center gap-1">
                    <Type className="h-4 w-4" />
                    الخطوط
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="flex items-center gap-1">
                    <LayoutIcon className="h-4 w-4" />
                    التخطيط
                  </TabsTrigger>
                </TabsList>
                
                {/* Tab Content - Colors Section */}
                <TabsContent value="colors" className="space-y-4 mt-6">
                  <ColorSection 
                    colors={currentTheme.colors}
                    onColorChange={handleColorChange}
                  />
                </TabsContent>
                
                {/* Tab Content - Typography Section */}
                <TabsContent value="typography" className="space-y-4 mt-6">
                  <FontSection 
                    fonts={currentTheme.fonts}
                    onFontFamilyChange={handleFontFamilyChange}
                    onFontSizeChange={handleFontSizeChange}
                    linkColor={currentTheme.colors.link}
                  />
                </TabsContent>
                
                {/* Tab Content - Layout Section */}
                <TabsContent value="layout" className="space-y-4 mt-6">
                  <LayoutSection />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="card-container h-full">
              <ThemePreview theme={currentTheme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizationPage;
