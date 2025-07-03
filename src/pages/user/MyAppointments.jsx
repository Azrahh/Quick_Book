import React, { useState, useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';
import useBookingsStore  from '../../store/bookingStore';

const MyAppointments = () => {
  const { user } = useAuthStore();
  const {
    bookings,
    cancelBooking,
    filters,
    setFilter,
    currentPage,
    setPage,
    itemsPerPage,
  } = useBookingsStore();

  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    if (!user) return;

    let userAppointments = bookings.filter(appt => appt.email === user.email);

    if (filters.status !== 'All Status') {
      userAppointments = userAppointments.filter(appt => appt.status === filters.status);
    }

    if (filters.date) {
      const formatted = new Date(filters.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      userAppointments = userAppointments.filter(appt => appt.date === formatted);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      userAppointments = userAppointments.filter(appt =>
        appt.service.toLowerCase().includes(search) ||
        appt.date.toLowerCase().includes(search) ||
        appt.time.toLowerCase().includes(search)
      );
    }

    setFilteredAppointments(userAppointments);
  }, [bookings, filters, user]);

  const isFutureDate = (dateString) => {
    const today = new Date();
    const apptDate = new Date(dateString);
    return apptDate >= new Date(today.toDateString());
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">My Appointments</h1>
        <p className="text-gray-600">Manage and view all your past and upcoming bookings</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="border border-gray-300 rounded-md px-3 py-2"
          value={filters.status}
          onChange={(e) => setFilter('status', e.target.value)}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
        </select>

        <input
          type="date"
          className="border border-gray-300 rounded-md px-3 py-2"
          value={filters.date}
          onChange={(e) => setFilter('date', e.target.value)}
        />

        <div className="relative">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full pl-10"
            placeholder="Search appointments..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
          <svg
            className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAppointments.length > 0 ? (
                currentAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        appointment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.status !== "Cancelled" && isFutureDate(appointment.date) && (
                        <button
                          onClick={() => cancelBooking(appointment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirst + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLast, filteredAppointments.length)}</span> of{' '}
              <span className="font-medium">{filteredAppointments.length}</span> results
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
