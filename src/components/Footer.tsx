// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-serif tracking-wide text-rose-300 mb-4">
            Floral Lumina
          </h3>
          <p className="text-gray-300 text-sm">手元華やぐスマホケース</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
          {[
            { label: "Top", href: "#top" },
            { label: "About", href: "#about" },
            { label: "Q&A", href: "#qa" },
            { label: "News", href: "#news" },
          ].map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="hover:text-rose-300 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="text-center text-sm text-gray-400 border-t border-gray-700 pt-8">
          © 2025 Floral Lumina
        </div>
      </div>
    </footer>
  );
}
