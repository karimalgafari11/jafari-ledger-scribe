
export interface PurchaseInvoice {
  id: string;
  invoiceNumber: string;
  vendorId: string;
  vendorName: string;
  vendorPhone?: string;
  vendorAccountNumber?: string;
  date: string;
  dueDate?: string;
  items: PurchaseItem[];
  subtotal: number;
  totalAmount: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  tax?: number;
  expenses?: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  notes?: string;
  paymentTerms?: string;
  paymentMethod: 'cash' | 'credit';
  amountPaid?: number;
  warehouseId?: string;
  warehouseName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  code: string;
  name: string;
  manufacturer?: string;
  size?: string;
  description?: string;
  quantity: number;
  price: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  tax?: number;
  total: number;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  vendorId: string;
  vendorName: string;
  date: string;
  deliveryDate?: string;
  items: PurchaseItem[];
  subtotal: number;
  totalAmount: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  tax?: number;
  status: 'draft' | 'pending' | 'approved' | 'completed' | 'cancelled';
  notes?: string;
  termsAndConditions?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PurchaseReturn {
  id: string;
  returnNumber: string;
  date: Date;
  invoiceId?: string;
  invoiceNumber?: string;
  vendorId: string;
  vendorName: string;
  items: PurchaseReturnItem[];
  subtotal: number;
  totalAmount: number;
  tax?: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  reason: string;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface PurchaseReturnItem {
  id: string;
  productId: string;
  code: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  reason: string;
  notes?: string;
}

