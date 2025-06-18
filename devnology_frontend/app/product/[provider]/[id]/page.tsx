import { ProductDetail } from "@/src/components/productDetail/ProductDetail";
import { Product } from "@/src/types/Product.type";

export default async function ProductDetailPage({ params }: ProductDetailPage) {
  const { provider, id } = await params;

  const res = await fetch(`${process.env.API_URL}/products/${provider}/${id}`);

  if (!res.ok) throw new Error("Produto não encontrado");

  const product: Product = await res.json();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <ProductDetail product={product} />
    </main>
  );
}
