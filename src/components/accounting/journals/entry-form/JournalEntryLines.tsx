
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JournalEntryLine } from "@/types/journal";
import { Trash2, Plus, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalEntryLinesProps {
  lines: Omit<JournalEntryLine, "id">[];
  onLineChange: (
    index: number,
    field: keyof Omit<JournalEntryLine, "id">,
    value: string | number
  ) => void;
  onAddLine: () => void;
  onRemoveLine: (index: number) => void;
  isEditable: boolean;
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
}

export const JournalEntryLines: React.FC<JournalEntryLinesProps> = ({
  lines,
  onLineChange,
  onAddLine,
  onRemoveLine,
  isEditable,
  totalDebit,
  totalCredit,
  isBalanced,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 flex items-center justify-between">
          <h4 className="font-medium">تفاصيل القيد</h4>
          {isEditable && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="text-xs flex items-center gap-1 hover:bg-primary/10"
              onClick={onAddLine}
            >
              <Plus className="h-3 w-3" />
              إضافة سطر
            </Button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/30 border-t dark:border-gray-700 text-right">
                <th className="px-4 py-2 w-12">#</th>
                <th className="px-4 py-2">الحساب</th>
                <th className="px-4 py-2">البيان</th>
                <th className="px-4 py-2 w-32">مدين</th>
                <th className="px-4 py-2 w-32">دائن</th>
                {isEditable && <th className="px-4 py-2 w-16">حذف</th>}
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors",
                    index % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-gray-50/50 dark:bg-gray-800/10"
                  )}
                >
                  <td className="px-4 py-3 text-center text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      value={line.accountName}
                      onChange={(e) =>
                        onLineChange(index, "accountName", e.target.value)
                      }
                      disabled={!isEditable}
                      className="border-gray-200 dark:border-gray-700"
                      placeholder="اسم الحساب"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      value={line.description}
                      onChange={(e) =>
                        onLineChange(index, "description", e.target.value)
                      }
                      disabled={!isEditable}
                      className="border-gray-200 dark:border-gray-700"
                      placeholder="البيان"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      value={line.debit === 0 ? "" : line.debit}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        onLineChange(index, "debit", value);
                        if (value > 0) {
                          onLineChange(index, "credit", 0);
                        }
                      }}
                      disabled={!isEditable}
                      className="border-gray-200 dark:border-gray-700 text-left"
                      placeholder="0.00"
                      dir="ltr"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      value={line.credit === 0 ? "" : line.credit}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        onLineChange(index, "credit", value);
                        if (value > 0) {
                          onLineChange(index, "debit", 0);
                        }
                      }}
                      disabled={!isEditable}
                      className="border-gray-200 dark:border-gray-700 text-left"
                      placeholder="0.00"
                      dir="ltr"
                    />
                  </td>
                  {isEditable && (
                    <td className="px-4 py-2 text-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveLine(index)}
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                        disabled={lines.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 font-medium">
                <td colSpan={3} className="px-4 py-3 text-right">
                  الإجمالي
                </td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400">
                  {formatCurrency(totalDebit)}
                </td>
                <td className="px-4 py-3 text-red-600 dark:text-red-400">
                  {formatCurrency(totalCredit)}
                </td>
                {isEditable && <td className="px-4 py-2"></td>}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className={cn(
        "p-4 flex items-center gap-2 rounded-lg",
        isBalanced ? "bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400" : "bg-yellow-50 dark:bg-yellow-900/10 text-yellow-700 dark:text-yellow-400"
      )}>
        {isBalanced ? (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
        )}
        <div>
          {isBalanced ? (
            <span>القيد متوازن. إجمالي المدين = إجمالي الدائن ({formatCurrency(totalDebit)})</span>
          ) : (
            <span>
              القيد غير متوازن. الفرق: {formatCurrency(Math.abs(totalDebit - totalCredit))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
