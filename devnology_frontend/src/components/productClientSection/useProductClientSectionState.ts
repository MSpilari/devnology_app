import { Product } from "@/src/types/Product.type";
import { useEffect, useState } from "react";

const useProductClientSectionState = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = () => {
    setLoading(true);

    const query = new URLSearchParams({
      name,
      category,
      page: page.toString(),
    }).toString();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setTotalPages(data.totalPages);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [name, category, page]);

  return {
    products,
    name,
    setName,
    category,
    setCategory,
    page,
    setPage,
    totalPages,
    loading,
  };
};

export { useProductClientSectionState };
