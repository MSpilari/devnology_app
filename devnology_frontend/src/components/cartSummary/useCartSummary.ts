import { useCart } from "@/src/hooks/useCart";
import { useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useCartSummary() {
  const { productsInCart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const total = useMemo(() => {
    return productsInCart.reduce((acc, item) => {
      return acc + item.preco * (item.quantidade || 1);
    }, 0);
  }, [productsInCart]);

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    const request = {
      customerName,
      products: productsInCart.map((product) => ({
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        quantidade: product.quantidade,
      })),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) throw new Error("Erro na requisição");

      await response.json();
      setStatus("success");
      setCustomerName("");
      clearCart();

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return {
    productsInCart,
    customerName,
    setCustomerName,
    status,
    total,
    handleCheckout,
  };
}
