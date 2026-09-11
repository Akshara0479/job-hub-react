import { useEffect, useState } from "react";

function ProductForm({
  product,
  onSave,
  onClose,
}) {

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {

    if (product) {

      setFormData({
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        thumbnail: product.thumbnail || "",
      });

    }

  }, [product]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave({
      ...formData,
      price: Number(formData.price),
    });

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <div>

        <label className="block text-sm font-medium mb-1">
          Product Name
        </label>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
        />

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div>

          <label className="block text-sm font-medium mb-1">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Category
          </label>

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Electronics"
          />

        </div>

      </div>

      <div>

        <label className="block text-sm font-medium mb-1">
          Image URL
        </label>

        <input
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://..."
        />

      </div>

      <div>

        <label className="block text-sm font-medium mb-1">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Product description"
        />

      </div>

      <div className="flex justify-end gap-3 pt-3">

        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 border rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {product ? "Update Product" : "Add Product"}
        </button>

      </div>

    </form>
  );
}

export default ProductForm;