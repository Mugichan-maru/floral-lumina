// data/products.ts - 商品データ管理
import { Product } from "@/types/Product";

export const products: Record<string, Product> = {
  nemophila: {
    id: "nemophila",
    title: "ネモフィラ",
    price: "¥3,200~",
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
    category: "スマホケース",
  },
  margaret: {
    id: "margaret",
    title: "マーガレット",
    price: "¥3,200～",
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
    category: "スマホケース",
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
    category: "スマホケース",
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
    category: "スマホケース",
  },
  sunflower: {
    id: "sunflower",
    title: "向日葵",
    price: "¥3,500～",
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
    category: "スマホケース",
  },
  caseOption: {
    id: "caseOption",
    title: "ショルダーストラップ対応ケース",
    price: "¥600",
    images: [
      "/icons/option01_1.jpeg",
      "/icons/option01_2.jpeg",
      "/icons/option01_3.jpeg",
      "/icons/option01_4.jpeg",
      "/icons/option01_5.jpeg",
      "/icons/option01_6.jpeg",
      "/icons/option01_7.jpeg",
    ],
    description:
      "作品と一緒に購入いただくことで、ショルダーストラップ対応ケースに変更して制作します。",
    features: ["背面:PC素材(ハード)", "側面:TPU素材(ソフト)"],
    colors: [
      { name: "ゴールド", value: "#FFD700" },
      { name: "シルバー", value: "#C0C0C0" },
    ],
    inStock: true,
    category: "オプション",
  },
};
