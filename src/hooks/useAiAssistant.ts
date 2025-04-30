
import { useState } from "react";
import { ApiResponse } from "@/types/ai";

export const useAiAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = "sk-1c339b5c5397486ebbcc7730383c8cdc"; // في التطبيق الحقيقي، لا ينصح بوضع المفاتيح في الكود مباشرة
  const API_URL = "https://api.deepseek.com/v1/chat/completions";

  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "أنت مساعد ذكي مفيد ومهذب. أجب بأسلوب مهني ومختصر.",
            },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "حدث خطأ في الاتصال بالخدمة");
      }

      const data: ApiResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};
