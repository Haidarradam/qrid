"use client";

import { useEffect, useRef, useState } from "react";
import { QRConfig, renderQRToElement, updateInstance } from "../lib/qr";

interface QRPreviewProps {
  config: QRConfig;
}

export function QRPreview({ config }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);
  const [error, setError] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!config.text.trim()) {
      setReady(false);
      setError("");
      if (containerRef.current) containerRef.current.innerHTML = "";
      instanceRef.current = null;
      return;
    }

    if (!containerRef.current) return;

    // First time — create instance. After that — update it.
    if (!instanceRef.current) {
      renderQRToElement(containerRef.current, config, 512)
        .then((inst) => {
          if (cancelled) return;
          instanceRef.current = inst;
          setReady(true);
          setError("");
        })
        .catch((err) => {
          if (!cancelled) {
            setError(err?.message || "Failed to generate QR");
          }
        });
    } else {
      try {
        updateInstance(instanceRef.current, config, 512);
        setReady(true);
        setError("");
      } catch (err: any) {
        setError(err?.message || "Failed to update QR");
      }
    }

    return () => {
      cancelled = true;
    };
  }, [config]);

  if (!config.text.trim()) {
    return <EmptyState />;
  }

  if (error) {
    return (
      <div className="aspect-square w-full flex items-center justify-center border border-ink-200 bg-white rounded-sm">
        <p className="text-sm text-red-500 px-8 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="animate-scale-in">
      <div
        className={`relative aspect-square w-full rounded-sm overflow-hidden border border-ink-200 ${
          config.transparent ? "qr-checkerboard" : "bg-white"
        }`}
      >
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center p-4 [&>canvas]:max-w-full [&>canvas]:max-h-full [&>canvas]:w-auto [&>canvas]:h-auto"
        />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="w-6 h-6 border-2 border-ink-900 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
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
