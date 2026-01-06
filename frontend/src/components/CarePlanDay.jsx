/**
 * CarePlanDay Component
 * 
 * Displays a single day's care plan instructions
 */

import React from 'react';

function CarePlanDay({ day }) {
  return (
    <div className="border-l-4 border-healthcare-blue bg-blue-50 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <div className="bg-healthcare-blue text-white font-bold px-4 py-2 rounded-lg min-w-[60px] text-center">
          Day {day.day}
        </div>
        <div className="flex-1">
          <p className="text-gray-800 leading-relaxed">
            {day.instructions}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarePlanDay;

