import type { Category } from "../types";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "tech", label: "Tech" },
  { value: "music", label: "Music" },
  { value: "sports", label: "Sports" },
  { value: "arts", label: "Arts" },
  { value: "social", label: "Social" },
  { value: "outdoor", label: "Outdoor" },
  { value: "gaming", label: "Gaming" },
  { value: "food", label: "Food" },
];

interface CategoryFilterProps {
  selected: Category | undefined;
  onChange: (category: Category | undefined) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onChange(undefined)}
        className="px-4 py-2 text-sm font-medium transition-colors"
        style={{
          borderRadius: "var(--radius-btn)",
          background: selected === undefined ? "var(--color-accent)" : "var(--color-panel)",
          color: selected === undefined ? "#fff" : "var(--color-ink)",
          border: `1px solid ${selected === undefined ? "var(--color-accent)" : "var(--color-line)"}`,
        }}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value === selected ? undefined : cat.value)}
          className="px-4 py-2 text-sm font-medium transition-colors"
          style={{
            borderRadius: "var(--radius-btn)",
            background: selected === cat.value ? "var(--color-accent)" : "var(--color-panel)",
            color: selected === cat.value ? "#fff" : "var(--color-ink)",
            border: `1px solid ${selected === cat.value ? "var(--color-accent)" : "var(--color-line)"}`,
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
