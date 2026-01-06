/**
 * DischargeForm Component
 * 
 * Form component for users to input their discharge notes
 */

import React, { useState } from 'react';

function DischargeForm({ onSubmit, loading, error }) {
  const [dischargeNotes, setDischargeNotes] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (dischargeNotes.trim().length === 0) {
      return;
    }

    onSubmit(dischargeNotes);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📋 Enter Your Discharge Notes
        </h2>
        
        <p className="text-gray-600 mb-6">
          Paste your hospital discharge notes below. We'll convert complex medical language 
          into simple, easy-to-understand instructions.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Text Area for Discharge Notes */}
          <div className="mb-6">
            <label 
              htmlFor="dischargeNotes" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Discharge Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              id="dischargeNotes"
              value={dischargeNotes}
              onChange={(e) => setDischargeNotes(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-healthcare-blue focus:border-transparent resize-none"
              placeholder="Paste your discharge notes here...

Example:
Patient was admitted with acute bronchitis. Prescribed Azithromycin 500mg OD for 5 days. 
Follow-up in 7 days. Watch for fever, difficulty breathing..."
              disabled={loading}
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Minimum 50 characters recommended for best results
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-500 text-xl">❌</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || dischargeNotes.trim().length === 0}
              className="bg-healthcare-blue hover:bg-healthcare-light-blue text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  ✨ Simplify Notes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Sample Note Suggestion */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Make sure to include all medications, dosages, and follow-up instructions 
          from your discharge notes for the most accurate simplification.
        </p>
      </div>
    </div>
  );
}

export default DischargeForm;

