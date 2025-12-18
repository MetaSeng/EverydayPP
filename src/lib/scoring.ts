import { Place, SearchFilters, SentimentAnalysis } from '@/types/place';

export function analyzeSentiment(reviews: { sentiment: string }[]): SentimentAnalysis {
  const positiveCount = reviews.filter(r => r.sentiment === 'positive').length;
  const neutralCount = reviews.filter(r => r.sentiment === 'neutral').length;
  const negativeCount = reviews.filter(r => r.sentiment === 'negative').length;
  const total = reviews.length || 1;

  const score = (positiveCount - negativeCount * 0.5) / total;
  
  let overall: 'positive' | 'neutral' | 'negative';
  if (score > 0.3) overall = 'positive';
  else if (score < -0.1) overall = 'negative';
  else overall = 'neutral';

  const allKeywords = reviews.flatMap(r => 'keywords' in r ? (r as any).keywords : []);
  const keywordCounts = allKeywords.reduce<Record<string, number>>((acc, kw) => {
    acc[kw] = (acc[kw] || 0) + 1;
    return acc;
  }, {});
  
  const topKeywords = Object.entries(keywordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([kw]) => kw);

  return {
    overall,
    score: Math.max(0, Math.min(1, (score + 1) / 2)),
    positiveCount,
    neutralCount,
    negativeCount,
    topKeywords,
  };
}

export function calculateSmartScore(
  place: Place,
  filters: SearchFilters
): number {
  // Base score from rating (0-5 scaled to 0-40)
  const ratingScore = (place.rating / 5) * 40;

  // Sentiment score (0-1 scaled to 0-30)
  const sentimentScore = place.sentimentScore * 30;

  // Review volume bonus (logarithmic, max 15 points)
  const reviewBonus = Math.min(15, Math.log10(place.reviewCount + 1) * 5);

  // Budget match bonus (0-15 points)
  let budgetScore = 0;
  if (place.averagePrice >= filters.budgetMin && place.averagePrice <= filters.budgetMax) {
    budgetScore = 15;
  } else {
    const distance = Math.min(
      Math.abs(place.averagePrice - filters.budgetMin),
      Math.abs(place.averagePrice - filters.budgetMax)
    );
    budgetScore = Math.max(0, 15 - distance * 2);
  }

  // Preference match bonus
  let preferenceBonus = 0;
  if (filters.preferences.length > 0) {
    const matchedPrefs = filters.preferences.filter(pref =>
      place.keywords.some(kw => kw.toLowerCase().includes(pref.toLowerCase()))
    );
    preferenceBonus = (matchedPrefs.length / filters.preferences.length) * 10;
  }

  const totalScore = ratingScore + sentimentScore + reviewBonus + budgetScore + preferenceBonus;
  
  return Math.round(Math.min(100, totalScore));
}

export function filterAndSortPlaces(
  places: Place[],
  filters: SearchFilters
): Place[] {
  let filtered = [...places];

  // Filter by category
  if (filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Filter by search query
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.cuisine?.toLowerCase().includes(query) ||
      p.keywords.some(k => k.toLowerCase().includes(query))
    );
  }

  // Recalculate smart scores based on current filters
  filtered = filtered.map(place => ({
    ...place,
    smartScore: calculateSmartScore(place, filters),
  }));

  // Sort
  switch (filters.sortBy) {
    case 'smart-score':
      filtered.sort((a, b) => b.smartScore - a.smartScore);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'price-low':
      filtered.sort((a, b) => a.averagePrice - b.averagePrice);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.averagePrice - a.averagePrice);
      break;
    case 'reviews':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  return filtered;
}

export function getPriceRangeLabel(priceRange: string): string {
  switch (priceRange) {
    case '$': return 'Budget-friendly';
    case '$$': return 'Mid-range';
    case '$$$': return 'Upscale';
    case '$$$$': return 'Fine Dining';
    default: return priceRange;
  }
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'score-excellent';
  if (score >= 75) return 'score-good';
  return 'score-average';
}

export function getSentimentLabel(sentiment: string): { label: string; color: string } {
  switch (sentiment) {
    case 'positive':
      return { label: 'Excellent', color: 'sentiment-positive' };
    case 'neutral':
      return { label: 'Good', color: 'sentiment-neutral' };
    case 'negative':
      return { label: 'Mixed', color: 'sentiment-negative' };
    default:
      return { label: 'N/A', color: 'muted' };
  }
}
