
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useThemeCustomization } from "@/hooks/theme/useThemeCustomization";
import { ColorSection } from "@/components/theme/ColorSection";
import { FontSection } from "@/components/theme/FontSection";
import { LayoutSection } from "@/components/theme/LayoutSection";
import { ThemePreview } from "@/components/theme/ThemePreview";
import { ThemePresetsSection } from "@/components/theme/ThemePresetsSection";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Palette, Save, Undo2, Type, Layout, Moon, Sun } from "lucide-react";

const ThemeCustomizationPage = () => {
  // Use the theme customization hook
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

  // State for preview mode (light/dark)
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>(currentTheme.mode);

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <PageContainer title="تخصيص المظهر" showBack={true}>
      <div className="container p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">تخصيص مظهر النظام</h1>
            <p className="text-muted-foreground">قم بتخصيص ألوان وخطوط ومظهر التطبيق حسب تفضيلاتك</p>
          </div>
          <div className="space-x-2 rtl:space-x-reverse flex items-center">
            <div className="flex items-center border rounded-md p-1 me-2">
              <Button 
                variant={currentTheme.mode === "light" ? "default" : "ghost"} 
                size="sm"
                className="px-2 h-8"
                onClick={() => {
                  if (currentTheme.mode !== "light") {
                    handleThemeModeToggle();
                  }
                }}
              >
                <Sun className="h-4 w-4 ml-1" />
                فاتح
              </Button>
              <Button 
                variant={currentTheme.mode === "dark" ? "default" : "ghost"} 
                size="sm"
                className="px-2 h-8"
                onClick={() => {
                  if (currentTheme.mode !== "dark") {
                    handleThemeModeToggle();
                  }
                }}
              >
                <Moon className="h-4 w-4 ml-1" />
                داكن
              </Button>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsResetDialogOpen(true)}
              disabled={isSaving}
            >
              <Undo2 className="ml-2 h-4 w-4" />
              إعادة تعيين
            </Button>
            <Button 
              onClick={handleSaveTheme} 
              disabled={isSaving}
            >
              <Save className="ml-2 h-4 w-4" />
              حفظ التغييرات
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="colors" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 w-full grid grid-cols-3">
                <TabsTrigger value="colors" className="flex items-center">
                  <Palette className="ml-1 h-4 w-4" />
                  الألوان
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex items-center">
                  <Type className="ml-1 h-4 w-4" />
                  الخطوط
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex items-center">
                  <Layout className="ml-1 h-4 w-4" />
                  التخطيط
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="colors">
                <ColorSection 
                  colors={currentTheme.colors} 
                  onColorChange={handleColorChange}
                  onSidebarColorChange={handleSidebarColorChange}
                />
              </TabsContent>
              
              <TabsContent value="typography">
                <FontSection 
                  fonts={currentTheme.fonts}
                  onFontFamilyChange={handleFontFamilyChange}
                  onFontSizeChange={handleFontSizeChange}
                  onHeadingFontFamilyChange={handleHeadingFontFamilyChange}
                  onHeadingFontWeightChange={handleHeadingFontWeightChange}
                />
              </TabsContent>
              
              <TabsContent value="layout">
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
            </Tabs>
            
            <div className="mt-6">
              <ThemePresetsSection 
                presets={presets}
                currentTheme={currentTheme}
                onApplyPreset={handleApplyPreset}
                onDeletePreset={handleDeletePreset}
                onSaveAsPreset={handleSaveAsPreset}
                onExportTheme={handleExportTheme}
                onImportTheme={handleImportTheme}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <ThemePreview 
              theme={currentTheme} 
              mode={previewMode}
              onTogglePreviewMode={togglePreviewMode}
            />
            
            <Separator className="my-4" />
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">نصائح للتخصيص</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>استخدم ألوانًا متناسقة للحصول على مظهر احترافي.</li>
                <li>تأكد من وجود تباين كافٍ بين الخلفية ولون النص.</li>
                <li>يمكنك حفظ أكثر من سمة واستخدامها في أوقات مختلفة.</li>
                <li>تصدير واستيراد السمات يسمح لك بمشاركتها مع الآخرين.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reset Theme Dialog */}
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>إعادة تعيين المظهر</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من رغبتك في إعادة تعيين مظهر التطبيق إلى الإعدادات الافتراضية؟ سيتم فقدان جميع التخصيصات الحالية.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetTheme}>
              إعادة تعيين
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
};

export default ThemeCustomizationPage;
