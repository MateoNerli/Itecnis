import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 m-2 shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">Precio: ${product.price}</p>
      <p className="text-sm text-gray-600">Stock disponible: {product.stock}</p>
      <Link
        to={`/product/${product.id}`}
        className="text-blue-500 underline mt-2 block"
      >
        Ver detalles
      </Link>
    </div>
  );
};

export default Product;
