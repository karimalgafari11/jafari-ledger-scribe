
import { Customer } from '@/types/customers';
import { v4 as uuidv4 } from 'uuid';

export const mockCustomers: Customer[] = [
  {
    id: uuidv4(),
    name: "شركة الأمل للتجارة",
    email: "info@alamal.com",
    phone: "0501234567",
    address: "الرياض، حي العليا، شارع العروبة",
    vatNumber: "300122334455",
    contactPerson: "أحمد محمد",
    type: "company",
    creditLimit: 50000,
    balance: 12500,
    status: "active",
    notes: "عميل منتظم في الدفع",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-22")
  },
  {
    id: uuidv4(),
    name: "مؤسسة النور للمقاولات",
    email: "contact@alnoor.com",
    phone: "0561234567",
    address: "جدة، حي الصفا، شارع الملك فهد",
    vatNumber: "300987654321",
    contactPerson: "خالد عبدالله",
    type: "company",
    creditLimit: 75000,
    balance: 45000,
    status: "active",
    notes: "عميل مهم، له تعاملات كبيرة",
    createdAt: new Date("2022-11-10"),
    updatedAt: new Date("2023-08-05")
  },
  {
    id: uuidv4(),
    name: "محمد عبدالرحمن",
    email: "m.abdulrahman@email.com",
    phone: "0521234567",
    address: "الدمام، حي الشاطئ",
    type: "individual",
    creditLimit: 5000,
    balance: 1200,
    status: "active",
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-07-15")
  },
  {
    id: uuidv4(),
    name: "شركة البناء الحديث",
    email: "info@modernbuild.com",
    phone: "0551234567",
    address: "الرياض، المنطقة الصناعية",
    vatNumber: "300555666777",
    contactPerson: "سعد الراشد",
    type: "company",
    creditLimit: 100000,
    balance: 87500,
    status: "active",
    notes: "حساب تجاري كبير",
    createdAt: new Date("2022-06-15"),
    updatedAt: new Date("2023-09-01")
  },
  {
    id: uuidv4(),
    name: "نورة السالم",
    email: "noura.salem@email.com",
    phone: "0531234567",
    address: "الرياض، حي النخيل",
    type: "individual",
    creditLimit: 8000,
    balance: 0,
    status: "active",
    createdAt: new Date("2023-02-01"),
    updatedAt: new Date("2023-02-01")
  },
  {
    id: uuidv4(),
    name: "مصنع الوطن للصناعات",
    email: "factory@alwatan.com",
    phone: "0581234567",
    address: "جدة، المدينة الصناعية",
    vatNumber: "300111222333",
    contactPerson: "فهد العمري",
    type: "company",
    creditLimit: 200000,
    balance: 125000,
    status: "inactive",
    notes: "تم تعليق الحساب مؤقتاً",
    createdAt: new Date("2022-04-10"),
    updatedAt: new Date("2023-07-25")
  }
];
