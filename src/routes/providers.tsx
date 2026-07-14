import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Star } from "lucide-react";

export const Route = createFileRoute("/providers")({
  component: Providers,
  head: () => ({ meta: [
    { title: "Insurance Providers — Limiel" },
    { name: "description", content: "Compare quotes from 20+ regulated, top-rated insurance providers." },
  ] }),
});

const providers = [
  "Britam", "Jubilee Insurance", "APA Insurance", "CIC Insurance", "Sanlam",
  "Old Mutual", "AAR Insurance", "Madison", "GA Insurance", "Heritage",
  "ICEA Lion", "UAP", "First Assurance", "Kenya Orient", "Resolution", "Prudential",
];

function Providers() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Providers</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Regulated. Trusted. Rated.</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">We only partner with insurers regulated by the IRA and rated A- or better.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {providers.map((p) => (
            <Card key={p} className="transition hover:-translate-y-1 hover:shadow-elevated">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="font-display text-lg font-semibold">{p}</p>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-accent text-accent" />)}
                  </div>
                </div>
                <span className="rounded-full bg-secondary/15 px-2 py-1 text-xs font-semibold text-secondary">A+</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
