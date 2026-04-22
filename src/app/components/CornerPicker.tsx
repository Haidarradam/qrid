"use client";

import { CornerStyle } from "../lib/qr";

interface CornerPickerProps {
  value: CornerStyle;
  onChange: (style: CornerStyle) => void;
}

interface CornerOption {
  id: CornerStyle;
  label: string;
  preview: JSX.Element;
}

const CORNERS: CornerOption[] = [
  { id: "square", label: "Square", preview: <SquareCorner /> },
  { id: "dot", label: "Dot", preview: <DotCorner /> },
  { id: "extra-rounded", label: "Rounded", preview: <RoundedCorner /> },
];

export function CornerPicker({ value, onChange }: CornerPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {CORNERS.map((corner) => {
        const selected = corner.id === value;
        return (
          <button
            key={corner.id}
            type="button"
            onClick={() => onChange(corner.id)}
            aria-label={corner.label}
            className={`group flex flex-col items-center gap-2 p-3 bg-white border rounded-sm transition-all ${
              selected
                ? "border-ink-900 ring-2 ring-ink-900 ring-offset-2 ring-offset-white"
                : "border-ink-200 hover:border-ink-400"
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              {corner.preview}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-500 group-hover:text-ink-900 transition-colors">
              {corner.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// The classic 3-layer finder pattern from a QR code.
// Outer frame, inner gap, and center block — all shaped according to corner style.

function SquareCorner() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" className="text-ink-900">
      <rect x="2" y="2" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="5" />
      <rect x="12" y="12" width="12" height="12" fill="currentColor" />
    </svg>
  );
}

function DotCorner() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" className="text-ink-900">
      <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx="18" cy="18" r="6" fill="currentColor" />
    </svg>
  );
}

function RoundedCorner() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" className="text-ink-900">
      <rect
        x="2"
        y="2"
        width="32"
        height="32"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
      <rect x="12" y="12" width="12" height="12" rx="3" fill="currentColor" />
    </svg>
  );
}
