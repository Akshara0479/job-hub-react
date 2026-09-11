import { FaTimes } from "react-icons/fa";
import ProductForm from "./ProductForm";

function ProductModal({
  product,
  onSave,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-xl font-bold">
            {product
              ? "Edit Product"
              : "Add New Product"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes />
          </button>

        </div>

        <div className="p-6">

          <ProductForm
            product={product}
            onSave={onSave}
            onClose={onClose}
          />

        </div>

      </div>

    </div>
  );
}

export default ProductModal;