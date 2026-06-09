/* components/ui/ColorSwatch.tsx */
"use client";

interface ColorSwatchProps {
  color: string;
  name: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ColorSwatch({ color, name, selected, onClick }: ColorSwatchProps) {
  return (
    <button
      title={name}
      onClick={onClick}
      className={`relative w-5 h-5 rounded-full transition-transform duration-[200ms] ease-out hover:scale-[1.15] ${
        selected ? "scale-[1.15]" : ""
      }`}
      style={{ backgroundColor: color }}
    >
      {selected && (
        <span
          className="absolute inset-[-3px] rounded-full border-2 border-brand"
          style={{ boxShadow: "none" }}
        />
      )}
    </button>
  );
}
