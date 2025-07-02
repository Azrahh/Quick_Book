import React, { useState } from 'react';
import { format } from 'date-fns';

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnston',
      email: 'Sarah@example.com',
      service: 'General Consultation',
      date: '2025-04-25',
      time: '10:00 AM',
      status: 'Pending'
    },
    {
      id: 2,
      patientName: 'Michael Smith',
      email: 'michael@example.com',
      service: 'Follow-up Visit',
      date: '2025-04-25',
      time: '11:30 AM',
      status: 'Pending'
    }
  ]);

  const [filters, setFilters] = useState({
    date: '',
    service: 'All Services',
    status: 'Pending'
  });

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'Approved' } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'Rejected' } : req
      )
    );
  };

  const filteredRequests = requests.filter((req) => {
    const matchesDate = filters.date
      ? format(new Date(req.date), 'yyyy-MM-dd') === filters.date
      : true;
    const matchesService =
      filters.service === 'All Services' || req.service === filters.service;
    const matchesStatus =
      filters.status === 'All' || req.status === filters.status;
    return matchesDate && matchesService && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Appointment Requests</h2>
        <p className="text-gray-600 text-sm mt-1">Review and manage pending appointment requests.</p>
      </div>

      <div className="flex flex-wrap gap-5 mb-6">
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">Filter by Date</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">Service Type</label>
          <select
            value={filters.service}
            onChange={(e) => setFilters({ ...filters, service: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          >
            <option>All Services</option>
            <option>General Consultation</option>
            <option>Follow-up Visit</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex bg-gray-100 p-3 border-b border-gray-200">
          <div className="flex-1 font-semibold text-gray-700 text-sm">PATIENT</div>
          <div className="flex-1 font-semibold text-gray-700 text-sm">SERVICE</div>
          <div className="flex-1 font-semibold text-gray-700 text-sm">DATE & TIME</div>
          <div className="flex-1 font-semibold text-gray-700 text-sm">STATUS</div>
          <div className="flex-1 font-semibold text-gray-700 text-sm">ACTIONS</div>
        </div>

        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div key={request.id} className="flex p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-gray-800">{request.patientName}</div>
                <div className="text-gray-500 text-xs">{request.email}</div>
              </div>
              <div className="flex-1 text-gray-700">{request.service}</div>
              <div className="flex-1">
                <div>{format(new Date(request.date), 'MMM dd, yyyy')}</div>
                <div className="text-gray-500">{request.time}</div>
              </div>
              <div className="flex-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    request.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800'
                      : request.status === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {request.status}
                </span>
              </div>
              <div className="flex-1 flex gap-2">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                  disabled={request.status !== 'Pending'}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  disabled={request.status !== 'Pending'}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">No requests match the current filters.</div>
        )}
      </div>
    </div>
  );
};

export default AppointmentRequests;
