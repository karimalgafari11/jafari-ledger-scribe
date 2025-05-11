
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { useReportTemplates } from "@/hooks/useReportTemplates";
import { ReportTemplatesList } from "@/components/reports/ReportTemplatesList";
import { ReportTemplateEditor } from "@/components/reports/editor/ReportTemplateEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Upload, Search, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportTemplate } from "@/types/reportTemplate";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ReportTemplatesPage = () => {
  const {
    templates,
    activeTemplate,
    isEditing,
    saveTemplate,
    deleteTemplate,
    duplicateTemplate,
    exportTemplate,
    importTemplate,
    createNewTemplate,
    editTemplate,
    cancelEditing
  } = useReportTemplates();

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      importTemplate(e.target.files[0]);
      e.target.value = '';
    }
  };

  const filteredTemplates = templates.filter(template => {
    // فلترة حسب البحث
    const matchesSearch = searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // فلترة حسب التبويب النشط
    const matchesTab = activeTab === "all" || template.type === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const templateCountByType = templates.reduce((acc, template) => {
    acc[template.type] = (acc[template.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <PageContainer title="نماذج التقارير">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">نماذج التقارير</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="ml-2 h-4 w-4" />
              استيراد نموذج
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button onClick={createNewTemplate}>
              <Plus className="ml-2 h-4 w-4" />
              نموذج جديد
            </Button>
          </div>
        </div>

        {!isEditing ? (
          <>
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث عن نموذج..."
                    className="pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full md:w-auto"
                >
                  <TabsList className="w-full md:w-auto">
                    <TabsTrigger value="all">
                      الكل
                      <Badge variant="secondary" className="mr-2">
                        {templates.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="invoice">
                      فواتير
                      <Badge variant="secondary" className="mr-2">
                        {templateCountByType['invoice'] || 0}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="financial">
                      مالي
                      <Badge variant="secondary" className="mr-2">
                        {templateCountByType['financial'] || 0}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="custom">
                      مخصص
                      <Badge variant="secondary" className="mr-2">
                        {templateCountByType['custom'] || 0}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {filteredTemplates.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <FileText className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-center">لا توجد نماذج</h3>
                  {searchQuery ? (
                    <p className="text-muted-foreground text-center mt-2">
                      لا توجد نتائج تطابق بحثك. جرب مصطلحات بحث مختلفة.
                    </p>
                  ) : (
                    <p className="text-muted-foreground text-center mt-2">
                      لم يتم إنشاء أي نماذج تقارير بعد. قم بإنشاء نموذج جديد للبدء.
                    </p>
                  )}
                  <Button onClick={createNewTemplate} className="mt-4">
                    <Plus className="ml-2 h-4 w-4" />
                    إنشاء نموذج جديد
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <ReportTemplatesList
                templates={filteredTemplates}
                onEdit={editTemplate}
                onDelete={deleteTemplate}
                onDuplicate={duplicateTemplate}
                onExport={exportTemplate}
              />
            )}
          </>
        ) : (
          <ReportTemplateEditor
            initialTemplate={activeTemplate || undefined}
            onSave={(template: ReportTemplate) => {
              saveTemplate(template);
              toast.success("تم حفظ القالب بنجاح");
            }}
            onCancel={cancelEditing}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default ReportTemplatesPage;
