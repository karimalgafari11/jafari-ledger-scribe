
import { z } from "zod";

// نموذج التحقق من البيانات باستخدام zod
export const productSchema = z.object({
  name: z.string().min(2, { message: "يجب أن يحتوي اسم المنتج على حرفين على الأقل" }),
  code: z.string().min(1, { message: "يجب إدخال رقم المنتج" }),
  brand: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  price: z.coerce.number().min(0, { message: "يجب أن يكون السعر قيمة موجبة" }),
  costPrice: z.coerce.number().min(0, { message: "يجب أن يكون سعر الشراء قيمة موجبة" }).optional(),
  quantity: z.coerce.number().min(0, { message: "يجب أن تكون الكمية قيمة موجبة" }).optional(),
  reorderLevel: z.coerce.number().min(0, { message: "يجب أن يكون حد إعادة الطلب قيمة موجبة" }).optional(),
  size: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const defaultProductValues: ProductFormValues = {
  name: "",
  code: "",
  brand: "",
  category: "",
  subcategory: "",
  price: 0,
  costPrice: 0,
  quantity: 0,
  reorderLevel: 5,
  size: "",
  description: "",
  isActive: true,
};
