
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const MergeWarning = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div className="text-sm text-amber-700">
        <strong>تحذير:</strong> عملية الدمج لا يمكن التراجع عنها. تأكد من اختيار الصفحات الصحيحة قبل المتابعة.
      </div>
    </div>
  );
};

export default MergeWarning;
