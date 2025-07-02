// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';

export const ProtectedRoute = ({ roles = ['user', 'admin'], redirectTo = '/login', children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to={redirectTo} replace />;
  if (!roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return children || <Outlet />;
};
