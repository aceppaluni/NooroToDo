import React from "react";

export type ColorOption = {
  name: string;
  hex: string;
};

type Props = {
  color: string;
  setColor: (color: string) => void;
  options?: ColorOption[]; 
};

const defaultColors: ColorOption[] = [
  { name: 'red', hex: '#f87171' },
  { name: 'orange', hex: '#f97316' },
  { name: 'yellow', hex: '#facc15' },
  { name: 'green', hex: '#4ade80' },
  { name: 'blue', hex: '#60a5fa' },
  { name: 'purple', hex: '#a78bfa' },
  { name: 'pink', hex: '#f472b6' },
  { name: 'brown', hex: '#a0522d' },
];

export default function ColorPicker({ color, setColor, options = defaultColors }: Props) {
  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((c) => (
        <div
          key={c.name}
          onClick={() => setColor(c.name)}
          className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${
            color === c.name ? 'border-white scale-110' : 'border-transparent'
          }`}
          style={{ backgroundColor: c.hex }}
          title={c.name}
        />
      ))}
    </div>
  );
}