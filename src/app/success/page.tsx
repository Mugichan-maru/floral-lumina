// app/success/page.tsx
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-display text-gray-dark mb-3">ご注文ありがとうございます</h1>
      <p className="text-gray-600 font-body mb-8">
        決済が完了しました。ご注文確認メールをご確認ください。
      </p>
      <Link
        href="/"
        className="inline-block bg-brand-gold text-white px-6 py-3 rounded-full font-display"
      >
        トップへ戻る
      </Link>
    </main>
  );
}

