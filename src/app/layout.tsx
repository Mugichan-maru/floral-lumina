// app/layout.tsx
import "./globals.css";
import { Marcellus, Noto_Sans_JP } from "next/font/google";
import type { Metadata } from "next";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/Cart/CartDrawer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Floral Lumina",
  description: "Decorate your hands with flower smartphone case",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${marcellus.variable} ${notoSansJP.variable} scroll-smooth`}
    >
      <body>
        <CartProvider>
          <Header />
          <main className="pt-24 md:pt-16">
            {/* mainタグで囲んでpaddingを追加 */}
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
