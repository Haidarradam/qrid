"use client";

import { useEffect, useState } from "react";
import { generateQRDataURL } from "../lib/qr";

interface QRPreviewProps {
  text: string;
}

export function QRPreview({ text }: QRPreviewProps) {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    if (!text.trim()) {
      setDataUrl("");
      setError("");
      return;
    }

    generateQRDataURL(text, { size: 512 })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError("");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || "Failed to generate QR code");
          setDataUrl("");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [text]);

  if (!text.trim()) {
    return <EmptyState />;
  }

  if (error) {
    return (
      <div className="aspect-square w-full flex items-center justify-center border border-ink-200 bg-white rounded-sm">
        <p className="text-sm text-red-500 px-8 text-center">{error}</p>
      </div>
    );
  }

  if (!dataUrl) {
    return <LoadingState />;
  }

  return (
    <div className="animate-scale-in">
      <div className="relative aspect-square w-full bg-white rounded-sm overflow-hidden border border-ink-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUrl} alt="QR Code" className="w-full h-full object-contain p-4" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="aspect-square w-full flex flex-col items-center justify-center border border-dashed border-ink-200 bg-white/40 rounded-sm">
      <div className="w-16 h-16 mb-4 relative">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-ink-200 rounded-[1px]"
              style={{
                animationDelay: `${i * 60}ms`,
                animation: "fadeIn 1.5s ease-in-out infinite alternate",
              }}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-ink-400 font-mono tracking-wide">awaiting input</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="aspect-square w-full flex items-center justify-center border border-ink-200 bg-white rounded-sm">
      <div className="w-6 h-6 border-2 border-ink-900 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
