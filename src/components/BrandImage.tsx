// components/BrandImage.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandImage() {
  // アニメーション設定
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // 左からスライドイン
  const slideFromLeft = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  // 右からスライドイン
  const slideFromRight = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  // 下からスライドイン
  const slideFromBottom = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="bg-white pt-16 pb-4 md:py-6 lg:py-8 overflow-hidden">
      <div className="mx-auto">
        <motion.div
          className="relative h-[600px] lg:h-[700px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* ブランドカラーのテクスチャ - 左から */}
          <motion.div
            className="absolute top-16 left-0 z-10"
            variants={slideFromLeft}
          >
            <div className="relative w-80 h-64 md:w-110 md:h-88 lg:w-180 lg:h-128 overflow-hidden">
              <Image
                src="/icons/brand-texture-side.svg"
                alt="ブランドカラーのテクスチャ"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* スマホケースを持つ女性 - 右から */}
          <motion.div
            className="absolute top-0 right-0 md:right-12 lg:right-40 z-20"
            variants={slideFromRight}
          >
            <div className="relative w-70 h-48 md:w-84 md:h-60 lg:w-160 lg:h-90 overflow-hidden">
              <Image
                src="/icons/women-use-case.jpeg"
                alt="スマホケースを持つ女性"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* スマホケースコレクション - 下から */}
          <motion.div
            className="absolute top-64 left-40 md:left-70 lg:left-180 transform -translate-x-1/2 z-30"
            variants={slideFromBottom}
          >
            <div className="relative w-40 h-50 md:w-52 md:h-68 lg:w-80 lg:h-100 overflow-hidden">
              <Image
                src="/icons/flower-case-image.jpeg"
                alt="スマホケースコレクション"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* 背景装飾要素 */}
          {/* <motion.div
            className="absolute top-1/4 left-1/3 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.2 }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-brand-gold/15 rounded-full blur-xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 1.2 }}
          /> */}
        </motion.div>
      </div>
    </section>
  );
}
