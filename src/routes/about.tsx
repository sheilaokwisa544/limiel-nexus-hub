import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({ meta: [
    { title: "About Limiel Insurance" },
    { name: "description", content: "Limiel Insurance Limited is an independent Kenyan insurance brokerage comparing cover across licensed underwriters." },
    { property: "og:title", content: "About Limiel Insurance" },
    { property: "og:description", content: "An independent Kenyan insurance brokerage — we compare, place and support your cover." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});

function About() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">About</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Insurance, but simpler.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Limiel Insurance Limited is an independent Kenyan insurance brokerage. We compare options across
          licensed underwriters, place you with the right cover, and stay with you through renewals and claims.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { n: "Independent", l: "We work for you, not an insurer" },
            { n: "Compare", l: "Options across licensed underwriters" },
            { n: "Support", l: "From first quote to claim" },
          ].map((s) => (
            <Card key={s.l} className="shadow-soft">
              <CardContent className="p-6 text-center">
                <p className="font-display text-3xl font-bold text-primary">{s.n}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
