
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-1">الرمز</label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e) => onChange("code", e.target.value)}
            placeholder="رمز المنتج"
          />
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">الاسم</label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="اسم المنتج أو الخدمة"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">الوصف</label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="وصف المنتج أو الخدمة"
        />
      </div>

      {includeNotes && (
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">ملاحظات</label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="ملاحظات خاصة بهذا الصنف"
          />
        </div>
      )}
    </>
  );
};
