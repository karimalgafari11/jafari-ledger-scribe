
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import HRPageHeader from "@/components/hr/HRPageHeader";
import { Calendar, Clock } from "lucide-react";
import { Attendance } from "@/types/hr";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const mockAttendanceData: Attendance[] = [
  {
    id: "att-001",
    employeeId: "emp-001",
    date: new Date("2023-11-01"),
    checkIn: new Date("2023-11-01T08:05:00"),
    checkOut: new Date("2023-11-01T17:10:00"),
    status: "present",
    notes: ""
  },
  {
    id: "att-002",
    employeeId: "emp-002",
    date: new Date("2023-11-01"),
    checkIn: new Date("2023-11-01T08:15:00"),
    checkOut: new Date("2023-11-01T17:00:00"),
    status: "present",
    notes: ""
  },
  {
    id: "att-003",
    employeeId: "emp-003",
    date: new Date("2023-11-01"),
    status: "vacation",
    notes: "إجازة سنوية"
  },
  {
    id: "att-004",
    employeeId: "emp-004",
    date: new Date("2023-11-01"),
    checkIn: new Date("2023-11-01T08:30:00"),
    checkOut: new Date("2023-11-01T17:05:00"),
    status: "late",
    notes: "تأخر 30 دقيقة"
  },
  {
    id: "att-005",
    employeeId: "emp-005",
    date: new Date("2023-11-01"),
    status: "sick-leave",
    notes: "إجازة مرضية مع تقرير طبي"
  }
];

// بيانات الموظفين (مبسطة)
const employees = [
  { id: "emp-001", name: "أحمد محمد علي" },
  { id: "emp-002", name: "سارة عبدالله الخالدي" },
  { id: "emp-003", name: "محمد عبدالرحمن السعيد" },
  { id: "emp-004", name: "فاطمة يوسف العمري" },
  { id: "emp-005", name: "خالد سعد الدوسري" }
];

const AttendancePage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("11");
  const [selectedYear, setSelectedYear] = useState<string>("2023");

  const getStatusBadge = (status: Attendance["status"]) => {
    switch (status) {
      case "present":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">حاضر</span>;
      case "absent":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">غائب</span>;
      case "late":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">متأخر</span>;
      case "vacation":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">إجازة</span>;
      case "sick-leave":
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">إجازة مرضية</span>;
      default:
        return null;
    }
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getEmployeeName = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? employee.name : "غير معروف";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 rtl">
        <HRPageHeader
          title="الإجازات والغياب"
          description="إدارة الحضور والغياب والإجازات للموظفين"
          onAddNew={() => console.log("إضافة حضور/غياب")}
          addButtonLabel="تسجيل حضور/غياب"
        />

        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <Calendar className="ml-2 h-5 w-5 text-gray-500" />
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="الشهر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">يناير</SelectItem>
                    <SelectItem value="2">فبراير</SelectItem>
                    <SelectItem value="3">مارس</SelectItem>
                    <SelectItem value="4">أبريل</SelectItem>
                    <SelectItem value="5">مايو</SelectItem>
                    <SelectItem value="6">يونيو</SelectItem>
                    <SelectItem value="7">يوليو</SelectItem>
                    <SelectItem value="8">أغسطس</SelectItem>
                    <SelectItem value="9">سبتمبر</SelectItem>
                    <SelectItem value="10">أكتوبر</SelectItem>
                    <SelectItem value="11">نوفمبر</SelectItem>
                    <SelectItem value="12">ديسمبر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="السنة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                طباعة التقرير
              </Button>
              <Button variant="outline">
                تصدير البيانات
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table striped>
              <TableHeader>
                <TableRow>
                  <TableHead>الموظف</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>وقت الحضور</TableHead>
                  <TableHead>وقت الانصراف</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>ملاحظات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAttendanceData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {getEmployeeName(record.employeeId)}
                    </TableCell>
                    <TableCell>
                      {record.date.toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>{formatTime(record.checkIn)}</TableCell>
                    <TableCell>{formatTime(record.checkOut)}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>{record.notes || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AttendancePage;
