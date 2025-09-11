// app/cancel/page.tsx
export default function CancelPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-display text-gray-dark mb-3">支払いがキャンセルされました</h1>
      <p className="text-gray-600 font-body mb-8">
        カートの内容は保持されています。引き続きお買い物をお楽しみください。
      </p>
      <a
        href="/"
        className="inline-block border border-brand-gold text-brand-gold px-6 py-3 rounded-full font-display"
      >
        トップへ戻る
      </a>
    </main>
  );
}

