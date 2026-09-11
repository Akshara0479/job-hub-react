import {
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";

function ProductCard({
  product,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h2 className="font-bold text-lg truncate">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
          <span className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            {product.rating}
          </span>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex justify-center items-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100"
          >
            <FaEdit />
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 flex justify-center items-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;