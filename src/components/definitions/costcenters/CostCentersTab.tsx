
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface CostCentersTabProps {
  embedded?: boolean;
}

const CostCentersTab: React.FC<CostCentersTabProps> = ({ embedded = false }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className={embedded ? "text-lg font-medium" : "text-xl font-semibold"}>مراكز التكلفة</h2>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 ml-1" />
          إضافة مركز تكلفة
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="p-10 flex justify-center items-center text-muted-foreground">
          لا توجد مراكز تكلفة. قم بإضافة مركز تكلفة جديد.
        </div>
      </div>
    </div>
  );
};

export default CostCentersTab;
