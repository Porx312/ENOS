export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const UTM_STORAGE = "enos_utm";
export const LEAD_PENDING_KEY = "enos_lead_pending";
export const QUOTE_MESSAGE_KEY = "enos_quote_message";

export function readUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const utm: UtmParams = {};
    for (const key of UTM_KEYS) {
      const value = parsed[key];
      if (typeof value === "string" && value.trim()) utm[key] = value.slice(0, 120);
    }
    return utm;
  } catch {
    return {};
  }
}

export function captureUtmFromLocation() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim().slice(0, 120);
    if (value) found[key] = value;
  }
  if (Object.keys(found).length > 0) {
    sessionStorage.setItem(UTM_STORAGE, JSON.stringify(found));
  }
}

export function withCampaign(message: string) {
  const campaign = readUtm().utm_campaign;
  return campaign ? `${message} Campaña: ${campaign}.` : message;
}

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

export function track(
  event: "view_landing" | "whatsapp_click" | "generate_lead",
  line: string,
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, { line });
  if (event === "generate_lead") {
    window.fbq?.("track", "Lead", { content_name: line });
  } else if (event === "whatsapp_click") {
    window.fbq?.("trackCustom", "WhatsAppClick", { content_name: line });
  } else {
    window.fbq?.("trackCustom", "ViewLanding", { content_name: line });
  }
}
