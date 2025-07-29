// components/Charm.tsx
const features = [
  {
    number: "01",
    title: "こだわりデザイン",
    subtitle: "様々な機種対応",
    description: "季節感を大切にしたオリジナルデザイン",
  },
  {
    number: "02",
    title: "綺麗な仕上げ",
    subtitle: "季節ごとの新作も",
    description: "丁寧な手作業による美しい仕上がり",
  },
  {
    number: "03",
    title: "android勢もうれしい",
    subtitle: "細部まで丁寧に",
    description: "幅広い機種に対応した確かな技術",
  },
];

export default function Charm() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif tracking-wide mb-4 text-gray-800">
            Luminaの魅力
          </h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl font-bold text-rose-200 mb-4">
                {feature.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-rose-500 text-sm mb-4">{feature.subtitle}</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
