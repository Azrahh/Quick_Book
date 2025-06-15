import React from 'react';

const ConfirmAppointment = ({ service, date, time, duration, onBack, onConfirm }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
    
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Almost Done!</h3>
      </div>
      
      <p className="text-gray-600 mb-6">Please review your appointment details below</p>
      
      {/* Appointment details */}
      <div className="space-y-5">
        <div>
          <p className="text-gray-500 text-sm mb-1">Selected Service</p>
          <p className="font-medium text-gray-800">{service.title}</p>
        </div>
        
        <div>
          <p className="text-gray-500 text-sm mb-1">Appointment Date</p>
          <p className="font-medium text-gray-800">
            {new Date(date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>
        
        <div>
          <p className="text-gray-500 text-sm mb-1">Time Slot</p>
          <p className="font-medium text-gray-800">{time}</p>
        </div>
        
        <div>
          <p className="text-gray-500 text-sm mb-1">Estimated Duration</p>
          <p className="font-medium text-gray-800">{duration}</p>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back to Time Selection
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ConfirmAppointment;