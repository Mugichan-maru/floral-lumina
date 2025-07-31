// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-6 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* メインコンテンツ */}
        <div className="text-center mb-8 md:mb-12">
          {/* 花のアイコン */}
          <div className="flex justify-center mb-2 md:mb-6">
            <img
              src="/icons/flower.svg"
              alt=""
              className="w-24 h-24 md:w-10 md:h-10 opacity-70"
            />
          </div>

          <h3 className="text-xl font-display tracking-wide text-gray-800 mb-2 md:text-2xl md:mb-4">
            Floral Lumina
          </h3>
        </div>

        {/* ナビゲーションリンク */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm md:gap-8 md:mb-12 md:text-base">
          {[
            { label: "Top", href: "#top" },
            { label: "About", href: "#about" },
            { label: "Q&A", href: "#qa" },
            { label: "News", href: "#news" },
          ].map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="text-gray-600 hover:text-brand-gold transition-colors duration-300 font-display"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* ソーシャルリンクとOnline Shop */}
        <div className="flex flex-col items-center gap-4 mb-8 md:flex-row md:justify-center md:gap-6 md:mb-12">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors duration-300 font-display"
            aria-label="Instagram"
          >
            <img src="/icons/instagram.svg" alt="" className="w-4 h-4" />
            Instagram
          </a>

          <Link
            href="#shop"
            className="flex items-center gap-2 text-brand-gold hover:text-gray-600 transition-colors duration-300 font-display"
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
        </div>

        {/* 営業情報 */}
        <div className="text-center mb-8 text-sm md:mb-12 md:text-base">
          <div className="space-y-2 text-gray-600 font-body">
            <div className="flex justify-center items-center gap-2">
              <span className="text-gray-500">営業時間：</span>
              <span>10:00〜18:00</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <span className="text-gray-500">定休日：</span>
              <span>日曜日</span>
            </div>
            <p className="text-xs text-gray-500 mt-3 md:text-sm">
              ※臨時でお休みをいただく場合がございます。
            </p>
          </div>
        </div>

        {/* コピーライト */}
        <div className="text-center text-xs text-gray-500 border-t border-gray-300 pt-6 md:text-sm md:pt-8">
          © 2025 Floral Lumina
        </div>
      </div>
    </footer>
  );
}
