
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ApiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface DeepseekConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}
