import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="The terms that apply when you use the Limiel Insurance website and services."
      sections={[
        {
          heading: "About these terms",
          body: [
            "These terms govern your use of this website and the services Limiel Insurance Limited provides through it. By using the site, you accept them.",
          ],
        },
        {
          heading: "Information, not advice",
          body: [
            "Content on this website is general information about insurance. It is not insurance, legal or financial advice, and it may not reflect your personal circumstances. Speak to a Limiel advisor before making decisions about your cover.",
          ],
        },
        {
          heading: "Quotes and cover",
          body: [
            "Submitting a quote request does not create an insurance policy. Limiel is an insurance intermediary — we are not an insurer. Cover exists only when an underwriter issues policy documents and the required premium has been paid, and it is governed by those policy terms.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "Please use the site lawfully and do not attempt to disrupt it, gain unauthorised access, or use it to send misleading or unlawful content.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The Limiel name, logo and website content belong to Limiel Insurance Limited or its licensors and may not be copied or reused without permission.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the extent permitted by law, Limiel is not liable for losses arising from reliance on general website content or from events outside our reasonable control.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of Kenya.",
          ],
        },
      ]}
    />
  ),
  head: () => ({ meta: [
    { title: "Terms of Service — Limiel Insurance" },
    { name: "description", content: "The terms that apply when you use the Limiel Insurance website and services." },
    { property: "og:title", content: "Terms of Service — Limiel Insurance" },
    { property: "og:description", content: "The terms that apply when you use the Limiel Insurance website and services." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});
