"use client";

import { useState } from "react";
import { URLInput } from "./components/URLInput";
import { QRPreview } from "./components/QRPreview";
import { DownloadButton } from "./components/DownloadButton";
import { SparkleIcon } from "./components/Icons";

export default function Home() {
  const [input, setInput] = useState("");
  const hasContent = input.trim().length > 0;

  return (
    <main className="relative min-h-screen flex flex-col pt-16">
      {/* Decorative grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top nav - fixed */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-ink-200/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 246 246"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-ink-900"
              aria-label="QRID logo"
            >
              <path
                d="M82 164H164V246H0V0H164L246 82V164H164V82H82V164Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-xl font-semibold tracking-tight text-ink-900">QRID</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-ink-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>v1.0</span>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative z-10 pt-16 pb-12 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-ink-400">
            <SparkleIcon className="w-3.5 h-3.5" />
            <span className="text-xs font-mono uppercase tracking-widest">Generator</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-ink-900 leading-[0.95] tracking-tight">
            Turn any link into a <span className="italic font-normal">beautiful</span>
            <br />
            QR code.
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-500 leading-relaxed">
            Paste a URL or any text, preview the QR instantly, and download it as a high-resolution
            PNG image.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative z-10 flex-1 px-6 lg:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left: Input & Actions */}
            <div className="lg:col-span-3 space-y-8">
              <URLInput value={input} onChange={setInput} />

              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-xs font-mono uppercase tracking-widest text-ink-400">
                    Export
                  </h2>
                  <span className="text-xs font-mono text-ink-300">PNG</span>
                </div>
                <DownloadButton text={input} disabled={!hasContent} />
              </div>

              {/* Meta info */}
              <div className="pt-8 border-t border-ink-200/60 space-y-3">
                <MetaRow label="Format" value="PNG · 1024×1024" />
                <MetaRow label="Error correction" value="Medium · 15%" />
                <MetaRow
                  label="Characters"
                  value={`${input.length} / 2953`}
                  highlight={input.length > 2953}
                />
              </div>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-2 lg:sticky lg:top-8">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-ink-400">
                  Preview
                </h2>
                {hasContent && (
                  <span className="text-xs font-mono text-ink-400 animate-fade-in">live</span>
                )}
              </div>
              <QRPreview text={input} />
            </div>
          </div>
        </div>
      </section>

      {/* Features section — SEO content */}
      <section className="relative z-10 px-6 lg:px-10 py-20 border-t border-ink-200/60 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-ink-400">
            <span className="text-xs font-mono uppercase tracking-widest">Why QRID</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 mb-12 max-w-2xl">
            A free QR code generator that respects your time and your privacy.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              number="01"
              title="100% Free Forever"
              description="No signup, no watermark, no limits, no hidden fees. Generate as many QR codes as you need — it's our promise to stay free."
            />
            <FeatureCard
              number="02"
              title="Privacy First"
              description="Your links never leave your browser. All QR code generation happens locally on your device — nothing is stored or tracked."
            />
            <FeatureCard
              number="03"
              title="High Resolution"
              description="Download crisp 1024×1024 PNG files ready for print or digital use — posters, flyers, business cards, menus, packaging, and more."
            />
            <FeatureCard
              number="04"
              title="Works Everywhere"
              description="Scannable with any modern smartphone camera. Compatible with iOS, Android, and all QR code reader apps — no special app required."
            />
            <FeatureCard
              number="05"
              title="Never Expires"
              description="QR codes generated here are static. They will keep working forever, as long as your destination link stays online."
            />
            <FeatureCard
              number="06"
              title="Instant Preview"
              description="See your QR code update in real-time as you type. No waiting, no reloading — just paste a link and it's ready."
            />
          </div>
        </div>
      </section>

      {/* How it works — SEO content */}
      <section className="relative z-10 px-6 lg:px-10 py-20 border-t border-ink-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-ink-400">
            <span className="text-xs font-mono uppercase tracking-widest">How it works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 mb-12 max-w-2xl">
            From link to QR code in three steps.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step
              number="1"
              title="Paste your link"
              description="Copy any URL, website address, or text into the input field at the top of the page."
            />
            <Step
              number="2"
              title="Preview instantly"
              description="Your QR code appears in real-time. Scan it with your phone to test before downloading."
            />
            <Step
              number="3"
              title="Download PNG"
              description="Click the download button to save a high-resolution PNG image to your device."
            />
          </div>
        </div>
      </section>

      {/* FAQ — SEO content */}
      <section className="relative z-10 px-6 lg:px-10 py-20 border-t border-ink-200/60 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-ink-400">
            <span className="text-xs font-mono uppercase tracking-widest">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 mb-12">
            Questions, answered.
          </h2>
          <div className="divide-y divide-ink-200/60 border-t border-b border-ink-200/60">
            <FAQItem
              question="Is QRID really free?"
              answer="Yes — 100% free forever. No signup, no watermark, no hidden fees, and no limits on how many QR codes you can generate."
            />
            <FAQItem
              question="How do I convert a link to a QR code?"
              answer="Just paste your URL into the input field. The QR code is generated in real-time, and you can download it as a high-resolution PNG with one click."
            />
            <FAQItem
              question="Is my data safe when I use QRID?"
              answer="Absolutely. All QR code generation happens directly in your browser. Your links and data are never sent to any server, stored, or tracked."
            />
            <FAQItem
              question="What resolution is the downloaded QR code?"
              answer="1024×1024 pixel PNG — high enough for both digital use and print materials like posters, flyers, business cards, and packaging."
            />
            <FAQItem
              question="Do QR codes from QRID expire?"
              answer="Never. QR codes are static and work forever, as long as the link they point to remains active."
            />
            <FAQItem
              question="Can I use these QR codes for commercial purposes?"
              answer="Yes. QR codes generated here are yours to use for any purpose — personal projects, business cards, product packaging, marketing materials, or anywhere else."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-ink-200/60 py-6 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono text-ink-400">
          <span>© {new Date().getFullYear()} QRID</span>
          <a
            href="https://sociabuzz.com/haidarradam"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-ink-200 bg-white hover:bg-ink-900 hover:text-white hover:border-ink-900 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ink-900 group-hover:bg-white transition-colors" />
            <span className="tracking-widest uppercase">Support the creator</span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 14 14"
              fill="none"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group">
      <div className="text-xs font-mono text-ink-300 mb-3 tracking-widest">{number}</div>
      <h3 className="text-lg font-semibold text-ink-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-ink-500 leading-relaxed">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="w-10 h-10 rounded-full bg-ink-900 text-white flex items-center justify-center text-sm font-semibold mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-ink-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-ink-500 leading-relaxed">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group py-5">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="text-base font-medium text-ink-900 pr-4">{question}</span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-ink-400 group-open:rotate-45 transition-transform">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 2V12M2 7H12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </summary>
      <p className="mt-3 text-sm text-ink-500 leading-relaxed pr-10">{answer}</p>
    </details>
  );
}

function MetaRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-xs font-mono uppercase tracking-widest text-ink-400">{label}</span>
      <span
        className={`text-sm ${
          highlight ? "text-red-500" : "text-ink-900"
        } font-mono tabular-nums`}
      >
        {value}
      </span>
    </div>
  );
}
