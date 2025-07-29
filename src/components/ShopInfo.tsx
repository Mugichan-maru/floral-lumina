// components/ShopInfo.tsx
export default function ShopInfo() {
  return (
    <section id="shopinfo" className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif tracking-wide mb-4 text-gray-800">
            店舗情報
          </h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto"></div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-serif text-gray-800 mb-6">
              Floral Lumina
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">営業時間：</span>10:00〜18:00
              </p>
              <p>
                <span className="font-medium">定休日：</span>日曜日
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ※臨時でお休みをいただく場合がございます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
