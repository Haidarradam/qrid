import QRCode from "qrcode";

export interface QROptions {
  size?: number;
  margin?: number;
  darkColor?: string;
  lightColor?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

const DEFAULT_OPTIONS: Required<QROptions> = {
  size: 1024,
  margin: 2,
  darkColor: "#0a0a0a",
  lightColor: "#ffffff",
  errorCorrectionLevel: "M",
};

/**
 * Generate QR code as data URL (PNG).
 */
export async function generateQRDataURL(text: string, options: QROptions = {}): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  return QRCode.toDataURL(text, {
    width: opts.size,
    margin: opts.margin,
    errorCorrectionLevel: opts.errorCorrectionLevel,
    color: {
      dark: opts.darkColor,
      light: opts.lightColor,
    },
  });
}

/**
 * Download data URL as a file.
 */
function triggerDownload(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Build a sane, short filename from the content.
 */
function buildFilename(text: string): string {
  const slug = text
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "qr-code";
  return `${slug}.png`;
}

/**
 * Download QR code as PNG.
 */
export async function downloadAsPNG(text: string, options: QROptions = {}): Promise<void> {
  const dataUrl = await generateQRDataURL(text, options);
  triggerDownload(dataUrl, buildFilename(text));
}
