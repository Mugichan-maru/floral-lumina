// app/_providers/CartProviders.tsx
"use client";

import { CartProvider } from "use-shopping-cart";
import React from "react";

export default function CartProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      currency="JPY"
      successUrl={process.env.NEXT_PUBLIC_SUCCESS_URL!}
      cancelUrl={process.env.NEXT_PUBLIC_CANCEL_URL!}
      allowedCountries={["JP"]}
      shouldPersist={true}
      language="ja-JP"
    >
      {children}
    </CartProvider>
  );
}
