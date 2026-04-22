"use client";

interface BackgroundToggleProps {
  transparent: boolean;
  onChange: (transparent: boolean) => void;
}

export function BackgroundToggle({ transparent, onChange }: BackgroundToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`group flex flex-col items-center gap-2 p-4 bg-white border rounded-sm transition-all ${
          !transparent
            ? "border-ink-900 ring-2 ring-ink-900 ring-offset-2 ring-offset-white"
            : "border-ink-200 hover:border-ink-400"
        }`}
      >
        <div className="w-12 h-12 bg-white border border-ink-200 rounded-sm flex items-center justify-center">
          <div className="w-6 h-6 bg-ink-900 rounded-[1px]" />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-ink-500 group-hover:text-ink-900 transition-colors">
          Solid white
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange(true)}
        className={`group flex flex-col items-center gap-2 p-4 bg-white border rounded-sm transition-all ${
          transparent
            ? "border-ink-900 ring-2 ring-ink-900 ring-offset-2 ring-offset-white"
            : "border-ink-200 hover:border-ink-400"
        }`}
      >
        <div
          className="w-12 h-12 border border-ink-200 rounded-sm flex items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #e3e3e3 25%, transparent 25%), linear-gradient(-45deg, #e3e3e3 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e3e3e3 75%), linear-gradient(-45deg, transparent 75%, #e3e3e3 75%)",
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
          }}
        >
          <div className="w-6 h-6 bg-ink-900 rounded-[1px]" />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-ink-500 group-hover:text-ink-900 transition-colors">
          Transparent
        </span>
      </button>
    </div>
  );
}
