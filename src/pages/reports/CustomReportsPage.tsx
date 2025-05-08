
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Download, 
  Calendar,
  LayoutGrid,
  List
} from "lucide-react";
import { CustomReportList } from "@/components/reports/CustomReportList";
import { CustomReportBuilder } from "@/components/reports/CustomReportBuilder";
import { CustomReportGrid } from "@/components/reports/CustomReportGrid";
import { useCustomReports } from "@/hooks/reports/useCustomReports";
import { Separator } from "@/components/ui/separator";

const CustomReportsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isCreating, setIsCreating] = useState(false);
  
  const {
    reports,
    categories,
    searchQuery,
    setSearchQuery,
    filterBy,
    setFilterBy,
    createReport,
    deleteReport,
    duplicateReport,
    exportReport,
    favoriteReport
  } = useCustomReports();

  if (isCreating) {
    return (
      <CustomReportBuilder 
        onSave={(report) => {
          createReport(report);
          setIsCreating(false);
        }}
        onCancel={() => setIsCreating(false)}
      />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Header title="التقارير المخصصة" showBack={true}>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="ml-2 h-4 w-4" /> إنشاء تقرير جديد
        </Button>
      </Header>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-lg flex gap-2">
            <Input
              placeholder="ابحث عن تقرير..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="ml-2 h-4 w-4" /> جدولة
          </Button>
          <Button variant="outline" size="sm">
            <Download className="ml-2 h-4 w-4" /> تصدير
          </Button>
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none rounded-l-md"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-auto" />
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none rounded-r-md"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع التقارير</TabsTrigger>
          <TabsTrigger value="favorites">المفضلة</TabsTrigger>
          <TabsTrigger value="financial">مالية</TabsTrigger>
          <TabsTrigger value="sales">المبيعات</TabsTrigger>
          <TabsTrigger value="inventory">المخزون</TabsTrigger>
          <TabsTrigger value="projects">المشاريع</TabsTrigger>
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            {viewMode === "grid" ? (
              <CustomReportGrid
                reports={reports.filter(r => 
                  activeTab === "all" || 
                  (activeTab === "favorites" && r.favorite) || 
                  (r.category === activeTab)
                )}
                onDelete={deleteReport}
                onDuplicate={duplicateReport}
                onExport={exportReport}
                onFavorite={favoriteReport}
              />
            ) : (
              <CustomReportList
                reports={reports.filter(r => 
                  activeTab === "all" || 
                  (activeTab === "favorites" && r.favorite) || 
                  (r.category === activeTab)
                )}
                onDelete={deleteReport}
                onDuplicate={duplicateReport}
                onExport={exportReport}
                onFavorite={favoriteReport}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CustomReportsPage;
