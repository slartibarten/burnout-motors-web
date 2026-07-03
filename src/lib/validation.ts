// Server-side input validation. The client's `type="email"` etc. is only a
// UX hint — anyone can POST to the API directly, so everything is re-checked here.

/** Required string: must be a non-empty string no longer than `maxLen` (after trim). */
export function cleanString(value: unknown, maxLen: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > maxLen) return null;
  return trimmed;
}

/** Optional string: missing/null → '', wrong type or too long → null, else trimmed. */
export function cleanOptionalString(value: unknown, maxLen: number): string | null {
  if (value == null) return '';
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length > maxLen) return null;
  return trimmed;
}

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
