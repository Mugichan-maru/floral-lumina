// components/Contact.tsx
export default function Contact() {
  return (
    <section id="contact" className="bg-rose-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif tracking-wide mb-4 text-gray-800">
            ご注文・お問い合わせ
          </h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto"></div>
        </div>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gray-700 mb-8 leading-relaxed">
            ご注文は『Online Shop』ページから、
            <br />
            ご不明などのお問い合わせはInstagramから承っております。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#shop"
              className="inline-block bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors duration-300 text-sm uppercase tracking-wide"
            >
              Online Shop
            </a>
            <a
              href="#"
              className="inline-block border-2 border-rose-500 text-rose-500 px-8 py-3 rounded-full hover:bg-rose-500 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wide"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
