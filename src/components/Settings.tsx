import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, X, Save } from 'lucide-react';
import { ApiConfig } from '../types';

interface SettingsProps {
  config: ApiConfig;
  onConfigChange: (config: ApiConfig) => void;
}

export const Settings: React.FC<SettingsProps> = ({ config, onConfigChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempConfig, setTempConfig] = useState(config);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTempConfig(config);
  }, [config]);

  const handleSave = () => {
    onConfigChange(tempConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setIsOpen(false);
  };

  const isConfigured = config.apiKey && config.baseUrl;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
          isConfigured
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
        }`}
        title={isConfigured ? 'API Configured' : 'Configure API'}
      >
        <SettingsIcon size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">API Configuration</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={tempConfig.apiKey}
                  onChange={(e) => setTempConfig({ ...tempConfig, apiKey: e.target.value })}
                  placeholder="Enter your OpenAI API key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base URL
                </label>
                <input
                  type="url"
                  value={tempConfig.baseUrl}
                  onChange={(e) => setTempConfig({ ...tempConfig, baseUrl: e.target.value })}
                  placeholder="https://api.openai.com/v1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                <p className="font-medium">Note:</p>
                <p>Your API key is stored locally and never sent to our servers.</p>
              </div>

              <button
                onClick={handleSave}
                disabled={!tempConfig.apiKey || !tempConfig.baseUrl}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  saved
                    ? 'bg-green-500 text-white'
                    : tempConfig.apiKey && tempConfig.baseUrl
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save size={16} />
                {saved ? 'Saved!' : 'Save Configuration'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};