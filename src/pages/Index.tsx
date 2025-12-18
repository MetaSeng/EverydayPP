import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CategorySelector } from '@/components/CategorySelector';
import { BudgetSlider } from '@/components/BudgetSlider';
import { PreferenceSelector } from '@/components/PreferenceSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceCategory, SearchFilters } from '@/types/place';
import { Search, Sparkles, TrendingUp, MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-phnom-penh.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    budgetMin: 1,
    budgetMax: 50,
    preferences: [],
    sortBy: 'smart-score',
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.query) params.set('q', filters.query);
    if (filters.category !== 'all') params.set('cat', filters.category);
    params.set('min', filters.budgetMin.toString());
    params.set('max', filters.budgetMax.toString());
    if (filters.preferences.length) params.set('pref', filters.preferences.join(','));
    
    navigate(`/results?${params.toString()}`);
  };

  const togglePreference = (pref: string) => {
    setFilters(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Phnom Penh cityscape at sunset" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        
        <div className="container relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center animate-slide-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Recommendations
            </div>
            
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Discover the Best of{' '}
              <span 
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(25 95% 53%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Phnom Penh
              </span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              Find restaurants, cafés, and local services tailored to your budget and preferences. 
              Powered by AI sentiment analysis.
            </p>

            {/* Stats */}
            <div className="mb-10 flex justify-center gap-8 text-center animate-slide-up-delayed">
              <div>
                <div className="text-2xl font-bold text-foreground">12+</div>
                <div className="text-sm text-muted-foreground">Curated Places</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">15K+</div>
                <div className="text-sm text-muted-foreground">Reviews Analyzed</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">94%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative z-10 -mt-8 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-card md:p-8 animate-scale-in">
            {/* Search Input */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for restaurants, cuisine, or keywords..."
                  value={filters.query}
                  onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                  className="h-12 pl-12 text-base"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium text-muted-foreground">
                Category
              </label>
              <CategorySelector
                selected={filters.category}
                onSelect={(cat) => setFilters(prev => ({ ...prev, category: cat }))}
              />
            </div>

            {/* Budget Slider */}
            <div className="mb-6">
              <BudgetSlider
                min={1}
                max={50}
                value={[filters.budgetMin, filters.budgetMax]}
                onChange={([min, max]) => setFilters(prev => ({ ...prev, budgetMin: min, budgetMax: max }))}
              />
            </div>

            {/* Preferences */}
            <div className="mb-8">
              <PreferenceSelector
                selected={filters.preferences}
                onToggle={togglePreference}
              />
            </div>

            {/* Search Button */}
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-5 w-5" />
              Find Best Matches
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              AI-powered recommendations in three simple steps
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-card p-6 text-center shadow-card">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Set Your Criteria</h3>
              <p className="text-sm text-muted-foreground">
                Choose your budget, category, and preferences for personalized results
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 text-center shadow-card">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes thousands of reviews to calculate sentiment and smart scores
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 text-center shadow-card">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Discover & Visit</h3>
              <p className="text-sm text-muted-foreground">
                Browse ranked results with AI insights and find your perfect spot
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            <span className="font-semibold">Everyday-PP</span> — AI-Powered Discovery for Phnom Penh
          </p>
          <p className="mt-1 text-xs">
            Demo project showcasing full-stack engineering + applied AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
