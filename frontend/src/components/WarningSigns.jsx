/**
 * WarningSigns Component
 * 
 * Displays warning signs that require immediate medical attention
 */

import React from 'react';

function WarningSigns({ warningSigns }) {
  return (
    <>
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        🚨 Warning Signs - Seek Immediate Medical Attention
      </h3>
      
      {warningSigns && warningSigns.length > 0 ? (
        <div className="space-y-3">
          {warningSigns.map((sign, index) => (
            <div
              key={index}
              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3"
            >
              <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
              <p className="text-red-800 font-medium">
                {sign}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <p className="text-gray-600">
            No specific warning signs mentioned. If you experience any unusual symptoms, 
            contact your doctor immediately.
          </p>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
        <p className="text-sm text-red-800 font-medium">
          💡 Remember: If you experience any of these warning signs, seek immediate medical attention. 
          Do not wait or try to self-treat.
        </p>
      </div>
    </>
  );
}

export default WarningSigns;

