import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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

type Post = { id: string; title: string; excerpt: string | null; content: string; category: string; author: string; featured_image_url: string | null; published_at: string | null };

function Blog() {
  const [open, setOpen] = useState<string | null>(null);
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["journal-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_articles")
        .select("id, title, excerpt, content, category, author, featured_image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });
      if (error) throw error;
      return data as Post[];
    },
  });
  const current = posts.find((p) => p.id === open);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Journal</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">The Limiel Journal</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Plain-language guides on choosing, using and claiming on insurance in Kenya.</p>

        {!isLoading && posts.length === 0 ? (
          <p className="mx-auto mt-10 max-w-md rounded-lg border border-dashed p-10 text-center font-display text-xl font-semibold text-muted-foreground">Coming Soon</p>
        ) : current ? (
          <article className="mx-auto mt-10 max-w-3xl">
            <Button variant="ghost" onClick={() => setOpen(null)}>← All articles</Button>
            {current.featured_image_url && <img src={current.featured_image_url} alt="" className="mt-4 h-72 w-full rounded-2xl object-cover" />}
            <Badge variant="secondary" className="mt-6">{current.category}</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold">{current.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{current.author} · {current.published_at}</p>
            <div className="mt-6 space-y-4 leading-relaxed">
              {current.content.split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </article>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
            {!isLoading && posts.length === 0 && <p className="col-span-full rounded-lg border border-dashed p-10 text-center text-muted-foreground">No articles published yet — check back soon.</p>}
            {posts.map((p, i) => (
              <Card key={p.id} className="group cursor-pointer overflow-hidden shadow-soft transition hover:-translate-y-1 hover:shadow-elevated" onClick={() => setOpen(p.id)}>
                {p.featured_image_url ? (
                  <img src={p.featured_image_url} alt="" className="h-40 w-full object-cover" />
                ) : (
                  <div className={`h-40 ${["gradient-hero-bg", "gradient-accent-bg", "bg-secondary"][i % 3]}`} />
                )}
                <CardContent className="p-6">
                  <Badge variant="secondary">{p.category}</Badge>
                  <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-primary">{p.title}</h3>
                  {p.excerpt && <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>}
                  <p className="mt-3 text-xs text-muted-foreground">{p.author} · {p.published_at}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
