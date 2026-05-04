import type { Category } from "../types";
import { CATEGORIES } from "../types";

interface CategoryFilterProps {
  selected: Category | undefined;
  onChange: (category: Category | undefined) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      <button
        onClick={() => onChange(undefined)}
        className="px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0"
        style={{
          borderRadius: "999px",
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
          className="px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0"
          style={{
            borderRadius: "999px",
            background: selected === cat.value ? "var(--color-accent)" : "var(--color-panel)",
            color: selected === cat.value ? "#fff" : "var(--color-ink)",
            border: `1px solid ${selected === cat.value ? "var(--color-accent)" : "var(--color-line)"}`,
          }}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
}
