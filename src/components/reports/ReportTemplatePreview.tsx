
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download, Share2 } from "lucide-react";
import { ReportTemplate } from "@/types/reportTemplate";

interface ReportTemplatePreviewProps {
  template: ReportTemplate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportTemplatePreview: React.FC<ReportTemplatePreviewProps> = ({
  template,
  isOpen,
  onClose
}) => {
  if (!template) return null;

  const getPreviewContent = () => {
    // هذه مجرد محاكاة بسيطة لمعاينة القالب
    const { pageSize, orientation } = template.content.settings;
    
    return (
      <div 
        className={`bg-white border border-gray-200 shadow-sm mx-auto overflow-hidden
          ${orientation === 'portrait' ? 'w-full max-w-[595px] h-[842px]' : 'w-full max-w-[842px] h-[595px]'}`}
        style={{
          aspectRatio: orientation === 'portrait' ? '1 / 1.414' : '1.414 / 1',
        }}
      >
        {/* منطقة الترويسة */}
        <div 
          className="bg-blue-50 p-4 border-b border-gray-200"
          style={{ height: `${template.content.settings.headerHeight}px` }}
        >
          <h2 className="text-lg font-bold">ترويسة القالب: {template.name}</h2>
          <p>عناصر الترويسة: {template.content.header.elements.length}</p>
        </div>
        
        {/* منطقة المحتوى */}
        <div className="p-4 flex-1 flex flex-col items-center justify-center bg-gray-50">
          <p className="text-center text-gray-500 mb-4">معاينة محتوى التقرير</p>
          <p className="text-sm text-gray-400 text-center">عناصر المحتوى: {template.content.body.elements.length}</p>
          
          <div className="mt-8 w-full">
            {template.content.body.elements.map((element, index) => (
              <div 
                key={element.id}
                className="mb-4 p-3 border border-dashed border-gray-300 rounded-md bg-white"
              >
                <div className="text-sm text-gray-600">{element.type === 'text' ? 'نص' : element.type === 'image' ? 'صورة' : element.type === 'table' ? 'جدول' : 'مخطط'}</div>
                {element.type === 'text' && element.properties.content && (
                  <p className="mt-1">{element.properties.content}</p>
                )}
                {element.type === 'image' && (
                  <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">صورة</span>
                  </div>
                )}
                {element.type === 'table' && (
                  <div className="w-full h-24 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">جدول</span>
                  </div>
                )}
                {element.type === 'chart' && (
                  <div className="w-full h-24 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">مخطط بياني</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* منطقة التذييل */}
        <div 
          className="bg-blue-50 p-4 border-t border-gray-200"
          style={{ height: `${template.content.settings.footerHeight}px` }}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm">تذييل القالب</span>
            {template.content.settings.showPageNumbers && (
              <span className="text-sm">صفحة 1 من 1</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>معاينة قالب: {template.name}</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Printer className="h-4 w-4 ml-2" />
                طباعة
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير PDF
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 ml-2" />
                مشاركة
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          {getPreviewContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
