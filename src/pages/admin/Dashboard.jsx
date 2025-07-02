import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
  const [currentDate] = useState(new Date());

  // Mock data - replace with API calls in production
  const dashboardData = {
    totalBookings: 128,
    bookingsChange: '+12%',
    approvedAppointments: 92,
    approvedChange: '+8%',
    pendingRequests: 28,
    cancelled: 8,
    cancelledChange: '-2%',
    appointmentsToday: 9,
    totalSlots: 15
  };

  function generateCalendarDays() {
    const days = [];
    const date = new Date();
    date.setDate(1);

    const firstDayIndex = date.getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    for (let i = firstDayIndex; i > 0; i--) {
      days.push({ day: prevLastDay - i + 1, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        hasAppointment: i <= dashboardData.appointmentsToday
      });
    }

    const nextDays = 7 - (days.length % 7);
    if (nextDays < 7) {
      for (let i = 1; i <= nextDays; i++) {
        days.push({ day: i, isCurrentMonth: false });
      }
    }

    return days;
  }

  const [calendarDays] = useState(generateCalendarDays());

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back, Dr. Ahmad <span className="text-xl">🌤</span>
          </h2>
          <p className="text-gray-600">Here's what's happening with appointments today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-medium">Total Bookings Today</h3>
            <p className="text-3xl font-bold my-2">{dashboardData.totalBookings}</p>
            <p className="text-green-500 text-sm font-medium">↑ {dashboardData.bookingsChange} since yesterday</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">Approved Appointments</h3>
            <p className="text-3xl font-bold my-2">{dashboardData.approvedAppointments}</p>
            <p className="text-green-500 text-sm font-medium">↑ {dashboardData.approvedChange} since yesterday</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-medium">Pending Requests</h3>
            <p className="text-3xl font-bold my-2">{dashboardData.pendingRequests}</p>
            <p className="text-yellow-500 text-sm font-medium">● Needs attention</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm font-medium">Cancelled</h3>
            <p className="text-3xl font-bold my-2">{dashboardData.cancelled}</p>
            <p className="text-red-500 text-sm font-medium">↓ {dashboardData.cancelledChange} since yesterday</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Calendar</h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500 text-sm">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((dayObj, index) => (
              <div
                key={index}
                className={`h-12 rounded-md flex flex-col items-center justify-center text-sm ${dayObj.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'} ${dayObj.hasAppointment ? 'bg-blue-50 font-medium' : ''}`}
              >
                {dayObj.day}
                {dayObj.hasAppointment && <span className="w-1 h-1 rounded-full bg-blue-500 mt-1"></span>}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-gray-600 text-sm">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
            <p className="font-medium">
              <span className="text-blue-600">{dashboardData.appointmentsToday}</span> / {dashboardData.totalSlots}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
