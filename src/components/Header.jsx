const Header = () => (
  <header className="mb-8">
    <div className="flex justify-between items-center border-b pb-4">
      <h1 className="text-2xl font-bold text-blue-800">QuickBook</h1>
      
      <div className="flex items-center space-x-6">
        {/* Notification Bell Icon with Indicator */}
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" 
               className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke="currentColor">
            <path strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </div>

        {/* Profile Icon */}
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" 
               className="h-5 w-5 text-gray-600" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke="currentColor">
            <path strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    </div>

    {/* Navigation Links */}
    <nav className="flex space-x-6 mt-4">
      <a href="#" className="font-medium text-blue-600 border-b-2 border-blue-600 pb-2">Dashboard</a>
      <a href="#" className="font-medium text-gray-500 hover:text-blue-600">Book Appointment</a>
      <a href="#" className="font-medium text-gray-500 hover:text-blue-600">My Appointments</a>
        <a href="#" className="font-medium text-gray-500 hover:text-blue-600">Profile</a>
    </nav>
  </header>
);

export default Header;