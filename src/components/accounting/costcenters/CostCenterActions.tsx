
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CostCenterActionsProps {
  onCreateCostCenter: () => void;
}

export const CostCenterActions: React.FC<CostCenterActionsProps> = ({
  onCreateCostCenter,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <Button onClick={onCreateCostCenter} className="bg-teal hover:bg-teal-dark text-white">
          <Plus className="h-4 w-4 ml-2" />
          إضافة مركز كلفة جديد
        </Button>
      </div>
    </div>
  );
};
