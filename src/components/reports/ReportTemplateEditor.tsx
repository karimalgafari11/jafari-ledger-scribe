
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileImage, Save, Layout, Type, Grid, Image } from "lucide-react";

interface ReportTemplateEditorProps {
  initialTemplate?: ReportTemplate;
  onSave: (template: ReportTemplate) => void;
  onCancel: () => void;
}

export interface ReportTemplate {
  id?: string;
  name: string;
  description: string;
  type: string;
  content: ReportTemplateContent;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReportTemplateContent {
  header: ReportSectionContent;
  body: ReportSectionContent;
  footer: ReportSectionContent;
  settings: ReportTemplateSettings;
}

export interface ReportSectionContent {
  elements: ReportElement[];
}

export interface ReportElement {
  id: string;
  type: 'text' | 'image' | 'table' | 'chart';
  properties: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface ReportTemplateSettings {
  pageSize: 'A4' | 'A5' | 'Letter';
  orientation: 'portrait' | 'landscape';
  margins: { top: number; right: number; bottom: number; left: number };
  showPageNumbers: boolean;
  headerHeight: number;
  footerHeight: number;
}

export const ReportTemplateEditor: React.FC<ReportTemplateEditorProps> = ({ 
  initialTemplate,
  onSave,
  onCancel 
}) => {
  const [template, setTemplate] = useState<ReportTemplate>(initialTemplate || {
    name: '',
    description: '',
    type: 'invoice',
    content: {
      header: { elements: [] },
      body: { elements: [] },
      footer: { elements: [] },
      settings: {
        pageSize: 'A4',
        orientation: 'portrait',
        margins: { top: 20, right: 20, bottom: 20, left: 20 },
        showPageNumbers: true,
        headerHeight: 100,
        footerHeight: 50
      }
    }
  });

  const [activeTab, setActiveTab] = useState<'design' | 'settings'>('design');
  const [activeSection, setActiveSection] = useState<'header' | 'body' | 'footer'>('body');

  const handleSave = () => {
    if (!template.name) {
      toast.error("الرجاء إدخال اسم القالب");
      return;
    }
    
    onSave(template);
    toast.success("تم حفظ القالب بنجاح");
  };

  const handleAddElement = (type: 'text' | 'image' | 'table' | 'chart') => {
    const newElement: ReportElement = {
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      properties: type === 'text' ? { content: 'نص جديد', fontSize: 12, fontWeight: 'normal' } : {},
      position: { x: 0, y: 0 },
      size: { width: 100, height: type === 'text' ? 30 : 100 }
    };

    setTemplate(prev => {
      const updatedContent = { ...prev.content };
      updatedContent[activeSection].elements = [
        ...updatedContent[activeSection].elements,
        newElement
      ];
      
      return { ...prev, content: updatedContent };
    });

    toast.info(`تمت إضافة عنصر جديد (${type}) إلى القسم ${activeSection}`);
  };

  const updateTemplateSetting = (path: string[], value: any) => {
    setTemplate(prev => {
      const updated = { ...prev };
      let current = updated;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return updated;
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>محرر القالب</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={onCancel}
              >
                إلغاء
              </Button>
              <Button 
                onClick={handleSave}
              >
                <Save className="ml-2 h-4 w-4" />
                حفظ القالب
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="name">اسم القالب</Label>
              <Input 
                id="name"
                value={template.name} 
                onChange={(e) => updateTemplateSetting(['name'], e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="type">نوع القالب</Label>
              <Select 
                value={template.type} 
                onValueChange={(value) => updateTemplateSetting(['type'], value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="اختر نوع القالب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice">فاتورة</SelectItem>
                  <SelectItem value="financial">تقرير مالي</SelectItem>
                  <SelectItem value="inventory">تقرير مخزون</SelectItem>
                  <SelectItem value="sales">تقرير مبيعات</SelectItem>
                  <SelectItem value="custom">مخصص</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="description">وصف القالب</Label>
            <Textarea 
              id="description"
              value={template.description} 
              onChange={(e) => updateTemplateSetting(['description'], e.target.value)}
              placeholder="وصف مختصر للقالب"
            />
          </div>

          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 mr-2 ${activeTab === 'design' ? 'border-b-2 border-primary font-medium' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              <Layout className="h-4 w-4 ml-2 inline" />
              تصميم
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-primary font-medium' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FileImage className="h-4 w-4 ml-2 inline" />
              إعدادات
            </button>
          </div>

          {activeTab === 'design' && (
            <div className="space-y-4">
              <div className="flex border-b mb-4">
                <button
                  className={`px-4 py-2 mr-2 ${activeSection === 'header' ? 'border-b-2 border-primary font-medium' : ''}`}
                  onClick={() => setActiveSection('header')}
                >
                  رأس التقرير
                </button>
                <button
                  className={`px-4 py-2 mr-2 ${activeSection === 'body' ? 'border-b-2 border-primary font-medium' : ''}`}
                  onClick={() => setActiveSection('body')}
                >
                  محتوى التقرير
                </button>
                <button
                  className={`px-4 py-2 ${activeSection === 'footer' ? 'border-b-2 border-primary font-medium' : ''}`}
                  onClick={() => setActiveSection('footer')}
                >
                  تذييل التقرير
                </button>
              </div>

              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" onClick={() => handleAddElement('text')}>
                  <Type className="ml-2 h-4 w-4" />
                  إضافة نص
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddElement('image')}>
                  <Image className="ml-2 h-4 w-4" />
                  إضافة صورة
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddElement('table')}>
                  <Grid className="ml-2 h-4 w-4" />
                  إضافة جدول
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddElement('chart')}>
                  <FileImage className="ml-2 h-4 w-4" />
                  إضافة مخطط
                </Button>
              </div>

              <div className="bg-gray-100 border rounded-md p-4 min-h-[400px] relative">
                <div className="text-center text-gray-400 absolute inset-0 flex items-center justify-center">
                  {template.content[activeSection].elements.length === 0 ? 
                    'منطقة السحب والإفلات (قريبًا)' :
                    `عدد العناصر في ${activeSection === 'header' ? 'رأس التقرير' : activeSection === 'body' ? 'محتوى التقرير' : 'تذييل التقرير'}: ${template.content[activeSection].elements.length}`
                  }
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pageSize">حجم الصفحة</Label>
                  <Select 
                    value={template.content.settings.pageSize} 
                    onValueChange={(value: 'A4' | 'A5' | 'Letter') => 
                      updateTemplateSetting(['content', 'settings', 'pageSize'], value)
                    }
                  >
                    <SelectTrigger id="pageSize">
                      <SelectValue placeholder="اختر حجم الصفحة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="A5">A5</SelectItem>
                      <SelectItem value="Letter">Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="orientation">اتجاه الصفحة</Label>
                  <Select 
                    value={template.content.settings.orientation} 
                    onValueChange={(value: 'portrait' | 'landscape') => 
                      updateTemplateSetting(['content', 'settings', 'orientation'], value)
                    }
                  >
                    <SelectTrigger id="orientation">
                      <SelectValue placeholder="اختر اتجاه الصفحة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">عمودي</SelectItem>
                      <SelectItem value="landscape">أفقي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="marginTop">الهامش العلوي</Label>
                  <Input 
                    id="marginTop"
                    type="number" 
                    value={template.content.settings.margins.top} 
                    onChange={(e) => updateTemplateSetting(
                      ['content', 'settings', 'margins', 'top'], 
                      parseInt(e.target.value) || 0
                    )} 
                  />
                </div>
                <div>
                  <Label htmlFor="marginRight">الهامش الأيمن</Label>
                  <Input 
                    id="marginRight"
                    type="number" 
                    value={template.content.settings.margins.right} 
                    onChange={(e) => updateTemplateSetting(
                      ['content', 'settings', 'margins', 'right'], 
                      parseInt(e.target.value) || 0
                    )} 
                  />
                </div>
                <div>
                  <Label htmlFor="marginBottom">الهامش السفلي</Label>
                  <Input 
                    id="marginBottom"
                    type="number" 
                    value={template.content.settings.margins.bottom} 
                    onChange={(e) => updateTemplateSetting(
                      ['content', 'settings', 'margins', 'bottom'], 
                      parseInt(e.target.value) || 0
                    )} 
                  />
                </div>
                <div>
                  <Label htmlFor="marginLeft">الهامش الأيسر</Label>
                  <Input 
                    id="marginLeft"
                    type="number" 
                    value={template.content.settings.margins.left} 
                    onChange={(e) => updateTemplateSetting(
                      ['content', 'settings', 'margins', 'left'], 
                      parseInt(e.target.value) || 0
                    )} 
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  id="showPageNumbers"
                  checked={template.content.settings.showPageNumbers}
                  onChange={(e) => updateTemplateSetting(
                    ['content', 'settings', 'showPageNumbers'], 
                    e.target.checked
                  )}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="showPageNumbers">إظهار أرقام الصفحات</Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
