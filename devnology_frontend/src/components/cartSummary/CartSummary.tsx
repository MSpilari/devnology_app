"use client";

import { useCartSummary } from "./useCartSummary";

const CartSummary = () => {
  const {
    customerName,
    handleCheckout,
    productsInCart,
    setCustomerName,
    status,
    total,
  } = useCartSummary();

  return (
    <form
      onSubmit={(event) => handleCheckout(event)}
      className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
    >
      <div className="flex flex-col">
        <label htmlFor="customerName" className="mb-2 text-sm text-gray-300">
          Nome do Cliente:
        </label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite seu nome"
        />
        {status === "success" && (
          <p className="text-green-400 text-sm mt-2">
            Pedido finalizado com sucesso!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm mt-2">
            Erro ao finalizar o pedido. Tente novamente.
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="text-xl font-bold">
          Total: <span className="text-green-400">R$ {total.toFixed(2)}</span>
        </p>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded cursor-pointer text-white font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={
            productsInCart.length === 0 ||
            customerName.trim().length === 0 ||
            status === "loading"
          }
        >
          {status === "loading" ? "Processando..." : "Finalizar Pedido"}
        </button>
      </div>
    </form>
  );
};

export { CartSummary };
