
import React, { useEffect, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { type PageItem, usePageManagement } from '@/hooks/usePageManagement';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { HexColorPicker } from 'react-colorful';

const PageEditorDialog = () => {
  const { selectedPage, setSelectedPage, pages, setPages } = usePageManagement();
  
  const [formData, setFormData] = useState({
    section: '',
    path: '',
    isEnabled: true,
    isMinimized: false,
    color: '#3b82f6',
    parentId: 'root'
  });
  
  useEffect(() => {
    if (selectedPage) {
      setFormData({
        section: selectedPage.section,
        path: selectedPage.path || '',
        isEnabled: selectedPage.isEnabled !== false,
        isMinimized: selectedPage.isMinimized === true,
        color: selectedPage.color || '#3b82f6',
        parentId: selectedPage.parentId || 'root'
      });
    }
  }, [selectedPage]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleColorChange = (color: string) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };
  
  const handleSubmit = () => {
    if (!selectedPage) return;
    
    const updatePageInTree = (items: PageItem[]): PageItem[] => {
      return items.map(item => {
        if (item.id === selectedPage.id) {
          return {
            ...item,
            section: formData.section,
            path: formData.path || item.path,
            isEnabled: formData.isEnabled,
            isMinimized: formData.isMinimized,
            color: formData.color
          };
        }
        if (item.children) {
          return {
            ...item,
            children: updatePageInTree(item.children)
          };
        }
        return item;
      });
    };
    
    setPages(updatePageInTree(pages));
    toast.success(`تم تحديث الصفحة: ${formData.section}`);
    setSelectedPage(null);
  };
  
  const getFlatParentOptions = (): { id: string, label: string, depth: number }[] => {
    const options: { id: string, label: string, depth: number }[] = [
      { id: 'root', label: 'الصفحة الرئيسية', depth: 0 }
    ];
    
    const getParents = (items: PageItem[], depth = 0) => {
      items.forEach(item => {
        // Don't include the current page as a parent option
        if (selectedPage && item.id === selectedPage.id) return;
        
        options.push({
          id: item.id,
          label: item.section,
          depth
        });
        
        if (item.children) {
          getParents(item.children, depth + 1);
        }
      });
    };
    
    getParents(pages);
    return options;
  };
  
  return (
    <Dialog open={!!selectedPage} onOpenChange={(open) => !open && setSelectedPage(null)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>تعديل الصفحة</DialogTitle>
          <DialogDescription>
            قم بتعديل خصائص الصفحة. اضغط حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right col-span-1">
              اسم الصفحة
            </Label>
            <Input
              id="section"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="path" className="text-right col-span-1">
              المسار
            </Label>
            <Input
              id="path"
              name="path"
              value={formData.path}
              onChange={handleInputChange}
              className="col-span-3 text-left"
              dir="ltr"
              placeholder="/path/to/page"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="parent" className="text-right col-span-1">
              القسم الأب
            </Label>
            <Select
              value={formData.parentId}
              onValueChange={(value) => handleSelectChange('parentId', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر القسم الأب" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {getFlatParentOptions().map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.id}
                      className={option.depth > 0 ? `pr-${option.depth * 4}` : ''}
                    >
                      {option.depth > 0 && '└ '}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right col-span-1">
              اللون
            </Label>
            <div className="col-span-3">
              <div className="mb-2">
                <HexColorPicker color={formData.color} onChange={handleColorChange} />
              </div>
              <Input
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="text-left"
                dir="ltr"
              />
              <div
                className="w-full h-6 mt-2 rounded"
                style={{ backgroundColor: formData.color }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isEnabled" className="text-right col-span-1">
              مفعل
            </Label>
            <Switch
              id="isEnabled"
              checked={formData.isEnabled}
              onCheckedChange={(checked) => handleSwitchChange('isEnabled', checked)}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isMinimized" className="text-right col-span-1">
              مصغر
            </Label>
            <Switch
              id="isMinimized"
              checked={formData.isMinimized}
              onCheckedChange={(checked) => handleSwitchChange('isMinimized', checked)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setSelectedPage(null)}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit}>
            حفظ التغييرات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PageEditorDialog;
