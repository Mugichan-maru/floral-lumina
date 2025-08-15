// components/Cart/CartItem.tsx
"use client";
import { motion } from "framer-motion";
import { useShoppingCart } from "use-shopping-cart";
import type { CartEntry } from "use-shopping-cart/core";

interface CartItemProps {
  item: CartEntry;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, incrementItem, decrementItem } = useShoppingCart();

  const handleQuantityIncrease = () => {
    incrementItem(item.id);
  };

  const handleQuantityDecrease = () => {
    if (item.quantity <= 1) {
      removeItem(item.id);
    } else {
      decrementItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  // 選択されたカラー情報を取得
  const getSelectedColor = () => {
    if (item.product_data && "selectedColor" in item.product_data) {
      return item.product_data.selectedColor as string;
    }
    // IDからカラー情報を抽出（fallback）
    const colorMatch = item.id.match(/-(.+)$/);
    return colorMatch ? colorMatch[1] : null;
  };

  const selectedColor = getSelectedColor();

  return (
    <motion.div
      className="flex gap-4 p-4 border-b border-gray-200 last:border-b-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {/* 商品画像 */}
      <div className="w-16 h-20 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* 商品情報 */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-display text-gray-dark truncate mb-1">
          {item.name}
        </h3>

        {/* カラー情報 */}
        {selectedColor && (
          <p className="text-xs text-gray-500 font-body mb-2">
            カラー: {selectedColor}
          </p>
        )}

        {/* 価格と数量 */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-brand-gold font-display font-semibold">
            {item.formattedValue}
          </div>

          {/* 数量調整ボタン */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleQuantityDecrease}
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
              onClick={handleQuantityIncrease}
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
        {item.quantity > 1 && (
          <p className="text-xs text-gray-400 font-body mt-1">
            単価: ¥{item.price.toLocaleString()}
          </p>
        )}
      </div>

      {/* 削除ボタン */}
      <motion.button
        onClick={handleRemove}
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
