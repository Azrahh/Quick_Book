import React, { useState, useEffect } from 'react';

const MyAppointments = () => {
  // Sample data - in a real app, you would fetch this from an API
  const allAppointments = [
    { id: 1, service: "Dental Checkup", date: "Apr 24, 2025", time: "10:30 AM", status: "Pending" },
    { id: 2, service: "Eye Exam", date: "Apr 26, 2025", time: "2:00 PM", status: "Confirmed" },
    { id: 3, service: "Physical Therapy", date: "Apr 28, 2025", time: "11:15 AM", status: "Cancelled" },
    { id: 4, service: "Dental Cleaning", date: "May 01, 2025", time: "9:00 AM", status: "Pending" },
    { id: 5, service: "Annual Checkup", date: "May 03, 2025", time: "3:30 PM", status: "Confirmed" },
    { id: 6, service: "Vaccination", date: "May 05, 2025", time: "1:45 PM", status: "Pending" },
    { id: 7, service: "X-Ray", date: "May 08, 2025", time: "10:00 AM", status: "Confirmed" },
    { id: 8, service: "Blood Test", date: "May 10, 2025", time: "8:30 AM", status: "Pending" },
    { id: 9, service: "Ultrasound", date: "May 12, 2025", time: "2:15 PM", status: "Confirmed" },
    { id: 10, service: "MRI Scan", date: "May 15, 2025", time: "4:00 PM", status: "Pending" },
  ];

  // State management
  const [appointments, setAppointments] = useState(allAppointments);
  const [filteredAppointments, setFilteredAppointments] = useState(allAppointments);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // Filter appointments based on filters and search
  useEffect(() => {
    let results = appointments;
    
    // Apply status filter
    if (statusFilter !== "All Status") {
      results = results.filter(appt => appt.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter) {
      results = results.filter(appt => appt.date === new Date(dateFilter).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }));
    }
    
    // Apply search term
    if (searchTerm) {
      results = results.filter(appt => 
        appt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.time.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredAppointments(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [statusFilter, dateFilter, searchTerm, appointments]);

  // Cancel appointment function
  const cancelAppointment = (id) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt.id === id ? { ...appt, status: "Cancelled" } : appt
      )
    );
  };

  // Get current appointments for pagination
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="">
      
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800">My Appointments</h1>
          <p className="text-gray-600">Manage and view all your past and upcoming bookings</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select 
            className="border border-gray-300 rounded-md px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          
          <input 
            type="date" 
            className="border border-gray-300 rounded-md px-3 py-2"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          
          <div className="relative">
            <input 
              type="text" 
              className="border border-gray-300 rounded-md px-3 py-2 w-full pl-10"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                        {appointment.status !== "Cancelled" && (
                          <button 
                            onClick={() => cancelAppointment(appointment.id)}
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

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstAppointment + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastAppointment, filteredAppointments.length)}
                </span> of{' '}
                <span className="font-medium">{filteredAppointments.length}</span> results
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Previous
                </button>
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
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
    </div>
  );
};

export default MyAppointments;