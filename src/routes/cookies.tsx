import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/cookies")({
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      intro="How this website uses cookies and how you can control them."
      sections={[
        {
          heading: "What cookies are",
          body: [
            "Cookies are small files stored on your device when you visit a website. They help the site work properly and remember your choices.",
          ],
        },
        {
          heading: "Cookies we use",
          body: [
            "Essential cookies keep you signed in securely and protect the site. Preference cookies remember choices such as your selected language.",
            "We do not run advertising or third-party tracking cookies.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can clear or block cookies in your browser settings. Blocking essential cookies may prevent parts of the site — such as signing in — from working.",
          ],
        },
      ]}
    />
  ),
  head: () => ({ meta: [
    { title: "Cookie Policy — Limiel Insurance" },
    { name: "description", content: "How the Limiel Insurance website uses cookies and how you can control them." },
    { property: "og:title", content: "Cookie Policy — Limiel Insurance" },
    { property: "og:description", content: "How the Limiel Insurance website uses cookies and how you can control them." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});
