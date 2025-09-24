// data/news.ts - ニュースデータ管理
export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  content: string;
  excerpt?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "homepage-launch",
    date: "2025.11.01",
    category: "お知らせ",
    title: "『Floral Lumina』のホームページを公開いたしました。",
    excerpt: "テキストテキストテキストテキストテキストテキストテキスト",
    content: `この度『Floral Lumina』のホームページを公開いたしました。

こちらのサイトでは、最新の商品情報やお知らせをお届けしてまいります。

今後ともFloral Luminaをよろしくお願いいたします。`,
  },
  {
    id: "maintenance-notice",
    date: "2025.11.09",
    category: "お知らせ",
    title: "メンテナンスのお知らせ",
    excerpt: "テキストテキストテキストテキストテキストテキストテキスト",
    content: `システムメンテナンスのため、下記の日程でサービスを一時停止させていただきます。

メンテナンス期間：
2025年11月09日（日）終日（予定）

お客様にはご迷惑をおかけいたしますが、ご理解とご協力をお願いいたします。`,
  },
  {
    id: "custom-order-service",
    date: "2025.12.01",
    category: "お知らせ",
    title: "新商品の販売開始",
    excerpt: "テキストテキストテキストテキストテキストテキストテキスト",
    content: `新商品を販売開始いたしました。

今回の新商品は、季節限定の特別なデザインとなっております。ぜひこの機会にお試しください。

詳細は商品ページをご覧ください。`,
  },
];
