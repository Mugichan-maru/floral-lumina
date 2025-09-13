"use client";
import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState<string>("");
  const [shipping, setShipping] = useState<{value?: {name?: string; address?: unknown; phone?: string}} | null>(null);
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
        return_url: `${origin}/success`,
        receipt_email: email || undefined,
        shipping: shipping?.value?.name
          ? {
              name: shipping.value.name,
              address: shipping.value.address as any,
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
        <label className="block text-sm font-display text-gray-700">メールアドレス</label>
        <LinkAuthenticationElement
          onChange={(e) => setEmail(e.value.email)}
          options={{ defaultValues: { email } }}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-display text-gray-700">お届け先住所</label>
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
        <label className="block text-sm font-display text-gray-700">お支払い方法</label>
        <PaymentElement options={{ layout: "accordion" }} />
        <p className="text-xs text-gray-500 font-body">
          Apple Pay / Google Pay はブラウザと環境が対応している場合に表示されます。
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

  useEffect(() => {
    const run = async () => {
      try {
        const raw = sessionStorage.getItem("floral-lumina-cart");
        const parsed: Array<{product?: {id: string}; quantity: number}> = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed) || parsed.length === 0) {
          setError("カートが空です");
          return;
        }
        const items = parsed.map((i) => ({ id: i.product?.id, quantity: i.quantity }));
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

  return (
    <main className="min-h-[70vh] flex flex-col items-center px-6 py-10">
      <h1 className="text-2xl font-display text-gray-dark mb-6">お支払い</h1>
      {error && <p className="text-red-500 font-body mb-6">{error}</p>}
      {!clientSecret && !error && (
        <p className="text-gray-600 font-body">初期化中...</p>
      )}
      {clientSecret && elementsOptions && (
        <div className="w-full max-w-xl">
          <Elements stripe={stripePromise!} options={elementsOptions}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </main>
  );
}
