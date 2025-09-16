import React from 'react';
import { Service } from '../types';
import { ExternalLink } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const hasImage = service.Image && service.Image !== 'NaN' && service.Image;
  const hasDescription = service.Long_description && service.Long_description !== 'NaN';
  const hasSnippet = service.Snippet && service.Snippet !== 'NaN';

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in w-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {hasImage && (
        <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
          <img
            src={service.Image!}
            alt={service.Title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
            {service.Title}
          </h3>
          {service.URL && (
            <a
              href={service.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors flex-shrink-0"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        
        {hasSnippet && (
          <p className="text-blue-600 font-medium text-sm mb-3 line-clamp-2">
            {service.Snippet}
          </p>
        )}
        
        {hasDescription && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
            {service.Long_description}
          </p>
        )}
        
        {!hasDescription && !hasSnippet && (
          <p className="text-gray-500 text-sm italic">
            No description available
          </p>
        )}
      </div>
    </div>
  );
};
