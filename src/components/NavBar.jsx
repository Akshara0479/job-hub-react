import { FaBars, FaBell, FaBoxOpen } from "react-icons/fa";

function Navbar({ onMenuClick }) {
  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 text-xl"
        >
          <FaBars />
        </button>
        <div className="flex items-center gap-2">
          <FaBoxOpen className="text-blue-600 text-2xl" />

          <h1 className="text-xl font-bold text-gray-800">
            ProductHub
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <FaBell className="text-gray-500" />
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>
          <span className="hidden md:block font-medium">
            Admin
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;