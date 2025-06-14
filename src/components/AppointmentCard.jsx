const AppointmentCard = () => (
  <div className= "bg-white p-6 rounded-lg shadow-sm mb-8">
    <h3 className="text-lg font-semibold mb-4">Next Appointment</h3>
    <div className="flex items-center justify-between space-x-4">
    <div className="space-y-2">
      <p className="font-medium">Dental Checkup</p>
      <p className="text-gray-600">Dr. Sarah Johnson</p>
      <p className="text-gray-600 flex items-center">
        <span className="mr-1">📍</span> 10:00 AM   April 25, 2025
      </p>
    </div>
    <div className="flex space-x-4 mt-6">
      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
        Reschedule
      </button>
      <button className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100">
        Cancel
      </button>
    </div>
    </div>
  </div>
);

export default AppointmentCard;