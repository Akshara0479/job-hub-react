import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative">

      <FaSearch className="absolute left-3 top-3.5 text-gray-400" />

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          pl-10
          pr-4
          py-3
          border
          rounded-lg
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

    </div>
  );
}

export default SearchBar;