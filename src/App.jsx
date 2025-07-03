// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import useAuthStore from './store/useAuthStore';

// Public Pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import BookAppointment from './pages/user/BookAppointment';
import MyAppointments from './pages/user/MyAppointments';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminBookings from './pages/admin/Bookings';
import AdminRequests from './pages/admin/Requests';
import ManageSlots from './pages/admin/ManageSlots';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute roles={['user']} />}>
          <Route element={<Layout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/book-appointment" element={<BookAppointment />} />
            <Route path="/user/appointments" element={<MyAppointments />} />
          </Route>
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route element={<Layout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/bookings" element={<AdminBookings />} /> 
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/admin/manage-slots" element={<ManageSlots />} />
          </Route>
        </Route>

        {/* Fallback Routes */}
        <Route path="/unauthorized" element={<div className="text-center text-red-600 text-xl mt-10">Unauthorized Access</div>} />

        {/* Root Redirect based on Role */}
        <Route
          path="/"
          element={
            user ? (
              user.role === 'admin' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/user/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
