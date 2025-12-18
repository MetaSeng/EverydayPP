export interface Review {
  id: string;
  text: string;
  rating: number;
  author: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
}

export interface Place {
  id: string;
  name: string;
  nameKhmer?: string;
  category: PlaceCategory;
  cuisine?: string;
  address: string;
  priceRange: PriceRange;
  averagePrice: number;
  rating: number;
  reviewCount: number;
  sentimentScore: number;
  smartScore: number;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  reviews: Review[];
  aiInsight: string;
  keywords: string[];
  openNow?: boolean;
  distance?: number;
}

export type PlaceCategory = 
  | 'restaurant'
  | 'cafe'
  | 'street-food'
  | 'bakery'
  | 'bar'
  | 'salon'
  | 'gym'
  | 'spa';

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export interface SearchFilters {
  query: string;
  category: PlaceCategory | 'all';
  budgetMin: number;
  budgetMax: number;
  preferences: string[];
  sortBy: 'smart-score' | 'rating' | 'price-low' | 'price-high' | 'reviews';
}

export interface SentimentAnalysis {
  overall: 'positive' | 'neutral' | 'negative';
  score: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  topKeywords: string[];
}
