import { Place } from '@/types/place';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  places: Place[];
  selectedId?: string;
}

export function MapView({ places, selectedId }: MapViewProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-border bg-muted/50">
      {/* Map placeholder with styled markers */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Simulated map markers */}
        <div className="absolute inset-0 p-8">
          {places.slice(0, 8).map((place, i) => (
            <div
              key={place.id}
              className={cn(
                "absolute flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium shadow-lg transition-all duration-300",
                selectedId === place.id
                  ? "bg-primary text-primary-foreground scale-110 z-10"
                  : "bg-card text-foreground hover:scale-105"
              )}
              style={{
                left: `${15 + (i % 4) * 20 + Math.random() * 10}%`,
                top: `${15 + Math.floor(i / 4) * 35 + Math.random() * 10}%`,
              }}
            >
              <MapPin className="h-3 w-3" />
              <span className="max-w-[80px] truncate">{place.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        {/* Center label */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <MapPin className="h-8 w-8 animate-pulse" />
            <span className="text-sm font-medium">Phnom Penh, Cambodia</span>
          </div>
        </div>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-2 right-2 rounded bg-card/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur-sm">
        Interactive map coming soon
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
