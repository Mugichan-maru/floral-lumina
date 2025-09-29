// components/ProductDetail/ProductDetailPage.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/Product";
import { useCart } from "@/contexts/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiperのスタイルをインポート
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductDetailPageProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const { addItem, openCart } = useCart();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const handleAddToCart = async () => {
    if (!product.inStock) return;

    setIsAdding(true);

    // カートに追加
    addItem(product, quantity, product.colors?.[selectedColor]?.name);

    // 視覚的フィードバック
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAdding(false);

    // カートを開く
    openCart();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー部分 */}
      <div className="bg-white shadow-sm py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-display">商品一覧に戻る</span>
          </Link>
          <h2
            className="font-display text-lg text-gray-text"
            style={{ letterSpacing: "0.15em" }}
          >
            Floral Lumina
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* パンくずリスト */}
        <motion.nav
          className="mb-6 md:mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 font-body">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-brand-gold">{product.title}</span>
          </div>
        </motion.nav>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* 左側: 商品画像スライダー */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <div className="relative aspect-square product-image-swiper">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet-custom",
                  bulletActiveClass: "swiper-pagination-bullet-active-custom",
                }}
                loop={product.images.length > 1}
                className="w-full h-full"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`${product.title} - 画像${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* カスタム矢印ボタン（複数画像がある場合のみ） */}
              {product.images.length > 1 && (
                <>
                  <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10">
                    <svg
                      className="w-5 h-5 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10">
                    <svg
                      className="w-5 h-5 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* カスタムページネーションスタイル */}
            <style jsx global>{`
              .product-image-swiper {
                position: relative;
              }

              .product-image-swiper .swiper {
                width: 100%;
                height: 100%;
              }

              .product-image-swiper:hover .swiper-button-prev-custom,
              .product-image-swiper:hover .swiper-button-next-custom {
                opacity: 1;
              }

              .product-image-swiper .swiper-pagination {
                bottom: 16px !important;
              }

              .swiper-pagination-bullet-custom {
                width: 8px;
                height: 8px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transition: all 0.3s;
                cursor: pointer;
                display: inline-block;
                margin: 0 4px;
              }

              .swiper-pagination-bullet-custom:hover {
                background: rgba(255, 255, 255, 0.75);
              }

              .swiper-pagination-bullet-active-custom {
                width: 32px;
                height: 8px;
                background: white;
                border-radius: 4px;
              }
            `}</style>
          </motion.div>

          {/* 右側: 商品情報 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="space-y-6 md:space-y-8"
          >
            {/* 商品名・価格 */}
            <div>
              <h1 className="text-2xl md:text-3xl font-body text-gray-dark mb-3">
                {product.title}
              </h1>
              <div className="flex items-center gap-3">
                <p className="text-2xl md:text-3xl font-display font-semibold text-brand-gold">
                  {product.price}
                </p>
                {product.originalPrice && (
                  <p className="text-lg text-gray-400 line-through">
                    {product.originalPrice}
                  </p>
                )}
              </div>

              {/* 在庫状況 */}
              <div className="mt-3">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1 text-green-600 text-sm font-body">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    在庫あり
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-600 text-sm font-body">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    売り切れ
                  </span>
                )}
              </div>
            </div>

            {/* 商品説明 */}
            <div>
              <p className="text-gray-text leading-relaxed font-body">
                {product.description}
              </p>
            </div>

            {/* カラー選択 - セレクトボックス */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-display text-brand-gold mb-3">
                  カラー
                </h3>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-body text-gray-dark focus:border-brand-gold focus:outline-none transition-colors cursor-pointer"
                >
                  {product.colors.map((color, index) => (
                    <option key={index} value={index}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 数量選択 */}
            {product.inStock && (
              <div>
                <h3 className="text-lg font-display text-brand-gold mb-3">
                  購入数
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-brand-gold transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-16 text-center font-body text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-brand-gold transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* 購入ボタン */}
            <div className="space-y-3">
              {/* カートに入れるボタン */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className="w-full bg-gray-400 text-white py-4 rounded-full font-display text-lg tracking-wide hover:bg-gray-500 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed relative"
                whileHover={product.inStock && !isAdding ? { y: -2 } : {}}
                whileTap={product.inStock && !isAdding ? { scale: 0.98 } : {}}
              >
                {isAdding ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    処理中...
                  </div>
                ) : product.inStock ? (
                  "カートに入れる"
                ) : (
                  "売り切れ"
                )}
              </motion.button>

              {/* 購入するボタン */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className="w-full bg-brand-gold text-white py-4 rounded-full font-display text-lg tracking-wide hover:bg-opacity-90 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed relative"
                whileHover={product.inStock && !isAdding ? { y: -2 } : {}}
                whileTap={product.inStock && !isAdding ? { scale: 0.98 } : {}}
              >
                {product.inStock ? "購入する" : "売り切れ"}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* 商品説明 */}
        <div className="mt-12 md:mt-16 border-t border-b border-gray-200 py-8">
          <h3 className="text-lg font-display text-brand-gold mb-4">
            商品説明
          </h3>
          <p className="text-gray-text leading-relaxed font-body">
            {product.description}
          </p>
        </div>

        {/* 配送・注意事項 */}
        <div className="mt-8 pt-8">
          <div className="max-w-3xl space-y-4 text-sm text-gray-500 font-body">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293L9 6.586A1 1 0 009.707 7H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-dark">発送について</p>
                <p>ご入金確認後、通常2週間程度で発送させていただきます。</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-dark">返品・交換について</p>
                <p>商品到着後7日以内であれば返品・交換を承ります。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
