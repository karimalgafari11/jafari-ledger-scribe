
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { JournalEntryLine } from "@/types/journal";

interface JournalEntryLinesProps {
  lines: Omit<JournalEntryLine, "id">[];
  onLineChange: (index: number, field: keyof Omit<JournalEntryLine, "id">, value: string | number) => void;
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
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">تفاصيل القيد</h3>
        {isEditable && (
          <Button type="button" onClick={onAddLine} size="sm" variant="outline">
            <Plus className="h-4 w-4 ml-1" /> إضافة سطر
          </Button>
        )}
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 w-10">#</th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500">الحساب</th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500">الوصف</th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500">مدين</th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500">دائن</th>
              {isEditable && (
                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 w-10"></th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lines.map((line, index) => (
              <tr key={index}>
                <td className="px-2 py-3 text-right text-sm text-gray-500 align-top pt-4">
                  {index + 1}
                </td>
                <td className="px-2 py-2">
                  <div className="grid gap-2">
                    {isEditable ? (
                      <select
                        className="w-full p-2 border rounded-md text-sm"
                        value={line.accountId}
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const accountName = selectedIndex > 0 ? e.target.options[selectedIndex].text : "";
                          onLineChange(index, "accountId", e.target.value);
                          onLineChange(index, "accountName", accountName);
                        }}
                      >
                        <option value="">اختر الحساب</option>
                        <option value="101">الصندوق</option>
                        <option value="102">البنك</option>
                        <option value="126">معدات مكتبية</option>
                        <option value="131">مدينون / عملاء</option>
                        <option value="411">إيرادات المبيعات</option>
                        <option value="511">مصاريف الرواتب</option>
                        <option value="521">مصاريف كهرباء</option>
                        <option value="522">مصاريف مياه</option>
                        <option value="531">مصاريف الإيجار</option>
                      </select>
                    ) : (
                      <div className="p-2 text-sm">
                        {line.accountId} - {line.accountName}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-2 py-2">
                  <Input
                    value={line.description}
                    onChange={(e) => onLineChange(index, "description", e.target.value)}
                    placeholder="وصف السطر"
                    disabled={!isEditable}
                    className="text-sm"
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={line.debit}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      onLineChange(index, "debit", value);
                      if (value > 0) {
                        onLineChange(index, "credit", 0);
                      }
                    }}
                    disabled={!isEditable}
                    className="text-sm"
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={line.credit}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      onLineChange(index, "credit", value);
                      if (value > 0) {
                        onLineChange(index, "debit", 0);
                      }
                    }}
                    disabled={!isEditable}
                    className="text-sm"
                  />
                </td>
                {isEditable && (
                  <td className="px-2 py-2 text-center">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => onRemoveLine(index)}
                      disabled={lines.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={3} className="px-4 py-3 text-left text-sm font-medium">
                المجموع
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium">
                {totalDebit.toLocaleString('ar-SA')}
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium">
                {totalCredit.toLocaleString('ar-SA')}
              </td>
              {isEditable && <td></td>}
            </tr>
            <tr>
              <td colSpan={5} className="px-4 py-3 text-left text-sm">
                {isBalanced ? (
                  <span className="text-green-600">القيد متوازن</span>
                ) : (
                  <span className="text-red-600">
                    القيد غير متوازن ({Math.abs(totalDebit - totalCredit).toLocaleString('ar-SA')})
                  </span>
                )}
              </td>
              {isEditable && <td></td>}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
