// components/News.tsx
"use client";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";

export default function News() {
  const { ref, isInView } = useScrollAnimation(0.2);

  const newsItems = [
    {
      date: "00.00.00",
      category: "お知らせ",
      content: "『Floral Lumina』のホームページを公開いたしました。",
    },
    {
      date: "00.00.00",
      category: "お知らせ",
      content:
        "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    },
  ];

  return (
    <section id="news" className="bg-white py-12 md:py-16" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-display tracking-wide mb-4 text-gray-dark md:text-3xl">
            News
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto md:w-16"></div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {newsItems.map((item, index) => (
            <motion.article
              key={index}
              className="border-b border-gray-200 pb-6 last:border-b-0"
              variants={fadeInUp}
            >
              {/* モバイルファースト: 縦積みレイアウト */}
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
                {/* 日付とカテゴリ - モバイルでは上部、デスクトップでは左側 */}
                <div className="flex items-center gap-3 md:w-48 md:flex-col md:items-end md:flex-shrink-0">
                  <time className="text-sm text-gray-text font-body md:mb-1">
                    {item.date}
                  </time>
                  <span className="bg-brand-gold text-white px-2 py-1 rounded text-xs font-body md:px-3">
                    {item.category}
                  </span>
                </div>

                {/* コンテンツ */}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-gray-dark font-body md:text-base">
                    {item.content}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-8 md:mt-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <button className="text-brand-gold hover:text-gray-dark transition-colors duration-300 text-sm font-display tracking-wide uppercase">
            view more
          </button>
        </motion.div>
      </div>
    </section>
  );
}
