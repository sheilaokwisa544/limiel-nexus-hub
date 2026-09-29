import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/regulatory")({
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Regulatory Information"
      intro="How Limiel Insurance Limited is regulated and how we operate."
      sections={[
        {
          heading: "Who we are",
          body: [
            "Limiel Insurance Limited is an independent insurance intermediary (broker/agent) operating in Kenya, with its office at Real Towers, Upper Hill, Nairobi.",
          ],
        },
        {
          heading: "Regulation",
          body: [
            "Insurance business in Kenya is regulated by the Insurance Regulatory Authority (IRA).",
            "Limiel does not underwrite insurance. The policies we place are underwritten by licensed insurers, and the terms of your cover are set out in those insurers' policy documents. You can ask us for our current licensing details at any time.",
          ],
        },
        {
          heading: "How we are paid",
          body: [
            "We may earn a commission from an insurer when we place a policy. Where this applies, it is reflected in the quotation documentation we share with you, and we will always tell you how we are paid.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "Limiel Insurance Limited, Real Towers, Upper Hill, Nairobi, Kenya. Phone or WhatsApp: 0719 401 804. Email: limielinsurance@gmail.com.",
          ],
        },
      ]}
    />
  ),
  head: () => ({ meta: [
    { title: "Regulatory Information — Limiel Insurance" },
    { name: "description", content: "Limiel Insurance Limited's regulatory status as an independent Kenyan insurance intermediary." },
    { property: "og:title", content: "Regulatory Information — Limiel Insurance" },
    { property: "og:description", content: "How Limiel Insurance Limited is regulated and how we operate." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});
