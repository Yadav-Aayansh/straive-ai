import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Bot, User } from 'lucide-react';
import { ChatMessage, ApiConfig, Service } from '../types';
import { OpenAIService } from '../services/api';

interface ChatProps {
  services: Service[];
  config: ApiConfig;
  onServicesFound: (services: Service[]) => void;
  initialQuery?: string;
}

export const Chat: React.FC<ChatProps> = ({ services, config, onServicesFound, initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-send initial query if provided
  useEffect(() => {
    if (initialQuery && config.apiKey && config.baseUrl) {
      handleSendMessage();
    }
  }, [initialQuery, config.apiKey, config.baseUrl]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    if (!config.apiKey || !config.baseUrl) {
      alert('Please configure your API key and base URL first');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const openaiService = new OpenAIService(config);
      const response = await openaiService.queryServices(inputText.trim(), services);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        services: response.relevantServices,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      onServicesFound(response.relevantServices);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API configuration.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isConfigured = config.apiKey && config.baseUrl;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Welcome!</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {initialQuery ? 'Processing your query...' : 'Ask me about our AI services. For example:'}
            </p>
            {!initialQuery && (
              <div className="mt-4 space-y-2 max-w-md mx-auto">
              <button
                onClick={() => setInputText("What do you offer for ticket management?")}
                className="block w-full text-left px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm text-blue-600 hover:bg-blue-50"
                disabled={!isConfigured}
              >
                "What do you offer for ticket management?"
              </button>
              <button
                onClick={() => setInputText("How can you help with email processing?")}
                className="block w-full text-left px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm text-blue-600 hover:bg-blue-50"
                disabled={!isConfigured}
              >
                "How can you help with email processing?"
              </button>
              <button
                onClick={() => setInputText("What research tools do you provide?")}
                className="block w-full text-left px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm text-blue-600 hover:bg-blue-50"
                disabled={!isConfigured}
              >
                "What research tools do you provide?"
              </button>
            </div>
            )}
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0 h-fit">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] p-4 rounded-xl ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}
            >
              <p className="leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="p-2 bg-blue-600 rounded-full flex-shrink-0 h-fit">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0 h-fit">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white text-gray-800 shadow-sm max-w-[80%] p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isConfigured ? "Ask about our AI services..." : "Configure API key first..."}
              disabled={isLoading || !isConfigured}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading || !isConfigured}
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {!isConfigured && (
          <p className="text-sm text-red-600 mt-2">
            Please configure your API key and base URL using the settings button above.
          </p>
        )}
      </div>
    </div>
  );
};