
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductDetailsProps {
  code: string;
  name: string;
  description: string;
  notes?: string;
  includeNotes: boolean;
  onChange: (field: string, value: any) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  code,
  name,
  description,
  notes = "",
  includeNotes,
  onChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label htmlFor="code" className="block text-xs font-medium mb-0.5">الرمز</label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e) => onChange("code", e.target.value)}
            placeholder="رمز المنتج"
            className="h-7 text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-xs font-medium mb-0.5">الاسم</label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="اسم المنتج أو الخدمة"
            required
            className="h-7 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-xs font-medium mb-0.5">الوصف</label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="وصف المنتج أو الخدمة"
          className="text-sm min-h-[40px] h-16"
        />
      </div>

      {includeNotes && (
        <div>
          <label htmlFor="notes" className="block text-xs font-medium mb-0.5">ملاحظات</label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="ملاحظات خاصة بهذا الصنف"
            className="text-sm min-h-[40px] h-16"
          />
        </div>
      )}
    </>
  );
};
