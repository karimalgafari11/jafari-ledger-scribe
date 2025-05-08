
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatters";
import { Copy, Download, FileText, MoreHorizontal, PenLine, Star, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Report {
  id: string;
  name?: string;
  title: string;
  description: string;
  type: string;
  category: string | string[];
  createdAt: Date;
  lastRun?: Date;
  favorite: boolean;
  author: string;
}

interface CustomReportListProps {
  reports: Report[];
  onEdit?: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onExport: (id: string) => void;
  onFavorite: (id: string) => void;
}

export const CustomReportList: React.FC<CustomReportListProps> = ({
  reports,
  onEdit,
  onDelete,
  onDuplicate,
  onExport,
  onFavorite
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px] text-center"></TableHead>
            <TableHead>اسم التقرير</TableHead>
            <TableHead>النوع</TableHead>
            <TableHead>الفئة</TableHead>
            <TableHead>تاريخ الإنشاء</TableHead>
            <TableHead>آخر تشغيل</TableHead>
            <TableHead>أنشأه</TableHead>
            <TableHead className="w-[150px] text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                لم يتم العثور على تقارير مطابقة لمعايير البحث.
              </TableCell>
            </TableRow>
          ) : (
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 ${report.favorite ? "text-yellow-400" : "text-gray-400"}`}
                    onClick={() => onFavorite(report.id)}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span>{report.name || report.title}</span>
                  </div>
                </TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>
                  {Array.isArray(report.category) ? (
                    <div className="flex flex-wrap gap-1">
                      {report.category.map((cat, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      {report.category}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {formatDate(report.createdAt.toISOString())}
                </TableCell>
                <TableCell>
                  {report.lastRun ? formatDate(report.lastRun.toISOString()) : "لم يتم التشغيل بعد"}
                </TableCell>
                <TableCell>
                  {report.author}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onExport(report.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    {onEdit && (
                      <Button variant="ghost" size="icon" onClick={() => onEdit(report.id)}>
                        <PenLine className="h-4 w-4" />
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onDuplicate(report.id)}>
                          <Copy className="ml-2 h-4 w-4" />
                          نسخ التقرير
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onExport(report.id)}>
                          <Download className="ml-2 h-4 w-4" />
                          تصدير
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => onDelete(report.id)}
                        >
                          <Trash className="ml-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
