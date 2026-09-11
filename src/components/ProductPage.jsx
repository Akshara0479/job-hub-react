import { useMemo, useState } from "react";

import {
  FaPlus,
} from "react-icons/fa";

import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import ProductModal from "./ProductModal";

function ProductPage({
  products,
  onAdd,
  onUpdate,
  onDelete,
}) {

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  const [sort, setSort] =
    useState("default");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const productsPerPage = 8;

  // ----------------------------
  // CATEGORIES
  // ----------------------------

  const categories = useMemo(() => {

    return [
      ...new Set(
        products.map(
          (product) => product.category
        )
      ),
    ];

  }, [products]);

  // ----------------------------
  // SEARCH + FILTER
  // ----------------------------

  const filteredProducts = useMemo(() => {

    let result = products.filter(
      (product) => {

        const matchesSearch =
          product.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          category === "All" ||
          product.category === category;

        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );

    // ----------------------------
    // SORT
    // ----------------------------

    if (sort === "name-asc") {

      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    }

    if (sort === "name-desc") {

      result.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    }

    if (sort === "price-low") {

      result.sort(
        (a, b) => a.price - b.price
      );

    }

    if (sort === "price-high") {

      result.sort(
        (a, b) => b.price - a.price
      );

    }

    if (sort === "rating") {

      result.sort(
        (a, b) => b.rating - a.rating
      );

    }

    return result;

  }, [
    products,
    search,
    category,
    sort,
  ]);

  // ----------------------------
  // PAGINATION
  // ----------------------------

  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  // ----------------------------
  // ADD
  // ----------------------------

  const handleAddClick = () => {

    setSelectedProduct(null);

    setShowModal(true);

  };

  // ----------------------------
  // EDIT
  // ----------------------------

  const handleEdit = (product) => {

    setSelectedProduct(product);

    setShowModal(true);

  };

  // ----------------------------
  // SAVE
  // ----------------------------

  const handleSave = async (data) => {

    if (selectedProduct) {

      await onUpdate(
        selectedProduct.id,
        data
      );

    } else {

      await onAdd(data);

    }

    setShowModal(false);

    setSelectedProduct(null);

  };

  // ----------------------------
  // DELETE
  // ----------------------------

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) {
      return;
    }

    await onDelete(id);

  };

  return (
    <div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

        <div>

          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
            Manage your product inventory
          </p>

        </div>

        <button
          onClick={handleAddClick}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          <FaPlus />
          Add Product
        </button>

      </div>

      <div className="bg-white rounded-xl border p-4 mb-6">

        <div className="grid md:grid-cols-2 gap-4">

          <SearchBar
            search={search}
            setSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />

          <FilterBar
            category={category}
            setCategory={(value) => {
              setCategory(value);
              setCurrentPage(1);
            }}
            sort={sort}
            setSort={(value) => {
              setSort(value);
              setCurrentPage(1);
            }}
            categories={categories}
          />

        </div>

      </div>

      <div className="flex justify-between mb-4">

        <p className="text-gray-500">
          Showing{" "}
          <strong>
            {currentProducts.length}
          </strong>{" "}
          of{" "}
          <strong>
            {filteredProducts.length}
          </strong>{" "}
          products
        </p>

      </div>

      {currentProducts.length === 0 ? (

        <div className="bg-white border rounded-xl p-10 text-center">

          <h2 className="text-xl font-bold">
            No products found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing your search or filter.
          </p>

        </div>

      ) : (

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {currentProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

            )
          )}

        </div>

      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {showModal && (

        <ProductModal
          product={selectedProduct}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
        />

      )}

    </div>
  );
}

export default ProductPage;