/**
 * Discharge AI Agent - Main App Component
 * 
 * This is the main React component that handles the entire application flow.
 */

import React from 'react';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-healthcare-blue text-center">
            🏥 Discharge AI Agent
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Simplify your hospital discharge notes into easy-to-understand language
          </p>
        </div>
      </header>

      {/* Disclaimer Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="container mx-auto px-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> This tool is for educational purposes only and is not a replacement for professional medical advice.
                Always consult your doctor for medical decisions. No patient data is stored.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center text-gray-600 max-w-2xl mx-auto">
          Start by asking a question or uploading your discharge summary/notes (Image or PDF).
        </div>

        <ChatInterface />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Discharge AI Agent © 2026 | Built for better healthcare understanding</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

