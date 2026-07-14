import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({ meta: [
    { title: "About Limiel Insurance" },
    { name: "description", content: "Learn about Limiel's mission to make insurance simple, fast and fair across Africa." },
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
          Limiel is Africa's smart insurance marketplace. We compare quotes from 20+ regulated insurers so you can buy the right cover in minutes — not days.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { n: "250K+", l: "Customers protected" },
            { n: "20+", l: "Regulated insurers" },
            { n: "KES 1.2B", l: "Claims processed" },
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
