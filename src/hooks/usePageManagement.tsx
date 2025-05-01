
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';
import { menuItems as initialMenuItems } from '@/config/menuItems';
import { MenuItem } from '@/types/sidebar';
import { v4 as uuidv4 } from 'uuid';

type PageAction = 'edit' | 'delete' | 'merge' | 'duplicate' | 'move' | 'minimize' | 'enable';

export type PageItem = MenuItem & {
  id: string;
  parentId?: string;
  isEnabled?: boolean;
  isMinimized?: boolean;
  permissions?: string[];
  color?: string;
};

export type FlatPageItem = {
  id: string;
  section: string;
  path?: string;
  icon: any;
  parentId?: string;
  isEnabled: boolean;
  isMinimized: boolean;
  permissions?: string[];
  color?: string;
  children?: never;
  depth: number;
};

interface PageManagementContextType {
  pages: PageItem[];
  flattenedPages: FlatPageItem[];
  selectedPage: PageItem | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setPages: (pages: PageItem[]) => void;
  setSelectedPage: (page: PageItem | null) => void;
  handlePageAction: (action: PageAction, page: PageItem) => void;
  reorderPages: (sourceIndex: number, destinationIndex: number, parentId?: string) => void;
  movePage: (pageId: string, targetSectionId: string) => void;
  saveChanges: () => void;
  discardChanges: () => void;
  filterPages: (category?: string) => FlatPageItem[];
}

const PageManagementContext = createContext<PageManagementContextType | undefined>(undefined);

export const PageManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Convert initial menu items to include IDs and additional properties
  const convertMenuItems = (items: MenuItem[], parentId?: string): PageItem[] => {
    return items.map(item => {
      const id = uuidv4();
      const pageItem: PageItem = {
        ...item,
        id,
        parentId,
        isEnabled: true,
        isMinimized: false,
        children: item.children ? convertMenuItems(item.children, id) : []
      };
      return pageItem;
    });
  };

  const [pages, setPages] = useState<PageItem[]>(() => convertMenuItems(initialMenuItems));
  const [originalPages, setOriginalPages] = useState<PageItem[]>(() => convertMenuItems(initialMenuItems));
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Flattens the page hierarchy for table view
  const flattenPages = useCallback((items: PageItem[], depth = 0, parentPath = ''): FlatPageItem[] => {
    return items.reduce<FlatPageItem[]>((acc, item) => {
      const flatItem: FlatPageItem = {
        id: item.id,
        section: item.section,
        path: item.path,
        icon: item.icon,
        parentId: item.parentId,
        isEnabled: item.isEnabled ?? true,
        isMinimized: item.isMinimized ?? false,
        permissions: item.permissions,
        color: item.color,
        depth
      };
      
      acc.push(flatItem);
      
      if (item.children && item.children.length > 0) {
        acc.push(...flattenPages(item.children, depth + 1, item.path || parentPath));
      }
      
      return acc;
    }, []);
  }, []);

  const flattenedPages = flattenPages(pages);

  const filterPages = useCallback((category?: string): FlatPageItem[] => {
    let filtered = flattenedPages;
    
    if (category) {
      filtered = filtered.filter(page => {
        if (category === 'disabled') return !page.isEnabled;
        if (category === 'minimized') return page.isMinimized;
        return true;
      });
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(page => 
        page.section.toLowerCase().includes(query) || 
        page.path?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [flattenedPages, searchQuery]);

  const handlePageAction = useCallback((action: PageAction, page: PageItem) => {
    switch (action) {
      case 'edit':
        setSelectedPage(page);
        break;
      
      case 'delete':
        setPages(prevPages => {
          const updateItems = (items: PageItem[]): PageItem[] => {
            return items.filter(item => {
              if (item.id === page.id) return false;
              if (item.children) {
                item.children = updateItems(item.children);
              }
              return true;
            });
          };
          
          const newPages = updateItems([...prevPages]);
          toast.success(`تم حذف الصفحة: ${page.section}`);
          return newPages;
        });
        break;
      
      case 'duplicate':
        setPages(prevPages => {
          const duplicatePage = (itemsArray: PageItem[], targetId: string): PageItem[] => {
            return itemsArray.map(item => {
              if (item.id === targetId) {
                const duplicatedItem: PageItem = {
                  ...item,
                  id: uuidv4(),
                  section: `${item.section} (نسخة)`,
                  children: item.children ? [...item.children] : []
                };
                return [item, duplicatedItem];
              }
              
              if (item.children) {
                item.children = duplicatePage(item.children, targetId).flat();
              }
              
              return item;
            }).flat();
          };
          
          const newPages = duplicatePage([...prevPages], page.id);
          toast.success(`تم نسخ الصفحة: ${page.section}`);
          return newPages;
        });
        break;
      
      case 'minimize':
        setPages(prevPages => {
          const updateItems = (items: PageItem[]): PageItem[] => {
            return items.map(item => {
              if (item.id === page.id) {
                return { ...item, isMinimized: !item.isMinimized };
              }
              if (item.children) {
                item.children = updateItems(item.children);
              }
              return item;
            });
          };
          
          const newPages = updateItems([...prevPages]);
          toast.success(`تم ${page.isMinimized ? 'إظهار' : 'تصغير'} الصفحة: ${page.section}`);
          return newPages;
        });
        break;
      
      case 'enable':
        setPages(prevPages => {
          const updateItems = (items: PageItem[]): PageItem[] => {
            return items.map(item => {
              if (item.id === page.id) {
                return { ...item, isEnabled: !item.isEnabled };
              }
              if (item.children) {
                item.children = updateItems(item.children);
              }
              return item;
            });
          };
          
          const newPages = updateItems([...prevPages]);
          toast.success(`تم ${page.isEnabled ? 'تعطيل' : 'تفعيل'} الصفحة: ${page.section}`);
          return newPages;
        });
        break;
      
      default:
        break;
    }
  }, []);

  const reorderPages = useCallback((sourceIndex: number, destinationIndex: number, parentId?: string) => {
    setPages(prevPages => {
      // This is a simplified implementation. A more complex implementation would handle
      // deep nesting and reordering between different parents.
      const newPages = [...prevPages];
      
      if (!parentId) {
        // Reordering root level items
        const [removed] = newPages.splice(sourceIndex, 1);
        newPages.splice(destinationIndex, 0, removed);
      } else {
        // Reordering child items
        const updateChildren = (items: PageItem[]): PageItem[] => {
          return items.map(item => {
            if (item.id === parentId && item.children) {
              const newChildren = [...item.children];
              const [removed] = newChildren.splice(sourceIndex, 1);
              newChildren.splice(destinationIndex, 0, removed);
              return { ...item, children: newChildren };
            }
            if (item.children) {
              return { ...item, children: updateChildren(item.children) };
            }
            return item;
          });
        };
        
        return updateChildren(newPages);
      }
      
      toast.success('تم إعادة ترتيب الصفحات');
      return newPages;
    });
  }, []);

  const movePage = useCallback((pageId: string, targetSectionId: string) => {
    setPages(prevPages => {
      let pageToMove: PageItem | null = null;
      
      // Find and remove the page
      const removePageFromSection = (items: PageItem[]): PageItem[] => {
        return items.filter(item => {
          if (item.id === pageId) {
            pageToMove = { ...item };
            return false;
          }
          if (item.children) {
            item.children = removePageFromSection(item.children);
          }
          return true;
        });
      };
      
      // Add the page to target section
      const addPageToSection = (items: PageItem[], targetId: string): PageItem[] => {
        return items.map(item => {
          if (item.id === targetId) {
            return {
              ...item,
              children: item.children ? [...item.children, { ...pageToMove!, parentId: targetId }] : [{ ...pageToMove!, parentId: targetId }]
            };
          }
          if (item.children) {
            item.children = addPageToSection(item.children, targetId);
          }
          return item;
        });
      };
      
      let newPages = removePageFromSection([...prevPages]);
      
      if (pageToMove) {
        if (targetSectionId === 'root') {
          // Move to root level
          pageToMove.parentId = undefined;
          newPages.push(pageToMove);
        } else {
          // Move to specific section
          newPages = addPageToSection(newPages, targetSectionId);
        }
        
        toast.success(`تم نقل الصفحة: ${pageToMove.section}`);
      }
      
      return newPages;
    });
  }, []);

  const saveChanges = useCallback(() => {
    // In a real application, this would save to the backend
    setOriginalPages([...pages]);
    toast.success('تم حفظ التغييرات بنجاح');
  }, [pages]);

  const discardChanges = useCallback(() => {
    setPages([...originalPages]);
    toast.info('تم إلغاء التغييرات');
  }, [originalPages]);

  const contextValue: PageManagementContextType = {
    pages,
    flattenedPages,
    selectedPage,
    searchQuery,
    setSearchQuery,
    setPages,
    setSelectedPage,
    handlePageAction,
    reorderPages,
    movePage,
    saveChanges,
    discardChanges,
    filterPages,
  };

  return (
    <PageManagementContext.Provider value={contextValue}>
      {children}
    </PageManagementContext.Provider>
  );
};

export const usePageManagement = () => {
  const context = useContext(PageManagementContext);
  if (!context) {
    throw new Error('usePageManagement must be used within a PageManagementProvider');
  }
  return context;
};
