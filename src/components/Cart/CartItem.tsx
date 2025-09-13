// components/Cart/CartItem.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  // 価格を数値に変換
  const parsePrice = (priceString: string): number => {
    const match = priceString.match(/[\d,]+/);
    if (!match) return 0;
    return parseInt(match[0].replace(/,/g, ""), 10);
  };

  const price = parsePrice(item.product.price);
  const totalPrice = price * item.quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <motion.div
      className="flex gap-4 p-4 border-b border-gray-200 last:border-b-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {/* 商品画像 */}
      <div className="w-16 h-20 flex-shrink-0 relative">
        <Image
          src={item.product.images[0]}
          alt={item.product.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* 商品情報 */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-display text-gray-dark truncate mb-1">
          {item.product.title}
        </h3>

        {/* カラー情報 */}
        {item.selectedColor && (
          <p className="text-xs text-gray-500 font-body mb-2">
            カラー: {item.selectedColor}
          </p>
        )}

        {/* 価格と数量 */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-brand-gold font-display font-semibold">
            {price > 0 ? `¥${totalPrice.toLocaleString()}` : item.product.price}
          </div>

          {/* 数量調整ボタン */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-brand-gold transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </motion.button>

            <span className="text-sm font-body min-w-[20px] text-center">
              {item.quantity}
            </span>

            <motion.button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-brand-gold transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* 単価表示 */}
        {price > 0 && item.quantity > 1 && (
          <p className="text-xs text-gray-400 font-body mt-1">
            単価: ¥{price.toLocaleString()}
          </p>
        )}
      </div>

      {/* 削除ボタン */}
      <motion.button
        onClick={() => removeItem(item.id)}
        className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
        whileTap={{ scale: 0.9 }}
      >
        <svg
          className="w-4 h-4"
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
    </motion.div>
  );
}
