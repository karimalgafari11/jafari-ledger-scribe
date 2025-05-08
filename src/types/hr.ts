
export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  position: string;
  department: string;
  joinDate: Date;
  salary: number;
  status: 'active' | 'vacation' | 'terminated' | 'sick-leave';
  email?: string;
  phone?: string;
  address?: string;
  nationalId?: string;
  birthDate?: Date;
  photo?: string;
  bankAccount?: string;
  bankName?: string;
  education?: string;
  skills?: string[];
}

export interface Position {
  id: string;
  title: string;
  department: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  salaryRange?: {
    min: number;
    max: number;
  };
  isActive: boolean;
  vacancies?: number;
}

export interface Department {
  id: string;
  name: string;
  managerId?: string;
  description?: string;
  isActive: boolean;
  parentDepartmentId?: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  provider?: string;
  cost?: number;
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
  attendees: string[]; // يحتوي على معرفات الموظفين
  skills: string[];
  location?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: 'present' | 'absent' | 'late' | 'vacation' | 'sick-leave';
  notes?: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'unpaid' | 'emergency' | 'other';
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  notes?: string;
  approvedById?: string;
  approvedAt?: Date;
  requestedAt: Date;
}

export interface EmployeeSalary {
  id: string;
  employeeId: string;
  year: number;
  month: number;
  baseSalary: number;
  allowances: {
    housing?: number;
    transportation?: number;
    food?: number;
    other?: number;
  };
  deductions: {
    tax?: number;
    insurance?: number;
    absence?: number;
    other?: number;
  };
  bonus?: number;
  overtime?: {
    hours: number;
    amount: number;
  };
  netSalary: number;
  paymentDate?: Date;
  paymentMethod?: 'bank' | 'cash' | 'check';
  paymentReference?: string;
  status: 'pending' | 'paid' | 'cancelled';
}
