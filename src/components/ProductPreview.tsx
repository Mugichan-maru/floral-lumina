// components/ProductPreview.tsx
"use client";
import { motion } from "framer-motion";

interface Product {
  image: string;
  title: string;
  price: string;
}

// 商品データのサンプル
// 実際のデータはAPIやデータベースから取得することを想定
const products: Product[] = [
  {
    image: "/icons/product1.jpeg",
    title: "ネモフィラ",
    price: "¥3,200",
  },
  {
    image: "/icons/product2.jpeg",
    title: "マーガレット",
    price: "¥3,200",
  },
  {
    image: "/icons/product3.jpeg",
    title: "紫陽花",
    price: "ON DISPLAY",
  },
  {
    image: "/icons/product4.jpeg",
    title: "すずらん",
    price: "ON DISPLAY",
  },
  {
    image: "/icons/product5.jpeg",
    title: "向日葵",
    price: "¥3,500",
  },
];

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
  return (
    <section className="bg-white py-12 md:py-20">
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

        {/* 商品横スクロール */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* モバイル: 横スクロール、デスクトップ: 通常グリッド */}
          <div className="flex overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0">
            {/* スクロールバーのスタイリング */}
            <style jsx>{`
              div::-webkit-scrollbar {
                height: 4px;
              }
              div::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 2px;
              }
              div::-webkit-scrollbar-thumb {
                background: #cbb17b;
                border-radius: 2px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: #b8a066;
              }
            `}</style>

            {products.map((product, index) => (
              <motion.a
                key={index}
                href="#shop"
                className="group block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-44 md:w-auto md:flex-shrink border border-gray-100"
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
                <div className="aspect-[3/4] overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-sm font-body text-gray-dark mb-2 leading-tight md:text-base font-medium">
                    {product.title}
                  </h3>
                  <p className="text-brand-gold text-sm font-display font-semibold md:text-base">
                    {product.price}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* view more ボタン */}
        <motion.div
          className="text-center mt-8 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          transition={{ delay: 0.8 }}
        >
          <a
            href="#shop"
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
          </a>
        </motion.div>
      </div>
    </section>
  );
}
