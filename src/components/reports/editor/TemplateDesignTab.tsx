
import React from 'react';
import { Button } from "@/components/ui/button";
import { Type, Image, Grid, FileImage } from "lucide-react";
import { ReportElement, ReportSectionContent } from "@/types/reportTemplate";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

interface TemplateDesignTabProps {
  activeSection: 'header' | 'body' | 'footer';
  setActiveSection: (section: 'header' | 'body' | 'footer') => void;
  content: {
    header: ReportSectionContent;
    body: ReportSectionContent;
    footer: ReportSectionContent;
  };
  onAddElement: (type: 'text' | 'image' | 'table' | 'chart') => void;
}

export const TemplateDesignTab: React.FC<TemplateDesignTabProps> = ({
  activeSection,
  setActiveSection,
  content,
  onAddElement
}) => {
  const renderElementPreview = (element: ReportElement) => {
    switch (element.type) {
      case 'text':
        return (
          <div className="bg-white p-2 border rounded-md mb-2">
            <div className="text-xs text-gray-500 mb-1">نص</div>
            <div className="text-sm">
              {element.properties.content || 'نص جديد'}
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="bg-white p-2 border rounded-md mb-2">
            <div className="text-xs text-gray-500 mb-1">صورة</div>
            <div className="bg-gray-100 h-12 flex items-center justify-center rounded">
              <Image className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        );
      case 'table':
        return (
          <div className="bg-white p-2 border rounded-md mb-2">
            <div className="text-xs text-gray-500 mb-1">جدول</div>
            <div className="bg-gray-100 h-12 flex items-center justify-center rounded">
              <Grid className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        );
      case 'chart':
        return (
          <div className="bg-white p-2 border rounded-md mb-2">
            <div className="text-xs text-gray-500 mb-1">مخطط</div>
            <div className="bg-gray-100 h-12 flex items-center justify-center rounded">
              <FileImage className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeSection} onValueChange={(value) => setActiveSection(value as 'header' | 'body' | 'footer')}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="header" className="flex-1">
            رأس التقرير
            <Badge variant="secondary" className="mr-2">
              {content.header.elements.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="body" className="flex-1">
            محتوى التقرير
            <Badge variant="secondary" className="mr-2">
              {content.body.elements.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex-1">
            تذييل التقرير
            <Badge variant="secondary" className="mr-2">
              {content.footer.elements.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={() => onAddElement('text')}>
          <Type className="ml-2 h-4 w-4" />
          إضافة نص
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAddElement('image')}>
          <Image className="ml-2 h-4 w-4" />
          إضافة صورة
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAddElement('table')}>
          <Grid className="ml-2 h-4 w-4" />
          إضافة جدول
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAddElement('chart')}>
          <FileImage className="ml-2 h-4 w-4" />
          إضافة مخطط
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="bg-gray-100 border rounded-md p-4 min-h-[400px] relative">
            {content[activeSection].elements.length === 0 ? (
              <div className="text-center text-gray-400 absolute inset-0 flex items-center justify-center">
                {activeSection === 'header' ? 'منطقة رأس التقرير' : 
                 activeSection === 'body' ? 'منطقة محتوى التقرير' : 'منطقة تذييل التقرير'}
                <br />
                يمكنك إضافة عناصر باستخدام الأزرار في الأعلى
              </div>
            ) : (
              <div className="space-y-2">
                {content[activeSection].elements.map((element) => (
                  <div key={element.id} className="relative group">
                    {renderElementPreview(element)}
                    <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-5 w-5 bg-white shadow-sm hover:bg-gray-100"
                        onClick={() => toast.info("تحرير العنصر - قريباً")}
                      >
                        <Type className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-5 w-5 bg-white shadow-sm hover:bg-gray-100"
                        onClick={() => toast.info("حذف العنصر - قريباً")}
                      >
                        <Type className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
