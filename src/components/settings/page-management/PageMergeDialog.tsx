
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogDescription, 
  DialogHeader, 
  DialogFooter, 
  DialogContent 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { type PageItem, usePageManagement } from '@/hooks/usePageManagement';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface PageMergeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PageMergeDialog = ({ open, onOpenChange }: PageMergeDialogProps) => {
  const { pages, setPages } = usePageManagement();
  const [sourcePageId, setSourcePageId] = useState<string>('');
  const [targetPageId, setTargetPageId] = useState<string>('');
  const [mergeInProgress, setMergeInProgress] = useState(false);
  
  const flattenedOptions = () => {
    const options: { id: string, label: string, path?: string, depth: number }[] = [];
    
    const flatten = (items: PageItem[], depth = 0) => {
      items.forEach(item => {
        options.push({
          id: item.id,
          label: item.section,
          path: item.path,
          depth
        });
        
        if (item.children) {
          flatten(item.children, depth + 1);
        }
      });
    };
    
    flatten(pages);
    return options;
  };
  
  const options = flattenedOptions();
  
  const handleMergePages = () => {
    if (!sourcePageId || !targetPageId || sourcePageId === targetPageId) {
      toast.error('يرجى اختيار صفحتين مختلفتين للدمج');
      return;
    }
    
    setMergeInProgress(true);
    
    // In a real application, you would have more complex merging logic
    // This is a simple implementation
    setTimeout(() => {
      let sourcePage: PageItem | null = null;
      let targetPage: PageItem | null = null;
      
      // Find source and target pages
      const findPages = (items: PageItem[]): PageItem[] => {
        return items.map(item => {
          if (item.id === sourcePageId) {
            sourcePage = { ...item };
            return item;
          }
          if (item.id === targetPageId) {
            targetPage = item;
            return item;
          }
          if (item.children) {
            item.children = findPages(item.children);
          }
          return item;
        });
      };
      
      findPages([...pages]);
      
      if (sourcePage && targetPage) {
        // Remove source page
        const removeSourcePage = (items: PageItem[]): PageItem[] => {
          return items.filter(item => {
            if (item.id === sourcePageId) {
              return false;
            }
            if (item.children) {
              item.children = removeSourcePage(item.children);
            }
            return true;
          });
        };
        
        const updatedPages = removeSourcePage([...pages]);
        
        // Update target page name to reflect merge
        const updateTargetPage = (items: PageItem[]): PageItem[] => {
          return items.map(item => {
            if (item.id === targetPageId) {
              // In a real application, you would merge the content
              return {
                ...item,
                section: `${item.section} + ${sourcePage!.section}`
              };
            }
            if (item.children) {
              item.children = updateTargetPage(item.children);
            }
            return item;
          });
        };
        
        const finalPages = updateTargetPage(updatedPages);
        
        setPages(finalPages);
        toast.success('تم دمج الصفحات بنجاح');
      } else {
        toast.error('حدث خطأ أثناء محاولة دمج الصفحات');
      }
      
      setMergeInProgress(false);
      onOpenChange(false);
      setSourcePageId('');
      setTargetPageId('');
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>دمج الصفحات</DialogTitle>
          <DialogDescription>
            اختر صفحتين لدمجهما معًا. سيتم نقل محتوى الصفحة الأولى إلى الثانية.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-700">
              <strong>تحذير:</strong> عملية الدمج لا يمكن التراجع عنها. تأكد من اختيار الصفحات الصحيحة قبل المتابعة.
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sourcePage" className="text-right col-span-1">
              الصفحة المصدر
            </Label>
            <Select value={sourcePageId} onValueChange={setSourcePageId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر الصفحة المصدر" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.id}
                      disabled={option.id === targetPageId}
                    >
                      {option.depth > 0 ? '└'.repeat(option.depth) + ' ' : ''}
                      {option.label}
                      {option.path ? ` (${option.path})` : ''}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="targetPage" className="text-right col-span-1">
              الصفحة الهدف
            </Label>
            <Select value={targetPageId} onValueChange={setTargetPageId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر الصفحة الهدف" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.id}
                      disabled={option.id === sourcePageId}
                    >
                      {option.depth > 0 ? '└'.repeat(option.depth) + ' ' : ''}
                      {option.label}
                      {option.path ? ` (${option.path})` : ''}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={mergeInProgress}>
            إلغاء
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleMergePages} 
            disabled={!sourcePageId || !targetPageId || sourcePageId === targetPageId || mergeInProgress}
          >
            {mergeInProgress ? 'جاري الدمج...' : 'دمج الصفحات'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PageMergeDialog;
