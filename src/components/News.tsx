// components/News.tsx
import Link from "next/link";
import ViewMoreButton from "./ui/ViewMoreButton";

export default function News() {
  const newsItems = [
    {
      date: "00.00.00",
      category: "お知らせ",
      content: "『Floral Lumina』のホームページを公開いたしました。",
    },
    {
      date: "00.00.00",
      category: "お知らせ",
      content:
        "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    },
  ];

  return (
    <section id="news" className="bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-sm text-brand-gold tracking-widest font-display mb-2 md:text-xl">
            お知らせ
          </h1>
          <h2 className="text-2xl font-display mb-4 text-gray-text md:text-3xl">
            News
          </h2>
        </div>

        <div className="space-y-6">
          {newsItems.map((item, index) => (
            <article key={index} className="border-b border-brand-gold pb-6">
              {/* モバイルファースト: 縦積みレイアウト */}
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
                {/* 日付とカテゴリ - モバイルでは上部、デスクトップでは左側 */}
                <div className="flex items-center gap-3 md:w-48 md:flex-col md:items-end md:flex-shrink-0">
                  <time className="text-sm text-gray-text font-body md:mb-1">
                    {item.date}
                  </time>
                  <span className="bg-brand-gold text-white px-2 py-1 rounded text-xs font-body md:px-3">
                    {item.category}
                  </span>
                </div>

                {/* コンテンツ */}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-gray-text font-body md:text-base">
                    {item.content}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link href="/news">
            <ViewMoreButton />
          </Link>
        </div>
      </div>
    </section>
  );
}
