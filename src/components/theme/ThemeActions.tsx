
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

interface ThemeActionsProps {
  themeMode: 'light' | 'dark';
  isSaving: boolean;
  isResetDialogOpen: boolean;
  setIsResetDialogOpen: (open: boolean) => void;
  onThemeModeToggle: () => void;
  onSaveTheme: () => void;
  onResetTheme: () => void;
}

export const ThemeActions: React.FC<ThemeActionsProps> = ({
  themeMode,
  isSaving,
  isResetDialogOpen,
  setIsResetDialogOpen,
  onThemeModeToggle,
  onSaveTheme,
  onResetTheme
}) => {
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
