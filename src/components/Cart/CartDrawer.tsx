// components/Cart/CartDrawer.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useShoppingCart } from "use-shopping-cart";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const {
    cartDetails,
    cartCount,
    formattedTotalPrice,
    clearCart,
    redirectToCheckout,
  } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);

  // CartButtonからのカスタムイベントを監視
  useEffect(() => {
    const handleToggleCart = () => {
      setIsOpen(!isOpen);
    };

    window.addEventListener("toggleCart", handleToggleCart);
    return () => window.removeEventListener("toggleCart", handleToggleCart);
  }, [isOpen]);

  const closeCart = () => setIsOpen(false);

  // 背景クリックでカートを閉じる
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  // チェックアウト処理
  const handleCheckout = async () => {
    try {
      await redirectToCheckout();
    } catch (error) {
      console.error("チェックアウトエラー:", error);
      alert("決済処理でエラーが発生しました。もう一度お試しください。");
    }
  };

  // カート商品を配列に変換
  const cartItems = cartDetails ? Object.values(cartDetails) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景オーバーレイ */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackgroundClick}
          />

          {/* カートドロワー */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-display text-gray-dark">
                ショッピングカート
              </h2>
              <motion.button
                onClick={closeCart}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* カート内容 */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                /* 空のカート */
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-display text-gray-dark mb-2">
                    カートは空です
                  </h3>
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
                /* カートアイテム一覧 */
                <div>
                  {/* カートクリアボタン */}
                  {cartItems.length > 0 && (
                    <div className="p-4 border-b border-gray-200">
                      <motion.button
                        onClick={() => clearCart()}
                        className="text-xs text-gray-500 hover:text-red-500 transition-colors font-body"
                        whileTap={{ scale: 0.95 }}
                      >
                        カートを空にする
                      </motion.button>
                    </div>
                  )}

                  {/* アイテムリスト */}
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* フッター（合計・チェックアウト） */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                {/* 合計金額 */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-display text-gray-dark">
                    合計 ({cartCount}点)
                  </span>
                  <span className="text-lg font-display font-semibold text-brand-gold">
                    {formattedTotalPrice}
                  </span>
                </div>

                {/* 注意事項 */}
                <p className="text-xs text-gray-500 font-body">
                  ※配送料は含まれていません
                </p>

                {/* チェックアウトボタン */}
                <motion.button
                  className="w-full bg-brand-gold text-white py-4 rounded-full font-display text-lg tracking-wide shadow-md"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                >
                  ご注文手続きへ
                </motion.button>

                {/* 続けて買い物するボタン */}
                <motion.button
                  onClick={closeCart}
                  className="w-full border border-brand-gold text-brand-gold py-3 rounded-full font-display text-sm tracking-wide hover:bg-brand-gold hover:text-white transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  続けて買い物する
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
