import React, { useState, useMemo } from 'react';
import useBookingsStore from '../../store/bookingStore';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const bookings = useBookingsStore((state) => state.bookings);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    totalBookings,
    approvedAppointments,
    pendingRequests,
    cancelled,
    appointmentsToday,
    totalSlots,
    calendarDays,
  } = useMemo(() => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    let approved = 0, pending = 0, cancelled = 0, todayCount = 0;

    bookings.forEach((b) => {
      const bookingDateStr = format(new Date(b.date), 'yyyy-MM-dd');
      const isToday = bookingDateStr === todayStr;

      if (b.status === 'Confirmed') approved++;
      else if (b.status === 'Pending') pending++;
      else if (b.status === 'Cancelled') cancelled++;

      if (isToday && b.status !== 'Cancelled') todayCount++;
    });

    const generateCalendarDays = () => {
      const days = [];
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevMonthDays = new Date(year, month, 0).getDate();

      // previous month filler
      for (let i = firstDay; i > 0; i--) {
        days.push({ day: prevMonthDays - i + 1, isCurrentMonth: false });
      }

      // current month days
      for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = format(new Date(year, month, i), 'yyyy-MM-dd');
        const hasAppointment = bookings.some(
          (b) => format(new Date(b.date), 'yyyy-MM-dd') === dateStr && b.status !== 'Cancelled'
        );

        days.push({
          day: i,
          dateStr,
          isCurrentMonth: true,
          isToday: i === now.getDate(),
          hasAppointment,
        });
      }

      // next month filler
      const remaining = 7 - (days.length % 7);
      if (remaining < 7) {
        for (let i = 1; i <= remaining; i++) {
          days.push({ day: i, isCurrentMonth: false });
        }
      }

      return days;
    };

    return {
      totalBookings: bookings.length,
      approvedAppointments: approved,
      pendingRequests: pending,
      cancelled,
      appointmentsToday: todayCount,
      totalSlots: 20,
      calendarDays: generateCalendarDays(),
    };
  }, [bookings]);

  const openModal = (dateStr) => {
    setSelectedDay(dateStr);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setShowModal(false);
  };

  const dailyBookings = useMemo(() => {
    if (!selectedDay) return [];
    return bookings.filter(
      (b) =>
        format(new Date(b.date), 'yyyy-MM-dd') === selectedDay &&
        b.status !== 'Cancelled'
    );
  }, [selectedDay, bookings]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back, Dr. Ahmad <span className="text-xl">🌤</span>
          </h2>
          <p className="text-gray-600">Here's what's happening with appointments today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Bookings" value={totalBookings} color="blue" />
          <StatCard title="Approved Appointments" value={approvedAppointments} color="green" />
          <StatCard title="Pending Requests" value={pendingRequests} color="yellow" />
          <StatCard title="Cancelled" value={cancelled} color="red" />
        </div>

        {/* Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Calendar</h3>

          <div className="grid grid-cols-7 gap-2 mb-4 text-center font-medium text-gray-500 text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => (
              <button
                key={idx}
                disabled={!day.isCurrentMonth}
                onClick={() => openModal(day.dateStr)}
                className={`h-12 rounded-md flex flex-col items-center justify-center text-sm transition focus:outline-none
                  ${day.isCurrentMonth ? 'text-gray-800' : 'text-gray-300'}
                  ${day.isToday ? 'border-2 border-blue-500' : ''}
                  ${day.hasAppointment ? 'bg-blue-100 font-semibold' : ''}`}
              >
                {day.day}
                {day.hasAppointment && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1"></span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              {format(new Date(), 'MMMM yyyy')}
            </p>
            <p className="font-medium">
              <span className="text-blue-600">{appointmentsToday}</span> / {totalSlots}
            </p>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            <h4 className="text-lg font-semibold mb-4">
              Appointments for {format(new Date(selectedDay), 'MMMM d, yyyy')}
            </h4>
            {dailyBookings.length ? (
              <ul className="space-y-3 max-h-72 overflow-y-auto">
                {dailyBookings.map((b) => (
                  <li
                    key={b.id}
                    className="border p-3 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{b.userName}</p>
                      <p className="text-gray-500 text-xs">{b.email}</p>
                    </div>
                    <div className="text-right text-sm text-gray-700">
                      <p>{b.service} ({b.duration})</p>
                      <p>{b.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No appointments on this day.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-${color}-500`}>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold my-2">{value}</p>
    <p className={`text-${color}-500 text-sm font-medium`}>Live from system</p>
  </div>
);

export default AdminDashboard;
