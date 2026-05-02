"use client";

import { useState, ReactNode } from "react";

interface AccordionItemProps {
  id: string;
  label: string;
  summary?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  openAccordion: string | null;
  setOpenAccordion: (id: string | null) => void;
  badge?: ReactNode;
}

export function AccordionItem({
  id,
  label,
  summary,
  children,
  openAccordion,
  setOpenAccordion,
  badge,
}: AccordionItemProps) {
  const isOpen = openAccordion === id;

  const toggle = () => {
    setOpenAccordion(isOpen ? null : id);
  };

  return (
    <div className="border-b border-ink-200/60 last:border-b-0">
      <button
        type="button"
        onClick={toggle}
        className="w-full py-4 flex items-center justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-medium text-ink-900 tracking-tight">{label}</span>
          {badge}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {summary && (
            <span className="text-xs font-mono text-ink-400 truncate max-w-[140px]">
              {summary}
            </span>
          )}
          <span
            className={`w-5 h-5 flex items-center justify-center text-ink-400 group-hover:text-ink-900 transition-all ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1V11M1 6H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </button>
      {isOpen && (
        <div className="pb-6 pt-1 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  children: (ctx: {
    openAccordion: string | null;
    setOpenAccordion: (id: string | null) => void;
  }) => ReactNode;
  defaultOpen?: string | null;
}

export function Accordion({ children, defaultOpen = null }: AccordionProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(defaultOpen);
  return (
    <div className="border-t border-ink-200/60">
      {children({ openAccordion, setOpenAccordion })}
    </div>
  );
}
