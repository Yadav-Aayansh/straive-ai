import { Service } from '../types';

export interface ApiConfig {
  apiKey: string;
  baseUrl: string;
}

export interface ChatResponse {
  answer: string;
  relevantServices: Service[];
}

export class OpenAIService {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  async queryServices(question: string, services: Service[]): Promise<ChatResponse> {
    if (!this.config.apiKey) {
      throw new Error('API key is required');
    }

    const validServices = services.filter(s => s.Title && s.Title !== 'NaN');
    
    const systemPrompt = `You are an AI assistant helping clients discover and understand our AI services from Straive.

INSTRUCTIONS:
1. Analyze the user's question against our complete services catalog (provided as JSON data)
2. Provide a short, precise answer (2-3 sentences maximum) that directly addresses their question
3. Identify the 1-3 most relevant services from our catalog that match their needs
4. Use the service titles, snippets, descriptions, and any available metadata to make accurate matches
5. Consider synonyms and related concepts (e.g., "email management" relates to "Email AI Agent")

COMPLETE SERVICES CATALOG (JSON):
${JSON.stringify(validServices, null, 2)}

RESPONSE FORMAT:
You must respond in this exact JSON format:
{
  "answer": "Your short, helpful answer here",
  "serviceIds": [array of indices corresponding to relevant services from the catalog, starting from 0]
}

EXAMPLE:
If user asks about email management and services at indices 1 and 10 are relevant:
{
  "answer": "We offer comprehensive email management solutions that automate processing, classification, and response generation.",
  "serviceIds": [1, 10]
}`;

    const userPrompt = `Question: ${question}`;

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error (${response.status}): ${error}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response from API');
      }

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(content);
      } catch {
        // Fallback if JSON parsing fails
        return {
          answer: content,
          relevantServices: []
        };
      }

      const relevantServices = (parsedResponse.serviceIds || [])
        .map((id: number) => validServices[id])
        .filter((service: Service) => service)
        .slice(0, 3);

      return {
        answer: parsedResponse.answer || content,
        relevantServices
      };
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }
}