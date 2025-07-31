// components/About.tsx
"use client";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
} from "@/hooks/useScrollAnimation";

export default function About() {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section id="about" className="bg-white py-12 md:py-20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* モバイル: 縦積み、デスクトップ: 横並び */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
          {/* 画像エリア */}
          <motion.div
            className="flex justify-center md:w-1/2"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <motion.div
                className="bg-gray-100 rounded-lg overflow-hidden shadow-md"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <img
                  src="/icons/about1.jpeg"
                  alt="フローラルスマホケース1"
                  className="w-full h-48 object-cover md:h-56"
                />
              </motion.div>
              <motion.div
                className="bg-gray-100 rounded-lg overflow-hidden shadow-md mt-6"
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
              >
                <img
                  src="/icons/about2.jpeg"
                  alt="フローラルスマホケース2"
                  className="w-full h-48 object-cover md:h-56"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* テキストエリア */}
          <motion.div
            className="text-center md:w-1/2 md:text-left"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInRight}
          >
            <motion.div className="mb-8 md:mb-12" variants={fadeInUp}>
              <h2 className="text-2xl font-display tracking-wide mb-4 text-gray-dark md:text-3xl">
                About
              </h2>
              <div className="w-12 h-0.5 bg-brand-gold mx-auto md:mx-0 md:w-16"></div>
            </motion.div>

            <motion.div
              className="space-y-6 md:space-y-8"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div>
                <h3 className="text-lg font-display text-gray-dark mb-3 md:text-xl">
                  Luminaについて
                </h3>
                <p className="text-base leading-relaxed text-brand-gold font-body md:text-lg">
                  ネイルのように手元が華やぐスマホケース屋さん
                </p>
              </div>

              <div>
                <p className="text-sm leading-relaxed text-gray-text font-body md:text-base">
                  丁寧な仕上げと季節感を大切に、一つ一つ手作業で制作しています。
                  ギャラリーからお気に入りのデザインを見つけてください。
                </p>
              </div>
            </motion.div>

            <motion.div
              className="text-center mt-8 md:mt-12"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <button className="text-brand-gold hover:text-gray-dark transition-colors duration-300 text-sm font-display tracking-wide uppercase">
                view more
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
