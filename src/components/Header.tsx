import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-warm">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Everyday<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">-PP</span>
          </span>
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Discover
          </Link>
          <Link 
            to="/results" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse All
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:block">
            🇰🇭 Phnom Penh
          </span>
        </div>
      </div>
    </header>
  );
}
