
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { usePageManagement, FlatPageItem } from '@/hooks/usePageManagement';
import { 
  Edit, 
  Trash2, 
  Copy, 
  Minimize, 
  Maximize, 
  Eye, 
  EyeOff, 
  MoveHorizontal, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PageManagementTable = () => {
  const { flattenedPages, filterPages, handlePageAction } = usePageManagement();
  const [filter, setFilter] = useState<string | undefined>(undefined);
  
  const pages = filterPages(filter);

  const renderPageIcon = (page: FlatPageItem) => {
    const Icon = page.icon;
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  const getIndentation = (depth: number) => {
    return { paddingRight: `${depth * 20}px` };
  };

  return (
    <div>
      <div className="flex gap-2 p-4 border-b">
        <Badge 
          className={`cursor-pointer ${filter === undefined ? 'bg-primary' : 'bg-secondary'}`} 
          onClick={() => setFilter(undefined)}
        >
          الكل
        </Badge>
        <Badge 
          className={`cursor-pointer ${filter === 'disabled' ? 'bg-primary' : 'bg-secondary'}`} 
          onClick={() => setFilter('disabled')}
        >
          المعطلة
        </Badge>
        <Badge 
          className={`cursor-pointer ${filter === 'minimized' ? 'bg-primary' : 'bg-secondary'}`} 
          onClick={() => setFilter('minimized')}
        >
          المصغرة
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <Table bordered={true} striped={true} hoverable={true}>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الصفحة</TableHead>
              <TableHead>المسار</TableHead>
              <TableHead>الأيقونة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.length > 0 ? (
              pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell style={getIndentation(page.depth)}>
                    <div className="flex items-center">
                      {page.depth > 0 && (
                        <span className="text-gray-400 ml-2">└</span>
                      )}
                      <span>{page.section}</span>
                    </div>
                  </TableCell>
                  <TableCell>{page.path || '-'}</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      {renderPageIcon(page)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {!page.isEnabled && (
                        <Badge variant="outline" className="text-red-500 border-red-200">
                          معطل
                        </Badge>
                      )}
                      {page.isMinimized && (
                        <Badge variant="outline" className="text-amber-500 border-amber-200">
                          مصغر
                        </Badge>
                      )}
                      {page.isEnabled && !page.isMinimized && (
                        <Badge variant="outline" className="text-green-500 border-green-200">
                          نشط
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePageAction('edit', page)}
                        title="تعديل"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePageAction('duplicate', page)}
                        title="نسخ"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePageAction('minimize', page)}
                        title={page.isMinimized ? "توسيع" : "تصغير"}
                      >
                        {page.isMinimized ? (
                          <Maximize className="h-4 w-4" />
                        ) : (
                          <Minimize className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePageAction('enable', page)}
                        title={page.isEnabled ? "تعطيل" : "تفعيل"}
                      >
                        {page.isEnabled ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePageAction('delete', page)}
                        className="text-red-500"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  لا توجد صفحات تطابق معايير البحث
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PageManagementTable;
