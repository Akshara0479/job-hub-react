import { useEffect, useState } from "react";

import NavBar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import ProductPage from "./components/ProductPage";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/productApi";

function App() {

  // ----------------------------
  // STATES
  // ----------------------------

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [activePage, setActivePage] =
    useState("Dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // ----------------------------
  // GET PRODUCTS
  // ----------------------------

  const loadProducts = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };

  // ----------------------------
  // INITIAL API CALL
  // ----------------------------

  useEffect(() => {
    loadProducts();
  }, []);

  // ----------------------------
  // ADD PRODUCT
  // ----------------------------

  const handleAdd = async (product) => {
    try {
      setError("");
      const data =
        await createProduct(product);
      const newProduct = {
        ...data,
        id: Date.now(),
        rating: 4.5,
        thumbnail:
          product.thumbnail ||
          "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
      };
      setProducts(
        (previousProducts) => [
          newProduct,
          ...previousProducts,
        ]
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // ----------------------------
  // UPDATE PRODUCT
  // ----------------------------

  const handleUpdate = async (
    id,
    product
  ) => {

    try {

      setError("");

      const data =
        await updateProduct(
          id,
          product
        );

      setProducts(
        (previousProducts) =>
          previousProducts.map(
            (item) =>
              item.id === id
                ? {
                    ...item,
                    ...product,
                    ...data,
                    id: id,
                  }
                : item
          )
      );

    } catch (error) {

      setError(error.message);

    }

  };

  // ----------------------------
  // DELETE PRODUCT
  // ----------------------------

  const handleDelete = async (id) => {

    try {

      setError("");

      await deleteProduct(id);

      setProducts(
        (previousProducts) =>
          previousProducts.filter(
            (product) =>
              product.id !== id
          )
      );

    } catch (error) {

      setError(error.message);

    }

  };

  // ----------------------------
  // PAGE
  // ----------------------------

  const renderPage = () => {

    if (activePage === "Dashboard") {

      return (
        <Dashboard
          products={products}
        />
      );

    }

    if (activePage === "Products") {

      return (
        <ProductPage
          products={products}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      );

    }

    return (
      <div className="bg-white rounded-xl border p-10">

        <h1 className="text-2xl font-bold">
          {activePage}
        </h1>

        <p className="text-gray-500 mt-2">
          This section can be developed later.
        </p>

      </div>
    );

  };

  return (
    <div className="min-h-screen bg-gray-100">

      <NavBar
        onMenuClick={() =>
          setSidebarOpen(true)
        }
      />

      <div className="flex">

        <SideBar
          activePage={activePage}
          setActivePage={setActivePage}
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0">

          {error && (

            <ErrorMessage
              message={error}
              onRetry={loadProducts}
            />

          )}

          {loading ? (
            <Loading />
          ) : (
            renderPage()
          )}

        </main>

      </div>

    </div>
  );
}

export default App;