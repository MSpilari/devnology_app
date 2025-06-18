import { OrderResponse } from "@/src/types/Order.type";

const OrdersTable = ({ orders }: OrderResponse) => {
  return orders.length === 0 ? (
    <p className="text-gray-400">Nenhum pedido encontrado.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-left border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 border-b border-gray-700">Id do Pedido</th>
            <th className="px-4 py-2 border-b border-gray-700">Cliente</th>
            <th className="px-4 py-2 border-b border-gray-700">
              Data do pedido
            </th>
            <th className="px-4 py-2 border-b border-gray-700">Produtos</th>
            <th className="px-4 py-2 border-b border-gray-700">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-800 hover:bg-gray-800 transition"
            >
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.customerName}</td>
              <td className="px-4 py-2">
                {new Date(order.createdAt).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </td>
              <td className="px-4 py-2">
                <ul className="space-y-1">
                  {order.products.map((product) => (
                    <li key={product.id} className="text-sm">
                      {product.nome}{" "}
                      <span className="text-gray-400">
                        x{product.quantidade}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 text-green-400 font-semibold">
                R$ {order.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { OrdersTable };
