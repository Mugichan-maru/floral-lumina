// components/Charm.tsx
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
          <h1 className="text-base text-brand-gold tracking-widest font-display mb-2 md:text-xl">
            Luminaの魅力
          </h1>
          <h2 className="text-2xl font-display mb-4 text-gray-text md:text-3xl">
            Charm
          </h2>
        </div>

        {/* モバイル: 2-1グリッド、デスクトップ: 横並び */}
        <div className="grid grid-cols-2 gap-6 mb-8 md:grid-cols-3 md:gap-8 md:mb-0">
          {/* 01と02 - モバイルでは上段に2つ並ぶ */}
          {features.slice(0, 2).map((feature, i) => (
            <div key={i} className="text-center tracking-wider">
              {/* 番号 */}
              <div className="text-lg text-gray-text mb-2 md:text-3xl font-thin font-display">
                {feature.number}
              </div>
              {/* 丸いカード */}
              <div className="w-32 h-32 bg-[#F1F1F1] rounded-full shadow-md flex flex-col items-center justify-center mx-auto mb-3 md:w-40 md:h-40 md:mb-6"></div>

              {/* サブタイトル */}
              <p className="text-brand-gold text-xs leading-tight font-body mb-1 md:text-sm">
                {feature.subtitle}
              </p>
              {/* 説明文 */}
              <p className="text-gray-text text-sm font-body md:text-base">
                {feature.description}
                {i === 0 && (
                  <>
                    <br />
                    <span className="underline">機能対応表はこちら→</span>
                  </>
                )}
              </p>
            </div>
          ))}

          {/* 03 - モバイルでは下段中央に配置、デスクトップでは右端 */}
          <div className="col-span-2 flex justify-center md:col-span-1 md:block">
            <div className="text-center tracking-wider">
              {/* 番号 */}
              <div className="text-lg text-gray-text mb-2 md:text-3xl font-thin font-display">
                {features[2].number}
              </div>
              {/* 丸いカード */}
              <div className="w-32 h-32 bg-[#F1F1F1] rounded-full shadow-md flex flex-col items-center justify-center mx-auto mb-3 md:w-40 md:h-40 md:mb-6"></div>

              {/* サブタイトル */}
              <p className="text-brand-gold text-xs leading-tight font-body mb-1 md:text-sm">
                {features[2].subtitle}
              </p>
              {/* 説明文 */}
              <p className="text-gray-text text-sm font-body md:text-base">
                {features[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
