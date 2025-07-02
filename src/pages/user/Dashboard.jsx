import StatsCard from '../../components/StatsCard';
import AppointmentCard from '../../components/AppointmentCard';
import QuickAction from '../../components/QuickAction';

const App = () => (
  <div className="bg-gray-50 min-h-screen p-6">
    
    <section className="mb-8 ">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome back, John!</h2>
      <p className="text-gray-600">Here's what's happening with your appointments</p>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatsCard title="Upcoming" value="3" />
      <StatsCard title="Completed" value="12" />
      <StatsCard title="Cancelled" value="1" />
    </div>

    <AppointmentCard />

    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <QuickAction icon="+" title="Book New" description="Schedule a new appointment" />
      <QuickAction icon="📋" title="History" description="View past appointments" />
      <QuickAction icon="⚙️" title="Settings" description="Manage preferences" />
    </div>

  </div>
);

export default App;