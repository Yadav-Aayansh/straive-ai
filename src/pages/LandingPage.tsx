import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Bot, Zap, Target, Users } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleStartChat = () => {
    if (query.trim()) {
      navigate('/chat', { state: { initialQuery: query.trim() } });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStartChat();
    }
  };

  const sampleQueries = [
    "What do you offer for ticket management?",
    "How can you help with email processing?",
    "What research tools do you provide?",
    "Tell me about your AI agents for customer service"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Straive AI</h1>
              <p className="text-sm text-gray-600">Enterprise AI Solutions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Custom Agentic AI Solutions.
              </span>
              <br />
              <span className="text-gray-800">
                Built for Your Enterprise.{' '}
                <span className="relative">
                  Co-created Live.
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </span>
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Backed by 30 years of enterprise delivery excellence.
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-12">
            <p className="text-gray-500 mb-6 text-lg">
              Discover our AI services tailored to your business needs
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our AI services and capabilities..."
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm"
                />
                <button
                  onClick={handleStartChat}
                  disabled={!query.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl"></div>
            </div>

            {/* Sample Queries */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {sampleQueries.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(sample)}
                  className="px-4 py-2 text-sm bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-white hover:shadow-md transition-all duration-200 text-gray-700 hover:text-blue-600"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Intelligent Automation</h3>
              <p className="text-gray-600">
                Streamline workflows with AI-powered ticket management, email processing, and customer service automation.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Research & Analytics</h3>
              <p className="text-gray-600">
                Advanced research agents and data integration tools to unlock insights from multiple sources and APIs.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                AI-powered chat auditing, metadata validation, and quality control systems for enterprise excellence.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Ready to Transform Your Business?</h2>
            </div>
            <p className="text-blue-100 mb-6 text-lg">
              Start exploring our AI solutions and discover how we can help streamline your operations.
            </p>
            <button
              onClick={() => navigate('/chat')}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Start Exploring Now
            </button>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </main>
    </div>
  );
};