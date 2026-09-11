import {
  FaBox,
  FaTags,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";
import StatCard from "./StatCard";

function Dashboard({ products }) {

  const totalProducts = products.length;
  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;
  const averagePrice =
    products.length > 0
      ? (
          products.reduce(
            (total, product) =>
              total + product.price,
            0
          ) / products.length
        ).toFixed(2)
      : "0.00";
  const averageRating =
    products.length > 0
      ? (
          products.reduce(
            (total, product) =>
              total + product.rating,
            0
          ) / products.length
        ).toFixed(1)
      : "0.0";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of your product inventory
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={<FaBox />}
          description="Products available"
        />
        <StatCard
          title="Categories"
          value={totalCategories}
          icon={<FaTags />}
          description="Product categories"
        />
        <StatCard
          title="Average Price"
          value={`$${averagePrice}`}
          icon={<FaDollarSign />}
          description="Average product price"
        />
        <StatCard
          title="Average Rating"
          value={`${averageRating} ⭐`}
          icon={<FaStar />}
          description="Average product rating"
        />
      </div>

      <div className="mt-6 bg-white rounded-xl border p-6">
        <h2 className="text-lg font-bold mb-4">
          Recent Products
        </h2>
        <div className="space-y-3">
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.thumbnail}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium">
                    {product.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
              </div>
              <strong>
                ${product.price}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;