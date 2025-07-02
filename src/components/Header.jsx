import { NavLink } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';
import { AdminNavLinks } from './navigation/AdminNavLinks';
import { UserNavLinks } from './navigation/UserNavLinks';
import { ProfileDropdown } from './navigation/ProfileDropdown';

const Header = () => {
  const user = useAuthStore((state) => state.user);

  // If user is not logged in, show basic header
  if (!user) {
    return (
      <header className="mb-8 flex justify-between items-center py-4 px-6 bg-white shadow-md">
        <nav className="flex space-x-6 pb-4 mt-4">
          <h1 className="text-2xl font-bold text-blue-800">QuickBook</h1>
        </nav>
      </header>
    );
  }

  // Role-based navigation
  return (
    <header className="mb-8 flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold text-blue-800">QuickBook</h1>
        
        <nav className="flex space-x-6">
          {user.role === 'admin' ? <AdminNavLinks /> : <UserNavLinks />}
        </nav>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="p-1 relative">
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;