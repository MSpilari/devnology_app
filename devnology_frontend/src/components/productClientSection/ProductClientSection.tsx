"use client";

import { Product } from "@/src/types/Product.type";
import PaginationControls from "./PaginationControls";
import { ProductCard } from "./ProductCard";
import { useProductClientSectionState } from "./useProductClientSectionState";

export default function ProductClientSection({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const {
    name,
    setName,
    category,
    setCategory,
    loading,
    products,
    page,
    totalPages,
    setPage,
  } = useProductClientSectionState(initialProducts);

  return (
    <div className="p-4">
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 rounded p-2"
        />
        <input
          type="text"
          placeholder="Buscar por categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 rounded p-2"
        />
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading && <p className="text-gray-400">Carregando produtos...</p>}

        {products.length === 0 && !loading ? (
          <p className="text-gray-400">Nenhum produto encontrado.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Paginação */}
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
