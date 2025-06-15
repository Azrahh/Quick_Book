import { useState } from 'react';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Generate days for the current month view
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
  const renderCalendarDays = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    
    // Previous month's days (empty cells)
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`prev-${i}`} className="h-10"></div>);
    }
    
    // Current month's days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isAvailable = true; // Replace with your availability logic
      
      days.push(
        <div
          key={`day-${i}`}
          className={`h-10 flex items-center justify-center rounded-full cursor-pointer ${
            isSelected 
              ? 'bg-blue-600 text-white' 
              : isAvailable 
                ? 'hover:bg-blue-50' 
                : 'text-gray-300 cursor-not-allowed'
          }`}
          onClick={() => isAvailable && onDateChange(date)}
        >
          {i}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Date</h3>
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-1 text-gray-500 hover:text-blue-600"
          >
            &lt;
          </button>
          <span className="font-medium">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-1 text-gray-500 hover:text-blue-600"
          >
            &gt;
          </button>
        </div>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs text-gray-500 font-medium">{day}</div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {renderCalendarDays()}
      </div>
      
      {/* Availability legend */}
      <div className="flex justify-center space-x-4 mt-6 text-sm">
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
  );
};

export default DatePicker;