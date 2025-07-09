// components/Hero.tsx
export default function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-16 bg-[url('/hero.jpg')] bg-cover bg-center text-white relative">
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif tracking-wide mb-4">
          Floral Lumina
        </h1>
        <p className="text-lg md:text-xl tracking-wider">
          Decorate your hands with flower smartphone case
        </p>
      </div>
    </section>
  )
}