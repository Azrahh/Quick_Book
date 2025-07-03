import React, { useMemo } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import useBookingsStore from '../../store/bookingStore';

const Bookings = () => {
  const {
    filters,
    currentPage,
    itemsPerPage,
    setFilter,
    setPage,
    deleteBooking,
    getFilteredBookings
  } = useBookingsStore();

  const filteredBookings = useMemo(() => getFilteredBookings(), [
    getFilteredBookings,
    filters.search,
    filters.service,
    filters.status,
    filters.date
  ]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = useMemo(() => (
    filteredBookings.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  ), [filteredBookings, currentPage, itemsPerPage]);

  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Bookings Report', 14, 22);

    const tableColumn = ['User', 'Email', 'Service', 'Date', 'Time', 'Status'];
    const tableRows = [];

    filteredBookings.forEach((booking) => {
      const row = [
        booking.userName,
        booking.email,
        booking.service,
        booking.date,
        booking.time,
        booking.status,
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] }, // Tailwind's blue-600
    });

    doc.save('bookings-report.pdf');
  };

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white rounded-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All Bookings</h2>
        <p className="text-gray-600 text-sm mt-1">View and manage all appointment bookings</p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-3 flex-1">
          <input
            type="text"
            placeholder="Search bookings..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <select
            value={filters.service}
            onChange={(e) => setFilter('service', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          >
            <option>All Services</option>
            <option>Consultation</option>
            <option>Treatment</option>
            <option>Check-up</option>
            <option>Therapy</option>
            <option>Screening</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilter('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          >
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilter('date', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {/* Bookings Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
        <div className="grid grid-cols-12 bg-gray-100 p-3 border-b border-gray-200">
          <div className="col-span-3 font-semibold text-gray-700 text-sm">USER</div>
          <div className="col-span-2 font-semibold text-gray-700 text-sm">SERVICE</div>
          <div className="col-span-2 font-semibold text-gray-700 text-sm">DATE</div>
          <div className="col-span-2 font-semibold text-gray-700 text-sm">TIME</div>
          <div className="col-span-2 font-semibold text-gray-700 text-sm">STATUS</div>
          <div className="col-span-1 font-semibold text-gray-700 text-sm">ACTIONS</div>
        </div>

        {paginatedBookings.length > 0 ? (
          paginatedBookings.map(booking => (
            <div key={booking.id} className="grid grid-cols-12 p-3 border-b border-gray-200 last:border-b-0 items-center">
              <div className="col-span-3">
                <div className="font-medium text-gray-800">{booking.userName}</div>
                <div className="text-gray-500 text-xs">{booking.email}</div>
              </div>
              <div className="col-span-2 text-gray-700">
                <div>{booking.service}</div>
                <div className="text-gray-500 text-xs">{booking.duration}</div>
              </div>
              <div className="col-span-2 text-gray-700">{booking.date}</div>
              <div className="col-span-2 text-gray-700">{booking.time}</div>
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  booking.status === 'Confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              <div className="col-span-1 flex gap-2">
                <button
                  onClick={() => console.log('View details for', booking.id)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                  title="View Details"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteBooking(booking.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                  title="Delete"
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
            No bookings found matching your filters
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-gray-600 text-sm">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} results
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = currentPage <= 3
              ? i + 1
              : currentPage >= totalPages - 2
                ? totalPages - 4 + i
                : currentPage - 2 + i;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 border rounded text-sm ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
