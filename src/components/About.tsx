// components/About.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
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
          {/* テキストエリア */}
          <motion.div
            className="text-center md:w-1/2 md:text-left"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInRight}
          >
            <h3 className="text-base text-brand-gold font-display mb-2 md:text-xl">
              Luminaについて
            </h3>
            <motion.div className="mb-8 md:mb-12" variants={fadeInUp}>
              <h2 className="text-2xl font-display tracking-wide mb-4 text-gray-text md:text-3xl">
                About
              </h2>
            </motion.div>

            <motion.div
              className="space-y-6 md:space-y-8"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div>
                <p className="text-xl font-body leading-relaxed text-brand-gold font-body md:text-xl">
                  ネイルのように
                  <br />
                  手元が華やぐスマホケース屋さん
                </p>
              </div>

              {/* 画像エリア */}
              <motion.div
                className="flex justify-center md:w-1/2"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInLeft}
              >
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <motion.div
                    className="overflow-hidden"
                    variants={fadeInUp}
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src="/icons/about1.jpeg"
                      alt="フローラルスマホケース1"
                      width={300}
                      height={224}
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="overflow-hidden mt-6"
                    variants={fadeInUp}
                    transition={{ delay: 0.4 }}
                  >
                    <Image
                      src="/icons/about2.jpeg"
                      alt="フローラルスマホケース2"
                      width={300}
                      height={224}
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
              <div>
                <p className="text-base font-display leading-relaxed text-gray-text font-body md:text-base">
                  丁寧な仕上げと季節感を大切に、
                  <br />
                  一つ一つ手作業で制作しています。
                  <br />
                  ギャラリーからお気に入りのデザイン
                  <br />
                  を見つけてください。
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
