export const CONSENT_STORAGE_KEY = "enos_cookie_consent";

export type CookieConsent = "accepted" | "rejected";

export function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "accepted" || value === "rejected") return value;
  } catch {
    /* ignore */
  }
  return null;
}

export function writeConsent(value: CookieConsent) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("enos-consent", { detail: value }));
}

export function hasAnalyticsConsent() {
  return readConsent() === "accepted";
}
