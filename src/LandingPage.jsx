// src/LandingPage.jsx
import React from 'react';
import { FaCalendarAlt, FaUserMd, FaBell, FaMobileAlt, FaLock, 
         FaClock, FaCheckCircle, FaUsers, FaCalendarCheck } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="font-sans bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <FaCalendarCheck className="text-indigo-600 text-3xl mr-2" />
          <span className="text-2xl font-bold text-indigo-700">QuickBook</span>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-indigo-600 hover:text-indigo-800 font-medium">Features</a>
          <a href="#how-it-works" className="text-indigo-600 hover:text-indigo-800 font-medium">How It Works</a>
          <a href="#industries" className="text-indigo-600 hover:text-indigo-800 font-medium">Industries</a>
          <a href="#contact" className="text-indigo-600 hover:text-indigo-800 font-medium">Contact</a>
        </div>
        
        <div className="flex space-x-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300">
            User Login
          </button>
          <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium transition duration-300">
            Admin Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              Smart Appointment Scheduling <br />
              <span className="text-indigo-600">For Your Business</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Streamline bookings, reduce no-shows, and delight your customers with our intelligent scheduling platform designed for service-based businesses.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition duration-300 shadow-lg hover:shadow-xl">
                Get Started Free
              </button>
              <button className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg font-medium text-lg transition duration-300">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md transform rotate-3">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-800">Appointment Calendar</h3>
                  <span className="text-sm text-indigo-600">Today</span>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center p-3 bg-indigo-50 rounded-lg">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                        <FaUserMd className="text-indigo-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dr. Smith Consultation</h4>
                        <p className="text-sm text-gray-600">10:00 AM - 10:30 AM</p>
                      </div>
                      <div className="ml-auto">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item === 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {item === 1 ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 w-64 transform -rotate-6">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FaBell className="text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-800">Reminders</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Appointment with Sarah confirmed for tomorrow at 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features for Your Business</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage appointments efficiently and provide an exceptional customer experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 hover:shadow-lg transition duration-300">
                <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How QuickBook Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple yet powerful workflow designed for both businesses and customers
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-2/5 mb-10 md:mb-0">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-indigo-700 mb-4">For Customers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3 mt-1">
                      <span className="text-indigo-700 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Find Service & Time</h4>
                      <p className="text-gray-600 text-sm">Browse available services and select a convenient time slot</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3 mt-1">
                      <span className="text-indigo-700 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Book Appointment</h4>
                      <p className="text-gray-600 text-sm">Complete booking with your contact information</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3 mt-1">
                      <span className="text-indigo-700 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Get Confirmation</h4>
                      <p className="text-gray-600 text-sm">Receive instant confirmation and reminders</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-2/5">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-indigo-700 mb-4">For Businesses</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3 mt-1">
                      <span className="text-indigo-700 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Set Availability</h4>
                      <p className="text-gray-600 text-sm">Define your schedule and service offerings</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3 mt-1">
                      <span className="text-indigo-700 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Manage Bookings</h4>
                      <p className="text-gray-600 text-sm">Approve, reject, or reschedule appointments</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3 mt-1">
                      <span className="text-indigo-700 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Automate Workflow</h4>
                      <p className="text-gray-600 text-sm">Send reminders, notifications, and follow-ups</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Perfect For Your Industry</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              QuickBook adapts to your specific business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 text-center hover:shadow-md transition duration-300">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{industry.name}</h3>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Booking Process?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using QuickBook to save time, reduce no-shows, and improve customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition duration-300">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-indigo-700 px-8 py-3 rounded-lg font-bold text-lg transition duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <FaCalendarCheck className="text-indigo-400 text-2xl mr-2" />
              <span className="text-xl font-bold">QuickBook</span>
            </div>
            <p className="text-gray-400 text-sm">
              Smart appointment scheduling solution for service-based businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a></li>
              <li><a href="#industries" className="text-gray-400 hover:text-white transition">Industries</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📧</span> contact@quickbook.com
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span> +1 (555) 123-4567
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏢</span> 123 Business Ave, Suite 100
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Get updates on new features and offers
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-700 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2023 QuickBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Feature data
const features = [
  {
    icon: <FaCalendarAlt className="text-indigo-600 text-2xl" />,
    title: "Role-Based Access",
    description: "Secure login for users and admins with different permission levels"
  },
  {
    icon: <FaClock className="text-indigo-600 text-2xl" />,
    title: "Smart Scheduling",
    description: "View available time slots and book appointments in seconds"
  },
  {
    icon: <FaCheckCircle className="text-indigo-600 text-2xl" />,
    title: "Booking Management",
    description: "Approve, reject, or cancel appointments with a single click"
  },
  {
    icon: <FaUsers className="text-indigo-600 text-2xl" />,
    title: "User Dashboard",
    description: "Customers can view upcoming and past appointments"
  },
  {
    icon: <FaBell className="text-indigo-600 text-2xl" />,
    title: "Email Notifications",
    description: "Automatic reminders and confirmations for all parties"
  },
  {
    icon: <FaMobileAlt className="text-indigo-600 text-2xl" />,
    title: "Mobile Responsive",
    description: "Works perfectly on any device - desktop, tablet, or mobile"
  }
];

// Industries data
const industries = [
  {
    icon: "🏥",
    name: "Clinics",
    description: "Patients book doctor consultations easily"
  },
  {
    icon: "💇",
    name: "Salons",
    description: "Customers book grooming services online"
  },
  {
    icon: "🎓",
    name: "Tutors",
    description: "Students schedule learning sessions"
  },
  {
    icon: "💪",
    name: "Fitness Coaches",
    description: "Clients book training sessions"
  }
];

export default LandingPage;