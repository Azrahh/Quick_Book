import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import  useSlotStore  from '../../store/slotStore';

const ManageSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('available');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredSlots, setFilteredSlots] = useState([]);

  const [slotForm, setSlotForm] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '09:30',
    service: 'Consultation',
    maxBookings: 5,
  });

  const slots = useSlotStore(state => state.slots);
  const addSlot = useSlotStore(state => state.addSlot);
  const deleteSlot = useSlotStore(state => state.deleteSlot);
  const getFilteredSlots = useSlotStore(state => state.getFilteredSlots);

  useEffect(() => {
    const filtered = getFilteredSlots(selectedDate, activeTab);
    setFilteredSlots(filtered);
  }, [selectedDate, activeTab, slots]);

  const handleCreateSlot = () => {
    addSlot({
      ...slotForm,
      id: Date.now(),
      bookings: 0,
    });
    setIsModalOpen(false);
    setSlotForm({
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '09:30',
      service: 'Consultation',
      maxBookings: 5,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Time Slots</h2>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            + Create Slot
          </button>

          <div className="flex border rounded-md overflow-hidden">
            {['available', 'full', 'all'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-sm capitalize ${
                  activeTab === tab
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-white text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
          ←
        </button>
        <span className="font-medium">
          {format(selectedDate, 'MMMM d, yyyy')}
        </span>
        <button onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
          →
        </button>
      </div>

      {filteredSlots.length > 0 ? (
        <div className="divide-y">
          {filteredSlots.map(slot => (
            <div
              key={slot.id}
              className="flex justify-between items-center py-3"
            >
              <div>
                <div className="font-medium text-gray-800">
                  {slot.startTime} - {slot.endTime}
                </div>
                <div className="text-sm text-gray-500">{slot.service}</div>
              </div>
              <div className="text-sm text-gray-600">
                {slot.bookings}/{slot.maxBookings} booked
              </div>
              <button
                onClick={() => deleteSlot(slot.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-6">
          No slots found for this date.
        </p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create New Slot</h3>
              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className="space-y-4">
              <input
                type="date"
                value={slotForm.date}
                onChange={e =>
                  setSlotForm({ ...slotForm, date: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  value={slotForm.startTime}
                  onChange={e =>
                    setSlotForm({ ...slotForm, startTime: e.target.value })
                  }
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="time"
                  value={slotForm.endTime}
                  onChange={e =>
                    setSlotForm({ ...slotForm, endTime: e.target.value })
                  }
                  className="border px-3 py-2 rounded"
                />
              </div>
              <select
                value={slotForm.service}
                onChange={e =>
                  setSlotForm({ ...slotForm, service: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Consultation">Consultation</option>
                <option value="Check-up">Check-up</option>
                <option value="Treatment">Treatment</option>
                <option value="Therapy">Therapy</option>
              </select>
              <input
                type="number"
                min="1"
                value={slotForm.maxBookings}
                onChange={e =>
                  setSlotForm({
                    ...slotForm,
                    maxBookings: parseInt(e.target.value) || 1
                  })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSlot}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSlots;
