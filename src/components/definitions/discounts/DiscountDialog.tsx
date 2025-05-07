
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Discount } from "@/types/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface DiscountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  discount: Discount | null;
  mode: "create" | "edit";
}

const discountSchema = z.object({
  code: z.string().min(1, "الرمز مطلوب"),
  name: z.string().min(1, "الاسم مطلوب"),
  type: z.enum(["percentage", "fixed"]),
  value: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number().min(0, "القيمة يجب أن تكون أكبر من أو تساوي صفر")
  ),
  startDate: z.string().min(1, "تاريخ البداية مطلوب"),
  endDate: z.string().optional(),
  minimumAmount: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  maximumAmount: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  isActive: z.boolean().default(true),
});

export const DiscountDialog: React.FC<DiscountDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  discount,
  mode,
}) => {
  const defaultValues = {
    code: discount?.code || "",
    name: discount?.name || "",
    type: discount?.type || "percentage",
    value: discount?.value || 0,
    startDate: discount?.startDate 
      ? format(new Date(discount.startDate), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd"),
    endDate: discount?.endDate 
      ? format(new Date(discount.endDate), "yyyy-MM-dd")
      : "",
    minimumAmount: discount?.minimumAmount || undefined,
    maximumAmount: discount?.maximumAmount || undefined,
    isActive: discount?.isActive ?? true,
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(discountSchema),
    defaultValues,
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, reset, discount]);

  const onFormSubmit = (data: any) => {
    const formattedData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    };
    onSubmit(formattedData);
  };

  const discountType = watch("type");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rtl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "إضافة خصم جديد" : "تعديل الخصم"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code" className={errors.code ? "text-destructive" : ""}>
                رمز الخصم*
              </Label>
              <Input
                id="code"
                {...register("code")}
                className={errors.code ? "border-destructive" : ""}
                placeholder="مثال: DIS-001"
              />
              {errors.code && (
                <p className="text-xs text-destructive mt-1">{String(errors.code.message)}</p>
              )}
            </div>

            <div>
              <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
                اسم الخصم*
              </Label>
              <Input
                id="name"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
                placeholder="مثال: خصم شهر رمضان"
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{String(errors.name.message)}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">نوع الخصم*</Label>
              <Select
                onValueChange={(value) => setValue("type", value as "percentage" | "fixed")}
                value={watch("type")}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="اختر نوع الخصم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">نسبة مئوية (%)</SelectItem>
                  <SelectItem value="fixed">قيمة ثابتة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="value" className={errors.value ? "text-destructive" : ""}>
                {discountType === "percentage" ? "نسبة الخصم (%)*" : "قيمة الخصم*"}
              </Label>
              <Input
                id="value"
                type="number"
                {...register("value")}
                className={errors.value ? "border-destructive" : ""}
                placeholder={discountType === "percentage" ? "مثال: 10" : "مثال: 50"}
              />
              {errors.value && (
                <p className="text-xs text-destructive mt-1">{String(errors.value.message)}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className={errors.startDate ? "text-destructive" : ""}>
                تاريخ البداية*
              </Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                className={errors.startDate ? "border-destructive" : ""}
              />
              {errors.startDate && (
                <p className="text-xs text-destructive mt-1">{String(errors.startDate.message)}</p>
              )}
            </div>

            <div>
              <Label htmlFor="endDate">
                تاريخ الانتهاء <span className="text-muted-foreground text-xs">(اختياري)</span>
              </Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minimumAmount">
                الحد الأدنى للطلب <span className="text-muted-foreground text-xs">(اختياري)</span>
              </Label>
              <Input
                id="minimumAmount"
                type="number"
                {...register("minimumAmount")}
                placeholder="مثال: 100"
              />
            </div>

            <div>
              <Label htmlFor="maximumAmount">
                الحد الأقصى للخصم <span className="text-muted-foreground text-xs">(اختياري)</span>
              </Label>
              <Input
                id="maximumAmount"
                type="number"
                {...register("maximumAmount")}
                placeholder="مثال: 1000"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              id="isActive"
              checked={watch("isActive")}
              onCheckedChange={(checked) => setValue("isActive", checked)}
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              فعال
            </Label>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" type="button" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {mode === "create" ? "إضافة" : "تحديث"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
