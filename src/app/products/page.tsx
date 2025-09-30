"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getAllProducts } from "@/utils/productUtils";
import { useState, useMemo } from "react";

// アニメーション用のバリアント（既存のまま）
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
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
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // カテゴリごとの商品数をカウント
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      スマホケース: 0,
      オプション: 0,
    };

    allProducts.forEach((product) => {
      if (product.category && counts[product.category] !== undefined) {
        counts[product.category]++;
      }
    });

    return counts;
  }, [allProducts]);

  // フィルタリングされた商品
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return allProducts;
    }
    return allProducts.filter(
      (product) => product.category === selectedCategory
    );
  }, [allProducts, selectedCategory]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="pt-20 md:pt-24">
        {/* ヘッダーセクション */}
        <section className="bg-white pt-18 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="text-center mb-8 md:mb-16"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
            >
              {/* パンくずリスト */}
              <nav className="mb-6 md:mb-8">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-body">
                  <Link
                    href="/"
                    className="hover:text-brand-gold transition-colors"
                  >
                    Home
                  </Link>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-brand-gold">Online Shop</span>
                </div>
              </nav>

              <h1 className="text-3xl font-display tracking-wide mb-4 text-gray-dark md:text-4xl">
                Online Shop
              </h1>
              <div className="w-16 h-0.5 bg-brand-gold mx-auto md:w-20"></div>
              <p className="mt-6 text-gray-text font-body text-base md:text-lg">
                商品一覧
              </p>
            </motion.div>
          </div>
        </section>

        {/* 商品一覧セクション */}
        <section className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            {/* フィルターセクション */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center justify-center gap-4">
                <label
                  htmlFor="category-filter"
                  className="text-sm font-body text-brand-gold"
                >
                  商品種絞り込み
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 text-sm font-body text-gray-dark focus:outline-none focus:border-brand-gold transition-colors"
                >
                  <option value="all">すべて ({allProducts.length})</option>
                  <option value="スマホケース">
                    スマホケース ({categoryCounts["スマホケース"]})
                  </option>
                  <option value="オプション">
                    オプション ({categoryCounts["オプション"]})
                  </option>
                </select>
              </div>
            </div>

            {/* 商品グリッド */}
            <motion.div
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              key={selectedCategory} // カテゴリが変わったら再アニメーション
            >
              {filteredProducts.map((product, index) => {
                // 最初の行の画像にpriorityを設定
                const isPriority = index < 4;

                return (
                  <motion.div
                    key={product.id}
                    className="group bg-white transition-shadow duration-300 hover:shadow-lg"
                    variants={itemVariants}
                  >
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          sizes="(max-width: 768px) 176px, 240px"
                          priority={isPriority}
                          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                        />
                      </div>
                      <div className="p-4 md:p-6">
                        <h3 className="text-sm font-body text-gray-dark mb-2 leading-tight font-medium md:text-base">
                          {product.title}
                        </h3>

                        {/* 商品説明（デスクトップのみ表示） */}
                        <p className="hidden md:block text-xs text-gray-500 font-body mb-3 line-clamp-2">
                          {product.description.slice(0, 60)}...
                        </p>

                        <div className="flex items-center justify-between">
                          <p className="text-brand-gold text-sm font-display font-semibold md:text-base">
                            {product.price}
                          </p>
                          {!product.inStock && (
                            <span className="text-xs text-red-500 font-body bg-red-50 px-2 py-1">
                              売り切れ
                            </span>
                          )}
                        </div>

                        {/* 在庫状況（デスクトップのみ表示） */}
                        <div className="hidden md:flex items-center mt-3">
                          {product.inStock ? (
                            <span className="inline-flex items-center gap-1 text-green-600 text-xs font-body">
                              <div className="w-2 h-2 bg-green-600 rounded-full" />
                              在庫あり
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-600 text-xs font-body">
                              <div className="w-2 h-2 bg-red-600 rounded-full" />
                              売り切れ
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* 該当商品がない場合 */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-text font-body">
                  該当する商品がありません
                </p>
              </div>
            )}

            {/* 追加情報セクション */}
            <motion.div
              className="mt-16 md:mt-24 text-center"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              transition={{ delay: 0.6 }}
            >
              <Contact />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
