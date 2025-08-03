// components/Contact.tsx
export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl font-display tracking-wide mb-4 text-gray-text md:text-3xl">
            Contact
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto md:w-16"></div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h3 className="text-lg font-display text-gray-text mb-4 md:text-xl md:mb-6">
              ご注文・お問い合わせ
            </h3>
            <p className="text-sm text-gray-text font-body leading-relaxed md:text-base">
              ご注文は『Online Shop』ページから、
              <br />
              ご不明などのお問い合わせはInstagramから承っております。
            </p>
          </div>

          <div className="space-y-4 md:space-y-0 md:flex md:gap-6 md:justify-center">
            {/* Online Shopボタン */}
            <a
              href="#shop"
              className="flex items-center justify-center gap-2 w-full bg-brand-gold text-white rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-opacity-90 transition-all duration-300 shadow-md md:w-auto md:px-8 md:py-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Online Shop
            </a>

            {/* Instagramボタン */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-pink-400 text-pink-500 rounded-full px-6 py-3 text-sm font-display tracking-wide hover:bg-pink-500 hover:text-white transition-colors duration-300 md:w-auto md:px-8 md:py-4"
            >
              <img src="/icons/instagram.svg" alt="" className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
