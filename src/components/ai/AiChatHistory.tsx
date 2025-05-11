
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search, Download, Calendar, Clock, Bot, User, Filter } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Message } from "@/types/ai";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// تنسيق للتاريخ بالعربية
const formatDate = (date: Date): string => {
  return format(date, "EEEE d MMMM yyyy", { locale: ar });
};

// تنسيق للوقت
const formatTime = (date: Date): string => {
  return format(date, "h:mm a", { locale: ar });
};

// بيانات مثال للمحادثات
const exampleChatHistory: {
  id: string;
  title: string;
  date: Date;
  messages: Message[];
  topic: string;
}[] = [
  {
    id: "chat-1",
    title: "استفسار عن المنتجات",
    date: new Date(2023, 10, 15, 14, 30),
    messages: [
      { role: "user", content: "ما هي المنتجات الأكثر مبيعاً هذا الشهر؟", timestamp: new Date(2023, 10, 15, 14, 30) },
      { role: "assistant", content: "بناءً على البيانات، المنتجات الأكثر مبيعاً هذا الشهر هي:\n1. هاتف سامسونج S21 (156 وحدة)\n2. سماعات سوني WH-1000XM4 (98 وحدة)\n3. لابتوب ديل XPS 15 (72 وحدة)", timestamp: new Date(2023, 10, 15, 14, 31) },
    ],
    topic: "المبيعات",
  },
  {
    id: "chat-2",
    title: "تقرير المبيعات الأسبوعي",
    date: new Date(2023, 10, 14, 9, 15),
    messages: [
      { role: "user", content: "قم بإنشاء تقرير المبيعات الأسبوعي", timestamp: new Date(2023, 10, 14, 9, 15) },
      { role: "assistant", content: "تم إنشاء تقرير المبيعات الأسبوعي. إجمالي المبيعات: 45,320 ريال بزيادة قدرها 12% عن الأسبوع الماضي. تم بيع 234 وحدة من 15 منتجًا مختلفًا.", timestamp: new Date(2023, 10, 14, 9, 16) },
    ],
    topic: "التقارير",
  },
  {
    id: "chat-3",
    title: "مساعدة في إعداد فاتورة",
    date: new Date(2023, 10, 12, 11, 45),
    messages: [
      { role: "user", content: "كيف يمكنني إضافة ضريبة القيمة المضافة للفواتير؟", timestamp: new Date(2023, 10, 12, 11, 45) },
      { role: "assistant", content: "لإضافة ضريبة القيمة المضافة للفواتير، اتبع الخطوات التالية:\n1. انتقل إلى صفحة إنشاء الفاتورة\n2. أدخل تفاصيل المنتجات\n3. في قسم الإعدادات، قم بتفعيل خيار 'تطبيق ضريبة القيمة المضافة'\n4. حدد نسبة الضريبة (15% افتراضيًا)\n5. سيتم احتساب الضريبة تلقائيًا", timestamp: new Date(2023, 10, 12, 11, 46) },
    ],
    topic: "الفواتير",
  },
  {
    id: "chat-4",
    title: "المخزون منخفض",
    date: new Date(2023, 10, 10, 16, 20),
    messages: [
      { role: "user", content: "ما هي المنتجات التي توشك على النفاذ؟", timestamp: new Date(2023, 10, 10, 16, 20) },
      { role: "assistant", content: "المنتجات التي توشك على النفاذ هي:\n1. هاتف آيفون 13 برو (3 وحدات متبقية)\n2. سماعات آبل إيربودس (5 وحدات متبقية)\n3. ساعة سامسونج جالاكسي ووتش (2 وحدة متبقية)\n\nهل ترغب في إنشاء طلبات شراء لهذه المنتجات؟", timestamp: new Date(2023, 10, 10, 16, 21) },
    ],
    topic: "المخزون",
  },
  {
    id: "chat-5",
    title: "تحليل أداء الموظفين",
    date: new Date(2023, 10, 5, 13, 10),
    messages: [
      { role: "user", content: "قم بتحليل أداء فريق المبيعات لهذا الشهر", timestamp: new Date(2023, 10, 5, 13, 10) },
      { role: "assistant", content: "تحليل أداء فريق المبيعات لشهر نوفمبر:\n\nأفضل 3 موظفين من حيث المبيعات:\n1. أحمد محمد - 156,000 ريال\n2. سارة علي - 142,500 ريال\n3. خالد عبدالله - 120,300 ريال\n\nمتوسط المبيعات لكل موظف: 98,450 ريال\nإجمالي المبيعات: 787,600 ريال\n\nتوصيات لتحسين الأداء:\n- برامج تدريبية للموظفين ذوي الأداء المنخفض\n- مكافآت إضافية للموظفين المتميزين", timestamp: new Date(2023, 10, 5, 13, 11) },
    ],
    topic: "الموظفين",
  },
];

export const AiChatHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHistory, setFilteredHistory] = useState(exampleChatHistory);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  
  // فلترة المحادثات عند البحث
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredHistory(exampleChatHistory);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = exampleChatHistory.filter(chat => 
      chat.title.toLowerCase().includes(query) ||
      chat.topic.toLowerCase().includes(query) ||
      chat.messages.some(m => m.content.toLowerCase().includes(query))
    );
    
    setFilteredHistory(filtered);
  }, [searchQuery]);

  // حذف محادثة
  const deleteChat = (chatId: string) => {
    // هنا يمكن إضافة منطق الحذف الفعلي
    setFilteredHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat === chatId) {
      setSelectedChat(null);
    }
    toast.success("تم حذف المحادثة بنجاح");
  };

  // تصدير المحادثات
  const exportChats = () => {
    // هنا يمكن إضافة منطق التصدير الفعلي
    toast.success("تم تصدير المحادثات بنجاح");
  };
  
  // تنظيم المحادثات حسب التاريخ
  const chatsByDate = filteredHistory.reduce((acc, chat) => {
    const dateStr = format(chat.date, "yyyy-MM-dd");
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(chat);
    return acc;
  }, {} as Record<string, typeof exampleChatHistory>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">سجل المحادثات</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilteredHistory([...exampleChatHistory].sort((a, b) => b.date.getTime() - a.date.getTime()))}>
                    الأحدث أولاً
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilteredHistory([...exampleChatHistory].sort((a, b) => a.date.getTime() - b.date.getTime()))}>
                    الأقدم أولاً
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في المحادثات..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
          <CardContent className="h-[calc(100vh-380px)] overflow-auto">
            {Object.entries(chatsByDate).map(([dateStr, chats]) => (
              <div key={dateStr} className="mb-4 last:mb-0">
                <h3 className="text-xs font-medium text-muted-foreground mb-2">
                  {formatDate(new Date(dateStr))}
                </h3>
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedChat === chat.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-accent border border-transparent"
                      }`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{chat.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {chat.messages[0].content}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2 shrink-0 h-5">
                          {chat.topic}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatTime(chat.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredHistory.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">لا توجد محادثات تطابق البحث</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between py-3 border-t">
            <Button variant="ghost" size="sm" onClick={exportChats}>
              <Download className="h-4 w-4 mr-1" />
              تصدير
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setFilteredHistory([]);
                toast.success("تم مسح جميع المحادثات");
              }}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              مسح الكل
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        {selectedChat ? (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {exampleChatHistory.find(c => c.id === selectedChat)?.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4 inline-block mr-1" />
                    {formatDate(exampleChatHistory.find(c => c.id === selectedChat)?.date || new Date())}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => deleteChat(selectedChat)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100vh-300px)] overflow-auto">
              {exampleChatHistory
                .find(c => c.id === selectedChat)
                ?.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 last:mb-0 ${
                      message.role === "user" ? "flex justify-end" : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.role === "assistant" ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span className="text-xs font-medium">
                          {message.role === "assistant" ? "المساعد الذكي" : "أنت"}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {formatTime(message.timestamp || new Date())}
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-center border-t py-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedChat(null)}>
                العودة إلى قائمة المحادثات
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center p-8">
              <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">سجل محادثاتك</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                اختر محادثة من القائمة لعرض تفاصيلها، أو ابدأ محادثة جديدة مع المساعد الذكي
              </p>
              <Button>بدء محادثة جديدة</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
