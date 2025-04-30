
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TemplateHeaderFormProps {
  name: string;
  description: string;
  type: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export const TemplateHeaderForm: React.FC<TemplateHeaderFormProps> = ({
  name,
  description,
  type,
  onNameChange,
  onDescriptionChange,
  onTypeChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="name">اسم القالب</Label>
          <Input 
            id="name"
            value={name} 
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="type">نوع القالب</Label>
          <Select 
            value={type} 
            onValueChange={onTypeChange}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="اختر نوع القالب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="invoice">فاتورة</SelectItem>
              <SelectItem value="financial">تقرير مالي</SelectItem>
              <SelectItem value="inventory">تقرير مخزون</SelectItem>
              <SelectItem value="sales">تقرير مبيعات</SelectItem>
              <SelectItem value="custom">مخصص</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="description">وصف القالب</Label>
        <Textarea 
          id="description"
          value={description} 
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="وصف مختصر للقالب"
        />
      </div>
    </>
  );
};
