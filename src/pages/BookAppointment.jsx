import { useState } from 'react';
import Header from '../components/Header';
import Stepper from '../components/Stepper';
import ServiceCard from '../components/ServiceCard';
import DatePicker from '../components/DatePicker';
import TimeSlotPicker from '../components/TimeSlot';
import ConfirmAppointment from '../components/ConfirmAppointment';

const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const services = [
    {
      id: 1,
      title: "Dental Checkup",
      description: "Comprehensive oral examination and cleaning",
      duration: "30 minutes",
      price: "99"
    },
    {
      id: 2,
      title: "Teeth Whitening",
      description: "Professional teeth whitening treatment",
      duration: "60 minutes",
      price: "199"
    }
  ];

  const steps = ["Select Service", "Pick Date", "Choose Time", "Confirm"];

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    alert(`Appointment Booked!\n\n${selectedService.title}\n${selectedDate.toDateString()}\n${selectedTime}`);
    // Here you would typically send data to your backend
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                duration={service.duration}
                price={service.price}
                selected={selectedService?.id === service.id}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">Selected Service: <span className="font-medium text-gray-800">{selectedService.title}</span></p>
            </div>
            <DatePicker 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        );
      case 2:
        return (
          <TimeSlotPicker
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            onBack={handleBack}
            onContinue={handleContinue}
            service={selectedService.title}
            date={selectedDate}
          />
        );
      case 3:
        return (
          <ConfirmAppointment
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            duration={selectedService.duration}
            onBack={() => setCurrentStep(2)} // Go back to time selection
            onConfirm={handleConfirm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Header />
      
      <div className="max-w-3xl mx-auto">
        <Stepper steps={steps} currentStep={currentStep} />
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          {renderStepContent()}
        </div>

        {/* Only show these buttons when not on TimeSlot or Confirm steps */}
        {currentStep < 2 && (
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              onClick={handleContinue}
              disabled={
                (currentStep === 0 && !selectedService) ||
                (currentStep === 1 && !selectedDate)
              }
              className={`px-6 py-2 rounded-md ml-auto ${
                (currentStep === 0 && !selectedService) ||
                (currentStep === 1 && !selectedDate)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Continue
            </button>
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-gray-500">
          © 2025 QuickBook. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default BookAppointment;