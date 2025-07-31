// hooks/useScrollAnimation.ts
import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // 一度だけアニメーション実行
    amount: threshold, // 要素の何%が見えたらアニメーション開始
  });

  return { ref, isInView };
};

// 共通のアニメーションバリアント（型エラー修正版）
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
    transition: { duration: 0.6 },
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

export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -60,
    transition: { duration: 0.6 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 60,
    transition: { duration: 0.6 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.6 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // 子要素を0.2秒ずつ遅延
      delayChildren: 0.1,
    },
  },
};
