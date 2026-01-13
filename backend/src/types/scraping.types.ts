export interface NavigationItem {
  id: string;
  title: string;
  slug: string;
  url: string;
  lastScrapedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  imageUrl?: string;
  sourceUrl: string;
  sourceId: string;
  lastScrapedAt: Date;
  category?: string;
  description?: string;
}

export interface ProductDetail {
  title: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isbn?: string;
  publisher?: string;
  ratings?: {
    average: number;
    count: number;
  };
  reviews?: Review[];
  specs?: Record<string, string>;
  lastScrapedAt: Date;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  scrapedAt: string;
  message?: string;
}
