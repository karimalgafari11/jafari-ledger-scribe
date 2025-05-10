
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-lg text-muted-foreground mt-2">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card-container shadow-md">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="colors" className="flex items-center gap-2 text-base py-2.5">
                    <Paintbrush className="h-5 w-5" />
                    الألوان
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="flex items-center gap-2 text-base py-2.5">
                    <Type className="h-5 w-5" />
                    الخطوط
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="flex items-center gap-2 text-base py-2.5">
                    <LayoutIcon className="h-5 w-5" />
                    التخطيط
                  </TabsTrigger>
                </TabsList>
                
                {/* Tab Content - Colors Section */}
                <TabsContent value="colors" className="space-y-6 mt-6">
                  <ColorSection 
                    colors={currentTheme.colors}
                    onColorChange={handleColorChange}
                  />
                </TabsContent>
                
                {/* Tab Content - Typography Section */}
                <TabsContent value="typography" className="space-y-6 mt-6">
                  <FontSection 
                    fonts={currentTheme.fonts}
                    onFontFamilyChange={handleFontFamilyChange}
                    onFontSizeChange={handleFontSizeChange}
                    linkColor={currentTheme.colors.link}
                  />
                </TabsContent>
                
                {/* Tab Content - Layout Section */}
                <TabsContent value="layout" className="space-y-6 mt-6">
                  <LayoutSection />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="card-container h-full shadow-md">
              <ThemePreview theme={currentTheme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizationPage;
