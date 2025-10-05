"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

// Swiperのスタイルをインポート
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 背景画像の配列
const heroImages = [
  "/icons/hero01.jpg",
  "/icons/hero02.jpg",
  "/icons/hero03.jpg",
  "/icons/hero04.jpg",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mt-20 overflow-hidden h-[60svh] md:h-[70svh] lg:h-[80svh] md:mt-24"
      // style={{ marginTop: "80px" }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        className="h-full"
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index} className="!h-full">
            <div className="relative w-full h-full md;h-screen">
              <Image
                src={image}
                alt={`Hero image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-contain"
                style={{
                  objectPosition: "center center",
                }}
                quality={90}
              />
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-gray-100/30" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 前へボタン */}
      {/* <button
        className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
        aria-label="前のスライド"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button> */}

      {/* 次へボタン */}
      {/* <button
        className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
        aria-label="次のスライド"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button> */}

      {/* テキストコンテンツ */}
      {/* <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-4">
          <p
            className="text-white text-lg md:text-xl tracking-wider mb-1 opacity-90"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.1em",
            }}
          >
            Decorate your hands
            <br />
            with flower smartphone case
          </p>
          <p
            className="text-white text-base md:text-2xl tracking-wide font-light"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.1em",
            }}
          >
            手元華やぐスマホケース
          </p>
        </div>
      </div> */}

      {/* インジケーター（ドット） */}
      <div className="swiper-pagination-custom absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2"></div>

      {/* カスタムページネーションスタイル */}
      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 4px;
          background: white;
        }
        .swiper-pagination-custom .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </section>
  );
}
