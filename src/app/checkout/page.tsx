// app/checkout/page.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import type { AddressParam } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Link from "next/link";
import { products } from "@/data/products";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Utility: parse price like "¥3,200" -> 3200
const parsePrice = (priceString: string): number => {
  const match = priceString.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10);
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState<string>("");
  const [shipping, setShipping] = useState<{
    value?: { name?: string; address?: unknown; phone?: string };
  } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!stripe || !elements) return;
    setLoading(true);

    const origin = window.location.origin;
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}/checkout/success`,
        receipt_email: email || undefined,
        shipping: shipping?.value?.name
          ? {
              name: shipping.value.name,
              address: shipping.value.address as AddressParam,
              phone: shipping.value.phone || undefined,
            }
          : undefined,
      },
    });

    if (result.error) {
      setMessage(result.error.message || "お支払いでエラーが発生しました");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-display text-gray-700">
          メールアドレス
        </label>
        <LinkAuthenticationElement
          onChange={(e) => setEmail(e.value.email)}
          options={{ defaultValues: { email } }}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-display text-gray-700">
          お届け先住所
        </label>
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["JP"],
            fields: { phone: "always" },
          }}
          onChange={(e) => setShipping(e)}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-display text-gray-700">
          お支払い方法
        </label>
        <PaymentElement options={{ layout: "accordion" }} />
        <p className="text-xs text-gray-500 font-body">
          Apple Pay / Google Pay
          はブラウザと環境が対応している場合に表示されます。
        </p>
      </div>

      {message && <p className="text-sm text-red-500 font-body">{message}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-brand-gold text-white py-3 rounded-full font-display text-lg disabled:opacity-60"
      >
        {loading ? "処理中..." : "支払いを確定する"}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<
    Array<{ id: string; title: string; price: string; quantity: number }>
  >([]);

  useEffect(() => {
    const run = async () => {
      try {
        const raw = sessionStorage.getItem("floral-lumina-cart");
        const parsed: Array<{ product?: { id: string }; quantity: number }> =
          raw ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed) || parsed.length === 0) {
          setError("カートが空です");
          return;
        }
        // Build order summary (title/price from server catalog)
        const summary = parsed
          .map((i) => {
            const id = i.product?.id;
            const p = id ? products[id] : undefined;
            if (!id || !p) return null;
            return { id, title: p.title, price: p.price, quantity: i.quantity };
          })
          .filter(Boolean) as Array<{
          id: string;
          title: string;
          price: string;
          quantity: number;
        }>;
        setCart(summary);

        const items = summary.map((i) => ({ id: i.id, quantity: i.quantity }));
        const res = await fetch("/api/payments/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to create intent");
        setClientSecret(data.clientSecret);
      } catch (e: unknown) {
        setError((e as Error)?.message || "初期化に失敗しました");
      }
    };
    run();
  }, []);

  const elementsOptions = useMemo(
    () =>
      clientSecret
        ? {
            clientSecret,
            appearance: { theme: "flat" as const },
            locale: "ja" as const,
          }
        : undefined,
    [clientSecret]
  );

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + parsePrice(item.price) * item.quantity,
      0
    );
  }, [cart]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center px-6 py-10">
      <h1 className="text-2xl font-display text-gray-dark mb-6">お支払い</h1>
      {error && (
        <div className="w-full max-w-xl mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600 font-body">{error}</p>
        </div>
      )}
      {cart.length > 0 && (
        <div className="w-full max-w-xl mb-8 rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-base font-display text-gray-800">ご注文内容</h2>
            <Link
              href="/products"
              className="text-sm text-brand-gold hover:underline font-body"
            >
              変更する
            </Link>
          </div>
          <ul className="divide-y divide-gray-100">
            {cart.map((i) => (
              <li
                key={i.id}
                className="px-4 py-3 flex items-center justify-between text-sm"
              >
                <div className="text-gray-700 font-body">
                  <p className="font-display">{i.title}</p>
                  <p className="text-gray-500">数量: {i.quantity}</p>
                </div>
                <div className="text-gray-800 font-display">
                  ¥{(parsePrice(i.price) * i.quantity).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600 font-body">小計</span>
            <span className="text-lg font-display text-brand-gold">
              ¥{subtotal.toLocaleString()}
            </span>
          </div>
        </div>
      )}
      {!clientSecret && !error && (
        <p className="text-gray-600 font-body">初期化中...</p>
      )}
      {clientSecret && elementsOptions && (
        <div className="w-full max-w-xl">
          <Elements
            stripe={stripePromise!}
            options={elementsOptions}
            key={clientSecret}
          >
            <CheckoutForm />
          </Elements>
          {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith(
            "pk_test_"
          ) && (
            <p className="mt-4 text-xs text-gray-500 font-body">
              テストカード例: 4242 4242 4242 4242 / 任意の将来日 / 任意のCVC
            </p>
          )}
          <div className="mt-6 text-center">
            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-gray-700 font-body underline"
            >
              カートに戻る
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
