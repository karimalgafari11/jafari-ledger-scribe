
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Moon, RotateCcw, Save, Sun } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ThemeActionsProps {
  themeMode: 'light' | 'dark';
  isSaving: boolean;
  isResetDialogOpen: boolean;
  setIsResetDialogOpen: (open: boolean) => void;
  onThemeModeToggle: () => void;
  onSaveTheme: () => void;
  onResetTheme: () => void;
  onSaveAsPreset: (name: string) => void;
}

export const ThemeActions: React.FC<ThemeActionsProps> = ({
  themeMode,
  isSaving,
  isResetDialogOpen,
  setIsResetDialogOpen,
  onThemeModeToggle,
  onSaveTheme,
  onResetTheme,
  onSaveAsPreset
}) => {
  const [presetName, setPresetName] = React.useState("");
  
  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSaveAsPreset(presetName);
      setPresetName("");
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onThemeModeToggle}
        title={themeMode === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري'}
      >
        {themeMode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 ml-2" />
            حفظ كسمة
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">حفظ كسمة جديدة</h4>
              <p className="text-sm text-muted-foreground">
                أدخل اسماً للسمة ليتم حفظها واستخدامها لاحقاً
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="presetName">اسم السمة</Label>
                <Input
                  id="presetName"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="مثال: السمة الرسمية"
                  className="col-span-2 h-8"
                />
              </div>
              <Button 
                onClick={handleSavePreset} 
                disabled={!presetName.trim()}
                className="w-full mt-2"
              >
                حفظ السمة
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 ml-2" />
            إعادة الضبط
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>إعادة ضبط السمة</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من إعادة ضبط جميع إعدادات السمة إلى القيم الافتراضية؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={onResetTheme}>
              نعم، إعادة الضبط
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Button 
        onClick={onSaveTheme} 
        disabled={isSaving}
      >
        {isSaving ? (
          <>
            <span className="animate-pulse">جاري الحفظ...</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4 ml-2" />
            حفظ التغييرات
          </>
        )}
      </Button>
    </div>
  );
};
