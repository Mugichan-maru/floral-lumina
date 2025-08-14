// contexts/CartContext.tsx
"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/types/Product";

// ===== 型定義 =====

// カートに入っている個別の商品データ
export interface CartItem {
  id: string; // ユニークID（商品ID + カラー）
  product: Product; // 商品情報
  quantity: number; // 数量
  selectedColor?: string; // 選択されたカラー
  addedAt: number; // カートに追加された時刻
}

// カート全体の状態
interface CartState {
  items: CartItem[]; // カート内の商品リスト
  isOpen: boolean; // カートドロワーの開閉状態
  totalItems: number; // 総商品数
  totalPrice: number; // 総金額
}

// 実行可能なアクション（操作）の種類
type CartAction =
  | {
      type: "ADD_ITEM";
      payload: { product: Product; quantity: number; color?: string };
    }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

// ===== ヘルパー関数 =====

// 価格文字列（"¥3,200"）を数値（3200）に変換
const parsePrice = (priceString: string): number => {
  const match = priceString.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10);
};

// カート内アイテムから合計数量と合計金額を計算
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = parsePrice(item.product.price);
    return sum + price * item.quantity;
  }, 0);

  return { totalItems, totalPrice };
};

// ===== カートの初期状態 =====
const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0,
};

// ===== カートリデューサー（状態変更ロジック） =====
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, color } = action.payload;
      // 商品ID + カラーでユニークIDを作成
      const itemId = `${product.id}-${color || "default"}`;

      // 既に同じ商品（同じカラー）がカートにあるかチェック
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemId
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // 既存商品の場合：数量を追加
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // 新商品の場合：新しいアイテムとして追加
        const newItem: CartItem = {
          id: itemId,
          product,
          quantity,
          selectedColor: color,
          addedAt: Date.now(),
        };
        newItems = [...state.items, newItem];
      }

      // 合計を再計算
      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case "REMOVE_ITEM": {
      // 指定されたIDの商品をカートから削除
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        // 数量が0以下の場合は商品を削除
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { id } });
      }

      // 指定された商品の数量を更新
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case "CLEAR_CART": {
      // カートを空にする
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }

    case "TOGGLE_CART": {
      // カートドロワーの開閉を切り替え
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }

    case "OPEN_CART": {
      return {
        ...state,
        isOpen: true,
      };
    }

    case "CLOSE_CART": {
      return {
        ...state,
        isOpen: false,
      };
    }

    case "LOAD_CART": {
      // セッションストレージからカートデータを読み込み
      const { totalItems, totalPrice } = calculateTotals(action.payload);
      return {
        ...state,
        items: action.payload,
        totalItems,
        totalPrice,
      };
    }

    default:
      return state;
  }
};

// ===== Context作成 =====

// Context経由で提供される機能の型定義
interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number, color?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Contextの作成
const CartContext = createContext<CartContextType | undefined>(undefined);

// ===== Provider Component =====
export function CartProvider({ children }: { children: React.ReactNode }) {
  // useReducerでカートの状態管理
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // ===== データの永続化 =====

  // コンポーネント初回マウント時：セッションストレージからカートデータを復元
  useEffect(() => {
    const savedCart = sessionStorage.getItem("floral-lumina-cart");
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: cartItems });
      } catch (error) {
        console.error("カートデータの読み込みに失敗しました:", error);
      }
    }
  }, []);

  // カート内容が変更されるたび：セッションストレージに保存
  useEffect(() => {
    sessionStorage.setItem("floral-lumina-cart", JSON.stringify(state.items));
  }, [state.items]);

  // ===== アクション関数（コンポーネントから呼び出される） =====

  const addItem = (product: Product, quantity: number, color?: string) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity, color } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const openCart = () => {
    dispatch({ type: "OPEN_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  // Contextに提供する値
  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ===== カスタムフック =====
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// ===== 使用例 =====
/*
// コンポーネント内での使用方法

import { useCart } from "@/contexts/CartContext";

function ProductCard({ product }) {
  const { addItem, state } = useCart();
  
  const handleAddToCart = () => {
    addItem(product, 1, "ピンク");
  };
  
  return (
    <div>
      <h3>{product.title}</h3>
      <button onClick={handleAddToCart}>
        カートに追加 ({state.totalItems})
      </button>
    </div>
  );
}
*/
