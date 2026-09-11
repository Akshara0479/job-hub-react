function StatCard({ title, value, icon, description }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {value}
          </h2>

          <p className="text-gray-400 text-xs mt-2">
            {description}
          </p>

        </div>

        <div className="text-blue-600 text-2xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;