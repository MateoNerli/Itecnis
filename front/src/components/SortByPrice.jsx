const SortByPrice = ({ sortType, toggleSort }) => {
  return (
    <button
      onClick={toggleSort}
      className="relative overflow-hidden bg-white border-2 border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-500 ease-linear focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 active:scale-95"
    >
      Ordenar por precio {sortType === "asc" ? "descendente" : "ascendente"}
      <span className="absolute inset-0 bg-gray-100 rounded-lg opacity-0 hover:opacity-10 transition-opacity duration-100 ease-linear"></span>
    </button>
  );
};

export default SortByPrice;
