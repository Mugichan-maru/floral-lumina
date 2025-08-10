// app/product/[id]/page.tsx - 動的ルーティングページ
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetailPage from "@/components/ProductDetail/ProductDetailPage";
import { Product } from "@/types/Product";
import { getProductById } from "@/utils/productUtils";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = params.id as string;
    const foundProduct = getProductById(productId);

    if (!foundProduct) {
      // 商品が見つからない場合は404ページへリダイレクト
      router.push("/404");
      return;
    }

    setProduct(foundProduct);
    setLoading(false);
  }, [params.id, router]);

  const handleAddToCart = (
    product: Product,
    options: { color?: string; quantity: number }
  ) => {
    // 実際のカート追加処理をここに実装
    console.log("カートに追加:", {
      product: product.title,
      color: options.color,
      quantity: options.quantity,
      price: product.price,
    });

    // 一時的にアラート表示
    alert(
      `${product.title} を ${options.quantity}個カートに追加しました！${
        options.color ? `\nカラー: ${options.color}` : ""
      }`
    );
  };

  const handleAddToWishlist = (product: Product) => {
    // 実際のお気に入り追加処理をここに実装
    alert(`${product.title} をお気に入りに追加しました！`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-text font-body">商品を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null; // 404ページへのリダイレクト処理済み
  }

  return (
    <ProductDetailPage
      product={product}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
    />
  );
}
