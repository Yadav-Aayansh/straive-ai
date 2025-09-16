export interface Service {
  URL: string;
  Title: string;
  Image: string | null;
  Snippet: string | null;
  Long_description: string | null;
  Note: string | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  services?: Service[];
  timestamp: Date;
}

export interface ApiConfig {
  apiKey: string;
  baseUrl: string;
}