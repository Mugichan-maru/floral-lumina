// components/Charm.tsx
const features = [
  "こだわりデザイン 様々な機種対応",
  "綺麗な仕上げ 季節ごとの新作も",
  "android勢もうれしい 細部まで丁寧に"
]

export default function Charm() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
      {features.map((text, i) => (
        <div key={i} className="text-center border p-6 rounded shadow">
          <div className="text-4xl font-bold text-gray-400 mb-2">0{i + 1}</div>
          <p className="leading-relaxed whitespace-pre-line">{text}</p>
        </div>
      ))}
    </section>
  )
}