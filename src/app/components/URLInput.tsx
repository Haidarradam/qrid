"use client";

import { ChangeEvent } from "react";
import { LinkIcon, ClearIcon } from "./Icons";

interface URLInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function URLInput({ value, onChange, placeholder = "https://example.com" }: URLInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="group relative">
      <label htmlFor="url-input" className="block text-xs font-mono uppercase tracking-widest text-ink-400 mb-3">
        Link / Text
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-ink-400 group-focus-within:text-ink-900 transition-colors">
          <LinkIcon />
        </div>
        <input
          id="url-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-full h-14 pl-12 pr-12 bg-white border border-ink-200 rounded-sm text-base text-ink-900 placeholder:text-ink-300 focus:border-ink-900 transition-colors"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 text-ink-400 hover:text-ink-900 transition-colors"
            aria-label="Clear input"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    </div>
  );
}
