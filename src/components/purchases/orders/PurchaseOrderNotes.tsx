
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PurchaseOrder } from "@/types/purchases";

interface PurchaseOrderNotesProps {
  notes?: string;
  termsAndConditions?: string;
  onFieldChange: (field: keyof PurchaseOrder, value: any) => void;
}

export const PurchaseOrderNotes: React.FC<PurchaseOrderNotesProps> = ({
  notes,
  termsAndConditions,
  onFieldChange
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              value={notes || ""}
              onChange={(e) => onFieldChange("notes", e.target.value)}
              placeholder="أي ملاحظات إضافية عن أمر الشراء"
              className="mt-1 h-32"
            />
          </div>
          
          <div>
            <Label htmlFor="termsAndConditions">الشروط والأحكام</Label>
            <Textarea
              id="termsAndConditions"
              value={termsAndConditions || ""}
              onChange={(e) => onFieldChange("termsAndConditions", e.target.value)}
              placeholder="الشروط والأحكام الخاصة بأمر الشراء"
              className="mt-1 h-32"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
