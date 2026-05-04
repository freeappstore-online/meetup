interface CityPickerProps {
  cities: readonly string[];
  selected: string | undefined;
  onChange: (city: string | undefined) => void;
}

export function CityPicker({ cities, selected, onChange }: CityPickerProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {cities.map((city) => {
        const isAll = city === "All Cities";
        const isActive = isAll ? selected === undefined : selected === city;
        return (
          <button
            key={city}
            onClick={() => onChange(isAll ? undefined : city)}
            className="px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-150 shrink-0"
            style={{
              borderRadius: "var(--radius-btn)",
              background: isActive ? "var(--color-ink)" : "transparent",
              color: isActive ? "var(--color-paper)" : "var(--color-ink)",
              border: `1.5px solid ${isActive ? "var(--color-ink)" : "var(--color-line)"}`,
            }}
          >
            {city}
          </button>
        );
      })}
    </div>
  );
}
