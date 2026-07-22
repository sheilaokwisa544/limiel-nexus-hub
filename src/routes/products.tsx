import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ProductLearnMoreDialog } from "@/components/product-learn-more";
import { products, type Product } from "@/data/products";

export const Route = createFileRoute("/products")({
  component: Products,
  head: () => ({ meta: [
    { title: "Insurance Products — Limiel" },
    { name: "description", content: "Life, Medical, Retirement, Motor, Travel and Estate Planning insurance products from Limiel Insurance." },
    { property: "og:title", content: "Insurance Products — Limiel" },
    { property: "og:description", content: "Explore our six core insurance categories and get a personalised quote." },
  ] }),
});

function Products() {
  const [openProduct, setOpenProduct] = useState<Product | null>(null);
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Products</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Cover for every stage of life</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Explore our six core insurance categories. Each one includes multiple cover options —
          learn what's included, then get a personalised quote in minutes.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Card
              key={p.id}
              className="group flex h-full flex-col transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {p.tabs.length} options
                  </Badge>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.cardDesc}</p>
                <p className="mt-3 flex-1 text-xs italic text-foreground/70">{p.hook}</p>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setOpenProduct(p)}
                  >
                    Learn More
                  </Button>
                  <Button asChild className="flex-1 gradient-hero-bg text-primary-foreground">
                    <Link to="/quote">
                      Get Quote <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-bold">Still deciding?</h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Every family and business is different. A licensed Limiel Insurance advisor can help you
            compare options and choose cover that fits your budget and priorities.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" asChild>
              <Link to="/contact">
                <MessageSquare className="mr-1.5 h-4 w-4" /> Speak to an Insurance Advisor
              </Link>
            </Button>
            <Button asChild className="gradient-hero-bg text-primary-foreground">
              <Link to="/quote">
                Request a Quote <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ProductLearnMoreDialog
        product={openProduct}
        open={!!openProduct}
        onOpenChange={(v) => !v && setOpenProduct(null)}
      />

      <SiteFooter />
    </div>
  );
}
