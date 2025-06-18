"use client";

import { useCart } from "@/src/hooks/useCart";

const CartTable = () => {
  const { productsInCart, removeFromCart } = useCart();

  return productsInCart.length === 0 ? (
    <p className="text-gray-400">Seu carrinho está vazio.</p>
  ) : (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 border-b border-gray-700">Produto</th>
              <th className="px-4 py-2 border-b border-gray-700">Preço</th>
              <th className="px-4 py-2 border-b border-gray-700">Quantidade</th>
              <th className="px-4 py-2 border-b border-gray-700">Subtotal</th>
              <th className="px-4 py-2 border-b border-gray-700">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {productsInCart.map((product) => (
              <tr key={product.id} className="border-b border-gray-800">
                <td className="px-4 py-2">{product.nome}</td>
                <td className="px-4 py-2">R$ {product.preco}</td>
                <td className="px-4 py-2">{product.quantidade}</td>
                <td className="px-4 py-2">
                  R$ {product.preco * (product.quantidade || 1)}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="cursor-pointer text-red-500"
                    onClick={() => removeFromCart(product.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { CartTable };
