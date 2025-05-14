
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemePreset, ThemeSettings } from "@/types/theme";
import { Check, Copy, Download, Save, Trash2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ThemePresetsSectionProps {
  currentTheme: ThemeSettings;
  presets: ThemePreset[];
  onSavePreset: (name: string) => void;
  onDeletePreset: (id: string) => void;
  onApplyPreset: (preset: ThemePreset) => void;
  onExportTheme: () => void;
  onImportTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ThemePresetsSection: React.FC<ThemePresetsSectionProps> = ({
  currentTheme,
  presets,
  onSavePreset,
  onDeletePreset,
  onApplyPreset,
  onExportTheme,
  onImportTheme
}) => {
  const [newPresetName, setNewPresetName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handleSaveNewPreset = () => {
    if (!newPresetName.trim()) {
      toast.error("يرجى إدخال اسم للسمة");
      return;
    }

    onSavePreset(newPresetName);
    setNewPresetName("");
    setIsCreateDialogOpen(false);
    toast.success("تم حفظ السمة بنجاح");
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">سمات محفوظة</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Save className="h-4 w-4 ml-2" />
                حفظ كسمة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>حفظ السمة الحالية</DialogTitle>
                <DialogDescription>
                  أدخل اسماً للسمة الجديدة ليتم حفظها واستخدامها لاحقاً
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="presetName">اسم السمة</Label>
                  <Input
                    id="presetName"
                    placeholder="مثال: السمة الرسمية للشركة"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleSaveNewPreset}>
                  <Save className="h-4 w-4 ml-2" />
                  حفظ السمة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onExportTheme}>
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            
            <Button variant="outline" onClick={triggerFileInput}>
              <Upload className="h-4 w-4 ml-2" />
              استيراد
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImportTheme}
              className="hidden"
              accept=".json"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {presets.map((preset) => (
          <Card 
            key={preset.id} 
            className={`overflow-hidden transition-all duration-200 ${
              selectedPreset === preset.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div 
              className="h-2" 
              style={{ backgroundColor: preset.settings.colors.primary }}
            ></div>
            <CardHeader className="p-4">
              <CardTitle className="flex items-center justify-between">
                <span>{preset.name}</span>
                {preset.isPredefined ? (
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">افتراضي</span>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد من حذف هذه السمة؟</AlertDialogTitle>
                        <AlertDialogDescription>
                          هذا الإجراء لا يمكن التراجع عنه، وسيتم حذف هذه السمة نهائياً.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => onDeletePreset(preset.id)}
                        >
                          حذف السمة
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardTitle>
              <CardDescription>
                {preset.isPredefined ? 'سمة افتراضية في النظام' : 'سمة مخصصة'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center space-x-2 space-x-reverse mb-3">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.settings.colors.primary }}></div>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.settings.colors.secondary }}></div>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.settings.colors.button }}></div>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.settings.colors.sidebar.background }}></div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">الخط: </span>
                  <span>{preset.settings.fonts.family}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="text-sm h-8"
                  onClick={() => {
                    onApplyPreset(preset);
                    setSelectedPreset(preset.id);
                    setTimeout(() => setSelectedPreset(null), 500);
                  }}
                >
                  {selectedPreset === preset.id ? (
                    <Check className="h-4 w-4 ml-2" />
                  ) : (
                    <Copy className="h-4 w-4 ml-2" />
                  )}
                  تطبيق
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
