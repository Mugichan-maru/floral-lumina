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
    <section id="top" className="relative mt-20 overflow-hidden md:mt-24">
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
        className="w-full"
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            {/* モバイル3:4、デスクトップ16:9 */}
            <div className="relative w-full aspect-[3/4] md:aspect-[16/9]">
              <Image
                src={image}
                alt={`Hero image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
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
