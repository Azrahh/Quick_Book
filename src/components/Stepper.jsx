const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            index < currentStep ? 'bg-green-100 text-green-600' : 
            index === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            {index + 1}
          </div>
          <span className={`text-xs mt-2 ${
            index <= currentStep ? 'text-gray-800' : 'text-gray-400'
          }`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;