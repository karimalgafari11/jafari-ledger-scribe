
import React from 'react';
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CostCenter } from '@/hooks/useCostCenters';
import { cn } from '@/lib/utils';

interface CostCenterTreeProps {
  costCenters: CostCenter[];
  onEdit: (center: CostCenter) => void;
  onDelete: (center: CostCenter) => void;
  onAddChild: (parent: CostCenter) => void;
}

export const CostCenterTree: React.FC<CostCenterTreeProps> = ({
  costCenters,
  onEdit,
  onDelete,
  onAddChild,
}) => {
  const rootCenters = costCenters.filter(center => center.parentId === null);
  
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <div className="overflow-auto max-h-[500px]">
        <table className="w-full text-right">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="border-b">
              <th className="p-3 text-sm font-medium text-gray-700">الرمز</th>
              <th className="p-3 text-sm font-medium text-gray-700">الاسم</th>
              <th className="p-3 text-sm font-medium text-gray-700">الوصف</th>
              <th className="p-3 text-sm font-medium text-gray-700">الحالة</th>
              <th className="p-3 text-sm font-medium text-gray-700">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {rootCenters.map(center => (
              <CostCenterTreeItem
                key={center.id}
                center={center}
                costCenters={costCenters}
                level={0}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddChild={onAddChild}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface CostCenterTreeItemProps {
  center: CostCenter;
  costCenters: CostCenter[];
  level: number;
  onEdit: (center: CostCenter) => void;
  onDelete: (center: CostCenter) => void;
  onAddChild: (parent: CostCenter) => void;
}

const CostCenterTreeItem: React.FC<CostCenterTreeItemProps> = ({
  center,
  costCenters,
  level,
  onEdit,
  onDelete,
  onAddChild,
}) => {
  const [expanded, setExpanded] = React.useState(true);
  const children = costCenters.filter(c => c.parentId === center.id);
  const hasChildren = children.length > 0;
  
  return (
    <>
      <tr className={cn(
        "border-b hover:bg-gray-50 transition-colors",
        level % 2 === 1 ? "bg-gray-50/50" : "bg-white"
      )}>
        <td className="p-3">
          <div className="flex items-center">
            <div style={{ width: level * 20 }} className="flex-shrink-0" />
            {hasChildren ? (
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 hover:bg-gray-200 rounded-md mr-1"
              >
                {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              <div className="w-7" />
            )}
            <span className="ms-1 font-mono">{center.code}</span>
          </div>
        </td>
        <td className="p-3">{center.name}</td>
        <td className="p-3 text-gray-600 max-w-[300px] truncate">{center.description}</td>
        <td className="p-3">
          {center.isActive ? (
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              نشط
            </span>
          ) : (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              غير نشط
            </span>
          )}
        </td>
        <td className="p-3">
          <div className="flex space-x-2 items-center justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onAddChild(center)}
              title="إضافة مركز كلفة فرعي"
            >
              <Plus size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(center)}
              title="تعديل مركز الكلفة"
            >
              <Edit size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(center)}
              title="حذف مركز الكلفة"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </td>
      </tr>
      {expanded && hasChildren && children.map(child => (
        <CostCenterTreeItem
          key={child.id}
          center={child}
          costCenters={costCenters}
          level={level + 1}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
        />
      ))}
    </>
  );
};
