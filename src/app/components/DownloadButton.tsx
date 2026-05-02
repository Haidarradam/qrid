"use client";

import { useState } from "react";
import { QRConfig, downloadAsPNG, downloadAsSVG } from "../lib/qr";
import { DownloadIcon } from "./Icons";

interface DownloadButtonProps {
  config: QRConfig;
  disabled?: boolean;
}

type LoadingState = null | "png" | "svg";

export function DownloadButton({ config, disabled = false }: DownloadButtonProps) {
  const [loading, setLoading] = useState<LoadingState>(null);
  const [success, setSuccess] = useState<LoadingState>(null);

  const handlePNG = async () => {
    if (disabled || loading) return;
    setLoading("png");
    try {
      await downloadAsPNG(config);
      setSuccess("png");
      setTimeout(() => setSuccess(null), 1800);
    } catch (err) {
      console.error("PNG download failed:", err);
    } finally {
      setLoading(null);
    }
  };

  const handleSVG = async () => {
    if (disabled || loading) return;
    setLoading("svg");
    try {
      await downloadAsSVG(config);
      setSuccess("svg");
      setTimeout(() => setSuccess(null), 1800);
    } catch (err) {
      console.error("SVG download failed:", err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Primary: PNG */}
      <button
        type="button"
        onClick={handlePNG}
        disabled={disabled || !!loading}
        className="group relative w-full h-14 px-6 flex items-center justify-between bg-ink-900 text-white rounded-sm hover:bg-ink-700 disabled:bg-ink-200 disabled:text-ink-400 disabled:cursor-not-allowed overflow-hidden"
      >
        <span className="flex items-center gap-3">
          <span className="text-ink-100 group-disabled:text-ink-400">
            {loading === "png" ? <Spinner light /> : success === "png" ? <CheckIcon /> : <DownloadIcon />}
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-sm font-medium tracking-wide">
              {success === "png" ? "Downloaded" : loading === "png" ? "Preparing..." : "Download PNG"}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-300 group-disabled:text-ink-400">
              1024 × 1024 {config.transparent ? "· transparent" : ""}
            </span>
          </span>
        </span>
        <ArrowIcon className="text-ink-300 group-hover:text-white group-hover:translate-x-0.5 transition-all group-disabled:text-ink-400" />
      </button>

      {/* Secondary: SVG */}
      <button
        type="button"
        onClick={handleSVG}
        disabled={disabled || !!loading}
        className="group relative w-full h-14 px-6 flex items-center justify-between bg-white border border-ink-200 text-ink-900 rounded-sm hover:border-ink-900 hover:bg-ink-50 disabled:bg-white disabled:border-ink-200 disabled:text-ink-300 disabled:cursor-not-allowed overflow-hidden"
      >
        <span className="flex items-center gap-3">
          <span className="text-ink-400 group-hover:text-ink-900 group-disabled:text-ink-300 transition-colors">
            {loading === "svg" ? <Spinner /> : success === "svg" ? <CheckIcon /> : <DownloadIcon />}
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-sm font-medium tracking-wide">
              {success === "svg" ? "Downloaded" : loading === "svg" ? "Preparing..." : "Download SVG"}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400 group-disabled:text-ink-300">
              Vector · scalable · print-ready
            </span>
          </span>
        </span>
        <ArrowIcon className="text-ink-300 group-hover:text-ink-900 group-hover:translate-x-0.5 transition-all group-disabled:text-ink-200" />
      </button>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`inline-block w-4 h-4 border-2 ${
        light ? "border-white" : "border-ink-900"
      } border-t-transparent rounded-full animate-spin`}
    />
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
