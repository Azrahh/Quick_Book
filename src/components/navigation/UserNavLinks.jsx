// src/components/navigation/UserNavLinks.jsx
import { NavLink } from 'react-router-dom';

export const UserNavLinks = () => {
  return (
    <ul className="flex space-x-4 text-sm font-medium text-gray-700">
      <li>
        <NavLink
          to="/user/dashboard"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/user/book-appointment"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          Book Appointment
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/user/appointments"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          My Appointments
        </NavLink>
      </li>
    </ul>
  );
};
