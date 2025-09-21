// components/ProductPreview.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/utils/productUtils";

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
  // products.tsからデータを取得
  const products = getAllProducts();

  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* タイトルセクション */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
        >
          <h2 className="text-2xl font-display tracking-wide mb-4 text-gray-dark md:text-3xl">
            LINE UP
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto md:w-16"></div>
        </motion.div>

        {/* 商品表示エリア */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* モバイル専用: 横スクロール */}
          <div className="md:hidden overflow-hidden">
            <div
              className="flex gap-4 pb-4 overflow-x-auto -mx-4 px-4"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="group block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  style={{
                    flexShrink: 0,
                    width: "176px",
                    minWidth: "176px",
                    scrollSnapAlign: "start",
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  variants={itemVariants}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="aspect-[3/4] overflow-hidden rounded-t-xl relative">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-body text-gray-dark mb-2 leading-tight font-medium">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-brand-gold text-sm font-display font-semibold">
                          {product.price}
                        </p>
                        {!product.inStock && (
                          <span className="text-xs text-red-500 font-body">
                            売り切れ
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* デスクトップ専用: グリッドレイアウト */}
          <div className="hidden md:grid md:grid-cols-5 md:gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="group block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                style={{
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="aspect-[3/4] overflow-hidden rounded-t-xl relative">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-body text-gray-dark mb-2 leading-tight font-medium">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-brand-gold text-base font-display font-semibold">
                        {product.price}
                      </p>
                      {!product.inStock && (
                        <span className="text-xs text-red-500 font-body">
                          売り切れ
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-brand-gold text-brand-gold rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-brand-gold hover:text-white transition-colors duration-300 md:px-8 md:py-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Online Shop
          </Link>
        </motion.div>
      </div>

      {/* カスタムスクロールバーのスタイル - モバイル専用 */}
      <style jsx>{`
        @media (max-width: 767px) {
          .overflow-x-auto::-webkit-scrollbar {
            height: 4px;
          }
          .overflow-x-auto::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 2px;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: #cbb17b;
            border-radius: 2px;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: #b8a066;
          }
        }
      `}</style>
    </section>
  );
}
