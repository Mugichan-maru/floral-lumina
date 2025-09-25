// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  // ナビゲーションを3行に分けて定義
  const navigationRows = [
    [
      { label: "Top", href: "/#top" },
      { label: "About", href: "/#about" },
      { label: "Gallery", href: "/#gallery" },
    ],
    [
      { label: "Q&A", href: "/#qa" },
      { label: "News", href: "/#news" },
      { label: "Contact", href: "/#contact" },
    ],
    [
      { label: "Online Shop", href: "/products" },
      { label: "特定商取引法", href: "/tokusho" },
      { label: "カート", href: "/cart" },
    ],
  ];

  return (
    <footer className="bg-gray-100 text-gray-800 py-6 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* メインコンテンツ */}
        <div className="text-center mb-8 md:mb-12">
          {/* ロゴ */}
          <div className="flex justify-center mb-2 md:mb-6">
            <Image
              src="/icons/logo.png"
              alt="Floral Lumina ロゴ"
              width={240}
              height={64}
              className="h-16 w-auto md:h-20"
            />
          </div>
        </div>

        {/* ナビゲーションリンク - 3行レイアウト */}
        <div className="text-center tracking-widest mb-8 md:mb-12">
          {navigationRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-8 mb-3 text-sm md:gap-12 md:mb-4 md:text-base"
            >
              {row.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  className="text-gray-600 hover:text-brand-gold transition-colors duration-300 font-display"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* ソーシャルリンク */}
        <div className="flex justify-center mb-8 md:mb-12">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition-colors duration-300"
            aria-label="Instagram"
          >
            <Image
              src="/icons/instagram.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </a>
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
        <div className="text-center text-xs text-gray-500 border-t border-brand-gold pt-4 md:text-sm md:pt-8">
          © 2025 Floral Lumina
        </div>
      </div>
    </footer>
  );
}
