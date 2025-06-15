import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="mb-8">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-800">QuickBook</h1>
      <div className="flex items-center space-x-4">
        <button className="p-1 relative">
          <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    </div>
    
    <nav className="flex space-x-6 border-b pb-4 mt-6">
      <NavLink 
        to="/dashboard" 
        className={({isActive}) => `font-medium ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-blue-600'}`}
      >
        Dashboard
      </NavLink>
      <NavLink 
        to="/book-appointment" 
        className={({isActive}) => `font-medium ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-blue-600'}`}
      >
        Book Appointment
      </NavLink>
      <NavLink 
        to="/appointments" 
        className={({isActive}) => `font-medium ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-blue-600'}`}
      >
        My Appointments
      </NavLink>
    </nav>
  </header>
);

export default Header;