
import React from "react";
import { Layout } from "@/components/Layout";
import { useReportTemplates } from "@/hooks/useReportTemplates";
import { ReportTemplatesList } from "@/components/reports/ReportTemplatesList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload } from "lucide-react";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      importTemplate(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <Layout>
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
          <ReportTemplatesList
            templates={templates}
            onEdit={editTemplate}
            onDelete={deleteTemplate}
            onDuplicate={duplicateTemplate}
            onExport={exportTemplate}
          />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">{activeTemplate?.id ? 'تعديل نموذج' : 'إنشاء نموذج جديد'}</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">اسم النموذج</Label>
                <Input
                  id="name"
                  value={activeTemplate?.name || ''}
                  onChange={(e) => {
                    if (activeTemplate) {
                      saveTemplate({
                        ...activeTemplate,
                        name: e.target.value
                      });
                    }
                  }}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">وصف النموذج</Label>
                <Input
                  id="description"
                  value={activeTemplate?.description || ''}
                  onChange={(e) => {
                    if (activeTemplate) {
                      saveTemplate({
                        ...activeTemplate,
                        description: e.target.value
                      });
                    }
                  }}
                  className="mt-1"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={cancelEditing}>
                  إلغاء
                </Button>
                <Button onClick={() => {
                  if (activeTemplate) {
                    saveTemplate(activeTemplate);
                  }
                }}>
                  حفظ
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReportTemplatesPage;
