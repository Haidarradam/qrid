"use client";

import { ChangeEvent, useState } from "react";
import { isValidHex, normalizeHex } from "../lib/qr";

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
}

interface ColorOption {
  name: string;
  hex: string;
}

const PRESET_COLORS: ColorOption[] = [
  { name: "Black", hex: "#0A0A0A" },
  { name: "Midnight", hex: "#1E293B" },
  { name: "Cobalt", hex: "#1E40AF" },
  { name: "Emerald", hex: "#047857" },
  { name: "Crimson", hex: "#BE123C" },
  { name: "Amber", hex: "#B45309" },
  { name: "Violet", hex: "#6D28D9" },
  { name: "Slate", hex: "#475569" },
];

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [customInput, setCustomInput] = useState("");
  const [inputError, setInputError] = useState(false);

  const normalizedValue = value.toUpperCase();
  const isPreset = PRESET_COLORS.some((c) => c.hex.toUpperCase() === normalizedValue);

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setCustomInput(raw);

    if (!raw.trim()) {
      setInputError(false);
      return;
    }

    if (isValidHex(raw)) {
      onChange(normalizeHex(raw));
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const handleNativePicker = (e: ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.toUpperCase();
    onChange(hex);
    setCustomInput(hex);
    setInputError(false);
  };

  return (
    <div className="space-y-4">
      {/* Preset swatches */}
      <div className="grid grid-cols-8 gap-2">
        {PRESET_COLORS.map((color) => {
          const selected = color.hex.toUpperCase() === normalizedValue;
          return (
            <button
              key={color.hex}
              type="button"
              onClick={() => {
                onChange(color.hex);
                setCustomInput("");
                setInputError(false);
              }}
              aria-label={color.name}
              title={color.name}
              className={`group relative aspect-square rounded-sm border transition-all ${
                selected
                  ? "border-ink-900 ring-2 ring-ink-900 ring-offset-2 ring-offset-white"
                  : "border-ink-200 hover:border-ink-400"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {selected && (
                <svg
                  className="absolute inset-0 m-auto w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{
                    stroke: isLightColor(color.hex) ? "#0a0a0a" : "#ffffff",
                  }}
                >
                  <path
                    d="M3 8L6.5 11.5L13 5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom hex input */}
      <div>
        <div
          className={`relative flex items-center bg-white border rounded-sm transition-colors ${
            inputError
              ? "border-red-400"
              : !isPreset && normalizedValue
              ? "border-ink-900"
              : "border-ink-200"
          }`}
        >
          <span className="pl-4 pr-2 text-ink-300 font-mono text-sm select-none">#</span>
          <input
            type="text"
            value={customInput || (!isPreset ? normalizedValue.replace("#", "") : "")}
            onChange={handleCustomChange}
            placeholder="custom hex"
            maxLength={7}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 h-10 bg-transparent text-sm font-mono uppercase text-ink-900 placeholder:text-ink-300 focus:outline-none pr-3"
          />
          <label className="flex-shrink-0 mr-1.5 cursor-pointer">
            <div
              className="w-7 h-7 rounded-sm border border-ink-200 hover:border-ink-400 transition-colors"
              style={{ backgroundColor: normalizedValue }}
            />
            <input
              type="color"
              value={normalizedValue}
              onChange={handleNativePicker}
              className="sr-only"
              aria-label="Open color picker"
            />
          </label>
        </div>
        {inputError && (
          <p className="text-xs font-mono text-red-500 mt-2">Invalid hex code</p>
        )}
      </div>
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
