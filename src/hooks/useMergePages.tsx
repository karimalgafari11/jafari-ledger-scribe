
import { useState } from 'react';
import { toast } from 'sonner';
import { type PageItem, usePageManagement } from './usePageManagement';

export const useMergePages = () => {
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
  
  const handleMergePages = (onCompleteCallback: () => void) => {
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
      resetSelections();
      onCompleteCallback();
    }, 1000);
  };
  
  const resetSelections = () => {
    setSourcePageId('');
    setTargetPageId('');
  };
  
  return {
    sourcePageId,
    targetPageId,
    setSourcePageId,
    setTargetPageId,
    flattenedOptions,
    handleMergePages,
    mergeInProgress,
    resetSelections
  };
};
