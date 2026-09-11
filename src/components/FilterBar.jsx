function FilterBar({
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg px-4 py-3 outline-none"
      >
        <option value="All">
          All Categories
        </option>
        {categories.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>

        ))}
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg px-4 py-3 outline-none"
      >
        <option value="default">
          Sort By
        </option>

        <option value="name-asc">
          Name A-Z
        </option>

        <option value="name-desc">
          Name Z-A
        </option>

        <option value="price-low">
          Price Low → High
        </option>

        <option value="price-high">
          Price High → Low
        </option>

        <option value="rating">
          Rating High → Low
        </option>
      </select>
    </div>
  );
}

export default FilterBar;