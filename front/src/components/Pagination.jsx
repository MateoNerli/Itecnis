const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav className="flex justify-center items-center my-4">
      <button
        onClick={handlePrevious}
        className="bg-blue-500 text-white py-1 px-3 rounded mx-1"
        disabled={currentPage === 1}
      >
        &larr;
      </button>
      <span className="mx-2 text-lg">{currentPage}</span>
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white py-1 px-3 rounded mx-1"
        disabled={currentPage === totalPages}
      >
        &rarr;
      </button>
    </nav>
  );
};

export default Pagination;
