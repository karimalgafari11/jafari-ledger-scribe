
export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  budget: number;
  actualCost: number;
  status: 'planning' | 'active' | 'onHold' | 'completed' | 'cancelled';
  progress: number;
  managerName?: string;
  clientName?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  departmentId?: string;
}

export interface ProjectTask {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  startDate: Date;
  dueDate: Date;
  status: 'todo' | 'inProgress' | 'review' | 'completed';
  assignedTo?: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedHours?: number;
  actualHours?: number;
  completionPercentage: number;
  dependsOn?: string[];
}

export interface ProjectCost {
  id: string;
  projectId: string;
  taskId?: string;
  description: string;
  amount: number;
  date: Date;
  category: 'labor' | 'materials' | 'equipment' | 'software' | 'travel' | 'other';
  invoiced: boolean;
  billable: boolean;
  paymentStatus?: 'pending' | 'approved' | 'paid' | 'rejected';
  notes?: string;
}

export interface ProjectResource {
  id: string;
  projectId: string;
  resourceId: string;
  resourceName: string;
  resourceType: 'employee' | 'contractor' | 'equipment' | 'material';
  allocatedHours?: number;
  usedHours?: number;
  rate?: number;
  allocatedFrom: Date;
  allocatedTo?: Date;
}
