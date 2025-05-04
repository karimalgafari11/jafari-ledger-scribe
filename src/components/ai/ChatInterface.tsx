import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bot, 
  MessageSquare, 
  Search, 
  AlertCircle, 
  Clock, 
  ArrowUp, 
  X, 
  ChevronDown,
  Mic,
  Send,
  Trash2,
  Shield,
  Lock,
  LockKeyhole,
  Fingerprint,
  KeyRound
} from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { Message, SystemAlert } from "@/types/ai";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SensitiveDataCategory, VerificationLevel } from "@/utils/aiSecurityUtils";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

// Add type declarations for the Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
  prototype: SpeechRecognition;
}

// Extend the Window interface to include both standard and webkit prefixed SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export const ChatInterface = () => {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "ما هي الأصناف التي توشك على النفاذ؟",
    "ما هي الفواتير المستحقة هذا الأسبوع؟",
    "ملخص أداء المبيعات هذا الشهر",
    "ما هي المصروفات التي تنتظر الموافقة؟",
    "قم بإنشاء تقرير مبيعات للأسبوع الماضي",
    "حلل أداء المبيعات حسب المنتج"
  ]);
  
  // اضافة حالة للتحقق من الهوية
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationMethod, setVerificationMethod] = useState<"password" | "2fa" | "biometric">("password");
  
  const { toast: toastNotify } = useToast();
  const { 
    sendMessage, 
    isLoading, 
    systemAlerts, 
    chatHistory,
    clearChatHistory,
    hasFullAccess,
    toggleFullAccess,
    scanForSystemErrors,
    securityMode,
    setSecurityLevel,
    identityVerified,
    currentVerificationLevel,
    pendingVerification,
    verifyUserIdentity
  } = useAiAssistant();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const [showFullAccessControls, setShowFullAccessControls] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  
  // إضافة مراقبة لطلبات التحقق المعلقة
  useEffect(() => {
    if (pendingVerification) {
      setIsVerificationDialogOpen(true);
    }
  }, [pendingVerification]);
  
  // عملية محاكاة للتحقق من الهوية
  const simulateVerificationProcess = async () => {
    setVerificationProgress(0);
    
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // التحقق بنجاح بعد اكتمال التقدم
          setTimeout(() => {
            setIsVerificationDialogOpen(false);
            toast.success("تم التحقق من هويتك بنجاح");
            
            // هن�� نجري عملية تحقق حقيقية مع pendingVerification
            if (pendingVerification) {
              verifyUserIdentity(pendingVerification.category);
            }
          }, 500);
        }
        return newProgress;
      });
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // التحقق من طلب المساعدة الأمنية
    if (input.includes("تحقق") || input.includes("الأمان") || input.includes("التحقق من الهوية")) {
      setInput("");
      setIsVerificationDialogOpen(true);
      return;
    }
    
    setInput("");
    
    try {
      await sendMessage(input);
      
      // توليد اقتراحات جديدة بناء على المحادثة
      generateSuggestedQuestions();
    } catch (error) {
      console.error("Error sending message:", error);
      toastNotify({
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
    // توليد اقتراحات جديدة بناءً على سياق المحادثة
    const contextualSuggestions = [
      "قم بإنشاء تقرير ميزانية عمومية",
      "ما هي أفضل المنتجات مبيعاً هذا الشهر؟",
      "ما هي حالة المخزون الحالية؟",
      "أرسل تذكيرات للعملاء الم��أخرين عن السداد",
      "قم بتحليل الإيرادات والمصروفات للربع الحالي",
      "أنشئ قيداً محاسبياً لتسوية المخزون",
      "افحص النظام بحثاً عن أخطاء",
      "حلل أداء فريق المبيعات"
    ];
    setSuggestedQuestions(prevSuggestions => {
      // مزج الاقتراحات الحالية مع الاقتراحات الجديدة وأخذ 6 اقتراحات عشوائية
      const allSuggestions = [...new Set([...prevSuggestions, ...contextualSuggestions])];
      return allSuggestions.sort(() => 0.5 - Math.random()).slice(0, 6);
    });
  };
  
  const formatMessageTime = (timestamp?: Date) => {
    if (!timestamp) return "";
    return formatDistanceToNow(timestamp instanceof Date ? timestamp : new Date(timestamp), { addSuffix: true, locale: ar });
  };

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("متصفحك لا يدعم خاصية التعرف على الصوت");
      return;
    }
    
    try {
      // Use the properly typed SpeechRecognition constructor
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognitionConstructor) {
        throw new Error("Speech recognition not supported");
      }
      
      speechRecognition.current = new SpeechRecognitionConstructor();
      
      speechRecognition.current.lang = 'ar-SA';
      speechRecognition.current.continuous = false;
      speechRecognition.current.interimResults = false;
      
      speechRecognition.current.onstart = () => {
        setListening(true);
      };
      
      speechRecognition.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      
      speechRecognition.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setListening(false);
        toast.error("حدث خطأ أثناء الاستماع. حاول مرة أخرى.");
      };
      
      speechRecognition.current.onend = () => {
        setListening(false);
      };
      
      speechRecognition.current.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast.error("لم نتمكن من بدء خاصية التعرف على الصوت");
    }
  };

  const stopSpeechRecognition = () => {
    if (speechRecognition.current) {
      speechRecognition.current.stop();
      setListening(false);
    }
  };
  
  const handleScanSystem = async () => {
    try {
      const results = await scanForSystemErrors();
      toast.success(`تم اكتشاف ${results.warnings} تحذيرات و ${results.notifications} تنبيهات`);
    } catch (error) {
      console.error("Error scanning system:", error);
    }
  };
  
  // معالجة التحقق اليدوي من الهوية
  const handleManualVerification = () => {
    if (verificationMethod === "password") {
      // التحقق بكلمة المرور
      if (verificationCode === "123456") {
        simulateVerificationProcess();
      } else {
        toast.error("كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى");
      }
    } else if (verificationMethod === "2fa") {
      // التحقق برمز التحقق ثنائي ال��امل
      if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
        simulateVerificationProcess();
      } else {
        toast.error("رمز التحقق غير صحيح، يجب أن يكون 6 أرقام");
      }
    } else if (verificationMethod === "biometric") {
      // محاكاة التحقق البيومتري
      simulateVerificationProcess();
    }
  };

  // إظهار رمز مستوى التحقق
  const renderVerificationLevelIcon = () => {
    if (!identityVerified) {
      return <Lock className="h-4 w-4 text-red-500" />;
    }
    
    switch (currentVerificationLevel) {
      case VerificationLevel.BASIC:
        return <LockKeyhole className="h-4 w-4 text-amber-500" />;
      case VerificationLevel.TWO_FACTOR:
        return <KeyRound className="h-4 w-4 text-green-500" />;
      case VerificationLevel.BIOMETRIC:
        return <Fingerprint className="h-4 w-4 text-blue-500" />;
      default:
        return <Lock className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // إظهار نص مستوى التحقق
  const getVerificationLevelText = () => {
    if (!identityVerified) {
      return "غير متحقق";
    }
    
    switch (currentVerificationLevel) {
      case VerificationLevel.BASIC:
        return "أساسي";
      case VerificationLevel.TWO_FACTOR:
        return "ثنائي العامل";
      case VerificationLevel.BIOMETRIC:
        return "بيومتري";
      default:
        return "غير معروف";
    }
  };
  
  // وضع الأمان المناسب
  const getSecurityModeText = () => {
    switch (securityMode) {
      case "standard":
        return "قياسي";
      case "enhanced":
        return "محسّن";
      case "strict":
        return "صارم";
      default:
        return "غير معروف";
    }
  };

  // إذا لم يكن هناك رسائل في المحادثة، أضف رسالة ترحيبية
  const displayMessages = chatHistory.length > 0 
    ? chatHistory 
    : [
        {
          role: "assistant",
          content: "مرحباً بك في المساعد الذكي آمن! كيف يمكنني مساعدتك اليوم؟",
          timestamp: new Date()
        },
      ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-xl -z-10"></div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 p-3">
            <h3 className="text-lg font-medium text-blue-800 flex items-center">
              <Bot className="mr-2 h-5 w-5" /> مرحباً بك في المساعد الذكي 👋
            </h3>
            <p className="text-sm text-blue-600">
              أنا هنا لمساعدتك في إدارة النظام وحل المشكلات وتقديم التحليلات
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {/* Verification Badge */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  className={`flex items-center gap-1 px-2 py-1 ${
                    !identityVerified ? "bg-red-100 text-red-600 hover:bg-red-200" :
                    currentVerificationLevel === VerificationLevel.BASIC ? "bg-amber-100 text-amber-600 hover:bg-amber-200" :
                    currentVerificationLevel === VerificationLevel.TWO_FACTOR ? "bg-green-100 text-green-600 hover:bg-green-200" :
                    "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  } cursor-pointer`}
                  onClick={() => setIsVerificationDialogOpen(true)}
                >
                  {renderVerificationLevelIcon()}
                  <span>{getVerificationLevelText()}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>انقر للتحقق من الهوية</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white hover:bg-blue-50"
                onClick={() => setShowFullAccessControls(true)}
              >
                <Shield className="h-4 w-4 text-blue-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium text-blue-900">إعد��دات الأمان والصلاحيات</h3>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">مستوى الأمان</h4>
                  <RadioGroup 
                    defaultValue={securityMode} 
                    onValueChange={(value) => setSecurityLevel(value as 'standard' | 'enhanced' | 'strict')}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="mr-2">قياسي</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enhanced" id="enhanced" />
                      <Label htmlFor="enhanced" className="mr-2">محسّن</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="strict" id="strict" />
                      <Label htmlFor="strict" className="mr-2">صارم</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4>الصلاحيات الكاملة</h4>
                    <p className="text-xs text-gray-500">السماح للمساعد بالوصول الكامل للنظام</p>
                  </div>
                  <Switch 
                    checked={hasFullAccess} 
                    onCheckedChange={toggleFullAccess} 
                    aria-label="تبديل الصلاحيات الكاملة"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full text-amber-600 border-amber-200 hover:bg-amber-50"
                    onClick={handleScanSystem}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    فحص النظام بحثاً عن أ��طاء
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white hover:bg-red-50"
            onClick={clearChatHistory}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 rounded-lg mb-4 bg-white/70 backdrop-blur-sm border border-blue-100 p-3">
        {/* System Security Info */}
        <div className="mb-4 bg-blue-50/70 rounded-lg p-2 border border-blue-200">
          <div className="flex items-center justify-between text-xs text-blue-700">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>مستوى الأمان: {getSecurityModeText()}</span>
            </div>
            <div className="flex items-center gap-1">
              {renderVerificationLevelIcon()}
              <span>مستوى التحقق: {getVerificationLevelText()}</span>
            </div>
          </div>
        </div>
        
        {displayMessages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card className={`max-w-[80%] border-0 shadow-sm ${
              message.role === "user" 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white" 
                : "bg-white border-blue-100"
            }`}>
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  {message.role === "assistant" && (
                    <div className="bg-blue-100 rounded-full p-1 mt-1">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <div className={`whitespace-pre-wrap ${message.role === "user" ? "text-white" : "text-gray-800"}`}>
                      {message.content}
                    </div>
                    <div className={`text-xs mt-1 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {formatMessageTime(message.timestamp)}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="bg-white/20 rounded-full p-1 mt-1">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {showSuggestions && suggestedQuestions.length > 0 && (
        <div className="mb-3 bg-white/70 backdrop-blur-sm rounded-lg border border-blue-100 p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-blue-800">اقتراحات للأسئلة</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 text-blue-500 hover:text-blue-700 hover:bg-blue-50" 
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
                className="cursor-pointer bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors" 
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
            placeholder="اكتب سؤالك أو استفسارك هنا..."
            className="pr-10 pl-10 bg-white border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
            disabled={isLoading || listening}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
          {!showSuggestions && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setShowSuggestions(true)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={listening ? "destructive" : "outline"}
                size="icon"
                className={listening ? "animate-pulse" : ""}
                onClick={listening ? stopSpeechRecognition : startSpeechRecognition}
                disabled={isLoading}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{listening ? "إيقاف التسجيل" : "البحث الصوتي"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                {isLoading ? 
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-1"></div>
                    <span>جارٍ...</span>
                  </div> 
                  : <Send className="h-4 w-4" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>إرسال</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
      
      {/* محادثة نشطة */}
      {listening && (
        <div className="mt-2 text-center text-sm text-blue-600 animate-pulse">
          جارٍ الاستماع... تحدث الآن
        </div>
      )}
      
      {/* نافذة التحقق من الهوية */}
      <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>التحقق من هويتك</DialogTitle>
            <DialogDescription>
              يتطلب الوصول إلى المعلومات الحساسة التحقق من هويتك.
              اختر طريقة التحقق المناسبة.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <RadioGroup 
              defaultValue={verificationMethod} 
              onValueChange={(value) => setVerificationMethod(value as "password" | "2fa" | "biometric")}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="password" id="password" />
                <Label htmlFor="password" className="mr-2 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-amber-500" />
                  <span>كلمة المرور</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2fa" id="2fa" />
                <Label htmlFor="2fa" className="mr-2 flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-green-500" />
                  <span>التحقق الثنائي</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biometric" id="biometric" />
                <Label htmlFor="biometric" className="mr-2 flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-blue-500" />
                  <span>البصمة البيومترية</span>
                </Label>
              </div>
            </RadioGroup>
            
            {verificationMethod !== "biometric" && (
              <div className="mt-3">
                <Label htmlFor="verificationCode" className="mb-2 block">
                  {verificationMethod === "password" ? "كلمة المرور" : "رمز التحقق"}
                </Label>
                <Input
                  id="verificationCode"
                  type={verificationMethod === "password" ? "password" : "text"}
                  placeholder={verificationMethod === "password" ? "أدخل كلمة المرور" : "أدخل رمز التحقق من 6 أرقام"}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {verificationMethod === "password" 
                    ? "لأغراض العرض، استخدم كلمة المرور: 123456" 
                    : "لأغراض العرض، أدخل أي 6 أرقام"}
                </p>
              </div>
            )}
            
            {verificationProgress > 0 && (
              <div className="space-y-2">
                <Label>جاري التحقق...</Label>
                <Progress value={verificationProgress} className="h-2" />
              </div>
            )}
          </div>
          
          <DialogFooter className="flex items-center justify-end space-x-2">
            <Button
              variant="ghost"
              onClick={() => setIsVerificationDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              type="button"
              onClick={handleManualVerification}
              disabled={verificationProgress > 0 || (verificationMethod !== "biometric" && !verificationCode)}
              className="mr-2"
            >
              {verificationMethod === "biometric" ? "استخدام البصمة" : "تحقق"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
