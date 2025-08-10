// utils/productUtils.ts - 商品関連のユーティリティ関数
import { products } from "@/data/products";

export function getProductById(id: string) {
  return products[id] || null;
}

export function getAllProducts() {
  return Object.values(products);
}

export function getProductsByCategory(category: string) {
  return Object.values(products).filter(
    (product) => product.category === category
  );
}
