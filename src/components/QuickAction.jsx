const QuickAction = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    className="bg-white p-5 rounded-lg shadow-sm text-center h-full cursor-pointer border hover:shadow-md transition duration-200 ease-in-out"
  >
    <div className="text-3xl mb-2">{icon}</div>
    <h4 className="font-semibold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

export default QuickAction;
