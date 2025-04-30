
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, MessageSquare, Search, AlertCircle, Clock, ArrowUp, X, ChevronDown } from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { Message, SystemAlert } from "@/types/ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export const ChatInterface = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً بك في المساعد الذكي، كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date()
    },
  ]);
  
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "ما هي الأصناف التي توشك على النفاذ؟",
    "ما هي الفواتير المستحقة هذا الأسبوع؟",
    "ملخص أداء المبيعات هذا الشهر",
    "ما هي المصروفات التي تنتظر الموافقة؟"
  ]);
  
  const { toast } = useToast();
  const { sendMessage, isLoading, systemAlerts } = useAiAssistant();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    try {
      const response = await sendMessage(input);
      
      if (response) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: response,
            timestamp: new Date()
          },
        ]);
        
        // توليد اقتراحات جديدة بناء على المحادثة
        generateSuggestedQuestions();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };
  
  const handleSuggestedQuestion = async (question: string) => {
    setInput(question);
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    await handleSubmit(fakeEvent);
  };
  
  const generateSuggestedQuestions = () => {
    // في تطبيق حقيقي، يمكن استخدام الذكاء الاصطناعي لتوليد اقتراحات بناءً على سياق المحادثة
    // هنا نستخدم قائمة ثابتة للتوضيح فقط
    const contextualSuggestions = [
      "هل يمكنك تحليل مبيعات الشهر الماضي؟",
      "ما هي الأصناف الأكثر مبيعًا؟",
      "ما هي حالة المخزون الحالية؟",
      "قم بإنشاء تقرير مبيعات عن الأسبوع الماضي"
    ];
    setSuggestedQuestions(contextualSuggestions);
  };
  
  const formatMessageTime = (timestamp?: Date) => {
    if (!timestamp) return "";
    return formatDistanceToNow(timestamp, { addSuffix: true, locale: ar });
  };

  const SystemAlertCard = ({ alert }: { alert: SystemAlert }) => (
    <Card className="mb-4 border-r-4 bg-yellow-50"
      style={{ borderRightColor: alert.priority === "high" ? "rgb(239 68 68)" : 
                            alert.priority === "medium" ? "rgb(245 158 11)" : 
                            "rgb(34 197 94)" }}>
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
          <div className="flex-1">
            <div className="font-medium">{alert.message}</div>
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatDistanceToNow(alert.timestamp, { addSuffix: true, locale: ar })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-300px)] min-h-[500px]">
      <ScrollArea className="flex-1 p-4 mb-4 border rounded-md bg-gray-50">
        {systemAlerts && systemAlerts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
              تنبيهات النظام
            </h3>
            {systemAlerts.map((alert, index) => (
              <SystemAlertCard key={index} alert={alert} />
            ))}
          </div>
        )}
      
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card className={`max-w-[80%] ${
              message.role === "user" 
                ? "bg-blue-50 border-blue-200" 
                : "bg-white border-gray-200"
            }`}>
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  {message.role === "assistant" && (
                    <Bot className="h-5 w-5 mt-1 text-blue-500" />
                  )}
                  <div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatMessageTime(message.timestamp)}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <MessageSquare className="h-5 w-5 mt-1 text-blue-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {showSuggestions && suggestedQuestions.length > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">اقتراحات أسئلة</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5" 
              onClick={() => setShowSuggestions(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="cursor-pointer hover:bg-blue-50" 
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب سؤالك هنا..."
            className="pr-10"
            disabled={isLoading}
          />
          {!showSuggestions && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowSuggestions(true)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? "جاري الإرسال..." : <ArrowUp className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>إرسال</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  );
};
