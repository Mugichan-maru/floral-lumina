"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const { state, closeCart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  const handleCheckout = async () => {
    try {
      setError(null);
      setLoading(true);
      if (state.items.length === 0) return;
      router.push("/checkout");
    } catch (e: any) {
      setError(e?.message || "チェックアウトでエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackgroundClick}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-display text-gray-800">ショッピングカート</h2>
              <motion.button
                onClick={closeCart}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-display text-gray-800 mb-2">カートは空です</h3>
                  <p className="text-sm text-gray-500 font-body mb-6">
                    お気に入りの商品を見つけて
                    <br />
                    カートに追加してください
                  </p>
                  <motion.button
                    onClick={closeCart}
                    className="bg-brand-gold text-white px-6 py-3 rounded-full font-display text-sm tracking-wide hover:bg-opacity-90 transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    商品を見る
                  </motion.button>
                </div>
              ) : (
                <div>
                  {state.items.length > 0 && (
                    <div className="p-4 border-b border-gray-200">
                      <motion.button
                        onClick={clearCart}
                        className="text-xs text-gray-500 hover:text-red-500 transition-colors font-body"
                        whileTap={{ scale: 0.95 }}
                      >
                        カートを空にする
                      </motion.button>
                    </div>
                  )}

                  <AnimatePresence>
                    {state.items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-display text-gray-800">合計（{state.totalItems}点）</span>
                  <span className="text-lg font-display font-semibold text-brand-gold">¥{state.totalPrice.toLocaleString()}</span>
                </div>

                <p className="text-xs text-gray-500 font-body">※配送料は含まれていません</p>

                <motion.button
                  className="w-full bg-brand-gold text-white py-4 rounded-full font-display text-lg tracking-wide shadow-md disabled:opacity-60"
                  whileHover={{ y: loading ? 0 : -2 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  disabled={loading}
                  onClick={handleCheckout}
                >
                  {loading ? "処理中..." : "ご注文手続きへ"}
                </motion.button>

                {error && (
                  <p className="text-sm text-red-500 font-body text-center">{error}</p>
                )}

                <motion.button
                  onClick={closeCart}
                  className="w-full border border-brand-gold text-brand-gold py-3 rounded-full font-display text-sm tracking-wide hover:bg-brand-gold hover:text-white transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  続けて買い物をする
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
