import { Product } from "@/src/types/Product.type";
import { useState } from "react";

const useProductCard = (product: Product) => {
  const [imgSrc, setImgSrc] = useState(() => {
    if (Array.isArray(product.imagem)) {
      return product.imagem[0] || "/placeholder.png";
    }
    return product.imagem || "/placeholder.png";
  });

  return { imgSrc, setImgSrc };
};

export { useProductCard };
