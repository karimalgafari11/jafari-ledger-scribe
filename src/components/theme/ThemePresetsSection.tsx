
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Download, Save, Trash, Upload } from "lucide-react";
import { ThemePreset } from "@/types/theme";

interface ThemePresetsSectionProps {
  presets: ThemePreset[];
  currentTheme: any;
  onApplyPreset: (preset: ThemePreset) => void;
  onDeletePreset: (id: string) => void;
  onSaveAsPreset: (name: string) => void;
  onExportTheme: () => void;
  onImportTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ThemePresetsSection: React.FC<ThemePresetsSectionProps> = ({
  presets,
  currentTheme,
  onApplyPreset,
  onDeletePreset,
  onSaveAsPreset,
  onExportTheme,
  onImportTheme
}) => {
  const [isAddPresetDialogOpen, setIsAddPresetDialogOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveNewPreset = () => {
    if (newPresetName.trim()) {
      onSaveAsPreset(newPresetName.trim());
      setNewPresetName("");
      setIsAddPresetDialogOpen(false);
    }
  };

  const filteredPresets = presets.filter(preset => 
    preset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userPresets = filteredPresets.filter(preset => !preset.isPredefined);
  const predefinedPresets = filteredPresets.filter(preset => preset.isPredefined);

  // Reference to hidden file input for import
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>السمات المحفوظة</CardTitle>
        <CardDescription>
          قم بحفظ وتطبيق السمات المخصصة
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsAddPresetDialogOpen(true)}
            >
              <Save className="h-4 w-4 ml-1" />
              حفظ السمة الحالية
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onExportTheme}
            >
              <Download className="h-4 w-4 ml-1" />
              تصدير
            </Button>
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImportTheme}
              className="hidden"
              accept=".json"
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 ml-1" />
              استيراد
            </Button>
          </div>
        </div>

        <Input
          placeholder="بحث في السمات..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        
        {filteredPresets.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            لم يتم العثور على سمات
          </div>
        ) : (
          <ScrollArea className="h-[300px] rounded-md border p-4">
            {predefinedPresets.length > 0 && (
              <>
                <h3 className="font-medium mb-3">السمات الافتراضية</h3>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {predefinedPresets.map((preset) => (
                    <PresetCard
                      key={preset.id}
                      preset={preset}
                      onApply={() => onApplyPreset(preset)}
                      isPredefined
                    />
                  ))}
                </div>
              </>
            )}
            
            {userPresets.length > 0 && (
              <>
                <h3 className="font-medium mb-3">السمات المخصصة</h3>
                <div className="grid grid-cols-1 gap-3">
                  {userPresets.map((preset) => (
                    <PresetCard
                      key={preset.id}
                      preset={preset}
                      onApply={() => onApplyPreset(preset)}
                      onDelete={() => onDeletePreset(preset.id)}
                      isPredefined={false}
                    />
                  ))}
                </div>
              </>
            )}
          </ScrollArea>
        )}
        
        <Dialog open={isAddPresetDialogOpen} onOpenChange={setIsAddPresetDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>حفظ السمة الحالية</DialogTitle>
              <DialogDescription>
                أدخل اسمًا للسمة المخصصة الجديدة.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="اسم السمة"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              className="mt-4"
              autoFocus
            />
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsAddPresetDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleSaveNewPreset}>
                حفظ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

interface PresetCardProps {
  preset: ThemePreset;
  onApply: () => void;
  onDelete?: () => void;
  isPredefined: boolean;
}

const PresetCard: React.FC<PresetCardProps> = ({ preset, onApply, onDelete, isPredefined }) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: preset.settings.colors.primary }}
          />
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: preset.settings.colors.button }}
          />
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: preset.settings.colors.sidebar.background }}
          />
        </div>
        <span className="font-medium">{preset.name}</span>
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" onClick={onApply} title="تطبيق">
          <Check className="h-4 w-4" />
        </Button>
        {!isPredefined && onDelete && (
          <Button variant="ghost" size="icon" onClick={onDelete} title="حذف">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
