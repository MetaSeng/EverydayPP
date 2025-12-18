import { preferences as allPreferences } from '@/data/mockPlaces';
import { cn } from '@/lib/utils';

interface PreferenceSelectorProps {
  selected: string[];
  onToggle: (preference: string) => void;
}

export function PreferenceSelector({ selected, onToggle }: PreferenceSelectorProps) {
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-muted-foreground">Preferences (optional)</span>
      <div className="flex flex-wrap gap-2">
        {allPreferences.map((pref) => (
          <button
            key={pref}
            onClick={() => onToggle(pref)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-all duration-200",
              selected.includes(pref)
                ? "bg-primary text-primary-foreground shadow-warm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {pref}
          </button>
        ))}
      </div>
    </div>
  );
}
