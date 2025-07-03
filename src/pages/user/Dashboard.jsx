import { useMemo } from 'react';
import  useBookingsStore  from '../../store/bookingStore';
import useAuthStore from '../../store/useAuthStore';
import StatsCard from '../../components/StatsCard';
import AppointmentCard from '../../components/AppointmentCard';
import QuickAction from '../../components/QuickAction';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuthStore();
  const bookings = useBookingsStore((state) => state.bookings);
  const navigate = useNavigate();

  // Filter bookings by user
  const userBookings = useMemo(
    () => bookings.filter((b) => b.email === user?.email),
    [bookings, user?.email]
  );

  // Count categories
  const now = new Date();
  const { upcoming, completed, cancelled, nextAppointment } = useMemo(() => {
    let upcoming = 0;
    let completed = 0;
    let cancelled = 0;
    let next = null;

    const futureAppointments = [];

    userBookings.forEach((b) => {
      const apptDate = new Date(`${b.date} ${b.time}`);
      if (b.status === 'Cancelled') {
        cancelled++;
      } else if (apptDate >= now) {
        upcoming++;
        futureAppointments.push({ ...b, dateTime: apptDate });
      } else {
        completed++;
      }
    });

    // Sort and pick next one
    futureAppointments.sort((a, b) => a.dateTime - b.dateTime);
    next = futureAppointments[0] || null;

    return { upcoming, completed, cancelled, nextAppointment: next };
  }, [userBookings]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || 'User'}!</h2>
        <p className="text-gray-600 mt-1">Here's what's happening with your appointments</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-amber-200">
        <StatsCard title="Upcoming" value={upcoming} />
        <StatsCard title="Completed" value={completed} />
        <StatsCard title="Cancelled" value={cancelled} />
      </div>

      {nextAppointment ? (
        <AppointmentCard appointment={nextAppointment} />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 text-center text-gray-600">
          No upcoming appointment scheduled.
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickAction
          icon="🗓️"
          title="Book New"
          description="Schedule a new appointment"
          onClick={() => navigate('/book-appointment')}
        />
        <QuickAction
          icon="📋"
          title="My Appointments"
          description="Manage your past and upcoming bookings"
          onClick={() => navigate('/my-appointments')}
        />
        <QuickAction
          icon="⚙️"
          title="Settings"
          description="Update your preferences"
          onClick={() => navigate('/settings')}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
