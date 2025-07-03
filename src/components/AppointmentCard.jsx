import { useState } from "react";
import  useBookingsStore  from "../store/bookingStore";

const AppointmentCard = ({ appointment }) => {
  const [rescheduling, setRescheduling] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const updateBooking = useBookingsStore((state) => state.updateBooking);

  const handleConfirm = () => {
    if (!newDate || !newTime) return;

    updateBooking(appointment.id, {
      date: new Date(newDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: newTime,
      status: "Pending",
    });

    setRescheduling(false);
    setNewDate("");
    setNewTime("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h3 className="text-lg font-semibold mb-4">Next Appointment</h3>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="space-y-1">
          <p className="font-medium">{appointment.service}</p>
          <p className="text-gray-600">📧 {appointment.email}</p>
          <p className="text-gray-600">📅 {appointment.date} at {appointment.time}</p>
          <p className="text-gray-600">⏱ {appointment.duration}</p>
        </div>

        {!rescheduling ? (
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              onClick={() => setRescheduling(true)}
            >
              Reschedule
            </button>
            <button
              className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
              onClick={() => alert("Cancel feature available in My Appointments")}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="border px-3 py-2 rounded-md"
            />
            <button
              onClick={handleConfirm}
              disabled={!newDate || !newTime}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              Confirm
            </button>
            <button
              onClick={() => setRescheduling(false)}
              className="text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
