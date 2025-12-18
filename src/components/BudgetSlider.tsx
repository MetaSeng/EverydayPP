import { Slider } from '@/components/ui/slider';

interface BudgetSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function BudgetSlider({ min, max, value, onChange }: BudgetSliderProps) {
  const formatPrice = (val: number) => `$${val}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Budget Range</span>
        <span className="text-sm font-semibold text-foreground">
          {formatPrice(value[0])} — {formatPrice(value[1])}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={1}
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
        className="py-2"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  );
}
