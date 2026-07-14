import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({ meta: [
    { title: "Limiel Blog — Insurance Guides & News" },
    { name: "description", content: "Guides, comparisons and industry news to help you insure smarter." },
  ] }),
});

const posts = [
  { title: "How to choose motor insurance in 2026", cat: "Guides", read: "5 min", excerpt: "The one-page checklist every driver should read before buying cover." },
  { title: "Health insurance vs medical cover, explained", cat: "Health", read: "7 min", excerpt: "They sound the same, but they're wildly different. Here's what you need to know." },
  { title: "5 things travel insurance actually covers", cat: "Travel", read: "4 min", excerpt: "Beyond lost bags: the surprising claims you can make on any policy." },
  { title: "Life insurance for young families", cat: "Life", read: "6 min", excerpt: "Simple math to figure out how much cover you actually need." },
  { title: "SME cover: liability isn't optional", cat: "Business", read: "8 min", excerpt: "Why every small business owner should read this before Friday." },
  { title: "How claims really get approved", cat: "Claims", read: "5 min", excerpt: "The insider view: what adjusters look for and how to speed it up." },
];

function Blog() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Blog</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">The Limiel Journal</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Everything we know about buying, comparing and claiming insurance — shared.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Card key={p.title} className="group overflow-hidden shadow-soft transition hover:-translate-y-1 hover:shadow-elevated">
              <div className={`h-40 ${["gradient-hero-bg", "gradient-accent-bg", "bg-secondary"][i % 3]}`} />
              <CardContent className="p-6">
                <Badge variant="secondary">{p.cat}</Badge>
                <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">{p.read} read</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
