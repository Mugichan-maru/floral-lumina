// components/ShopInfo.tsx
import Image from "next/image";

export default function ShopInfo() {
  return (
    <section id="shopinfo" className="relative py-12 md:py-20">
      {/* 背景テクスチャ */}
      <div className="absolute inset-0">
        <Image
          src="/banners/brand-texture.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-sm text-brand-gold tracking-widest font-display mb-2 md:text-base">
            店舗情報
          </h1>
          <h2 className="text-2xl font-display tracking-widest text-gray-text md:text-3xl">
            Shop Info
          </h2>
        </div>

        {/* メインコンテンツ */}
        <div className="text-center space-y-8">
          {/* 店舗画像 */}
          <div className="flex justify-center">
            <div className="w-48 h-48 md:w-60 md:h-60 relative">
              <Image
                src="/banners/shop-image.svg"
                alt="店舗イメージ"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* ロゴ */}
          <div className="flex justify-center">
            <Image
              src="/icons/logo.png"
              alt="Floral Lumina ロゴ"
              width={80}
              height={64}
              className="w-48 md:w-56 h-auto"
            />
          </div>

          {/* 店舗名 */}
          <div>
            <h3 className="text-2xl font-display text-gray-text tracking-widest md:text-2xl">
              Floral Lumina
            </h3>
          </div>

          {/* 営業情報 */}
          <div className="space-y-2 text-sm text-gray-text font-body md:text-base">
            <div>
              <span className="text-gray-500">営業時間：</span>
              <span>00:00〜00:00</span>
            </div>
            <div>
              <span className="text-gray-500">定休日：</span>
              <span>○曜日</span>
            </div>
            <p className="text-xs text-gray-500 mt-4 md:text-sm">
              ※臨時でお休みをいただく場合がございます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
