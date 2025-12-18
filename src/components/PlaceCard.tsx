import { Place } from '@/types/place';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, TrendingUp, Sparkles, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaceCardProps {
  place: Place;
  rank?: number;
}

export function PlaceCard({ place, rank }: PlaceCardProps) {
  const getSentimentVariant = (score: number) => {
    if (score >= 0.8) return 'positive';
    if (score >= 0.6) return 'neutral';
    return 'negative';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 80) return 'Great Match';
    if (score >= 70) return 'Good Match';
    return 'Fair Match';
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}&query_place_id=${encodeURIComponent(place.name)}`;

  return (
    <Card 
      variant="elevated" 
      className="group overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          
          {/* Rank Badge */}
          {rank && rank <= 3 && (
            <div className={cn(
              "absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-lg",
              rank === 1 ? "bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950" :
              rank === 2 ? "bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800" :
              "bg-gradient-to-br from-orange-400 to-orange-600 text-orange-950"
            )}>
              #{rank}
            </div>
          )}

          {/* Smart Score */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 backdrop-blur-sm">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold text-foreground">{place.smartScore}</span>
          </div>

          {/* Category & Price on image */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge variant="price" className="bg-card/90 backdrop-blur-sm">
              {place.priceRange}
            </Badge>
            {place.openNow && (
              <Badge variant="positive" className="bg-sentiment-positive/90 text-primary-foreground backdrop-blur-sm">
                Open
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                {place.name}
              </h3>
              {place.nameKhmer && (
                <p className="text-xs text-muted-foreground">{place.nameKhmer}</p>
              )}
            </div>
            <div className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-sm font-semibold text-primary">{place.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{place.address}</span>
          </div>

          {place.cuisine && (
            <p className="mb-3 text-sm text-muted-foreground">{place.cuisine}</p>
          )}

          {/* AI Insight */}
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="mb-1.5 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">AI Insight</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {place.aiInsight}
            </p>
          </div>

          {/* Bottom Stats */}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-2">
              <Badge variant={getSentimentVariant(place.sentimentScore)}>
                {(place.sentimentScore * 100).toFixed(0)}% Positive
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">
              {place.reviewCount.toLocaleString()} reviews
            </span>
          </div>

          {/* See Location Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:bg-primary hover:text-primary-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <MapPin className="h-4 w-4" />
            See Location
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </Card>
  );
}
