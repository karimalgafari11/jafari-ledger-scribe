
import React from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Paintbrush, Type, Layout as LayoutIcon, Palette, BookMarked } from "lucide-react";
import { ColorSection } from "@/components/theme/ColorSection";
import { FontSection } from "@/components/theme/FontSection";
import { LayoutSection } from "@/components/theme/LayoutSection";
import { ThemePreview } from "@/components/theme/ThemePreview";
import { ThemeActions } from "@/components/theme/ThemeActions";
import { useThemeCustomization } from "@/hooks/theme/useThemeCustomization";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { ThemePresetsSection } from "@/components/theme/ThemePresetsSection";

const ThemeCustomizationPage: React.FC = () => {
  const {
    currentTheme,
    isResetDialogOpen,
    setIsResetDialogOpen,
    isSaving,
    activeTab,
    setActiveTab,
    presets,
    handleColorChange,
    handleSidebarColorChange,
    handleFontFamilyChange,
    handleFontSizeChange,
    handleHeadingFontFamilyChange,
    handleHeadingFontWeightChange,
    handleSpacingCompactChange,
    handleSpacingSizeChange,
    handleRoundnessChange,
    handleShadowsChange,
    handleThemeModeToggle,
    handleSaveTheme,
    handleResetTheme,
    handleSaveAsPreset,
    handleDeletePreset,
    handleApplyPreset,
    handleExportTheme,
    handleImportTheme
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
            onSaveAsPreset={handleSaveAsPreset}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="colors" className="flex items-center gap-2 text-base py-2.5">
                      <Palette className="h-5 w-5" />
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
                    <TabsTrigger value="presets" className="flex items-center gap-2 text-base py-2.5">
                      <BookMarked className="h-5 w-5" />
                      السمات
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Tab Content - Colors Section */}
                  <TabsContent value="colors" className="space-y-6">
                    <ColorSection 
                      colors={currentTheme.colors}
                      onColorChange={handleColorChange}
                      onSidebarColorChange={handleSidebarColorChange}
                    />
                  </TabsContent>
                  
                  {/* Tab Content - Typography Section */}
                  <TabsContent value="typography" className="space-y-6">
                    <FontSection 
                      fonts={currentTheme.fonts}
                      onFontFamilyChange={handleFontFamilyChange}
                      onFontSizeChange={handleFontSizeChange}
                      onHeadingFontFamilyChange={handleHeadingFontFamilyChange}
                      onHeadingFontWeightChange={handleHeadingFontWeightChange}
                      linkColor={currentTheme.colors.link}
                    />
                  </TabsContent>
                  
                  {/* Tab Content - Layout Section */}
                  <TabsContent value="layout" className="space-y-6">
                    <LayoutSection 
                      spacing={currentTheme.spacing}
                      roundness={currentTheme.roundness}
                      effects={currentTheme.effects}
                      onSpacingCompactChange={handleSpacingCompactChange}
                      onSpacingSizeChange={handleSpacingSizeChange}
                      onRoundnessChange={handleRoundnessChange}
                      onShadowsChange={handleShadowsChange}
                    />
                  </TabsContent>
                  
                  {/* Tab Content - Presets Section */}
                  <TabsContent value="presets" className="space-y-6">
                    <ThemePresetsSection 
                      currentTheme={currentTheme}
                      presets={presets}
                      onSavePreset={handleSaveAsPreset}
                      onDeletePreset={handleDeletePreset}
                      onApplyPreset={handleApplyPreset}
                      onExportTheme={handleExportTheme}
                      onImportTheme={handleImportTheme}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Preview Section */}
          <div className="lg:col-span-1">
            <ThemePreview theme={currentTheme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizationPage;
