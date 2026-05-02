"use client";

import { DotPattern } from "../lib/qr";

interface PatternPickerProps {
  value: DotPattern;
  onChange: (pattern: DotPattern) => void;
}

interface PatternOption {
  id: DotPattern;
  label: string;
  preview: JSX.Element;
}

const PATTERNS: PatternOption[] = [
  {
    id: "square",
    label: "Square",
    preview: <SquarePreview />,
  },
  {
    id: "rounded",
    label: "Rounded",
    preview: <RoundedPreview />,
  },
  {
    id: "dots",
    label: "Dots",
    preview: <DotsPreview />,
  },
  {
    id: "classy",
    label: "Classy",
    preview: <ClassyPreview />,
  },
  {
    id: "classy-rounded",
    label: "Classy+",
    preview: <ClassyRoundedPreview />,
  },
  {
    id: "extra-rounded",
    label: "Extra",
    preview: <ExtraRoundedPreview />,
  },
];

export function PatternPicker({ value, onChange }: PatternPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PATTERNS.map((pattern) => {
        const selected = pattern.id === value;
        return (
          <button
            key={pattern.id}
            type="button"
            onClick={() => onChange(pattern.id)}
            aria-label={pattern.label}
            className={`group flex flex-col items-center gap-2 p-3 bg-white border rounded-sm transition-all ${
              selected
                ? "border-ink-900 ring-2 ring-ink-900 ring-offset-2 ring-offset-white"
                : "border-ink-200 hover:border-ink-400"
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              {pattern.preview}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-500 group-hover:text-ink-900 transition-colors">
              {pattern.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Pattern Previews (4x4 grid) ---------- */

const dotPositions = [
  [1, 0, 1, 1],
  [0, 1, 1, 0],
  [1, 1, 0, 1],
  [1, 0, 1, 1],
];

function SquarePreview() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" className="text-ink-900">
      {dotPositions.flatMap((row, y) =>
        row.map((filled, x) =>
          filled ? <rect key={`${x}-${y}`} x={x * 9} y={y * 9} width="8" height="8" /> : null
        )
      )}
    </svg>
  );
}

function RoundedPreview() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" className="text-ink-900">
      {dotPositions.flatMap((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <rect key={`${x}-${y}`} x={x * 9} y={y * 9} width="8" height="8" rx="2" />
          ) : null
        )
      )}
    </svg>
  );
}

function DotsPreview() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" className="text-ink-900">
      {dotPositions.flatMap((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <circle key={`${x}-${y}`} cx={x * 9 + 4} cy={y * 9 + 4} r="3.5" />
          ) : null
        )
      )}
    </svg>
  );
}

function ClassyPreview() {
  // Mix of square with one corner rounded on diagonal
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" className="text-ink-900">
      {dotPositions.flatMap((row, y) =>
        row.map((filled, x) => {
          if (!filled) return null;
          const key = `${x}-${y}`;
          // Corner-rounded on top-left & bottom-right to suggest "classy"
          return (
            <path
              key={key}
              d={`M${x * 9 + 2},${y * 9} h6 v6 q0,2 -2,2 h-6 v-6 q0,-2 2,-2 z`}
            />
          );
        })
      )}
    </svg>
  );
}

function ClassyRoundedPreview() {
  // More rounded version
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" className="text-ink-900">
      {dotPositions.flatMap((row, y) =>
        row.map((filled, x) => {
          if (!filled) return null;
          const key = `${x}-${y}`;
          return (
            <path
              key={key}
              d={`M${x * 9 + 3},${y * 9} h5 q1,0 1,1 v5 q0,3 -3,3 h-5 q-1,0 -1,-1 v-5 q0,-3 3,-3 z`}
            />
          );
        })
      )}
    </svg>
  );
}

function ExtraRoundedPreview() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" className="text-ink-900">
      {dotPositions.flatMap((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <rect key={`${x}-${y}`} x={x * 9} y={y * 9} width="8" height="8" rx="4" />
          ) : null
        )
      )}
    </svg>
  );
}
