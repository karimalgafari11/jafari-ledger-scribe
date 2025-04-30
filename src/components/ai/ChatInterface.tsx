
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Search, Bot } from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { Message } from "@/types/ai";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

export const ChatInterface = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحبا بك في المساعد الذكي، كيف يمكنني مساعدتك اليوم؟",
    },
  ]);
  
  const { toast } = useToast();
  const { sendMessage, isLoading } = useAiAssistant();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          },
        ]);
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

  return (
    <div className="flex flex-col h-[calc(100vh-300px)] min-h-[500px]">
      <ScrollArea className="flex-1 p-4 mb-4 border rounded-md bg-gray-50">
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
                  <div className="whitespace-pre-wrap">{message.content}</div>
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

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب سؤالك هنا..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? "جاري الإرسال..." : "إرسال"}
        </Button>
      </form>
    </div>
  );
};
