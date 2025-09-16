import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot } from 'lucide-react';
import { Chat } from '../components/Chat';
import { ServiceCards } from '../components/ServiceCards';
import { Settings } from '../components/Settings';
import { Service, ApiConfig } from '../types';
import servicesData from '../data/straive_structured.json';

export const ChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [services] = useState<Service[]>(servicesData as Service[]);
  const [displayedServices, setDisplayedServices] = useState<Service[]>([]);
  const [config, setConfig] = useState<ApiConfig>(() => {
    const saved = localStorage.getItem('aiServicesConfig');
    return saved ? JSON.parse(saved) : { apiKey: '', baseUrl: 'https://api.openai.com/v1' };
  });

  const initialQuery = location.state?.initialQuery;

  useEffect(() => {
    localStorage.setItem('aiServicesConfig', JSON.stringify(config));
  }, [config]);

  const handleServicesFound = (foundServices: Service[]) => {
    setDisplayedServices(foundServices);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">AI Services Assistant</h1>
                <p className="text-sm text-gray-600">Discover our enterprise AI solutions</p>
              </div>
            </div>
          </div>
          
          <Settings config={config} onConfigChange={setConfig} />
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel */}
        <div className="w-1/2 border-r border-gray-300 bg-white shadow-lg flex-shrink-0">
          <Chat
            services={services}
            config={config}
            onServicesFound={handleServicesFound}
            initialQuery={initialQuery}
          />
        </div>

        {/* Service Cards Panel */}
        <div className="w-1/2 bg-white shadow-lg flex-shrink-0 overflow-hidden">
          <ServiceCards
            services={displayedServices}
            title="Relevant Services"
          />
        </div>
      </div>
    </div>
  );
};
