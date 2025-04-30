
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export interface CostCenter {
  id: string;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// بيانات وهمية لمراكز الكلفة
const mockCostCenters: CostCenter[] = [
  {
    id: '1',
    code: 'CC-001',
    name: 'المبيعات',
    description: 'مركز كلفة المبيعات',
    isActive: true,
    parentId: null,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: '2',
    code: 'CC-002',
    name: 'التسويق',
    description: 'مركز كلفة التسويق',
    isActive: true,
    parentId: null,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: '3',
    code: 'CC-003',
    name: 'الإنتاج',
    description: 'مركز كلفة الإنتاج',
    isActive: true,
    parentId: null,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: '4',
    code: 'CC-003-01',
    name: 'قسم التصنيع',
    description: 'قسم التصنيع ضمن الإنتاج',
    isActive: true,
    parentId: '3',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: '5',
    code: 'CC-003-02',
    name: 'قسم التجميع',
    description: 'قسم التجميع ضمن الإنتاج',
    isActive: true,
    parentId: '3',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: '6',
    code: 'CC-004',
    name: 'الإدارة',
    description: 'مركز كلفة الإدارة',
    isActive: true,
    parentId: null,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: '7',
    code: 'CC-005',
    name: 'الموارد البشرية',
    description: 'مركز كلفة الموارد البشرية',
    isActive: true,
    parentId: null,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  }
];

export const useCostCenters = () => {
  const [costCenters, setCostCenters] = useState<CostCenter[]>(mockCostCenters);
  const [selectedCostCenter, setSelectedCostCenter] = useState<CostCenter | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // إنشاء مركز كلفة جديد
  const createCostCenter = (data: Omit<CostCenter, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCostCenter: CostCenter = {
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setCostCenters([...costCenters, newCostCenter]);
    toast.success('تم إنشاء مركز الكلفة بنجاح');
    return newCostCenter;
  };

  // تعديل مركز كلفة موجود
  const updateCostCenter = (id: string, data: Partial<CostCenter>) => {
    setCostCenters(
      costCenters.map((center) => 
        center.id === id ? { ...center, ...data, updatedAt: new Date() } : center
      )
    );
    toast.success('تم تحديث مركز الكلفة بنجاح');
  };

  // حذف مركز كلفة
  const deleteCostCenter = (id: string) => {
    const hasChildren = costCenters.some(center => center.parentId === id);
    
    if (hasChildren) {
      toast.error('لا يمكن حذف مركز الكلفة لأنه يحتوي على مراكز كلفة فرعية');
      return false;
    }
    
    setCostCenters(costCenters.filter(center => center.id !== id));
    toast.success('تم حذف مركز الكلفة بنجاح');
    return true;
  };

  // الحصول على مراكز الكلفة الرئيسية (التي ليس لها أب)
  const getRootCostCenters = () => {
    return costCenters.filter(center => center.parentId === null);
  };

  // الحصول على مراكز الكلفة الفرعية لمركز كلفة معين
  const getChildCostCenters = (parentId: string) => {
    return costCenters.filter(center => center.parentId === parentId);
  };

  // إنشاء مركز كلفة فرعي
  const createChildCostCenter = (parentId: string, data: Omit<CostCenter, 'id' | 'createdAt' | 'updatedAt' | 'parentId'>) => {
    return createCostCenter({
      ...data,
      parentId
    });
  };

  // توليد رمز تلقائي لمركز الكلفة الجديد
  const generateCostCenterCode = (parentId: string | null = null) => {
    if (parentId) {
      const parent = costCenters.find(center => center.id === parentId);
      if (!parent) return 'CC-NEW';
      
      const siblings = getChildCostCenters(parentId);
      const nextNumber = (siblings.length + 1).toString().padStart(2, '0');
      return `${parent.code}-${nextNumber}`;
    } else {
      const rootCenters = getRootCostCenters();
      const nextNumber = (rootCenters.length + 1).toString().padStart(3, '0');
      return `CC-${nextNumber}`;
    }
  };

  return {
    costCenters,
    selectedCostCenter,
    setSelectedCostCenter,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createCostCenter,
    updateCostCenter,
    deleteCostCenter,
    getRootCostCenters,
    getChildCostCenters,
    createChildCostCenter,
    generateCostCenterCode
  };
};
