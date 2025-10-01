// utils/newsUtils.ts - ニュース関連のユーティリティ関数
import { newsItems, NewsItem } from "@/data/news";

export function getNewsById(id: string): NewsItem | null {
  return newsItems.find((item) => item.id === id) || null;
}

export function getAllNews() {
  return [...newsItems].sort((a, b) => {
    const dateA = a.date.replace(/\./g, "");
    const dateB = b.date.replace(/\./g, "");
    return dateB.localeCompare(dateA); // 降順
  });
}

export function getRecentNews(limit: number = 2): NewsItem[] {
  return newsItems.slice(0, limit);
}
