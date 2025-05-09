import React from "react";
import { Layout } from "@/components/Layout";
import HRPageHeader from "@/components/hr/HRPageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Envelope,
  Phone,
  MapPin,
  Calendar,
  HelpCircle,
  MessageSquare,
  User,
  Building2,
  Briefcase,
  Link,
  LucideIcon,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: "open" | "pending" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  category:
    | "technical"
    | "hr"
    | "benefits"
    | "payroll"
    | "other";
  assignedTo: string;
  customer: {
    name: string;
    email: string;
  };
}

const mockSupportTickets: SupportTicket[] = [
  {
    id: "ST-001",
    title: "مشكلة في تسجيل الدخول",
    description: "لا يمكنني تسجيل الدخول إلى حسابي",
    status: "open",
    priority: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: "technical",
    assignedTo: "علي محمد",
    customer: {
      name: "أحمد خالد",
      email: "ahmed.khaled@example.com",
    },
  },
  {
    id: "ST-002",
    title: "طلب إجازة",
    description: "أرغب في طلب إجازة لمدة أسبوع",
    status: "pending",
    priority: "medium",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: "hr",
    assignedTo: "فاطمة سالم",
    customer: {
      name: "ليلى عبدالله",
      email: "layla.abdullah@example.com",
    },
  },
  {
    id: "ST-003",
    title: "استفسار عن التأمين الطبي",
    description: "أريد معرفة تفاصيل التأمين الطبي",
    status: "resolved",
    priority: "low",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: "benefits",
    assignedTo: "سارة علي",
    customer: {
      name: "محمد إبراهيم",
      email: "mohammed.ibrahim@example.com",
    },
  },
  {
    id: "ST-004",
    title: "مشكلة في كشف الراتب",
    description: "هناك خطأ في كشف الراتب الخاص بي",
    status: "closed",
    priority: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: "payroll",
    assignedTo: "خالد محمود",
    customer: {
      name: "نورة سالم",
      email: "noura.salem@example.com",
    },
  },
];

const HRSupportPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 rtl">
        <HRPageHeader
          title="الدعم والمساعدة"
          description="مركز الدعم والمساعدة للموظفين"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* قسم المقالات الشائعة */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">المقالات الشائعة</CardTitle>
              <CardDescription>أكثر المقالات قراءةً واستفادةً</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] w-full">
                <div className="p-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>كيفية طلب إجازة</AccordionTrigger>
                      <AccordionContent>
                        لطلب إجازة، يجب عليك تعبئة النموذج الموجود في قسم الموارد
                        البشرية وتقديمه إلى مديرك المباشر.
                      </AccordionContent>
                    </AccordionItem>
                    <Separator />
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        سياسة التأمين الطبي
                      </AccordionTrigger>
                      <AccordionContent>
                        تغطي بوليصة التأمين الطبي جميع الموظفين وعائلاتهم، وتشمل
                        العيادات والمستشفيات المعتمدة.
                      </AccordionContent>
                    </AccordionItem>
                    <Separator />
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        كيفية الحصول على كشف الراتب
                      </AccordionTrigger>
                      <AccordionContent>
                        يمكنك الحصول على كشف الراتب الشهري من خلال نظام الرواتب
                        الإلكتروني.
                      </AccordionContent>
                    </AccordionItem>
                    <Separator />
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        إجراءات تقديم شكوى
                      </AccordionTrigger>
                      <AccordionContent>
                        لتقديم شكوى، يجب عليك تعبئة النموذج المخصص وتقديمه إلى
                        قسم الموارد البشرية.
                      </AccordionContent>
                    </AccordionItem>
                    <Separator />
                  </Accordion>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* قسم التواصل مع الدعم */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                تواصل مع الدعم
              </CardTitle>
              <CardDescription>
                تواصل مع فريق الدعم الفني لحل مشاكلك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 rtl">
                <Avatar>
                  <AvatarImage src="/images/avatars/avatar-1.png" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">علي محمد</p>
                  <p className="text-sm text-gray-500">
                    مسؤول الدعم الفني
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 rtl">
                  <Envelope className="h-4 w-4 text-gray-500" />
                  <a
                    href="mailto:ali.mohammed@example.com"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    ali.mohammed@example.com
                  </a>
                </div>
                <div className="flex items-center space-x-2 rtl">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a
                    href="tel:+966500000000"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    +966500000000
                  </a>
                </div>
              </div>
              <Button className="mt-4 w-full">
                <MessageSquare className="h-4 w-4 ml-2" />
                إرسال رسالة
              </Button>
            </CardContent>
          </Card>

          {/* قسم التذاكر المفتوحة */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                تذاكر الدعم المفتوحة
              </CardTitle>
              <CardDescription>
                تذاكر الدعم التي لم يتم حلها بعد
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">رقم التذكرة</TableHead>
                      <TableHead>العنوان</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSupportTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>
                          {ticket.status === "open" && (
                            <Badge variant="destructive">مفتوحة</Badge>
                          )}
                          {ticket.status === "pending" && (
                            <Badge variant="warning">قيد الانتظار</Badge>
                          )}
                          {ticket.status === "resolved" && (
                            <Badge variant="success">تم الحل</Badge>
                          )}
                          {ticket.status === "closed" && (
                            <Badge variant="secondary">مغلقة</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HRSupportPage;
