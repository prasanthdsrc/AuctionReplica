export interface Auction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  isOnline: boolean;
  location?: string;
  numberOfLots: number;
  buyersPremium: number;
  status: 'upcoming' | 'open' | 'closed';
  catalogueUrl?: string;
}

export interface Product {
  id: string;
  auctionId: string;
  title: string;
  description: string;
  images: string[];
  lotNumber: number;
  estimateLow: number;
  estimateHigh: number;
  currentBid?: number;
  bidsCount: number;
  category: string;
  subcategory?: string;
  condition?: string;
  specifications?: Record<string, string>;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description?: string;
  productCount: number;
  parentCategory?: string | null;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  linkText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SearchFilters {
  query: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'ending-soon' | 'newest';
}
