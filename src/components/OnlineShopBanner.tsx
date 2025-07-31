// components/OnlineShopBanner.tsx
export default function OnlineShopBanner() {
  return (
    <section className="relative py-12 md:py-20">
      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/icons/shopBanner.jpeg')`,
        }}
      >
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-display tracking-wide mb-4 text-gray-dark md:text-3xl">
            Online Shop
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto md:w-16"></div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <p className="text-base font-body text-gray-dark md:text-lg">
            商品一覧はこちら
          </p>

          <div className="pt-2 md:pt-4">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 bg-brand-gold text-white rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-opacity-90 transition-all duration-300 shadow-md md:px-8 md:py-4 md:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Online Shop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
