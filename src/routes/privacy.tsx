import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="How Limiel Insurance Limited collects, uses and protects your personal information."
      sections={[
        {
          heading: "Who we are",
          body: [
            "Limiel Insurance Limited is an independent Kenyan insurance brokerage based at Real Towers, Upper Hill, Nairobi, Kenya. We compare options across underwriters, place clients with the right cover, and support them through claims.",
            "You can reach us at limielinsurance@gmail.com or 0719 401 804 for anything related to your privacy.",
          ],
        },
        {
          heading: "Information we collect",
          body: [
            "Details you share with us in a quote request, contact form or conversation — such as your name, phone number, email address and what you need covered (for example vehicle, travel, health or business details).",
            "If you create an account, we also keep the sign-in details and the information tied to your policies, payments and claims.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "To respond to your enquiry, prepare and submit quote requests to insurers on your behalf, place and service your policy, support you through claims, and keep you updated about your cover.",
            "We handle personal data in line with the Kenya Data Protection Act, 2019.",
          ],
        },
        {
          heading: "Sharing your information",
          body: [
            "We share your information only with the underwriters and service providers involved in quoting or servicing your cover, and only what is needed for that purpose. We never sell your information.",
          ],
        },
        {
          heading: "Storage and security",
          body: [
            "Your information is stored in secured systems and access is limited to Limiel staff who need it to serve you.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can ask us at any time to show you, correct or delete the personal information we hold about you. Email limielinsurance@gmail.com or call 0719 401 804 and we will act on your request.",
          ],
        },
      ]}
    />
  ),
  head: () => ({ meta: [
    { title: "Privacy Policy — Limiel Insurance" },
    { name: "description", content: "How Limiel Insurance Limited collects, uses and protects your personal information under the Kenya Data Protection Act." },
    { property: "og:title", content: "Privacy Policy — Limiel Insurance" },
    { property: "og:description", content: "How Limiel Insurance Limited collects, uses and protects your personal information." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});
