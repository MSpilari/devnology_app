"use client";
import { Product } from "@/src/types/Product.type";
import Image from "next/image";
import Link from "next/link";
import { useProductCard } from "./useProductCard";

const ProductCard = ({ product }: { product: Product }) => {
  const { imgSrc, setImgSrc } = useProductCard(product);

  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className="bg-gray-800 p-4 rounded shadow text-white"
    >
      <div className="relative w-full h-40 rounded overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.nome}
          fill
          className="object-cover"
          onError={() => setImgSrc("/placeholder.png")}
        />
      </div>
      <h3 className="mt-2 font-bold">{product.nome}</h3>
      <p className="text-sm text-gray-400">Categoria: {product.categoria}</p>
      <p className="text-lg font-semibold text-green-500 mt-1">
        R$ {product.preco}
      </p>
    </Link>
  );
};

export { ProductCard };
