const QuickAction = ({ icon, title, description }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm text-center h-full">
    <div className="text-2xl mb-2">{icon}</div>
    <h4 className="font-medium">{title}</h4>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

export default QuickAction;