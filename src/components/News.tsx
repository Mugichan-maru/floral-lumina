// components/News.tsx
export default function News() {
  const newsItems = [
    {
      date: "2025.01.15",
      content: "『Floral Lumina』のホームページを公開いたしました。",
    },
    {
      date: "2025.01.10",
      content:
        "春の新作コレクションを追加いたしました。桜をモチーフにした限定デザインも登場です。",
    },
  ];

  return (
    <section id="news" className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif tracking-wide mb-4 text-gray-800">
          お知らせ
        </h2>
        <div className="w-20 h-1 bg-rose-400 mx-auto"></div>
      </div>
      <div className="space-y-6">
        {newsItems.map((item, index) => (
          <div key={index} className="border-l-4 border-rose-200 pl-6 py-4">
            <div className="text-sm text-rose-500 font-medium mb-2">
              {item.date}
            </div>
            <div className="text-gray-700 leading-relaxed">{item.content}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="text-rose-500 hover:text-rose-600 text-sm uppercase tracking-wide">
          view more
        </button>
      </div>
    </section>
  );
}
