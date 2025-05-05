
import { PurchaseInvoice } from "@/types/purchases";
import { v4 as uuidv4 } from "uuid";

export const mockPurchaseInvoices: PurchaseInvoice[] = [
  {
    id: uuidv4(),
    invoiceNumber: "P-10001",
    vendorId: "v1",
    vendorName: "شركة السعيد للتجارة",
    vendorPhone: "0512345678",
    vendorAccountNumber: "SA5980000123456789012345",
    date: "2023-05-15",
    dueDate: "2023-06-15",
    items: [
      {
        id: uuidv4(),
        productId: "p1",
        code: "SKU-001",
        name: "شاشة كمبيوتر 24 بوصة",
        quantity: 5,
        price: 850,
        total: 4250,
        tax: 15
      },
      {
        id: uuidv4(),
        productId: "p2",
        code: "SKU-002",
        name: "لوحة مفاتيح لاسلكية",
        quantity: 10,
        price: 120,
        total: 1200,
        tax: 15
      }
    ],
    subtotal: 5450,
    totalAmount: 6267.5,
    tax: 15,
    paymentTerms: "صافي 30 يوم",
    paymentMethod: "credit",
    amountPaid: 3000,
    status: "pending",
    warehouseId: "wh1",
    warehouseName: "المستودع الرئيسي",
    createdAt: "2023-05-15T10:30:00",
    updatedAt: "2023-05-15T10:30:00"
  },
  {
    id: uuidv4(),
    invoiceNumber: "P-10002",
    vendorId: "v2",
    vendorName: "مؤسسة النور للمقاولات",
    vendorPhone: "0556789012",
    date: "2023-06-01",
    items: [
      {
        id: uuidv4(),
        productId: "p3",
        code: "SKU-003",
        name: "أدوات بناء متنوعة",
        quantity: 1,
        price: 3500,
        total: 3500,
        tax: 15
      }
    ],
    subtotal: 3500,
    totalAmount: 4025,
    tax: 15,
    paymentMethod: "cash",
    amountPaid: 4025,
    status: "paid",
    createdAt: "2023-06-01T14:15:00",
    updatedAt: "2023-06-01T14:15:00"
  },
  {
    id: uuidv4(),
    invoiceNumber: "P-10003",
    vendorId: "v3",
    vendorName: "مؤسسة الأمانة للتوريدات",
    vendorPhone: "0590123456",
    date: "2023-06-10",
    dueDate: "2023-07-10",
    items: [
      {
        id: uuidv4(),
        productId: "p4",
        code: "SKU-004",
        name: "ورق طباعة A4",
        quantity: 50,
        price: 18,
        total: 900,
        tax: 15
      },
      {
        id: uuidv4(),
        productId: "p5",
        code: "SKU-005",
        name: "أقلام حبر جاف",
        quantity: 100,
        price: 2.5,
        total: 250,
        tax: 15
      },
      {
        id: uuidv4(),
        productId: "p6",
        code: "SKU-006",
        name: "ملفات بلاستيكية",
        quantity: 30,
        price: 5,
        total: 150,
        tax: 15
      }
    ],
    subtotal: 1300,
    totalAmount: 1495,
    tax: 15,
    paymentTerms: "صافي 30 يوم",
    paymentMethod: "credit",
    status: "overdue",
    warehouseId: "wh1",
    warehouseName: "المستودع الرئيسي",
    createdAt: "2023-06-10T09:45:00",
    updatedAt: "2023-06-10T09:45:00"
  },
  {
    id: uuidv4(),
    invoiceNumber: "P-10004",
    vendorId: "v4",
    vendorName: "شركة تقنيات المستقبل",
    vendorPhone: "0501234567",
    date: "2023-06-15",
    items: [
      {
        id: uuidv4(),
        productId: "p7",
        code: "SKU-007",
        name: "حاسب محمول",
        quantity: 2,
        price: 3200,
        total: 6400,
        tax: 15
      },
      {
        id: uuidv4(),
        productId: "p8",
        code: "SKU-008",
        name: "طابعة ليزر",
        quantity: 1,
        price: 1200,
        total: 1200,
        tax: 15
      }
    ],
    subtotal: 7600,
    totalAmount: 8740,
    tax: 15,
    paymentMethod: "cash",
    amountPaid: 8740,
    status: "paid",
    warehouseId: "wh2",
    warehouseName: "مستودع الإلكترونيات",
    createdAt: "2023-06-15T11:20:00",
    updatedAt: "2023-06-15T11:20:00"
  },
  {
    id: uuidv4(),
    invoiceNumber: "P-10005",
    vendorId: "v5",
    vendorName: "مصنع الجودة للمنتجات الورقية",
    vendorPhone: "0566543210",
    date: "2023-06-20",
    items: [
      {
        id: uuidv4(),
        productId: "p9",
        code: "SKU-009",
        name: "كراتين تغليف",
        quantity: 200,
        price: 4,
        total: 800,
        tax: 15
      }
    ],
    subtotal: 800,
    totalAmount: 920,
    tax: 15,
    paymentMethod: "cash",
    status: "draft",
    createdAt: "2023-06-20T13:10:00",
    updatedAt: "2023-06-20T13:10:00"
  },
  {
    id: uuidv4(),
    invoiceNumber: "P-10006",
    vendorId: "v1",
    vendorName: "شركة السعيد للتجارة",
    vendorPhone: "0512345678",
    date: "2023-06-25",
    dueDate: "2023-07-25",
    items: [
      {
        id: uuidv4(),
        productId: "p10",
        code: "SKU-010",
        name: "كراسي مكتبية",
        quantity: 5,
        price: 450,
        total: 2250,
        tax: 15
      },
      {
        id: uuidv4(),
        productId: "p11",
        code: "SKU-011",
        name: "طاولة اجتماعات",
        quantity: 1,
        price: 1800,
        total: 1800,
        tax: 15
      }
    ],
    subtotal: 4050,
    totalAmount: 4657.5,
    tax: 15,
    paymentTerms: "صافي 30 يوم",
    paymentMethod: "credit",
    amountPaid: 2000,
    status: "pending",
    warehouseId: "wh3",
    warehouseName: "مستودع الأثاث",
    createdAt: "2023-06-25T15:30:00",
    updatedAt: "2023-06-25T15:30:00"
  },
  {
    id: uuidv4(),
    invoiceNumber: "P-10007",
    vendorId: "v6",
    vendorName: "شركة الأدوات الصناعية",
    vendorPhone: "0533221100",
    date: "2023-07-01",
    items: [
      {
        id: uuidv4(),
        productId: "p12",
        code: "SKU-012",
        name: "معدات صيانة",
        quantity: 1,
        price: 5200,
        total: 5200,
        tax: 15
      }
    ],
    subtotal: 5200,
    totalAmount: 5980,
    tax: 15,
    paymentMethod: "cash",
    amountPaid: 5980,
    status: "paid",
    createdAt: "2023-07-01T10:00:00",
    updatedAt: "2023-07-01T10:00:00"
  },
  {
    id: uuidv4(),
    invoiceNumber: "P-10008",
    vendorId: "v3",
    vendorName: "مؤسسة الأمانة للتوريدات",
    vendorPhone: "0590123456",
    date: "2023-07-05",
    dueDate: "2023-08-05",
    items: [
      {
        id: uuidv4(),
        productId: "p13",
        code: "SKU-013",
        name: "آلات حاسبة",
        quantity: 10,
        price: 75,
        total: 750,
        tax: 15
      },
      {
        id: uuidv4(),
        productId: "p14",
        code: "SKU-014",
        name: "مغلفات ورقية",
        quantity: 500,
        price: 0.5,
        total: 250,
        tax: 15
      }
    ],
    subtotal: 1000,
    totalAmount: 1150,
    tax: 15,
    paymentTerms: "صافي 30 يوم",
    paymentMethod: "credit",
    amountPaid: 600,
    status: "pending",
    warehouseId: "wh1",
    warehouseName: "المستودع الرئيسي",
    createdAt: "2023-07-05T14:40:00",
    updatedAt: "2023-07-05T14:40:00"
  }
];
