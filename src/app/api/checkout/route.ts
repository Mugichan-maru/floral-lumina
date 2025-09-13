// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { products } from "@/data/products";

// Simple utility to parse a price like "¥3,200" -> 3200 (JPY)
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

    const body = await req.json().catch(() => ({}));
    const items: Array<{ id: string; quantity: number; color?: string }> =
      body?.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    // Build Stripe line_items based on server-side product data
    const line_items: Array<{
      price_data: {
        currency: string;
        product_data: { name: string };
        unit_amount: number;
      };
      quantity: number;
    }> = [];
    for (const item of items) {
      const p = products[item.id];
      if (!p) continue;
      const amount = parsePrice(p.price);
      if (!amount || amount <= 0) continue; // skip non-sellable items

      line_items.push({
        price_data: {
          currency: "jpy",
          product_data: {
            name: p.title,
          },
          unit_amount: amount, // JPY has 0 decimals
        },
        quantity: Math.max(1, Number(item.quantity) || 1),
      });
    }

    if (line_items.length === 0) {
      return NextResponse.json(
        { error: "No purchasable items in cart" },
        { status: 400 }
      );
    }

    // Determine origin for success/cancel URLs
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const success_url = `${origin}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${origin}/cancel`;

    // Create a Checkout Session via Stripe API using fetch (works on edge/standard runtimes)
    const form = new URLSearchParams();
    form.set("mode", "payment");
    form.set("success_url", success_url);
    form.set("cancel_url", cancel_url);
    // Add line_items as repeated fields per Stripe API for form-encoded requests
    // line_items[0][price_data][currency]=jpy
    line_items.forEach((li, idx) => {
      form.set(`line_items[${idx}][quantity]`, String(li.quantity));
      form.set(
        `line_items[${idx}][price_data][currency]`,
        li.price_data.currency
      );
      form.set(
        `line_items[${idx}][price_data][unit_amount]`,
        String(li.price_data.unit_amount)
      );
      form.set(
        `line_items[${idx}][price_data][product_data][name]`,
        li.price_data.product_data.name
      );
    });

    const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "");
      return NextResponse.json(
        { error: "Stripe error", details: errText },
        { status: 500 }
      );
    }

    const session = await resp.json();
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json(
      { error: "Unexpected error", details: String(e) },
      { status: 500 }
    );
  }
}

