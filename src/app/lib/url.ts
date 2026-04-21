/**
 * Validates whether a string is a valid URL or can be treated as text data for QR.
 * Returns true for any non-empty string, but marks URL-shaped strings specifically.
 */
export function isValidUrl(value: string): boolean {
  if (!value || !value.trim()) return false;
  try {
    // Allow URLs with or without protocol
    const normalized = value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;
    new URL(normalized);
    return true;
  } catch {
    return false;
  }
}

/**
 * Normalizes URL by adding https:// if no protocol is present.
 */
export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (trimmed.match(/^[a-zA-Z]+:\/\//)) return trimmed;
  // If it looks like a domain, prepend https://
  if (trimmed.includes(".") && !trimmed.includes(" ")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}
