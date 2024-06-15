import NcInputNumber from "../utils/InputNumber";

export const Modal = ({ product, closeModal, handleBuy, setQuantity }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-sm">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="relative p-6 flex-auto">
            <h3 className="text-lg font-semibold">Ajustar cantidad</h3>
            <div className="mt-4">
              <NcInputNumber
                min={1}
                max={product.stock}
                defaultValue={1}
                onChange={setQuantity}
              />
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={closeModal}
            >
              Cerrar
            </button>
            <button
              className=" bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              type="button"
              onClick={handleBuy}
            >
              Confirmar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
