// components/Header.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // ハンバーガーアイコンのライン用のバリアント
  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: (custom: number) => ({
      rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
      y: custom === 1 ? 8 : custom === 3 ? -8 : 0,
      opacity: custom === 2 ? 0 : 1,
    }),
  };

  // モバイルメニューのバリアント
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  // メニューアイテムのバリアント
  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.3,
      },
    }),
  };

  const menuItems = [
    { label: "Top", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Q&A", href: "#qa" },
    { label: "News", href: "#news" },
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* ブランド名 */}
        <div className="flex items-center gap-2 text-xl tracking-wide text-gray-700 font-display md:text-2xl">
          <img
            src="/icons/flower.svg"
            alt="Floral Lumina ロゴ"
            className="w-12 h-12 md:w-8 md:h-8"
          />
          <Link href="/">Floral Lumina</Link>
        </div>

        {/* ナビゲーション（PC用） */}
        <nav className="hidden md:flex gap-8 text-sm tracking-wide items-center">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="text-gray-600 hover:text-rose-500 transition-colors duration-300 font-display"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 font-display"
            aria-label="Instagram"
          >
            <img src="/icons/instagram.svg" alt="" className="w-4 h-4" />
          </a>
          <Link
            href="#shop"
            className="inline-flex items-center gap-1 border border-brand-gold text-brand-gold rounded-full px-4 py-1 text-sm tracking-wide hover:bg-brand-gold hover:text-white transition-colors font-display"
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
        </nav>

        {/* ハンバーガーメニューボタン（SP用） */}
        <motion.button
          className="md:hidden w-6 h-6 flex flex-col justify-center items-center gap-1.5"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          {[1, 2, 3].map((line) => (
            <motion.span
              key={line}
              className="w-6 h-0.5 bg-gray-600 block"
              variants={lineVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              custom={line}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.button>
      </div>

      {/* モバイル用メニュー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white/98 backdrop-blur-sm shadow-lg"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-6 py-6 space-y-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  custom={index}
                >
                  <Link
                    href={item.href}
                    className="block text-gray-700 hover:text-rose-500 transition-colors duration-300 py-2 font-display text-lg tracking-wide"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="py-2"
                variants={itemVariants}
                initial="closed"
                animate="open"
                custom={menuItems.length}
              >
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-pink-500 hover:text-pink-600 transition-colors duration-300 py-3 font-display text-base"
                  aria-label="Instagram"
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/icons/instagram.svg" alt="" className="w-5 h-5" />
                  Instagram
                </a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                custom={menuItems.length + 1}
                className="pt-2"
              >
                <Link
                  href="#shop"
                  className="inline-flex items-center gap-2 bg-brand-gold text-white rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-opacity-90 transition-all duration-300 shadow-md"
                  onClick={() => setIsOpen(false)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
