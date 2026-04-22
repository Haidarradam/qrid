"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { fileToDataURL } from "../lib/qr";

interface LogoUploadProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}

const MAX_SIZE_MB = 2;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

export function LogoUpload({ value, onChange }: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFile = async (file: File) => {
    setError("");

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Use PNG, JPG, WEBP, or SVG");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Max ${MAX_SIZE_MB}MB`);
      return;
    }

    try {
      const dataUrl = await fileToDataURL(file);
      onChange(dataUrl);
    } catch {
      setError("Could not read file");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleRemove = () => {
    onChange(null);
    setError("");
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleInputChange}
        className="sr-only"
      />

      {value ? (
        <div className="flex items-center gap-3 p-3 bg-white border border-ink-200 rounded-sm">
          <div className="w-12 h-12 flex-shrink-0 bg-ink-50 border border-ink-200 rounded-sm overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Logo preview" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-ink-900 font-medium">Logo attached</p>
            <p className="text-xs text-ink-400 font-mono">
              Embedded at center of QR
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={handleBrowse}
              className="text-[10px] font-mono uppercase tracking-widest text-ink-400 hover:text-ink-900 transition-colors px-2.5 py-1.5 border border-ink-200 rounded-sm hover:border-ink-400"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="text-[10px] font-mono uppercase tracking-widest text-ink-400 hover:text-red-500 transition-colors px-2.5 py-1.5 border border-ink-200 rounded-sm hover:border-red-300"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleBrowse}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleBrowse();
            }
          }}
          className={`relative flex items-center gap-3 p-4 bg-white border border-dashed rounded-sm cursor-pointer transition-all ${
            dragActive
              ? "border-ink-900 bg-ink-50"
              : "border-ink-200 hover:border-ink-400"
          }`}
        >
          <div className="w-10 h-10 flex-shrink-0 bg-ink-50 border border-ink-200 rounded-sm flex items-center justify-center text-ink-400">
            <UploadIcon />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-ink-900">
              Drop image or{" "}
              <span className="underline underline-offset-2 decoration-ink-300">
                browse
              </span>
            </p>
            <p className="text-xs text-ink-400 font-mono mt-0.5">
              PNG · JPG · WEBP · SVG · max {MAX_SIZE_MB}MB
            </p>
          </div>
        </div>
      )}

      {error && <p className="text-xs font-mono text-red-500">{error}</p>}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 12V3M9 3L5.5 6.5M9 3L12.5 6.5M3 11V14C3 14.5523 3.44772 15 4 15H14C14.5523 15 15 14.5523 15 14V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
