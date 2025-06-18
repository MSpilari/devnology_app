import ProductClientSection from "@/src/components/productClientSection/ProductClientSection";
import { Product } from "@/src/types/Product.type";

export default async function Home() {
  const res = await fetch(`${process.env.API_URL}/products`);
  const productsJSON = await res.json();
  const products: Product[] = productsJSON.data;

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <ProductClientSection initialProducts={products} />
    </main>
  );
}
