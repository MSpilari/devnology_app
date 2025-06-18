import { CartSummary } from "@/src/components/cartSummary/CartSummary";
import { CartTable } from "@/src/components/cartTable/cartTable";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

      <CartTable />
      <CartSummary />
    </main>
  );
}
