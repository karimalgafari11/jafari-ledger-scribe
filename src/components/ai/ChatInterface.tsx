
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Clock, Bot, UserCircle, Sparkles } from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Message } from "@/types/ai";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { chatItemVariants } from "@/lib/framer-animations";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading, chatHistory } = useAiAssistant();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [typedMessage, setTypedMessage] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  
  // Scroll to bottom when chat history updates
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chatHistory]);

  // Auto focus on input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle message sending
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
    try {
      await sendMessage(message);
      setMessage("");
      setShowTypingIndicator(true);
      
      // Hide typing indicator after response
      setTimeout(() => {
        setShowTypingIndicator(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle suggested questions
  const handleSuggestedQuestion = (question: string) => {
    if (!isLoading) {
      sendMessage(question);
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 overflow-auto chat-scrollbar">
        <div className="space-y-4">
          {/* Welcome message if no chat history */}
          {chatHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center h-full mt-20"
            >
              <div className="text-center space-y-4">
                <div className="bg-indigo-100 p-4 rounded-full inline-flex mx-auto">
                  <Bot className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="text-xl font-medium text-indigo-900">مرحباً بك في المساعد الذكي</h3>
                <p className="text-gray-500 max-w-md">
                  يمكنك سؤالي عن المبيعات، المخزون، الفواتير، المصاريف، أو أي تحليلات مالية تحتاجها.
                </p>
                <div className="pt-4 flex flex-wrap gap-2 justify-center">
                  {["كيف يمكنني مساعدتك اليوم؟", "ما هي مبيعات اليوم؟", "اعرض المنتجات منخفضة المخزون"].map((text, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="bg-white border-indigo-200 hover:bg-indigo-50"
                      onClick={() => handleSuggestedQuestion(text)}
                    >
                      {text}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Chat messages */}
          <AnimatePresence>
            {chatHistory.map((msg, index) => (
              <motion.div
                key={index}
                variants={chatItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg",
                  msg.role === "user" ? "flex-row-reverse bg-indigo-50/70" : "bg-white border border-gray-100"
                )}
              >
                <div className={cn(
                  "rounded-full p-2 flex-shrink-0",
                  msg.role === "user" ? "bg-indigo-600 text-white" : "bg-purple-100"
                )}>
                  {msg.role === "user" ? 
                    <UserCircle className="h-5 w-5" /> : 
                    <Bot className="h-5 w-5 text-purple-600" />
                  }
                </div>
                
                <div className={cn(
                  "flex flex-col flex-1 text-sm",
                  msg.role === "user" ? "items-end" : "items-start"
                )}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">
                      {msg.role === "user" ? "أنت" : "المساعد الذكي"}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <div className={cn(
                    "max-w-full",
                    msg.role === "user" ? "text-right" : "text-left"
                  )}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100"
            >
              <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                <Bot className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex flex-col flex-1 text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">المساعد الذكي</span>
                  <span className="text-xs text-gray-500">يكتب...</span>
                </div>
                <div className="flex space-x-1 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="p-3 border-t border-indigo-100 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="bg-gray-50 border-indigo-100 focus:border-indigo-300 focus:ring-indigo-300"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 gap-1" 
            disabled={!message.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
            إرسال
          </Button>
        </form>

        <div className="mt-2 flex justify-center">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            مدعوم بالذكاء الاصطناعي - يمكنك طرح أسئلة مفصلة أو طلب تحليلات متقدمة
          </div>
        </div>
      </div>
    </div>
  );
};
