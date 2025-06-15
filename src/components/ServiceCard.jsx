const ServiceCard = ({ title, description, duration, price, selected, onClick }) => {
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          <p className="text-xs text-gray-400 mt-2">{duration}</p>
        </div>
        <span className="font-medium text-blue-600">${price}</span>
      </div>
    </div>
  );
};

export default ServiceCard;