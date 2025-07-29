// components/Header.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* ブランド名 */}
        <div
          className="flex items-center gap-2 text-2xl tracking-wide text-gray-700"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <img
            src="/icons/flower.svg"
            alt="Floral Lumina ロゴ"
            className="w-18 h-18"
          />
          <Link href="/">Floral Lumina</Link>
        </div>

        {/* ナビゲーション（PC用） */}
        <nav className="hidden md:flex gap-8 text-sm tracking-wide items-center">
          {[
            { label: "Top", href: "#top" },
            { label: "About", href: "#about" },
            { label: "Q&A", href: "#qa" },
            { label: "News", href: "#news" },
          ].map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="text-gray-600 hover:text-rose-500 transition-colors duration-300"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.instagram.com" // ←あなたのInstagramアカウントURLに変更
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1"
            style={{ fontFamily: "var(--font-display)" }}
            aria-label="Instagram"
          >
            <img src="/icons/instagram.svg" alt="" className="w-4 h-4" />
          </a>
          <Link
            href="#shop"
            className="inline-flex items-center gap-1 border border-[var(--brand-gold)] text-[var(--brand-gold)] rounded-full px-4 py-1 text-sm tracking-wide hover:bg-[var(--brand-gold)] hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 transition-colors group-hover:text-white"
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

        {/* メニューボタン（SP用） */}
        <button
          className="md:hidden text-sm text-gray-600"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* モバイル用メニュー */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-white border-t px-4 pb-4 space-y-4 transition-all duration-300 ${
          open ? "block" : "hidden"
        }`}
      >
        {[
          { label: "Top", href: "#top" },
          { label: "About", href: "#about" },
          { label: "Q&A", href: "#qa" },
          { label: "News", href: "#news" },
        ].map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="block text-gray-600 hover:text-rose-500 transition-colors duration-300 py-2 font-display"
          >
            {item.label}
          </Link>
        ))}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors duration-300 py-2 font-display"
          aria-label="Instagram"
        >
          <img src="/icons/instagram.svg" alt="" className="w-4 h-4" />
          Instagram
        </a>
        <Link
          href="#shop"
          className="inline-flex w-fit items-center gap-1 border border-[var(--brand-gold)] text-[var(--brand-gold)] rounded-full px-4 py-2 text-sm tracking-wide hover:bg-[var(--brand-gold)] hover:text-white transition-colors group font-display"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 transition-colors group-hover:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Online Shop
        </Link>
      </div>
    </header>
  );
}
