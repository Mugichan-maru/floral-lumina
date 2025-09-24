// app/news/page.tsx
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { getAllNews } from "@/utils/newsUtils";

export const metadata = {
  title: "News - Floral Lumina",
  description: "Floral Luminaの最新ニュース・お知らせ",
};

export default function NewsPage() {
  const newsItems = getAllNews();

  // ページネーション設定
  const itemsPerPage = 10;
  const currentPage = 1;
  const totalPages = 5; // テスト用: 5枚以上
  const displayItems = newsItems.slice(0, itemsPerPage);

  // カテゴリー／アーカイブ
  const categories = ["お知らせ", "ブログ", "商品紹介"];
  const archives = ["2025.09", "2025.08", "2025.07"];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div style={{ height: "80px" }} />

      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/icons/hero.jpeg"
          alt="Floral Lumina News"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#828282]/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl md:text-4xl font-display tracking-wide mb-2 text-white">
            News
          </h1>
          <p className="text-sm md:text-base font-body opacity-90">お知らせ</p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* カテゴリー／アーカイブ */}
          <div className="mb-8 md:mb-12 rounded-md bg-gray-100 px-4 py-6 md:px-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-[13px] tracking-wide font-display text-brand-gold">
                  カテゴリー
                </div>
                <div className="mt-1 h-[2px] w-24 bg-[#CBB17B]" />
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        href={`/news?category=${encodeURIComponent(c)}`}
                        className="hover:text-brand-gold transition-colors"
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[13px] tracking-wide font-display text-brand-gold">
                  アーカイブ
                </div>
                <div className="mt-1 h-[2px] w-24 bg-[#CBB17B]" />
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {archives.map((m) => (
                    <li key={m}>
                      <Link
                        href={`/news?month=${m}`}
                        className="hover:text-brand-gold transition-colors"
                      >
                        {m}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* アコーディオン */}
          <div>
            {displayItems.map((item: any) => (
              <details
                key={item.id}
                className="group border-b border-[#CBB17B] py-6"
              >
                <summary className="relative pr-7 list-none cursor-pointer">
                  <div className="flex items-center gap-3 mb-2 text-sm text-gray-500">
                    <time className="tabular-nums">{item.date}</time>
                    {item.category && (
                      <span
                        className="inline-block rounded px-2 py-1 text-[11px] text-white"
                        style={{ backgroundColor: "#CBB17B" }}
                      >
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-gray-800 text-base md:text-lg">
                    {item.title}
                  </h3>
                  <span className="absolute right-0 bottom-0">
                    <svg
                      className="w-4 h-4 text-brand-gold group-open:hidden"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-brand-gold hidden group-open:block"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-sm text-gray-700 leading-relaxed">
                  {item.thumbnail && (
                    <div className="mb-4">
                      <Image
                        src={item.thumbnail}
                        alt=""
                        width={640}
                        height={360}
                        className="w-full max-w-md aspect-video object-cover bg-gray-300"
                      />
                    </div>
                  )}
                  <p>{item.excerpt || item.content}</p>
                  <div className="mt-3">
                    <Link
                      href={`/news/${item.id}`}
                      className="text-sm underline decoration-[#CBB17B] text-brand-gold"
                    >
                      詳しく見る
                    </Link>
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* ページネーション */}
          {totalPages >= 1 && (
            <div className="flex justify-center mt-12 md:mt-16">
              <nav className="flex items-center gap-3" aria-label="Pagination">
                <button
                  aria-label="Previous page"
                  disabled={currentPage === 1}
                  className="w-6 h-6 flex items-center justify-center disabled:text-gray-300 text-brand-gold"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 18l-6-6 6-6"
                    />
                  </svg>
                </button>

                {(() => {
                  const pages: (number | "dots")[] = [];
                  const add = (n: number) => pages.push(n);
                  const DOTS: "dots" = "dots";

                  if (totalPages < 5) {
                    for (let i = 1; i <= totalPages; i++) add(i);
                  } else {
                    add(1);
                    add(2);
                    add(3);
                    pages.push(DOTS);
                    add(totalPages);
                  }

                  return pages.map((p, idx) =>
                    p === "dots" ? (
                      <span
                        key={`dots-${idx}`}
                        className="px-1 text-gray-400 select-none"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        className={
                          "px-1 text-sm leading-none " +
                          (currentPage === p
                            ? "text-brand-gold font-medium underline decoration-[#CBB17B] underline-offset-4"
                            : "text-gray-600 hover:text-brand-gold")
                        }
                        aria-current={currentPage === p ? "page" : undefined}
                      >
                        {p}
                      </button>
                    )
                  );
                })()}

                <button
                  aria-label="Next page"
                  disabled={currentPage === totalPages}
                  className="w-6 h-6 flex items-center justify-center disabled:text-gray-300 text-brand-gold"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6l6 6-6 6"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Contactとフッター */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display tracking-wide mb-4 text-gray-text md:text-3xl">
            Contact
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mb-8 md:w-16 md:mb-12"></div>

          <div className="mb-8 md:mb-12">
            <h3 className="text-lg font-display text-gray-text mb-4 md:text-xl md:mb-6">
              ご注文・お問い合わせ
            </h3>
            <p className="text-sm text-gray-text font-body leading-relaxed md:text-base">
              ご注文は『Online Shop』ページから、
              <br />
              ご不明などのお問い合わせはInstagramから承っております。
            </p>
          </div>

          <div className="space-y-4 md:space-y-0 md:flex md:gap-6 md:justify-center">
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 w-full bg-brand-gold text-white rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-opacity-90 transition-all duration-300 shadow-md md:w-auto md:px-8 md:py-4"
            >
              Online Shop
            </Link>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-pink-400 text-pink-500 rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-pink-500 hover:text-white transition-colors duration-300 md:w-auto md:px-8 md:py-4"
            >
              <Image
                src="/icons/instagram.svg"
                alt=""
                width={16}
                height={16}
                className="w-4 h-4"
              />
              Instagram
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 text-center py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center mb-4">
            <Image
              src="/icons/flower.svg"
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 opacity-70"
            />
          </div>
          <h3 className="text-lg font-display tracking-wide text-gray-800 mb-4">
            Floral Lumina
          </h3>
          <div className="text-xs text-gray-500 border-t border-gray-300 pt-4">
            © 2025 Floral Lumina
          </div>
        </div>
      </footer>
    </div>
  );
}
