// app/products/page.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllProducts } from "@/utils/productUtils";

// アニメーション用のバリアント
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* <Header /> */}

      <main className="pt-20 md:pt-24">
        {/* ヘッダーセクション */}
        <section className="bg-white py-12 md:py-20">
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
                手元を華やかに彩る、季節の花をモチーフにしたスマホケースをご覧ください
              </p>
            </motion.div>
          </div>
        </section>

        {/* 商品一覧セクション */}
        <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            {/* 商品グリッド */}
            <motion.div
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="aspect-[3/4] overflow-hidden rounded-t-xl">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                          <span className="text-xs text-red-500 font-body bg-red-50 px-2 py-1 rounded">
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
              ))}
            </motion.div>

            {/* 追加情報セクション */}
            <motion.div
              className="mt-16 md:mt-24 text-center"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-white rounded-xl p-8 md:p-12 shadow-md max-w-4xl mx-auto">
                <h2 className="text-xl font-display text-gray-dark mb-4 md:text-2xl">
                  商品について
                </h2>
                <div className="space-y-4 text-sm text-gray-text font-body md:text-base">
                  <p>
                    すべての商品は手作業で丁寧に制作されており、一つ一つに個性があります。
                  </p>
                  <p>ご注文から発送まで通常2週間程度いただいております。</p>
                  <p>
                    ご不明な点がございましたら、お気軽にInstagramよりお問い合わせください。
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-pink-400 text-pink-500 rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-pink-500 hover:text-white transition-colors duration-300"
                  >
                    <img
                      src="/icons/instagram.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                    お問い合わせ
                  </a>

                  <Link
                    href="/#about"
                    className="inline-flex items-center justify-center gap-2 border border-brand-gold text-brand-gold rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-brand-gold hover:text-white transition-colors duration-300"
                  >
                    Luminaについて
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
