import React from 'react';
import { Service } from '../types';
import { ServiceCard } from './ServiceCard';
import { Sparkles } from 'lucide-react';

interface ServiceCardsProps {
  services: Service[];
  title: string;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ services, title }) => {
  if (services.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <Sparkles className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">Discover Our Services</h3>
        <p className="text-gray-500 max-w-sm">
          Ask questions about our AI services and I'll show you the most relevant solutions here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          {title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {services.length} relevant service{services.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div className="p-6 space-y-6 overflow-y-auto h-full">
        {services.map((service, index) => (
          <ServiceCard key={`${service.Title}-${index}`} service={service} index={index} />
        ))}
      </div>
    </div>
  );
};