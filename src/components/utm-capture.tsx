"use client";

import { useEffect } from "react";
import { captureUtmFromLocation } from "@/lib/campaign";

export function UtmCapture() {
  useEffect(() => {
    captureUtmFromLocation();
  }, []);

  return null;
}
