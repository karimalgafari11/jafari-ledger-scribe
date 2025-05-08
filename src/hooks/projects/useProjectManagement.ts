
import { useState, useMemo } from 'react';
import { Project, ProjectTask } from '@/types/project-management';
import { toast } from 'sonner';
import { addDays, addMonths, subDays } from 'date-fns';

// بيانات وهمية للمشاريع
const mockProjects: Project[] = [
  {
    id: "p1",
    name: "تطوير نظام إدارة المخزون",
    description: "تطوير وتنفيذ نظام متكامل لإدارة المخزون والمشتريات",
    startDate: subDays(new Date(), 60),
    endDate: addDays(new Date(), 30),
    budget: 80000,
    actualCost: 65000,
    status: 'active',
    progress: 65,
    managerName: "سارة أحمد",
    clientName: "شركة التقنية المتقدمة",
    priority: 'high',
    departmentId: "d1"
  },
  {
    id: "p2",
    name: "تحديث الموقع الإلكتروني",
    description: "إعادة تصميم وتطوير الموقع الإلكتروني بتقنيات حديثة",
    startDate: subDays(new Date(), 45),
    endDate: addDays(new Date(), 15),
    budget: 50000,
    actualCost: 48000,
    status: 'active',
    progress: 80,
    managerName: "خالد محمد",
    clientName: "مؤسسة الإبداع",
    priority: 'medium',
    departmentId: "d2"
  },
  {
    id: "p3",
    name: "حملة تسويقية للمنتج الجديد",
    description: "تخطيط وتنفيذ حملة تسويقية شاملة للمنتج الجديد",
    startDate: subDays(new Date(), 30),
    endDate: addDays(new Date(), 60),
    budget: 120000,
    actualCost: 70000,
    status: 'active',
    progress: 45,
    managerName: "نورا عبدالله",
    clientName: "شركة الإعلان العالمية",
    priority: 'high',
    departmentId: "d3"
  },
  {
    id: "p4",
    name: "إنشاء مركز البيانات الجديد",
    description: "تصميم وإنشاء مركز بيانات متطور لدعم التوسع في الأعمال",
    startDate: subDays(new Date(), 90),
    endDate: addDays(new Date(), 120),
    budget: 500000,
    actualCost: 250000,
    status: 'active',
    progress: 35,
    managerName: "فيصل العمري",
    clientName: "الشركة الوطنية للاتصالات",
    priority: 'critical',
    departmentId: "d1"
  },
  {
    id: "p5",
    name: "تدريب الموظفين على النظام الجديد",
    description: "إجراء دورات تدريبية للموظفين على النظام المحاسبي الجديد",
    startDate: addDays(new Date(), 10),
    endDate: addDays(new Date(), 40),
    budget: 30000,
    actualCost: 0,
    status: 'planning',
    progress: 0,
    managerName: "سلطان الحربي",
    clientName: "داخلي",
    priority: 'medium',
    departmentId: "d4"
  },
  {
    id: "p6",
    name: "تطوير تطبيق الهاتف المحمول",
    description: "تصميم وتطوير تطبيق الهاتف المحمول للخدمات المصرفية",
    startDate: subDays(new Date(), 120),
    endDate: subDays(new Date(), 10),
    budget: 200000,
    actualCost: 195000,
    status: 'completed',
    progress: 100,
    managerName: "سارة علي",
    clientName: "بنك الاستثمار",
    priority: 'high',
    departmentId: "d2"
  }
];

// بيانات وهمية للمهام
const mockTasks: ProjectTask[] = [
  {
    id: "t1",
    projectId: "p1",
    name: "تحليل متطلبات النظام",
    description: "تحليل متطلبات العمل وتوثيق المواصفات الفنية",
    startDate: subDays(new Date(), 60),
    dueDate: subDays(new Date(), 45),
    status: 'completed',
    assignedTo: ["user1", "user2"],
    priority: 'high',
    estimatedHours: 40,
    actualHours: 48,
    completionPercentage: 100
  },
  {
    id: "t2",
    projectId: "p1",
    name: "تصميم قاعدة البيانات",
    description: "تصميم هيكل قاعدة البيانات والعلاقات",
    startDate: subDays(new Date(), 45),
    dueDate: subDays(new Date(), 30),
    status: 'completed',
    assignedTo: ["user3"],
    priority: 'high',
    estimatedHours: 24,
    actualHours: 20,
    completionPercentage: 100,
    dependsOn: ["t1"]
  },
  {
    id: "t3",
    projectId: "p1",
    name: "تطوير واجهة المستخدم",
    description: "تصميم وتطوير واجهة المستخدم للنظام",
    startDate: subDays(new Date(), 30),
    dueDate: subDays(new Date(), 10),
    status: 'completed',
    assignedTo: ["user4", "user5"],
    priority: 'medium',
    estimatedHours: 80,
    actualHours: 90,
    completionPercentage: 100,
    dependsOn: ["t2"]
  },
  {
    id: "t4",
    projectId: "p1",
    name: "تطوير خدمات الواجهة الخلفية",
    description: "تطوير وحدات المعالجة وواجهات برمجة التطبيقات",
    startDate: subDays(new Date(), 30),
    dueDate: addDays(new Date(), 5),
    status: 'inProgress',
    assignedTo: ["user6"],
    priority: 'high',
    estimatedHours: 100,
    actualHours: 70,
    completionPercentage: 70,
    dependsOn: ["t2"]
  },
  {
    id: "t5",
    projectId: "p1",
    name: "اختبار النظام",
    description: "إجراء اختبارات الوحدة والتكامل والنظام",
    startDate: subDays(new Date(), 10),
    dueDate: addDays(new Date(), 15),
    status: 'inProgress',
    assignedTo: ["user7", "user8"],
    priority: 'medium',
    estimatedHours: 60,
    actualHours: 25,
    completionPercentage: 40,
    dependsOn: ["t3", "t4"]
  },
  {
    id: "t6",
    projectId: "p1",
    name: "نشر النظام للإنتاج",
    description: "نشر النظام في بيئة الإنتاج",
    startDate: addDays(new Date(), 15),
    dueDate: addDays(new Date(), 25),
    status: 'todo',
    assignedTo: ["user9"],
    priority: 'critical',
    estimatedHours: 16,
    actualHours: 0,
    completionPercentage: 0,
    dependsOn: ["t5"]
  }
];

export const useProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<ProjectTask[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // إحصائيات المشاريع
  const projectStats = useMemo(() => {
    const activeProjects = projects.filter(p => p.status === 'active');
    const completedThisMonth = projects.filter(
      p => p.status === 'completed' && 
      p.endDate && 
      p.endDate > subDays(new Date(), 30) && 
      p.endDate <= new Date()
    );
    
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const spentBudget = projects.reduce((sum, p) => sum + p.actualCost, 0);
    
    // المهام المتأخرة والتي ستستحق قريباً
    const overdueTasks = tasks.filter(
      t => t.status !== 'completed' && t.dueDate < new Date()
    );
    
    const dueSoonTasks = tasks.filter(
      t => t.status !== 'completed' && 
      t.dueDate >= new Date() && 
      t.dueDate <= addDays(new Date(), 7)
    );
    
    // بيانات المخططات
    const statusChart = {
      labels: ['نشط', 'متوقف', 'تخطيط', 'مكتمل', 'ملغي'],
      datasets: [{
        label: 'حالة المشاريع',
        data: [
          projects.filter(p => p.status === 'active').length,
          projects.filter(p => p.status === 'onHold').length,
          projects.filter(p => p.status === 'planning').length,
          projects.filter(p => p.status === 'completed').length,
          projects.filter(p => p.status === 'cancelled').length
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ]
      }]
    };
    
    const budgetChart = {
      labels: projects.filter(p => p.status === 'active').map(p => p.name),
      datasets: [
        {
          label: 'الميزانية',
          data: projects.filter(p => p.status === 'active').map(p => p.budget),
          backgroundColor: 'rgba(54, 162, 235, 0.7)'
        },
        {
          label: 'التكلفة الفعلية',
          data: projects.filter(p => p.status === 'active').map(p => p.actualCost),
          backgroundColor: 'rgba(255, 99, 132, 0.7)'
        }
      ]
    };
    
    return {
      total: projects.length,
      active: activeProjects.length,
      completed: projects.filter(p => p.status === 'completed').length,
      planning: projects.filter(p => p.status === 'planning').length,
      onHold: projects.filter(p => p.status === 'onHold').length,
      cancelled: projects.filter(p => p.status === 'cancelled').length,
      totalBudget,
      spentBudget,
      overdueProjects: projects.filter(
        p => p.status === 'active' && p.endDate && p.endDate < new Date()
      ).length,
      completedThisMonth: completedThisMonth.length,
      overdueTasks: overdueTasks.length,
      dueSoonTasks: dueSoonTasks.length,
      totalProjects: projects.length,
      statusChart,
      budgetChart
    };
  }, [projects, tasks]);
  
  // الفلترة بناءً على البحث والحالة
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = 
        statusFilter === 'all' || 
        project.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchQuery, statusFilter]);
  
  // إضافة مشروع جديد
  const createProject = (project: Partial<Project>) => {
    const newProject: Project = {
      id: `p${projects.length + 1}`,
      name: project.name || "مشروع جديد",
      description: project.description || "",
      startDate: project.startDate || new Date(),
      endDate: project.endDate,
      budget: project.budget || 0,
      actualCost: 0,
      status: project.status || 'planning',
      progress: 0,
      managerName: project.managerName || "",
      clientName: project.clientName || "",
      priority: project.priority || 'medium',
      departmentId: project.departmentId
    };
    
    setProjects([...projects, newProject]);
    toast.success("تم إنشاء المشروع بنجاح");
  };
  
  // تحديث مشروع موجود
  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ));
    toast.success("تم تحديث المشروع بنجاح");
  };
  
  // حذف مشروع
  const deleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setTasks(tasks.filter(t => t.projectId !== projectId));
    toast.success("تم حذف المشروع بنجاح");
  };
  
  // ترتيب المشاريع
  const sortProjects = (field: keyof Project, direction: 'asc' | 'desc') => {
    const sortedProjects = [...projects].sort((a, b) => {
      if (direction === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    
    setProjects(sortedProjects);
  };

  return {
    projects: filteredProjects,
    tasks,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    createProject,
    updateProject,
    deleteProject,
    sortProjects,
    projectStats
  };
};
