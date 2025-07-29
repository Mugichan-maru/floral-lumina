// components/About.tsx
export default function About() {
  return (
    <section id="about" className="bg-rose-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif tracking-wide mb-4 text-gray-800">
            Luminaについて
          </h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto"></div>
        </div>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg leading-loose text-gray-700 mb-6">
            ネイルのように手元が華やぐスマホケース屋さん
          </p>
          <p className="leading-loose text-gray-600">
            丁寧な仕上げと季節感を大切に、一つ一つ手作業で制作しています。
            ギャラリーからお気に入りのデザインを見つけてください。
          </p>
        </div>
      </div>
    </section>
  );
}
