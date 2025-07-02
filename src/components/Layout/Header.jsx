// src/components/layout/Header.jsx
import useAuthStore  from '../../context/useAuthStore'; // Fixed import path
import { AdminNavLinks } from '../navigation/AdminNavLinks';
import { UserNavLinks } from '../navigation/UserNavLinks';
import { ProfileDropdown } from '../navigation/ProfileDropdown'; // Added missing import

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">QuickBook</div>
        <nav className="flex items-center gap-6">
          {user?.role === 'admin' ? <AdminNavLinks /> : <UserNavLinks />}
          {user && (
            <div className="flex items-center gap-4">
              <ProfileDropdown />
             
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};