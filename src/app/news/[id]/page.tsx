// app/news/[id]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getNewsById, getAllNews } from "@/utils/newsUtils";

// メタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    return { title: "News not found - Floral Lumina" };
  }

  return {
    title: `${news.title} - Floral Lumina`,
    description: news.excerpt || news.content.substring(0, 160),
  };
}

// SSG 用のパラメータ
export async function generateStaticParams() {
  const newsItems = await getAllNews();
  return newsItems.map((news) => ({ id: news.id }));
}

// ページ本体
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダースペーサー */}
      <div style={{ height: "80px" }} />

      {/* メインビジュアル */}
      <section className="relative h-64 md:h-80 bg-gray-200">
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/icons/hero.jpeg)" }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl md:text-4xl font-display tracking-wide mb-2">
            News
          </h1>
          <p className="text-sm md:text-base font-body opacity-90">お知らせ</p>
        </div>
      </section>

      {/* パンくずリスト */}
      <section className="py-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 font-body">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <Link
              href="/news"
              className="hover:text-brand-gold transition-colors"
            >
              News
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-brand-gold truncate">{news.title}</span>
          </nav>
        </div>
      </section>

      {/* 記事詳細 */}
      <article className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* 記事ヘッダー */}
          <header className="mb-8 md:mb-12">
            <div className="flex items-center gap-4 mb-4">
              <time className="text-sm text-gray-500 font-body">
                {news.date}
              </time>
              <span className="bg-brand-gold text-white px-3 py-1 rounded text-xs font-body">
                {news.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-gray-dark leading-relaxed">
              {news.title}
            </h1>
          </header>

          {/* 記事本文 */}
          <div className="prose prose-gray max-w-none">
            <div className="text-base md:text-lg font-body text-gray-text leading-relaxed whitespace-pre-line">
              {news.content}
            </div>
          </div>

          {/* 戻るリンク */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-brand-gold hover:text-gray-600 transition-colors font-display"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              ニュース一覧に戻る
            </Link>
          </div>
        </div>
      </article>

      {/* Contact セクション */}
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
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
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

      {/* フッター */}
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
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
            <Link
              href="/#top"
              className="text-gray-600 hover:text-brand-gold transition-colors font-display"
            >
              Top
            </Link>
            <Link
              href="/#about"
              className="text-gray-600 hover:text-brand-gold transition-colors font-display"
            >
              About
            </Link>
            <Link
              href="/news"
              className="text-gray-600 hover:text-brand-gold transition-colors font-display"
            >
              News
            </Link>
          </div>
          <div className="text-xs text-gray-500 border-t border-gray-300 pt-4">
            © 2025 Floral Lumina
          </div>
        </div>
      </footer>
    </div>
  );
}
