import { useCart } from "@/src/hooks/useCart";
import { Product } from "@/src/types/Product.type";
import { useState } from "react";

export const useProductDetail = (product: Product) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const [imgSrc, setImgSrc] = useState(() => {
    if (Array.isArray(product.imagem)) {
      return product.imagem[0] || "/placeholder.png";
    }
    return product.imagem || "/placeholder.png";
  });

  const handleAddToCart = () => {
    addToCart({ ...product, quantidade: quantity });
  };

  return {
    quantity,
    setQuantity,
    imgSrc,
    setImgSrc,
    handleAddToCart,
  };
};
