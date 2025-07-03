// src/components/navigation/ProfileDropdown.jsx
import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

export const ProfileDropdown = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Auto-close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = [
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
    ...(user?.role === 'admin'
      ? [{ path: '/admin/settings', label: 'Admin Panel', icon: '🔒' }]
      : [])
  ];

  return (
    <div className={`relative ${mobile ? 'w-full' : ''}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center space-x-2 ${mobile ? 'w-full p-2' : 'p-1'} rounded-full hover:bg-gray-100`}
      >
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          {user?.avatar || <span>👤</span>}
        </div>
        {mobile && (
          <div className="text-left">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        )}
      </button>

      {isOpen && (
        <div className={`absolute ${mobile ? 'static mt-2 w-full' : 'right-0 mt-2 w-56'} bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200`}>
          {!mobile && (
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          )}

          <div className="py-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="py-1 border-t border-gray-100">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={logout}
            >
              <span className="mr-2">🚪</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
