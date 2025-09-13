// app/api/payments/create-intent/route.ts
import { NextResponse } from "next/server";
import { products } from "@/data/products";

const parsePrice = (priceString: string): number | null => {
  const match = priceString?.match(/[\d,]+/);
  if (!match) return null;
  const value = parseInt(match[0].replace(/,/g, ""), 10);
  return Number.isFinite(value) ? value : null;
};

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY on server" },
        { status: 500 }
      );
    }
    if (!/^sk_/.test(secretKey)) {
      return NextResponse.json(
        {
          error: "Invalid STRIPE_SECRET_KEY",
          hint: "Use a valid Stripe secret key starting with sk_test_ or sk_live_",
        },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const items: Array<{ id: string; quantity: number }> = body?.items || [];
    const email: string | undefined = body?.email;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Calculate total from server-side product catalog
    let amount = 0;
    for (const item of items) {
      const p = products[item.id];
      if (!p) continue;
      const price = parsePrice(p.price);
      if (!price || price <= 0) continue; // skip unsellable items
      amount += price * Math.max(1, Number(item.quantity) || 1);
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "No purchasable items in cart" },
        { status: 400 }
      );
    }

    // Create PaymentIntent using Stripe API (form-encoded)
    const form = new URLSearchParams();
    form.set("amount", String(amount)); // JPY has 0 decimals
    form.set("currency", "jpy");
    form.set("automatic_payment_methods[enabled]", "true");
    if (email) form.set("receipt_email", email);

    // Optional: add simple metadata for debugging
    form.set("metadata[cart_size]", String(items.length));

    const resp = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      let details: unknown = text;
      try {
        details = JSON.parse(text);
      } catch {}
      const status = resp.status || 500;
      return NextResponse.json(
        { error: "Stripe error", status, details },
        { status }
      );
    }

    const data = await resp.json();
    return NextResponse.json({ clientSecret: data.client_secret });
  } catch (e) {
    return NextResponse.json(
      { error: "Unexpected error", details: String(e) },
      { status: 500 }
    );
  }
}
