import { useState, useEffect } from "react";
import axios from "axios";

const FilterByCategory = ({ setCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <select
      onChange={(e) => setCategory(e.target.value)}
      className="bg-gray-200 text-gray-700 py-2 px-4 rounded my-4"
    >
      <option value="">Todas las categorías</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default FilterByCategory;
