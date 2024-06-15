import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "./Modal";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuy = async () => {
    try {
      await axios.patch(`http://localhost:3000/products/stock/${id}`, {
        quantity,
      });
      setProduct({ ...product, stock: product.stock - quantity });
      toast.success("Compra exitosa");
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!product) return null;

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col md:flex-row border rounded-lg p-4 m-2 shadow-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover rounded"
        />
        <div className="md:w-1/2 p-4">
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p className="text-lg font-bold">Precio: ${product.price}</p>
          <p className="text-sm text-gray-600">
            Stock disponible: {product.stock}
          </p>
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
          <button
            onClick={openModal}
            className=" bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          >
            Comprar
          </button>
        </div>
        {modalOpen && (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
              onClick={closeModal}
            ></div>
            <Modal
              product={product}
              closeModal={closeModal}
              handleBuy={handleBuy}
              setQuantity={setQuantity}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
