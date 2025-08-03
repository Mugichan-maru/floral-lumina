// components/ShopInfo.tsx
export default function ShopInfo() {
  return (
    <section id="shopinfo" className="bg-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl font-display tracking-wide mb-4 text-gray-text md:text-3xl">
            Shop Info
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto md:w-16"></div>
        </div>

        {/* モバイル: 縦積み、デスクトップ: 横並び */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
          {/* 左側: 店舗情報 */}
          <div className="text-center md:w-1/2 md:text-left">
            {/* 花のアイコン */}
            <div className="flex justify-center mb-6 md:justify-start md:mb-8">
              <img
                src="/icons/flower.svg"
                alt=""
                className="w-12 h-12 md:w-16 md:h-16 opacity-80"
              />
            </div>

            {/* 店舗名 */}
            <h3 className="text-xl font-display text-gray-text mb-8 md:text-2xl md:mb-12">
              Floral Lumina
            </h3>

            {/* view more ボタン */}
            <div className="space-y-3 md:space-y-4">
              <button className="w-full border border-brand-gold text-brand-gold rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-brand-gold hover:text-white transition-colors duration-300 md:w-auto md:px-8">
                view more
              </button>
              <button className="w-full border border-brand-gold text-brand-gold rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-brand-gold hover:text-white transition-colors duration-300 md:w-auto md:px-8">
                view more
              </button>
            </div>
          </div>

          {/* 右側: 画像エリア */}
          <div className="flex justify-center md:w-1/2">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md max-w-sm w-full md:max-w-md">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop&crop=center"
                alt="おしゃれな店内インテリア"
                className="w-full h-64 object-cover md:h-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
