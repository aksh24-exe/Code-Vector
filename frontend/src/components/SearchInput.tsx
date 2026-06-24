interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        Search
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name..."
        className="h-10 w-[220px] rounded-md border border-input bg-background px-3 text-sm"
      />
    </div>
  );
}
