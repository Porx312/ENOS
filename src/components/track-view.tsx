"use client";

import { useEffect } from "react";
import { LEAD_PENDING_KEY, track } from "@/lib/campaign";

export function TrackView({ line }: { line: string }) {
  useEffect(() => {
    track("view_landing", line);
  }, [line]);

  return null;
}

export function TrackLead({ line }: { line: string }) {
  useEffect(() => {
    const pending = sessionStorage.getItem(LEAD_PENDING_KEY);
    if (!pending) return;
    track("generate_lead", pending);
    sessionStorage.removeItem(LEAD_PENDING_KEY);
  }, [line]);

  return null;
}
