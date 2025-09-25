// components/Voice.tsx
"use client";
import { useState } from "react";

const voices = [
  {
    id: 1,
    customer: "○○様",
    product: "スマホケース（アモキネ）",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: 2,
    customer: "○○様",
    product: "スマホケース（マーガレット）",
    content:
      "とても可愛いデザインで気に入りました。手触りも良く、しっかりとスマホを保護してくれています。季節感のあるデザインが素敵で、持っているだけで気分が上がります。また新作が出たら購入したいと思います。",
  },
  {
    id: 3,
    customer: "○○様",
    product: "スマホケース（向日葵）",
    content:
      "明るい色合いが夏にぴったりで、とても満足しています。作りも丁寧で、細かい部分まで手作りの温かみを感じられます。友人からも好評で、プレゼントとしてもおすすめしたいです。",
  },
];

export default function Voice() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? voices.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === voices.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentVoice = voices[currentIndex];

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* タイトル */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-sm text-brand-gold tracking-widest font-display mb-2 md:text-base">
            お客様の声
          </h1>
          <h2 className="text-2xl font-display tracking-wide text-gray-text mb-4 md:text-3xl">
            Voice
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto md:w-16"></div>
        </div>

        {/* メインコンテンツ */}
        <div className="relative">
          {/* ナビゲーションボタン - 上側に配置 */}
          <div className="flex items-center mb-6 gap-4">
            <button
              onClick={goToPrevious}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-300"
              aria-label="前のお客様の声"
            >
              <svg
                className="w-4 h-4 text-brand-gold"
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
            </button>

            <button
              onClick={goToNext}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-300"
              aria-label="次のお客様の声"
            >
              <svg
                className="w-4 h-4 text-brand-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* お客様の声カード */}
          <div className="bg-[#F1F1F1] rounded-xl shadow-sm p-6 md:p-8">
            {/* 顧客情報 */}
            <div className="mb-4 border-b border-brand-gold pb-4">
              <h3 className="text-sm mx-4 font-body text-gray-dark md:text-base">
                {currentVoice.customer}：{currentVoice.product}
              </h3>
            </div>

            {/* レビュー内容 */}
            <div>
              <p className="text-sm font-body text-gray-text leading-relaxed md:text-base md:leading-relaxed">
                {currentVoice.content}
              </p>
            </div>
          </div>

          {/* インジケーター */}
          <div className="flex justify-center mt-6 space-x-2">
            {voices.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-brand-gold" : "bg-gray-300"
                }`}
                aria-label={`お客様の声 ${index + 1}番目`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
