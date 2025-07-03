import React from 'react';

const TimeSlotPicker = ({
  selectedTime,
  onTimeSelect,
  onBack,
  onContinue,
  availableSlots = [],
  service,
  date,
  duration = 30 // default to 30 if not provided
}) => {
  const timeSlots = [
    {
      period: "Morning",
      slots: [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM"
      ]
    },
    {
      period: "Afternoon",
      slots: [
        "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM"
      ]
    }
  ];

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const isSlotAvailable = (startTime) => {
    const startMin = toMinutes(startTime);
    const endMin = startMin + duration;

    for (const slot of availableSlots) {
      const slotStart = toMinutes(slot.startTime);
      const slotEnd = slotStart + slot.duration;

      const overlaps = Math.max(startMin, slotStart) < Math.min(endMin, slotEnd);
      if (overlaps) return false;
    }

    return true;
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Select Time Slot</h3>
        <div className="flex justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-200 mr-2"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>

      {timeSlots.map(({ period, slots }) => (
        <div key={period} className="mb-8">
          <h4 className="font-medium text-gray-700 mb-4">{period}</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {slots.map(time => {
              const time24 = convertTo24Hour(time);
              const available = isSlotAvailable(time24);

              return (
                <button
                  key={time}
                  disabled={!available}
                  onClick={() => available && onTimeSelect(time)}
                  className={`py-3 px-4 rounded-md border text-center transition-all duration-150 ${
                    !available
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                      : selectedTime === time
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-10 pt-4 border-t">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!selectedTime}
          className={`px-6 py-2 rounded-md flex items-center ${
            !selectedTime
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default TimeSlotPicker;
