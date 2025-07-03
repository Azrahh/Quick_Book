import React from 'react';
import { format } from 'date-fns';
import useBookingsStore from '../../store/bookingStore';

const AppointmentRequests = () => {
  const bookings = useBookingsStore((state) => state.bookings);
  const confirmBooking = useBookingsStore((state) => state.confirmBooking);
  const cancelBooking = useBookingsStore((state) => state.cancelBooking);

  const pendingRequests = bookings.filter((b) => b.status === 'Pending');

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Appointment Requests</h2>
        <p className="text-gray-600 text-sm mt-1">Review and manage pending appointment requests.</p>
      </div>

      {pendingRequests.length > 0 ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex bg-gray-100 p-3 border-b border-gray-200">
            <div className="flex-1 font-semibold text-gray-700 text-sm">PATIENT</div>
            <div className="flex-1 font-semibold text-gray-700 text-sm">SERVICE</div>
            <div className="flex-1 font-semibold text-gray-700 text-sm">DATE & TIME</div>
            <div className="flex-1 font-semibold text-gray-700 text-sm">STATUS</div>
            <div className="flex-1 font-semibold text-gray-700 text-sm">ACTIONS</div>
          </div>

          {pendingRequests.map((req) => (
            <div key={req.id} className="flex p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-gray-800">{req.userName}</div>
                <div className="text-gray-500 text-xs">{req.email}</div>
              </div>

              <div className="flex-1 text-gray-700">{req.service}</div>

              <div className="flex-1">
                <div>{format(new Date(req.date), 'MMM dd, yyyy')}</div>
                <div className="text-gray-500">{req.time}</div>
              </div>

              <div className="flex-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>

              <div className="flex-1 flex gap-4">
                <button
                  onClick={() => confirmBooking(req.id)}
                  className=" px-4 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => cancelBooking(req.id)}
                  className=" px-6 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 text-sm">No pending requests at the moment.</div>
      )}
    </div>
  );
};

export default AppointmentRequests;
