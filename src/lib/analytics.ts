import type { Os } from "@/lib/platform";
import type { Format } from "@/lib/releases";

/** Attributes the Umami script reads to record a click on a download link. */
export function downloadEvent(os: Os, format: Format) {
  return {
    "data-umami-event": "download",
    "data-umami-event-os": os,
    "data-umami-event-format": format,
  };
}
