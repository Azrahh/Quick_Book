import React, { useState } from 'react';
import { format, addDays } from 'date-fns';

const ManageSlots = () => {
  // State for slots data
  const [slots, setSlots] = useState([
    { id: 1, date: '2025-04-25', startTime: '09:00', endTime: '09:30', service: 'Consultation', maxBookings: 5, bookings: 3 },
    { id: 2, date: '2025-04-25', startTime: '10:00', endTime: '10:30', service: 'Treatment', maxBookings: 3, bookings: 0 },
    { id: 3, date: '2025-04-26', startTime: '11:00', endTime: '11:45', service: 'Check-up', maxBookings: 4, bookings: 2 },
  ]);

  // State for new slot form
  const [newSlot, setNewSlot] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '09:30',
    service: 'Consultation',
    maxBookings: 5
  });

  // State for UI controls
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('available');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler functions
  const handleCreateSlot = () => {
    setSlots([...slots, { ...newSlot, id: slots.length + 1, bookings: 0 }]);
    setIsModalOpen(false);
    setNewSlot({
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '09:30',
      service: 'Consultation',
      maxBookings: 5
    });
  };

  const handleDeleteSlot = (id) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  // Filter slots based on selected date and tab
  const filteredSlots = slots.filter(slot => {
    const matchesDate = format(selectedDate, 'yyyy-MM-dd') === slot.date;
    if (activeTab === 'available') {
      return matchesDate && slot.bookings < slot.maxBookings;
    } else if (activeTab === 'full') {
      return matchesDate && slot.bookings >= slot.maxBookings;
    }
    return matchesDate;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Time Slots</h2>
        <p className="text-gray-600 text-sm mt-1">Create and manage available appointment slots</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Slot
          </button>
          
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 text-sm ${activeTab === 'available' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              Available
            </button>
            <button
              onClick={() => setActiveTab('full')}
              className={`px-4 py-2 text-sm ${activeTab === 'full' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              Fully Booked
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm ${activeTab === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              All Slots
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedDate(addDays(selectedDate, -1))}
            className="p-2 text-gray-600 hover:text-indigo-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-gray-700 font-medium">
            {format(selectedDate, 'MMMM d, yyyy')}
          </div>
          
          <button 
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
            className="p-2 text-gray-600 hover:text-indigo-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slots Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 p-3 border-b border-gray-200">
          <div className="col-span-2 font-semibold text-gray-700 text-sm">TIME</div>
          <div className="col-span-3 font-semibold text-gray-700 text-sm">SERVICE</div>
          <div className="col-span-2 font-semibold text-gray-700 text-sm">AVAILABILITY</div>
          <div className="col-span-3 font-semibold text-gray-700 text-sm">BOOKINGS</div>
          <div className="col-span-2 font-semibold text-gray-700 text-sm">ACTIONS</div>
        </div>

        {filteredSlots.length > 0 ? (
          filteredSlots.map(slot => (
            <div key={slot.id} className="grid grid-cols-12 p-3 border-b border-gray-200 last:border-b-0 items-center">
              <div className="col-span-2 font-medium text-gray-800">
                {slot.startTime} - {slot.endTime}
              </div>
              
              <div className="col-span-3 text-gray-700">
                {slot.service}
              </div>
              
              <div className="col-span-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${(slot.bookings / slot.maxBookings) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {slot.maxBookings - slot.bookings} of {slot.maxBookings} available
                </div>
              </div>
              
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  {Array.from({ length: slot.maxBookings }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-3 h-3 rounded-full ${i < slot.bookings ? 'bg-indigo-600' : 'bg-gray-200'}`}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="col-span-2 flex gap-2">
                <button 
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                  title="Delete Slot"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No slots found for this date. Create a new slot to get started.
          </div>
        )}
      </div>

      {/* Create Slot Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Create New Time Slot</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select
                  value={newSlot.service}
                  onChange={(e) => setNewSlot({...newSlot, service: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                >
                  <option>Consultation</option>
                  <option>Treatment</option>
                  <option>Check-up</option>
                  <option>Therapy</option>
                  <option>Screening</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Bookings</label>
                <input
                  type="number"
                  min="1"
                  value={newSlot.maxBookings}
                  onChange={(e) => setNewSlot({...newSlot, maxBookings: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSlot}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg"
              >
                Create Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSlots;