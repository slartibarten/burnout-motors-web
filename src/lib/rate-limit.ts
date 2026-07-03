// In-memory rate limiter. Sufficient for a single-instance deployment.
// For multi-instance you'd swap the Map for a shared store (Redis/Upstash).

const store = new Map<string, number[]>();
let lastSweep = Date.now();

/**
 * Returns true if the request is allowed, false if it exceeds the limit.
 * @param key    identifier to bucket by (usually the client IP)
 * @param max    max requests allowed within the window
 * @param windowMs  window length in milliseconds
 */
export function rateLimit(key: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();

  // Periodically drop stale keys so the map can't grow unbounded.
  if (now - lastSweep > windowMs) {
    store.forEach((times, k) => {
      const recent = times.filter((t) => now - t < windowMs);
      if (recent.length === 0) store.delete(k);
      else store.set(k, recent);
    });
    lastSweep = now;
  }

  const recent = (store.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  store.set(key, recent);
  return recent.length <= max;
}

/** Best-effort client IP from proxy headers (Hostinger sits behind a proxy). */
export function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
