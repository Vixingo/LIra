export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type Denomination = 'new' | 'old'; // New SYP vs Old SYP (or 1k units)

export type MarketCategory = 'currencies' | 'gold' | 'crypto' | 'fuel' | 'global' | 'commodities';

export interface MarketItem {
  id: string;
  nameEn: string;
  nameAr: string;
  symbol: string;
  code: string;
  category: MarketCategory;
  flag?: string;
  buyRate: number;
  sellRate: number;
  change24h: number; // e.g. +0.45%
  updatedSecondsAgo: number;
  sparkline: number[];
  high24h: number;
  low24h: number;
  volume: string;
  volatility: 'Low' | 'Moderate' | 'High';
  aiInsightEn: string;
  aiInsightAr: string;
  verifiedSourcesCount: number;
  unitEn?: string;
  unitAr?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sourcesVerified?: number;
}

export interface NewsArticle {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  aiSummaryEn: string;
  aiSummaryAr: string;
  tagsEn: string[];
  tagsAr: string[];
  image: string;
  publishedTimeEn: string;
  publishedTimeAr: string;
  author: string;
}
