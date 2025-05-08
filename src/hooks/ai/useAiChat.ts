
import { useState, useEffect, useCallback } from "react";
import { Message, ApiResponse } from "@/types/ai";
import { toast } from "sonner";
import { analyzeMessageForSensitiveRequests } from "@/utils/aiSecurityUtils";
import { useAiSecurityContext } from "./useAiSecurityContext";
import { useAiSystemContext } from "./useAiSystemContext";
import { v4 as uuidv4 } from 'uuid';

const CHAT_HISTORY_KEY = "ai_assistant_chat_history";

export const useAiChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const { systemContext, buildSystemPrompt } = useAiSystemContext();
  const { 
    hasFullAccess, 
    securityMode, 
    identityVerified,
    currentVerificationLevel,
    pendingVerification,
    setPendingVerification,
    verifyUserIdentity
  } = useAiSecurityContext();

  const API_KEY = "sk-1c339b5c5397486ebbcc7730383c8cdc";
  const API_URL = "https://api.deepseek.com/v1/chat/completions";

  // Load chat history from localStorage
  useEffect(() => {
    const savedChatHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedChatHistory) {
      try {
        const parsedHistory: Message[] = JSON.parse(savedChatHistory);
        setChatHistory(parsedHistory);
      } catch (error) {
        console.error("فشل في استرجاع سجل المحادثات:", error);
      }
    }
  }, []);
  
  // Save chat history to localStorage when it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Send a message to the AI assistant
  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Analyze the message for sensitive data requests
      const sensitiveCategory = analyzeMessageForSensitiveRequests(message);
      
      // If the message contains a request for sensitive information and security mode is not standard
      if (sensitiveCategory && securityMode !== 'standard') {
        // Verify user identity before processing the request
        const isVerified = await verifyUserIdentity(sensitiveCategory);
        
        if (!isVerified) {
          // Add verification message to chat history
          const newUserMessage: Message = {
            role: "user",
            content: message,
            timestamp: new Date()
          };
          
          const verificationMessage: Message = {
            role: "assistant",
            content: "يرجى التحقق من هويتك أولاً للوصول إلى هذه المعلومات الحساسة.",
            timestamp: new Date()
          };
          
          setChatHistory(prev => [...prev, newUserMessage, verificationMessage]);
          return verificationMessage.content;
        }
      }
      
      // Prepare messages for the AI API
      const systemMessage = {
        role: "system" as const,
        content: buildSystemPrompt(),
      };
      
      const userMessage = {
        role: "user" as const,
        content: message,
      };
      
      // Add user message to chat history
      const newUserMessage: Message = {
        role: "user",
        content: message,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, newUserMessage]);
      
      // Send request to AI API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [systemMessage, userMessage],
          temperature: 0.5,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "حدث خطأ في الاتصال بالخدمة");
      }

      // Process the AI response
      const data: ApiResponse = await response.json();
      const responseContent = data.choices[0].message.content;
      
      // Add assistant response to chat history
      const assistantMessage: Message = {
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, assistantMessage]);
      
      return responseContent;
    } catch (error) {
      console.error("Error:", error);
      toast.error("حدث خطأ أثناء التواصل مع المساعد الذكي");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clear chat history
  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
    toast.success("تم مسح سجل المحادثات بنجاح");
  };

  return {
    sendMessage,
    isLoading,
    chatHistory,
    clearChatHistory
  };
};
