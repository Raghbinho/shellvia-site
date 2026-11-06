import { UMAMI_SRC } from "@/lib/constants";

export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;
  return <script defer src={UMAMI_SRC} data-website-id={websiteId} data-domains="shellvia.com" />;
}
