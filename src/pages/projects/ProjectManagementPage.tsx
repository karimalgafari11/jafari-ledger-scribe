
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { ProjectKanban } from "@/components/projects/ProjectKanban";
import { ProjectTasks } from "@/components/projects/ProjectTasks";
import { ProjectCalendar } from "@/components/projects/ProjectCalendar";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { useProjectManagement } from "@/hooks/projects/useProjectManagement";

const ProjectManagementPage = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  const {
    projects,
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
  } = useProjectManagement();

  // إذا كان هناك مشروع محدد لعرض تفاصيله
  if (selectedProjectId) {
    const project = projects.find(p => p.id === selectedProjectId);
    if (project) {
      return (
        <ProjectDetails 
          project={project} 
          onBack={() => setSelectedProjectId(null)}
          onUpdate={updateProject}
          onDelete={() => {
            deleteProject(selectedProjectId);
            setSelectedProjectId(null);
          }}
        />
      );
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Header title="إدارة المشاريع" showBack={true}>
        <Button onClick={() => createProject({} as any)}>
          <Plus className="ml-2 h-4 w-4" /> مشروع جديد
        </Button>
      </Header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {projectStats.completedThisMonth} مكتملة هذا الشهر
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.active}</div>
            <Progress
              value={(projectStats.active / projectStats.total) * 100}
              className="h-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ميزانية المشاريع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.totalBudget.toLocaleString()} ر.س</div>
            <p className="text-xs text-muted-foreground">
              {projectStats.spentBudget.toLocaleString()} ر.س تم إنفاقها ({Math.round((projectStats.spentBudget / projectStats.totalBudget) * 100)}%)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المهام المتأخرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{projectStats.overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              {projectStats.dueSoonTasks} مهمة تستحق قريباً
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="ابحث عن مشروع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="planning">التخطيط</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="onHold">متوقف</SelectItem>
              <SelectItem value="completed">مكتمل</SelectItem>
              <SelectItem value="cancelled">ملغي</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Filter className="ml-2 h-4 w-4" />
            فلترة
          </Button>
          
          <Button variant="outline">
            <Calendar className="ml-2 h-4 w-4" />
            التواريخ
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">قائمة</TabsTrigger>
          <TabsTrigger value="kanban">كانبان</TabsTrigger>
          <TabsTrigger value="tasks">المهام</TabsTrigger>
          <TabsTrigger value="calendar">التقويم</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <ProjectTable 
            projects={projects}
            onSelectProject={setSelectedProjectId}
            onSort={sortProjects}
          />
        </TabsContent>

        <TabsContent value="kanban">
          <ProjectKanban 
            projects={projects}
            onSelectProject={setSelectedProjectId}
            onUpdateProject={updateProject}
          />
        </TabsContent>

        <TabsContent value="tasks">
          <ProjectTasks 
            tasks={tasks}
            projects={projects}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <ProjectCalendar 
            projects={projects}
            tasks={tasks}
            onSelectProject={setSelectedProjectId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagementPage;
