"use client";

import type {
  DotType,
  CornerSquareType,
  CornerDotType,
} from "qr-code-styling";

export type DotPattern = DotType;
export type CornerStyle = CornerSquareType;

export interface QRConfig {
  text: string;
  color: string;
  transparent: boolean;
  dotPattern: DotPattern;
  cornerStyle: CornerStyle;
  logo: string | null;
}

export const DEFAULT_CONFIG: Omit<QRConfig, "text"> = {
  color: "#0A0A0A",
  transparent: false,
  dotPattern: "square",
  cornerStyle: "square",
  logo: null,
};

/**
 * Dynamically import qr-code-styling (it references `window` at module scope).
 */
async function loadQRLib() {
  const mod = await import("qr-code-styling");
  return mod.default;
}

/**
 * Build the options object passed to QRCodeStyling.
 * Corner-dot style follows the corner-square style for visual coherence.
 */
function buildOptions(config: QRConfig, size: number) {
  const hasLogo = !!config.logo;

  return {
    width: size,
    height: size,
    type: "canvas" as const,
    data: config.text,
    image: config.logo || undefined,
    margin: 8,
    qrOptions: {
      errorCorrectionLevel: (hasLogo ? "H" : "M") as "L" | "M" | "Q" | "H",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.35,
      margin: 6,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: config.color,
      type: config.dotPattern,
    },
    backgroundOptions: {
      color: config.transparent ? "transparent" : "#ffffff",
    },
    cornersSquareOptions: {
      color: config.color,
      type: config.cornerStyle,
    },
    cornersDotOptions: {
      color: config.color,
      type: (config.cornerStyle === "dot" ? "dot" : "square") as CornerDotType,
    },
  };
}

/**
 * Generate a QR and render into the given DOM element. Returns the instance so
 * it can be reused for subsequent updates (avoids full re-creation flicker).
 */
export async function renderQRToElement(
  element: HTMLElement,
  config: QRConfig,
  size: number
): Promise<any> {
  const QRCodeStyling = await loadQRLib();
  element.innerHTML = "";
  const instance = new QRCodeStyling(buildOptions(config, size));
  instance.append(element);
  return instance;
}

/**
 * Update an existing instance with new config.
 */
export function updateInstance(
  instance: any,
  config: QRConfig,
  size: number
): void {
  instance.update(buildOptions(config, size));
}

/**
 * Build a sane, short filename from the content.
 */
function buildFilename(text: string): string {
  const slug =
    text
      .replace(/^https?:\/\//, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "qr-code";
  return slug;
}

/**
 * Generate and download a high-resolution PNG (1024x1024).
 */
export async function downloadAsPNG(config: QRConfig): Promise<void> {
  const QRCodeStyling = await loadQRLib();
  const instance = new QRCodeStyling(buildOptions(config, 1024));
  await instance.download({
    name: buildFilename(config.text),
    extension: "png",
  });
}

/**
 * Validate a hex color string. Accepts #RGB, #RRGGBB (with or without #).
 */
export function isValidHex(hex: string): boolean {
  return /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(hex.trim());
}

/**
 * Normalize a hex color string — ensures it starts with # and is uppercase.
 */
export function normalizeHex(hex: string): string {
  const trimmed = hex.trim().replace(/^#/, "");
  return "#" + trimmed.toUpperCase();
}

/**
 * Read a File (from <input type="file">) and return a data URL.
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
