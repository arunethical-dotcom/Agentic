/**
 * SimplifiedView Component
 * 
 * Displays the simplified discharge notes in a structured, patient-friendly format
 */

import React from 'react';
import CarePlanDay from './CarePlanDay';
import MedicationChecklist from './MedicationChecklist';
import WarningSigns from './WarningSigns';
import FollowUpReminders from './FollowUpReminders';

function SimplifiedView({ data, onReset }) {
  return (
    <div className="max-w-6xl mx-auto fade-in">
      {/* Header with Reset Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-healthcare-blue">
          📄 Your Simplified Discharge Summary
        </h2>
        <button
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          🔄 Simplify Another Note
        </button>
      </div>

      {/* Simple Summary Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          📌 Summary
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Day-wise Care Plan */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          📅 Day-by-Day Care Plan
        </h3>
        <div className="space-y-4">
          {data.carePlan && data.carePlan.length > 0 ? (
            data.carePlan.map((day, index) => (
              <CarePlanDay key={index} day={day} />
            ))
          ) : (
            <p className="text-gray-600">No specific day-by-day plan provided.</p>
          )}
        </div>
      </div>

      {/* Medication Checklist */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          💊 Medication Checklist
        </h3>
        {data.medications && data.medications.length > 0 ? (
          <MedicationChecklist medications={data.medications} />
        ) : (
          <p className="text-gray-600">No medications listed.</p>
        )}
      </div>

      {/* Warning Signs */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
        <WarningSigns warningSigns={data.warningSigns || []} />
      </div>

      {/* Follow-Up Reminders */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
        <FollowUpReminders reminders={data.followUpReminders || []} />
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Remember:</strong> This simplified summary is for your understanding. 
          Always follow your doctor's instructions and consult them if you have any concerns.
        </p>
      </div>
    </div>
  );
}

export default SimplifiedView;

