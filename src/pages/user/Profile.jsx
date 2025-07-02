import React, { useState, useRef } from 'react';

const ProfileUpdate = () => {
  // Initial dummy data
  const initialUserData = {
    fullName: 'Lucian Obrien',
    phoneNumber: '(416) 555-0198',
    stateRegion: 'Virginia',
    address: '908 Jack Locks',
    company: 'Gleichner, Mueller and Tromp',
    country: 'Canada',
    city: 'Rancho Cordova',
    zipCode: '85807',
    role: 'CTO',
    profileImage: null
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Country dropdown options
  const countries = [
    'Canada', 'United States', 'Mexico', 'United Kingdom', 
    'Germany', 'France', 'Japan', 'Australia'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 3 * 1024 * 1024) { // 3MB limit
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({ ...prev, profileImage: event.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image (JPEG, JPG, PNG, GIF) under 3MB');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleCancel = () => {
    setUserData(initialUserData);
    setIsEditing(false);
  };

  return (
    <>      <div className="">
      <div className="max-w-4xl mx-auto p-6">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Title Section */}
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Profile Settings</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            ) : null}
          </div>

          {/* Profile Picture Section */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {userData.profileImage ? (
                    <img 
                      src={userData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept=".jpeg,.jpg,.png,.gif"
                  className="hidden"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">
                  Allowed: <span className="font-medium">.jpeg</span>, <span className="font-medium">.jpg</span>,{' '}
                  <span className="font-medium">.png</span>, <span className="font-medium">.gif</span> (max 3MB)
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{userData.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Phone number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{userData.phoneNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">State/region</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="stateRegion"
                    value={userData.stateRegion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{userData.stateRegion}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{userData.address}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Company</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={userData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{userData.company}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="px-6 py-4">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Country</label>
                {isEditing ? (
                  <select
                    name="country"
                    value={userData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                ) : (
                  <p>{userData.country}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p>{userData.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Zip/code</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="zipCode"
                    value={userData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p>{userData.zipCode}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="role"
                    value={userData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p>{userData.role}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2 rounded-md text-white font-medium transition-all ${
                  isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } ${saveSuccess ? 'animate-pulse bg-green-600' : ''}`}
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : saveSuccess ? (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved!
                  </span>
                ) : (
                  'Save changes'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </>);
};

export default ProfileUpdate;