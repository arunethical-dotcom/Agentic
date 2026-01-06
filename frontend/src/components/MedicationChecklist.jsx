/**
 * MedicationChecklist Component
 * 
 * Displays medications in a checklist format with details
 */

import React, { useState } from 'react';

function MedicationChecklist({ medications }) {
  const [checkedItems, setCheckedItems] = useState({});

  /**
   * Toggle checkbox state
   */
  const handleToggle = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-4">
      {medications.map((medication, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            {/* Checkbox */}
            <input
              type="checkbox"
              id={`med-${index}`}
              checked={checkedItems[index] || false}
              onChange={() => handleToggle(index)}
              className="mt-1 h-5 w-5 text-healthcare-blue focus:ring-healthcare-blue border-gray-300 rounded cursor-pointer"
            />
            
            {/* Medication Details */}
            <div className="flex-1">
              <label
                htmlFor={`med-${index}`}
                className="cursor-pointer"
              >
                <div className="font-semibold text-lg text-gray-800 mb-2">
                  {medication.name}
                </div>
                
                <div className="space-y-1 text-gray-600">
                  {medication.dosage && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Dosage:</span>
                      <span>{medication.dosage}</span>
                    </div>
                  )}
                  
                  {medication.frequency && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Frequency:</span>
                      <span>{medication.frequency}</span>
                    </div>
                  )}
                  
                  {medication.duration && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Duration:</span>
                      <span>{medication.duration}</span>
                    </div>
                  )}
                  
                  {medication.importantNotes && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <span className="font-medium text-orange-600">⚠️ Important:</span>
                      <span className="ml-2">{medication.importantNotes}</span>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
      ))}
      
      {/* Progress Indicator */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Completed: {Object.values(checkedItems).filter(Boolean).length} / {medications.length}
          </span>
          <span className="text-healthcare-blue font-medium">
            {Math.round((Object.values(checkedItems).filter(Boolean).length / medications.length) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default MedicationChecklist;

