
import React from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { FileText, CreditCard, RotateCcw } from "lucide-react";
import { Transaction } from "@/types/transactions";

type TransactionType = Transaction["type"] | "all";

interface StatementFilterProps {
  selectedTypes: TransactionType[];
  onFilterChange: (types: TransactionType[]) => void;
}

export const StatementFilter = ({ selectedTypes, onFilterChange }: StatementFilterProps) => {
  const handleToggle = (type: TransactionType) => {
    if (type === "all") {
      // إذا تم النقر على "الكل"، إما تحديد الكل أو مسح الكل
      if (selectedTypes.includes("all")) {
        onFilterChange([]);
      } else {
        onFilterChange(["all", "invoice", "payment", "return"]);
      }
    } else {
      let newTypes: TransactionType[];
      
      if (selectedTypes.includes(type)) {
        // إزالة النوع إذا كان محددًا بالفعل
        newTypes = selectedTypes.filter(t => t !== type && t !== "all");
      } else {
        // إضافة النوع إذا لم يكن محددًا
        newTypes = [...selectedTypes.filter(t => t !== "all"), type];
        
        // التحقق مما إذا كانت جميع الأنواع الفردية محددة لإضافة "الكل" أيضًا
        if (["invoice", "payment", "return"].every(t => 
          newTypes.includes(t as TransactionType))) {
          newTypes.push("all");
        }
      }
      
      onFilterChange(newTypes);
    }
  };

  const isSelected = (type: TransactionType) => selectedTypes.includes(type);

  return (
    <div className="flex flex-col mb-4">
      <h3 className="text-sm font-medium mb-2 text-right">تصفية حسب نوع المعاملة</h3>
      <div className="flex gap-2 flex-wrap justify-end">
        <Toggle 
          pressed={isSelected("all")} 
          onPressedChange={() => handleToggle("all")}
          variant="outline"
          className="flex flex-row-reverse"
        >
          <span>الكل</span>
        </Toggle>
        <Toggle 
          pressed={isSelected("invoice")} 
          onPressedChange={() => handleToggle("invoice")}
          variant="outline"
          className="flex flex-row-reverse"
        >
          <FileText size={16} className="ml-1" />
          <span>فواتير</span>
        </Toggle>
        <Toggle 
          pressed={isSelected("payment")} 
          onPressedChange={() => handleToggle("payment")}
          variant="outline"
          className="flex flex-row-reverse"
        >
          <CreditCard size={16} className="ml-1" />
          <span>دفعات</span>
        </Toggle>
        <Toggle 
          pressed={isSelected("return")} 
          onPressedChange={() => handleToggle("return")}
          variant="outline"
          className="flex flex-row-reverse"
        >
          <RotateCcw size={16} className="ml-1" />
          <span>مرتجعات</span>
        </Toggle>
      </div>
    </div>
  );
};
