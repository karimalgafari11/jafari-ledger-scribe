
import { Header } from "@/components/Header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MapPin,
  Building,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocations } from "@/hooks/useLocations";
import { LocationDialog } from "@/components/inventory-control/LocationDialog";
import { LocationSettings } from "@/components/inventory-control/LocationSettings";
import { toast } from "sonner";

export default function LocationsPage() {
  const { locations } = useLocations();
  const [showDialog, setShowDialog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editLocationId, setEditLocationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleAddLocation = () => {
    setEditLocationId(null);
    setShowDialog(true);
  };

  const handleEditLocation = (id: string) => {
    setEditLocationId(id);
    setShowDialog(true);
  };

  const handleDeleteLocation = (id: string) => {
    toast.success("تم حذف موقع التخزين بنجاح");
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const filteredLocations = locations.filter(
    location => location.name.includes(searchQuery) || 
                location.code.includes(searchQuery) ||
                location.warehouseName.includes(searchQuery)
  );

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="إدارة مواقع التخزين" showBack={true} />
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm font-medium">
              العدد الكلي: {locations.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSettingsClick}
              title="إعدادات الصفحة"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center space-x-4 rtl:space-x-reverse">
          <div className="bg-blue-50 p-3 rounded-full">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium">مواقع التخزين</h2>
            <p className="text-gray-500 text-sm">
              إدارة وتنظيم مواقع التخزين في المستودعات المختلفة
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="relative w-64">
              <Input
                placeholder="بحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <Button onClick={handleAddLocation}>
            <Plus className="mr-2 h-4 w-4" /> إضافة موقع تخزين
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">مواقع التخزين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <div className="max-h-[500px] overflow-y-auto">
                <Table className="border-collapse">
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="border text-center font-bold w-16">#</TableHead>
                      <TableHead className="border text-center font-bold">الاسم</TableHead>
                      <TableHead className="border text-center font-bold">الرمز</TableHead>
                      <TableHead className="border text-center font-bold">المستودع</TableHead>
                      <TableHead className="border text-center font-bold">الوصف</TableHead>
                      <TableHead className="border text-center font-bold">السعة</TableHead>
                      <TableHead className="border text-center font-bold">الحالة</TableHead>
                      <TableHead className="border text-center font-bold">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLocations.map((location, index) => (
                      <TableRow key={location.id} className="hover:bg-muted/50">
                        <TableCell className="border text-center">{index + 1}</TableCell>
                        <TableCell className="border">{location.name}</TableCell>
                        <TableCell className="border text-center">{location.code}</TableCell>
                        <TableCell className="border">{location.warehouseName}</TableCell>
                        <TableCell className="border">{location.description}</TableCell>
                        <TableCell className="border text-center">{location.capacity} وحدة</TableCell>
                        <TableCell className="border text-center">
                          <Badge 
                            variant={location.isActive ? "outline" : "secondary"}
                            className={`${location.isActive ? "bg-green-50 text-green-600 border-green-200" : "bg-gray-50 text-gray-600"}`}
                          >
                            {location.isActive ? "نشط" : "غير نشط"}
                          </Badge>
                        </TableCell>
                        <TableCell className="border text-center">
                          <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditLocation(location.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteLocation(location.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              إجمالي عدد المواقع: {filteredLocations.length}
            </div>
          </CardFooter>
        </Card>
      </main>
      
      {showDialog && (
        <LocationDialog 
          locationId={editLocationId}
          onClose={() => setShowDialog(false)}
        />
      )}
      
      {showSettings && (
        <LocationSettings
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
