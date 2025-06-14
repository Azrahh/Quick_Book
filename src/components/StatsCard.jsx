const StatsCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm w-full">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

export default StatsCard;