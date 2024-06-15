import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import Pagination from "./Pagination";
import SortByPrice from "./SortByPrice";
import FilterByCategory from "./FilterByCategory";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [sortType, setSortType] = useState("asc");
  const [category, setCategory] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `http://localhost:3000/products/category/${category}?page=${currentPage}&limit=${productsPerPage}`
          : `http://localhost:3000/products?page=${currentPage}&limit=${productsPerPage}`;
        const response = await axios.get(url);
        setProducts(response.data.rows);
        setTotalProducts(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [category, currentPage, productsPerPage]);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return sortType === "asc" ? priceA - priceB : priceB - priceA;
  });

  const toggleSort = () => setSortType(sortType === "asc" ? "desc" : "asc");

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <FilterByCategory setCategory={setCategory} />
      <SortByPrice sortType={sortType} toggleSort={toggleSort} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {totalProducts > productsPerPage && (
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={totalProducts}
          paginate={handlePaginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default ProductList;
