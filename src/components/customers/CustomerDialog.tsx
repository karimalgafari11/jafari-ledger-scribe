
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Customer } from "@/types/customers";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
  customer?: Customer;
}

export const CustomerDialog = ({
  isOpen,
  onClose,
  onSave,
  customer,
}: CustomerDialogProps) => {
  const isEditing = !!customer;
  
  const [formData, setFormData] = useState<Partial<Customer>>(
    customer || {
      name: "",
      email: "",
      phone: "",
      address: "",
      vatNumber: "",
      contactPerson: "",
      type: "individual",
      creditLimit: 0,
      balance: 0,
      status: "active",
      notes: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("يرجى إدخال اسم العميل ورقم الهاتف");
      return;
    }
    
    const newCustomer: Customer = {
      ...(formData as Customer),
      id: customer?.id || uuidv4(),
      createdAt: customer?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    
    onSave(newCustomer);
    toast.success(isEditing ? "تم تحديث بيانات العميل بنجاح" : "تم إضافة العميل بنجاح");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rtl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "تعديل بيانات العميل" : "إضافة عميل جديد"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم العميل *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">نوع العميل</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value as "individual" | "company")}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="اختر نوع العميل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">فرد</SelectItem>
                    <SelectItem value="company">شركة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            
            {formData.type === "company" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vatNumber">الرقم الضريبي</Label>
                  <Input
                    id="vatNumber"
                    name="vatNumber"
                    value={formData.vatNumber || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">الشخص المسؤول</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="creditLimit">حد الائتمان</Label>
                <Input
                  id="creditLimit"
                  name="creditLimit"
                  type="number"
                  value={formData.creditLimit || 0}
                  onChange={handleNumberChange}
                />
              </div>
              
              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="balance">الرصيد الحالي</Label>
                  <Input
                    id="balance"
                    name="balance"
                    type="number"
                    value={formData.balance || 0}
                    onChange={handleNumberChange}
                    disabled={!isEditing}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="status">الحالة</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value as "active" | "inactive")}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" className="bg-teal hover:bg-teal-dark text-white">
              {isEditing ? "حفظ التغييرات" : "إضافة العميل"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
