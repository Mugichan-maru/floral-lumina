// components/Contact.tsx
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* 白い背景のカード */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-12 max-w-md mx-auto">
          {/* タイトル部分 */}
          <div className="text-center mb-8">
            <p className="text-brand-gold text-sm font-body tracking-wide mb-2">
              ご注文・お問い合わせ
            </p>
            <h2 className="text-2xl font-display tracking-wide text-gray-dark">
              Contact
            </h2>
          </div>

          {/* 説明文 */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-text font-body leading-relaxed">
              ご注文は「Online Shop」ページから、
              <br />
              ご不明などのお問い合わせはInstagramから
              <br />
              承っております。
            </p>
          </div>

          {/* よくあるご質問リンク */}
          <div className="text-center mb-8">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-gray-text hover:text-brand-gold transition-colors duration-300 text-sm font-body"
            >
              よくあるご質問はこちら
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
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>

          {/* ボタン群 */}
          <div className="space-y-4">
            {/* Online Shopボタン */}
            <Link
              href="/#shop"
              className="w-full bg-brand-gold text-white rounded-full px-6 py-4 text-sm font-display tracking-wide hover:bg-opacity-90 transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Online Shop
            </Link>

            {/* お問い合わせボタン */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border-2 border-gray-300 text-gray-text rounded-full px-6 py-4 text-sm font-display tracking-wide hover:border-brand-gold hover:text-brand-gold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              お問い合わせ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
