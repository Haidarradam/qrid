"use client";

import { useState } from "react";
import { QRConfig, downloadAsPNG } from "../lib/qr";
import { DownloadIcon } from "./Icons";

interface DownloadButtonProps {
  config: QRConfig;
  disabled?: boolean;
}

export function DownloadButton({ config, disabled = false }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDownload = async () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
      await downloadAsPNG(config);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1800);
    } catch (err) {
      console.error("PNG download failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={disabled || loading}
      className="group relative w-full h-14 px-6 flex items-center justify-between bg-ink-900 text-white rounded-sm hover:bg-ink-700 disabled:bg-ink-200 disabled:text-ink-400 disabled:cursor-not-allowed overflow-hidden"
    >
      <span className="flex items-center gap-3">
        <span className="text-ink-100 group-disabled:text-ink-400">
          {loading ? <Spinner /> : success ? <CheckIcon /> : <DownloadIcon />}
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-sm font-medium tracking-wide">
            {success ? "Downloaded" : loading ? "Preparing..." : "Download PNG"}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-300 group-disabled:text-ink-400">
            1024 × 1024 {config.transparent ? "· transparent" : ""}
          </span>
        </span>
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="text-ink-300 group-hover:text-white group-hover:translate-x-0.5 transition-all group-disabled:text-ink-400"
      >
        <path
          d="M3 11L11 3M11 3H5M11 3V9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function Spinner() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8L6.5 11.5L13 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
