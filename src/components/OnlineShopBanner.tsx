// components/OnlineShopBanner.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function OnlineShopBanner() {
  return (
    <section className="py-6 md:py-10">
      <Link
        href="/products"
        className="group block mx-auto w-[335px] md:w-[640px]"
        aria-label="Floral Lumina Online Shop（商品一覧はこちら）"
      >
        <div className="relative aspect-[335/185]">
          {/* 金色シェイプ（SVG）だけ */}
          <Image
            src="/banners/online-shop-shapes.svg"
            alt=""
            fill
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* テキスト */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="text-[12px] md:text-sm tracking-[0.22em] text-neutral-600">
                Floral Lumina
              </p>
              <h2 className="mt-2 text-[22px] md:text-[32px] leading-none tracking-wide text-neutral-700">
                Online Shop
              </h2>
              <p className="mt-2 md:mt-3 text-[12px] md:text-sm text-neutral-600">
                商品一覧はこちら
              </p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
