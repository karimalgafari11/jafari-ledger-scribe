
import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogDescription, 
  DialogHeader, 
  DialogFooter, 
  DialogContent 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SelectPageDropdown from './components/SelectPageDropdown';
import MergeWarning from './components/MergeWarning';
import { useMergePages } from '@/hooks/useMergePages';

interface PageMergeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PageMergeDialog = ({ open, onOpenChange }: PageMergeDialogProps) => {
  const {
    sourcePageId,
    targetPageId,
    setSourcePageId,
    setTargetPageId,
    flattenedOptions,
    handleMergePages,
    mergeInProgress
  } = useMergePages();
  
  const options = flattenedOptions();
  
  const handleMerge = () => {
    handleMergePages(() => onOpenChange(false));
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
          <MergeWarning />
          
          <SelectPageDropdown 
            label="الصفحة المصدر"
            value={sourcePageId}
            onValueChange={setSourcePageId}
            options={options}
            disabledValue={targetPageId}
          />
          
          <SelectPageDropdown 
            label="الصفحة الهدف"
            value={targetPageId}
            onValueChange={setTargetPageId}
            options={options}
            disabledValue={sourcePageId}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={mergeInProgress}>
            إلغاء
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleMerge} 
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
