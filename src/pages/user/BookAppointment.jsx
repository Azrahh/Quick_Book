import { useState } from 'react';
import Stepper from '../../components/Stepper';
import ServiceCard from '../../components/ServiceCard';
import DatePicker from '../../components/DatePicker';
import TimeSlotPicker from '../../components/TimeSlot';
import ConfirmAppointment from '../../components/ConfirmAppointment';
import useBookingsStore from '../../store/bookingStore';
import useAuthStore from '../../store/useAuthStore';
import { SERVICES } from '../../data/services'; // ✅ imported dynamic services

const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const addBooking = useBookingsStore(state => state.addBooking);
  const getAvailableSlots = useBookingsStore(state => state.getAvailableSlots);
  const user = useAuthStore(state => state.user);

  // Convert SERVICES to service objects
  const services = SERVICES.map((name, index) => ({
    id: index + 1,
    title: name,
    description: `Book an appointment for ${name}`,
    duration: "30",
    price: "100"
  }));

  const steps = ["Select Service", "Pick Date", "Choose Time", "Confirm"];

  const handleContinue = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleConfirm = () => {
    if (!user) return alert("User not authenticated.");

    const newBooking = {
      userName: user.name,
      email: user.email,
      service: selectedService.title,
      duration: parseInt(selectedService.duration),
      date: selectedDate,
      time: selectedTime
    };

    addBooking(newBooking);
    alert(`✅ Appointment Booked!\n\n${selectedService.title}\n${selectedDate.toDateString()}\n${selectedTime}`);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentStep(0);
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
                duration={service.duration + " minutes"}
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
              <p className="text-gray-600">
                Selected Service: <span className="font-medium text-gray-800">{selectedService.title}</span>
              </p>
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
            duration={parseInt(selectedService.duration)}
            availableSlots={getAvailableSlots(selectedDate, selectedService.title)}
          />
        );
      case 3:
        return (
          <ConfirmAppointment
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            duration={selectedService.duration}
            onBack={() => setCurrentStep(2)}
            onConfirm={handleConfirm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">{renderStepContent()}</div>

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
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
