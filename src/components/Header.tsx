// components/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CartButton from "./Cart/CartButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // ホームページ以外の場合は絶対パスにする
  const getHref = (hash: string) => {
    return pathname === "/" ? hash : `/${hash}`;
  };

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
    { label: "Top", href: getHref("#top") },
    { label: "About", href: getHref("#about") },
    { label: "Q&A", href: getHref("#qa") },
    { label: "News", href: getHref("#news") },
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* 左側スペーサー（モバイルでは非表示） */}
        <div className="hidden md:block w-24"></div>

        {/* 中央配置されたロゴ画像 */}
        <div className="flex-1 flex justify-center md:justify-center">
          <Link href="/" className="select-none group">
            <Image
              src="/icons/logo.png"
              alt="Floral Lumina ロゴ"
              width={960}
              height={360}
              priority
              quality={100}
              className="w-[220px] md:w-[300px] h-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
              style={{ imageRendering: "crisp-edges" }}
            />
          </Link>
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
            <Image
              src="/icons/instagram.svg"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </a>

          {/* Online Shop ボタン（商品一覧への遷移） */}
          <Link
            href="/products"
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

          {/* カートボタン（右端に配置） */}
          <CartButton />
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
                    className="block text-gray-text hover:text-rose-500 transition-colors duration-300 py-2 font-display text-lg tracking-wide"
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
                  <Image
                    src="/icons/instagram.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  Instagram
                </a>
              </motion.div>

              {/* モバイル用Online Shopボタン */}
              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                custom={menuItems.length + 1}
                className="pt-2"
              >
                <Link
                  href="/products"
                  className="block text-brand-gold hover:text-rose-500 transition-colors duration-300 py-2 font-display text-lg tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  Online Shop
                </Link>
              </motion.div>

              {/* モバイル用カートボタン */}
              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                custom={menuItems.length + 2}
                className="pt-2"
              >
                <CartButton />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
