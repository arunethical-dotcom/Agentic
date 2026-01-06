/**
 * FollowUpReminders Component
 * 
 * Displays follow-up reminders and actions
 */

import React from 'react';

function FollowUpReminders({ reminders }) {
  return (
    <>
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        📞 Follow-Up Reminders
      </h3>
      
      {reminders && reminders.length > 0 ? (
        <div className="space-y-4">
          {reminders.map((reminder, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-200 p-4 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <div className="bg-healthcare-blue text-white font-bold px-3 py-1 rounded text-sm">
                  {reminder.date || 'Follow-up'}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">
                    {reminder.action}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <p className="text-gray-600">
            No specific follow-up reminders mentioned. Please check with your doctor about follow-up appointments.
          </p>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 Tip: Set reminders on your phone or calendar for follow-up appointments to ensure you don't miss them.
        </p>
      </div>
    </>
  );
}

export default FollowUpReminders;

