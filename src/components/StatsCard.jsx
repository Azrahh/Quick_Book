  const StatsCard = ({ title, value, change }) => {
  const trendConfig = {
    up: { icon: '↑', color: 'text-green-500' },
    down: { icon: '↓', color: 'text-red-500' },
    neutral: { icon: '●', color: 'text-yellow-500' }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-gray-200 hover:shadow-lg transition-shadow duration-300`}>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold my-2">{value}</p>
      <p className={`   text-sm font-medium`}>
      
      </p>
    </div>
  );
};


export default StatsCard;