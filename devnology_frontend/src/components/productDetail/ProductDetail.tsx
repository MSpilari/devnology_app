"use client";

import { Product } from "@/src/types/Product.type";
import Image from "next/image";
import { useProductDetail } from "./useProductDetail";

const ProductDetail = ({ product }: { product: Product }) => {
  const { handleAddToCart, imgSrc, quantity, setImgSrc, setQuantity } =
    useProductDetail(product);

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow p-6">
      <div className="relative w-full h-64 mb-6 rounded overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.nome}
          fill
          className="object-cover"
          onError={() => setImgSrc("/placeholder.png")}
        />
      </div>

      <h1 className="text-3xl font-bold mb-2">{product.nome}</h1>
      <p className="text-gray-400 mb-4">Categoria: {product.categoria}</p>
      <p className="text-lg mb-4">{product.descricao}</p>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-green-500">R$ {product.preco}</p>
        <div className="flex items-center gap-4">
          <label htmlFor="">Quantidade:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 bg-gray-700 text-white border border-gray-600 rounded p-1 text-center"
          />
          <button
            onClick={() => handleAddToCart()}
            className="px-6 py-2 rounded font-semibold cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProductDetail };
