/**
 * Discharge AI Agent - Main App Component
 * 
 * This is the main React component that handles the entire application flow.
 */

import React, { useState } from 'react';
import DischargeForm from './components/DischargeForm';
import SimplifiedView from './components/SimplifiedView';
import './App.css';

function App() {
  // State to store the simplified discharge data
  const [simplifiedData, setSimplifiedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handle form submission
   * Receives discharge notes and triggers API call
   */
  const handleSubmit = async (dischargeNotes) => {
    setLoading(true);
    setError(null);
    setSimplifiedData(null);

    try {
      // API endpoint - adjust URL if backend is on different port
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/simplify-discharge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dischargeNotes }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process discharge notes');
      }

      setSimplifiedData(data.data);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset form to allow new submission
   */
  const handleReset = () => {
    setSimplifiedData(null);
    setError(null);
  };

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
        {!simplifiedData ? (
          <DischargeForm onSubmit={handleSubmit} loading={loading} error={error} />
        ) : (
          <SimplifiedView data={simplifiedData} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Discharge AI Agent © 2024 | Built for better healthcare understanding</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

