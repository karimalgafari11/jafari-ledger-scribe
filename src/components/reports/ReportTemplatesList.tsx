
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatters";
import { Edit, FileText, Trash, Copy, Download, Eye } from "lucide-react";
import { ReportTemplate } from '@/types/reportTemplate';
import { Badge } from "@/components/ui/badge";

interface ReportTemplatesListProps {
  templates: ReportTemplate[];
  onEdit: (template: ReportTemplate) => void;
  onDelete: (templateId: string) => void;
  onDuplicate: (template: ReportTemplate) => void;
  onExport: (template: ReportTemplate) => void;
  onPreview?: (template: ReportTemplate) => void;
}

export const ReportTemplatesList: React.FC<ReportTemplatesListProps> = ({
  templates,
  onEdit,
  onDelete,
  onDuplicate,
  onExport,
  onPreview
}) => {
  const getTemplateTypeLabel = (type: string) => {
    switch (type) {
      case 'invoice': return { label: 'فاتورة', color: 'bg-blue-100 text-blue-800' };
      case 'financial': return { label: 'تقرير مالي', color: 'bg-green-100 text-green-800' };
      case 'inventory': return { label: 'تقرير مخزون', color: 'bg-amber-100 text-amber-800' };
      case 'sales': return { label: 'تقرير مبيعات', color: 'bg-purple-100 text-purple-800' };
      case 'custom': return { label: 'مخصص', color: 'bg-gray-100 text-gray-800' };
      default: return { label: type, color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead>اسم القالب</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>آخر تحديث</TableHead>
                <TableHead className="w-[200px] text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    لم يتم إنشاء أي قوالب بعد
                  </TableCell>
                </TableRow>
              ) : (
                templates.map((template) => {
                  const typeInfo = getTemplateTypeLabel(template.type);
                  return (
                    <TableRow key={template.id} className="group">
                      <TableCell className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{template.name}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${typeInfo.color} border-0`}>
                          {typeInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {template.description}
                      </TableCell>
                      <TableCell>
                        {template.createdAt ? formatDate(template.createdAt.toISOString()) : '-'}
                      </TableCell>
                      <TableCell>
                        {template.updatedAt ? formatDate(template.updatedAt.toISOString()) : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1 opacity-70 group-hover:opacity-100">
                          {onPreview && (
                            <Button variant="ghost" size="icon" title="معاينة" onClick={() => onPreview(template)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" title="تعديل" onClick={() => onEdit(template)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="نسخ" onClick={() => onDuplicate(template)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="تصدير" onClick={() => onExport(template)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="حذف"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => onDelete(template.id as string)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
