import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "The Limiel Journal — Insurance Guides for Kenya" },
      { name: "description", content: "Plain-language guides on motor, health, travel and business insurance in Kenya from Limiel Insurance." },
      { property: "og:title", content: "The Limiel Journal — Insurance Guides for Kenya" },
      { property: "og:description", content: "Plain-language insurance guides from Limiel Insurance Limited." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Blog() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Journal</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">The Limiel Journal</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Plain-language guides on choosing, using and claiming on insurance in Kenya.</p>
        <p className="mx-auto mt-10 max-w-md rounded-lg border border-dashed p-10 text-center font-display text-xl font-semibold text-muted-foreground">Coming Soon</p>
      </section>
      <SiteFooter />
    </div>
  );
}
