import { OrdersTable } from "@/src/components/ordersTable/ordersTable";

export default async function OrderPage() {
  const res = await fetch(`${process.env.API_URL}/orders`);
  const data = await res.json();

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Pedidos Realizados</h1>
      <OrdersTable orders={data} />
    </main>
  );
}
