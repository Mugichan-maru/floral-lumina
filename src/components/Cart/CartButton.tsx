// components/Cart/CartButton.tsx
"use client";
import { motion } from "framer-motion";
import { useShoppingCart } from "use-shopping-cart";

export default function CartButton() {
  const { cartCount } = useShoppingCart();

  const toggleCart = () => {
    // カスタムイベントでCartDrawerに状態を伝える
    window.dispatchEvent(new CustomEvent("toggleCart"));
  };

  return (
    <motion.button
      onClick={toggleCart}
      className="relative inline-flex items-center gap-1 border border-brand-gold text-brand-gold rounded-full px-4 py-1 text-sm tracking-wide hover:bg-brand-gold hover:text-white transition-colors font-display"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <span className="hidden md:inline">Cart</span>

      {/* カートバッジ */}
      {cartCount! > 0 && (
        <motion.div
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {cartCount! > 99 ? "99+" : cartCount}
        </motion.div>
      )}
    </motion.button>
  );
}
