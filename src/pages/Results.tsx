import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CategorySelector } from '@/components/CategorySelector';
import { BudgetSlider } from '@/components/BudgetSlider';
import { PreferenceSelector } from '@/components/PreferenceSelector';
import { PlaceCard } from '@/components/PlaceCard';
import { SortSelector } from '@/components/SortSelector';
import { MapView } from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockPlaces } from '@/data/mockPlaces';
import { filterAndSortPlaces } from '@/lib/scoring';
import { PlaceCategory, SearchFilters } from '@/types/place';
import { Search, SlidersHorizontal, Map, LayoutGrid, ChevronLeft, X } from 'lucide-react';

const Results = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();

  const [filters, setFilters] = useState<SearchFilters>(() => ({
    query: searchParams.get('q') || '',
    category: (searchParams.get('cat') as PlaceCategory) || 'all',
    budgetMin: parseInt(searchParams.get('min') || '1'),
    budgetMax: parseInt(searchParams.get('max') || '50'),
    preferences: searchParams.get('pref')?.split(',').filter(Boolean) || [],
    sortBy: 'smart-score',
  }));

  const filteredPlaces = useMemo(() => {
    return filterAndSortPlaces(mockPlaces, filters);
  }, [filters]);

  const togglePreference = (pref: string) => {
    setFilters(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref],
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      budgetMin: 1,
      budgetMax: 50,
      preferences: [],
      sortBy: 'smart-score',
    });
  };

  const hasActiveFilters = filters.query || filters.category !== 'all' || 
    filters.budgetMin > 1 || filters.budgetMax < 50 || filters.preferences.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6">
        {/* Top Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground md:text-2xl">
                {filteredPlaces.length} Places Found
              </h1>
              <p className="text-sm text-muted-foreground">
                Sorted by {filters.sortBy === 'smart-score' ? 'AI Smart Score' : filters.sortBy}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="pl-9"
              />
            </div>

            {/* Sort */}
            <SortSelector
              value={filters.sortBy}
              onChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
            />

            {/* View Toggle */}
            <div className="hidden rounded-lg border border-border p-1 md:flex">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('map')}
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-xs font-bold text-primary">
                  {[filters.category !== 'all', filters.budgetMin > 1 || filters.budgetMax < 50, filters.preferences.length > 0].filter(Boolean).length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-card animate-scale-in md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Filters</h2>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                  <X className="h-3 w-3" />
                  Clear all
                </Button>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Category</label>
                <CategorySelector
                  selected={filters.category}
                  onSelect={(cat) => setFilters(prev => ({ ...prev, category: cat }))}
                />
              </div>

              <div>
                <BudgetSlider
                  min={1}
                  max={50}
                  value={[filters.budgetMin, filters.budgetMax]}
                  onChange={([min, max]) => setFilters(prev => ({ ...prev, budgetMin: min, budgetMax: max }))}
                />
              </div>

              <div className="md:col-span-2 lg:col-span-1">
                <PreferenceSelector
                  selected={filters.preferences}
                  onToggle={togglePreference}
                />
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className={viewMode === 'map' ? 'grid gap-6 lg:grid-cols-2' : ''}>
          {/* Cards Grid */}
          <div className={viewMode === 'map' ? 'order-2 lg:order-1' : ''}>
            {filteredPlaces.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                  : 'flex flex-col gap-4'
              }>
                {filteredPlaces.map((place, index) => (
                  <div
                    key={place.id}
                    onMouseEnter={() => setSelectedPlaceId(place.id)}
                    onMouseLeave={() => setSelectedPlaceId(undefined)}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PlaceCard place={place} rank={index + 1} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">No places found</h3>
                <p className="mb-4 text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Map View */}
          {viewMode === 'map' && (
            <div className="order-1 h-[400px] lg:order-2 lg:sticky lg:top-20 lg:h-[calc(100vh-120px)]">
              <MapView places={filteredPlaces} selectedId={selectedPlaceId} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Results;
