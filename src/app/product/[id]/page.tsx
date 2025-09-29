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

  return <ProductDetailPage product={product} />;
}
