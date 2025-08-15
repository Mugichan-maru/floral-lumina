// data/products.ts - use-shopping-cart対応商品データ
import { Product } from "@/types/Product";

// use-shopping-cart用の商品型定義
export interface ShoppingCartProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  // 元の商品情報も保持
  originalProduct: Product;
  selectedColor?: string;
}

export const products: Record<string, Product> = {
  nemophila: {
    id: "nemophila",
    title: "ネモフィラ",
    price: "¥3,200",
    images: [
      "/icons/product1.jpeg",
      "/icons/about1.jpeg",
      "/icons/about2.jpeg",
    ],
    description:
      "春の訪れを告げる美しいネモフィラをモチーフにしたスマホケースです。透明感のある花びらが手元を上品に彩ります。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    features: [
      "高品質TPU素材使用",
      "各種スマートフォンに対応",
      "耐衝撃性に優れた設計",
      "ワイヤレス充電対応",
      "手作業による丁寧な仕上げ",
    ],
    colors: [
      { name: "クリア", value: "#FFFFFF" },
      { name: "ライトブルー", value: "#E6F3FF" },
      { name: "ピンク", value: "#FFE6F0" },
    ],
    inStock: true,
    category: "LINE UP",
  },
  margaret: {
    id: "margaret",
    title: "マーガレット",
    price: "¥3,200",
    images: [
      "/icons/product2.jpeg",
      "/icons/about1.jpeg",
      "/icons/about2.jpeg",
    ],
    description:
      "純白で可憐なマーガレットをデザインしたエレガントなスマホケースです。花言葉は「恋占い」「真実の愛」。愛らしい花びらが日常に特別感を添えます。",
    features: [
      "高品質TPU素材使用",
      "各種スマートフォンに対応",
      "耐衝撃性に優れた設計",
      "ワイヤレス充電対応",
      "手作業による丁寧な仕上げ",
    ],
    colors: [
      { name: "クリア", value: "#FFFFFF" },
      { name: "ソフトピンク", value: "#FFE6E6" },
      { name: "ミントグリーン", value: "#E6FFF0" },
    ],
    inStock: true,
    category: "LINE UP",
  },
  hydrangea: {
    id: "hydrangea",
    title: "紫陽花",
    price: "ON DISPLAY",
    images: [
      "/icons/product3.jpeg",
      "/icons/about1.jpeg",
      "/icons/about2.jpeg",
    ],
    description:
      "梅雨の季節を美しく彩る紫陽花をモチーフにした特別なスマホケースです。グラデーションが美しい花びらが、雨の日も心を晴やかにしてくれます。",
    features: [
      "高品質TPU素材使用",
      "各種スマートフォンに対応",
      "耐衝撃性に優れた設計",
      "ワイヤレス充電対応",
      "手作業による丁寧な仕上げ",
    ],
    colors: [
      { name: "ブルーグラデーション", value: "#E6F0FF" },
      { name: "パープルグラデーション", value: "#F0E6FF" },
      { name: "ピンクグラデーション", value: "#FFE6F0" },
    ],
    inStock: false,
    category: "LINE UP",
  },
  suzuran: {
    id: "suzuran",
    title: "すずらん",
    price: "ON DISPLAY",
    images: [
      "/icons/product4.jpeg",
      "/icons/about1.jpeg",
      "/icons/about2.jpeg",
    ],
    description:
      "可憐で清楚なすずらんをデザインした上品なスマホケースです。花言葉は「再び幸せが訪れる」。小さな鈴のような花が幸運を運んでくれそうです。",
    features: [
      "高品質TPU素材使用",
      "各種スマートフォンに対応",
      "耐衝撃性に優れた設計",
      "ワイヤレス充電対応",
      "手作業による丁寧な仕上げ",
    ],
    colors: [
      { name: "クリア", value: "#FFFFFF" },
      { name: "ソフトグリーン", value: "#E6FFE6" },
    ],
    inStock: false,
    category: "LINE UP",
  },
  sunflower: {
    id: "sunflower",
    title: "向日葵",
    price: "¥3,500",
    images: [
      "/icons/product5.jpeg",
      "/icons/about1.jpeg",
      "/icons/about2.jpeg",
    ],
    description:
      "太陽に向かって咲く力強い向日葵をモチーフにした元気いっぱいのスマホケースです。明るい黄色が持つ人の気持ちも晴れやかにしてくれます。",
    features: [
      "高品質TPU素材使用",
      "各種スマートフォンに対応",
      "耐衝撃性に優れた設計",
      "ワイヤレス充電対応",
      "手作業による丁寧な仕上げ",
    ],
    colors: [
      { name: "イエロー", value: "#FFF3E6" },
      { name: "オレンジ", value: "#FFE6CC" },
      { name: "クリア", value: "#FFFFFF" },
    ],
    inStock: true,
    category: "LINE UP",
  },
};

// 価格文字列を数値に変換するヘルパー関数
export function parsePrice(priceString: string): number {
  const match = priceString.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10);
}

// 商品をuse-shopping-cart形式に変換
export function convertToShoppingCartProduct(
  product: Product,
  colorIndex: number = 0
): ShoppingCartProduct {
  const selectedColor = product.colors?.[colorIndex];
  const price = parsePrice(product.price);

  return {
    id: selectedColor
      ? `${product.id}-${selectedColor.name.toLowerCase()}`
      : product.id,
    name: selectedColor
      ? `${product.title} - ${selectedColor.name}`
      : product.title,
    price: price,
    currency: "JPY",
    image: product.images[0],
    description: product.description,
    originalProduct: product,
    selectedColor: selectedColor?.name,
  };
}

// 商品の全カラーバリエーションを取得
export function getProductVariants(product: Product): ShoppingCartProduct[] {
  if (!product.colors || product.colors.length === 0) {
    return [convertToShoppingCartProduct(product)];
  }

  return product.colors.map((_, index) =>
    convertToShoppingCartProduct(product, index)
  );
}

// 商品が購入可能かチェック（価格が数値で在庫がある）
export function isPurchasable(product: Product): boolean {
  return product.inStock && parsePrice(product.price) > 0;
}
