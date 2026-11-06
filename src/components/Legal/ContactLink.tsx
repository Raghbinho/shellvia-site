import { PUBLISHER } from "@/content/publisher";

export function ContactLink() {
  return <a href={`mailto:${PUBLISHER.email}`}>{PUBLISHER.email}</a>;
}
