// src/components/navigation/AdminNavLinks.jsx
import { NavLink } from 'react-router-dom';

export const AdminNavLinks = () => {
  return (
    <ul className="flex space-x-4 text-sm font-medium text-gray-700">
      <li>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          Bookings
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/requests"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/manage-slots"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          Manage Slots
        </NavLink>
      </li>
      
    </ul>
  );
};
