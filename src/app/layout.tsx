// app/layout.tsx
import "./globals.css";
import { Marcellus, Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Header";
import CartDrawer from "@/components/Cart/CartDrawer";
import { CartProvider } from "use-shopping-cart";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Floral Lumina",
  description: "Decorate your hands with flower smartphone case",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${marcellus.variable} ${openSans.variable} scroll-smooth`}
    >
      <body>
        <CartProvider
          mode="payment"
          cartMode="client-only"
          stripe={process.env.STRIPE_PUBLISHABLE_KEY!}
          currency="JPY"
          successUrl={process.env.NEXT_PUBLIC_SUCCESS_URL!}
          cancelUrl={process.env.NEXT_PUBLIC_CANCEL_URL!}
          allowedCountries={["JP"]}
          shouldPersist={true}
          language="ja-JP"
        >
          <Header />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
