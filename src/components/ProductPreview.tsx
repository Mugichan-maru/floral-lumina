// components/ProductPreview.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/utils/productUtils";
import { useState } from "react";

// アニメーション用のバリアント
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function ProductPreview() {
  const products = getAllProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = products.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* タイトルセクション */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
        >
          <p className="text-brand-gold text-sm font-body tracking-widest mb-2">
            取り扱い商品
          </p>
          <h1 className="text-2xl font-display text-gray-dark md:text-3xl">
            Lineup
          </h1>
        </motion.div>

        {/* 商品表示エリア */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* ナビゲーション矢印 - 商品エリア上部に配置 */}
          <div className="md:hidden flex items-center mb-6 mx-10">
            <button
              onClick={prevSlide}
              className="w-8 h-8 flex items-center justify-center text-brand-gold hover:text-gray-600 transition-colors"
              disabled={currentSlide === 0}
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
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="w-8 h-8 flex items-center justify-center text-brand-gold hover:text-gray-600 transition-colors"
              disabled={currentSlide === totalSlides - 1}
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
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* モバイル: スライダー */}
          <div className="md:hidden relative">
            {/* スライダーコンテナ */}
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 75}%)`,
                }}
              >
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="w-[75%] flex-shrink-0 flex justify-center px-8"
                  >
                    <div className="max-w-[280px] w-full">
                      <Link href={`/product/${product.id}`} className="block">
                        {/* 商品画像 - 正方形 */}
                        <div className="aspect-square relative bg-gray-100 mb-4">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* 商品名と価格 - べた書き */}
                        <div className="text-left">
                          <h3 className="text-sm font-body text-gray-dark mb-1">
                            {product.title}
                          </h3>
                          <p className="text-brand-gold text-sm font-display">
                            {product.price}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* デスクトップ: グリッドレイアウト */}
          <div className="hidden md:grid md:grid-cols-5 md:gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white"
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* 商品画像 - 正方形 */}
                  <div className="aspect-square relative bg-gray-100 mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* 商品名と価格 - べた書き */}
                  <div className="text-center">
                    <h3 className="text-base font-body text-gray-dark mb-2">
                      {product.title}
                    </h3>
                    <p className="text-brand-gold text-base font-display">
                      {product.price}
                    </p>
                    {!product.inStock && (
                      <span className="block text-xs text-red-500 font-body mt-1">
                        売り切れ
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
