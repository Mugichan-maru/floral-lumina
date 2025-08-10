// components/ProductDetail/ProductDetailPage.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/types/Product";

interface ProductDetailPageProps {
  product: Product;
  onAddToCart?: (
    product: Product,
    options: { color?: string; quantity: number }
  ) => void;
  onAddToWishlist?: (product: Product) => void;
}

export default function ProductDetailPage({
  product,
  onAddToCart,
  onAddToWishlist,
}: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, {
        color: product.colors?.[selectedColor]?.name,
        quantity,
      });
    } else {
      alert(`${product.title} をカートに追加しました！`);
    }
  };

  const handleAddToWishlist = () => {
    if (onAddToWishlist) {
      onAddToWishlist(product);
    } else {
      alert(`${product.title} をお気に入りに追加しました！`);
    }
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
            <span>{product.category || "LINE UP"}</span>
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
          {/* 左側: 商品画像 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {/* メイン画像 */}
            <div className="mb-4">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={`${product.title} - 画像${selectedImage + 1}`}
                className="w-full aspect-square object-cover rounded-xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* サムネイル画像 */}
            {product.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-brand-gold"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} サムネイル ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
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
              <h1 className="text-2xl md:text-3xl font-display text-gray-dark mb-3">
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
              <p className="text-sm text-gray-500 mt-2 font-body">税込み価格</p>

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

            {/* カラー選択 */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-display text-gray-dark mb-3">
                  カラー: {product.colors[selectedColor].name}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === index
                          ? "border-brand-gold scale-110"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 数量選択 */}
            {product.inStock && (
              <div>
                <h3 className="text-lg font-display text-gray-dark mb-3">
                  数量
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
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-brand-gold text-white py-4 rounded-full font-display text-lg tracking-wide hover:bg-opacity-90 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={product.inStock ? { y: -2 } : {}}
                whileTap={product.inStock ? { scale: 0.98 } : {}}
              >
                {product.inStock ? "カートに追加" : "売り切れ"}
              </motion.button>

              <button
                onClick={handleAddToWishlist}
                className="w-full border border-brand-gold text-brand-gold py-4 rounded-full font-display text-lg tracking-wide hover:bg-brand-gold hover:text-white transition-colors duration-300"
              >
                お気に入りに追加
              </button>
            </div>

            {/* 商品特徴 */}
            {product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-display text-gray-dark mb-4">
                  商品の特徴
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-text font-body"
                    >
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>

        {/* 配送・注意事項 */}
        <div className="mt-12 md:mt-16 border-t border-gray-200 pt-8">
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
                <p className="font-medium text-gray-dark">配送について</p>
                <p>ご注文から3-5営業日でお届けします</p>
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
                <p>商品到着後7日以内であれば返品・交換を承ります</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
