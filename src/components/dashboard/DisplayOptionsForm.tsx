
import React from "react";
import { DisplayOptions } from "@/types/dashboard";

interface DisplayOptionsFormProps {
  displayOptions: DisplayOptions;
  setDisplayOptions: (options: DisplayOptions) => void;
  className?: string;
}

const DisplayOptionsForm: React.FC<DisplayOptionsFormProps> = ({ 
  displayOptions, 
  setDisplayOptions,
  className 
}) => {
  return (
    <div className={`mt-6 ${className}`}>
      <div className="card-container">
        <h3 className="text-xl font-semibold mb-2">خيارات العرض</h3>
        <div className="flex flex-wrap gap-3">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary"
              checked={displayOptions.showStats}
              onChange={(e) =>
                setDisplayOptions({ ...displayOptions, showStats: e.target.checked })
              }
            />
            <span className="mr-2 text-gray-700">إظهار الإحصائيات الرئيسية</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary"
              checked={displayOptions.showKpis}
              onChange={(e) =>
                setDisplayOptions({ ...displayOptions, showKpis: e.target.checked })
              }
            />
            <span className="mr-2 text-gray-700">إظهار مؤشرات الأداء الرئيسية</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary"
              checked={displayOptions.showCharts}
              onChange={(e) =>
                setDisplayOptions({ ...displayOptions, showCharts: e.target.checked })
              }
            />
            <span className="mr-2 text-gray-700">إظهار الرسوم البيانية</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary"
              checked={displayOptions.showAiWidget}
              onChange={(e) =>
                setDisplayOptions({ ...displayOptions, showAiWidget: e.target.checked })
              }
            />
            <span className="mr-2 text-gray-700">إظهار أدوات الذكاء الاصطناعي</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DisplayOptionsForm;
