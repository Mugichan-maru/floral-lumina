// components/Hero.tsx
export default function Hero() {
  return (
    <section
      id="top"
      className="relative bg-[url(/icons/hero.jpeg)] bg-cover bg-center h-[600px] flex items-center justify-center"
      style={{ marginTop: "80px" }}
    >
      {/* オーバーレイ（やや白くぼかす） */}
      <div className="absolute inset-0 bg-gray-200/30" />

      <div className="relative z-10 text-center px-4">
        <p
          className="text-white text-lg md:text-xl tracking-wider mb-1 opacity-90"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
        >
          Decorate your hands
          <br />
          with flower smartphone case
        </p>
        <p
          className="text-white text-base md:text-2xl tracking-wide font-light"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
        >
          手元華やぐスマホケース
        </p>
      </div>
    </section>
  );
}
