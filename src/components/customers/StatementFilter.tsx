
import React from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Invoice, Payment, RotateCcw } from "lucide-react";
import { Transaction } from "@/types/transactions";

type TransactionType = Transaction["type"] | "all";

interface StatementFilterProps {
  selectedTypes: TransactionType[];
  onFilterChange: (types: TransactionType[]) => void;
}

export const StatementFilter = ({ selectedTypes, onFilterChange }: StatementFilterProps) => {
  const handleToggle = (type: TransactionType) => {
    if (type === "all") {
      // If "all" is clicked, either select all or clear all
      if (selectedTypes.includes("all")) {
        onFilterChange([]);
      } else {
        onFilterChange(["all", "invoice", "payment", "return"]);
      }
    } else {
      let newTypes: TransactionType[];
      
      if (selectedTypes.includes(type)) {
        // Remove the type if it's already selected
        newTypes = selectedTypes.filter(t => t !== type && t !== "all");
      } else {
        // Add the type if it's not selected
        newTypes = [...selectedTypes.filter(t => t !== "all"), type];
        
        // Check if all individual types are selected to also add "all"
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
    <div className="flex flex-col mb-4 rtl">
      <h3 className="text-sm font-medium mb-2">تصفية حسب نوع المعاملة</h3>
      <div className="flex gap-2">
        <Toggle 
          pressed={isSelected("all")} 
          onPressedChange={() => handleToggle("all")}
          variant="outline"
        >
          <Button variant="ghost" size="sm" className="p-0 m-0">
            الكل
          </Button>
        </Toggle>
        <Toggle 
          pressed={isSelected("invoice")} 
          onPressedChange={() => handleToggle("invoice")}
          variant="outline"
        >
          <Invoice size={16} className="ml-1" />
          فواتير
        </Toggle>
        <Toggle 
          pressed={isSelected("payment")} 
          onPressedChange={() => handleToggle("payment")}
          variant="outline"
        >
          <Payment size={16} className="ml-1" />
          دفعات
        </Toggle>
        <Toggle 
          pressed={isSelected("return")} 
          onPressedChange={() => handleToggle("return")}
          variant="outline"
        >
          <RotateCcw size={16} className="ml-1" />
          مرتجعات
        </Toggle>
      </div>
    </div>
  );
};
