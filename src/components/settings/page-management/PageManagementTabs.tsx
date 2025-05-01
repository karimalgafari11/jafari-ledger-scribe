
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePageManagement } from '@/hooks/usePageManagement';
import PageManagementTable from './PageManagementTable';
import PageManagementVisual from './PageManagementVisual';
import PageEditorDialog from './PageEditorDialog';
import PageMergeDialog from './PageMergeDialog';

const PageManagementTabs = () => {
  const { 
    searchQuery, 
    setSearchQuery,
    saveChanges,
    discardChanges,
  } = usePageManagement();

  const [showMergeDialog, setShowMergeDialog] = useState(false);

  return (
    <>
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث عن صفحة..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={discardChanges}>
              إلغاء التغييرات
            </Button>
            <Button variant="default" size="sm" onClick={saveChanges}>
              حفظ التغييرات
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => setShowMergeDialog(true)}
            >
              دمج الصفحات
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="table" className="w-full">
        <div className="px-4 pt-2">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="table" className="flex-1 md:flex-none">عرض الجدول</TabsTrigger>
            <TabsTrigger value="visual" className="flex-1 md:flex-none">العرض المرئي</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="table" className="p-0">
          <PageManagementTable />
        </TabsContent>
        
        <TabsContent value="visual" className="p-0">
          <PageManagementVisual />
        </TabsContent>
      </Tabs>
      
      <PageEditorDialog />
      <PageMergeDialog open={showMergeDialog} onOpenChange={setShowMergeDialog} />
    </>
  );
};

export default PageManagementTabs;
