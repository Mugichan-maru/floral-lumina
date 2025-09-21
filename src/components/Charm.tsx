// components/Charm.tsx
import ViewMoreButton from "./ui/ViewMoreButton";

const features = [
  {
    number: "01",
    subtitle: "android勢もうれしい",
    description: "様々な機種対応",
  },
  {
    number: "02",
    subtitle: "季節ごとの新作も",
    description: "こだわりデザイン",
  },
  {
    number: "03",
    subtitle: "細部まで丁寧に",
    description: "綺麗な仕上げ",
  },
];

export default function Charm() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl font-display tracking-wide mb-4 text-gray-text md:text-3xl">
            Charm
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto md:w-16"></div>
        </div>

        {/* モバイル: 縦積み、デスクトップ: 横並び */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {features.map((feature, i) => (
            <div key={i} className="text-center">
              {/* 番号 */}
              <div className="text-2xl font-bold text-brand-gold mb-1 md:text-3xl font-display">
                {feature.number}
              </div>
              {/* 丸いカード */}
              <div className="w-32 h-32 bg-gray-50 rounded-full shadow-md flex flex-col items-center justify-center mx-auto mb-4 md:w-40 md:h-40 md:mb-6"></div>

              {/* サブタイトル */}
              <p className="text-brand-gold text-xs leading-tight font-body md:text-sm">
                {feature.subtitle}
              </p>
              {/* 説明文 */}
              <p className="text-gray-text text-sm font-body md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* view more ボタン */}
        <div className="text-center mt-8 md:mt-16">
          <ViewMoreButton />
        </div>
      </div>
    </section>
  );
}
