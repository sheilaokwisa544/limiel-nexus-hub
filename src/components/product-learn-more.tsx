import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, MessageSquare, ShieldCheck, Sparkles, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Product } from "@/data/products";

export function ProductLearnMoreDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [tab, setTab] = useState<string>(product?.tabs[0]?.id ?? "");

  // Reset tab when product changes
  if (product && tab && !product.tabs.some((t) => t.id === tab)) {
    setTab(product.tabs[0].id);
  }
  if (product && !tab) setTab(product.tabs[0].id);

  if (!product) return null;
  const Icon = product.icon;
  const activeTab = product.tabs.find((t) => t.id === tab) ?? product.tabs[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="gradient-hero-bg px-6 py-6 text-primary-foreground sm:px-8">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <Icon className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="font-display text-2xl font-bold text-white sm:text-3xl">
                {product.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-white/90 sm:text-base">
                {product.hook}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh]">
          <div className="px-6 py-6 sm:px-8">
            <p className="text-sm leading-relaxed text-foreground/90">{product.overview}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={ShieldCheck} title="Who it's suitable for">
                <ul className="mt-2 space-y-1.5 text-sm">
                  {product.suitableFor.map((s) => (
                    <li key={s} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
              <InfoCard icon={Sparkles} title="Why act sooner rather than later">
                <p className="mt-2 text-sm text-muted-foreground">{product.fomo}</p>
              </InfoCard>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold">Explore the cover options</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Each option has its own benefits, limits and considerations.
              </p>

              <Tabs value={activeTab.id} onValueChange={setTab} className="mt-4">
                <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1">
                  {product.tabs.map((t) => {
                    const TIcon = t.icon;
                    return (
                      <TabsTrigger
                        key={t.id}
                        value={t.id}
                        className="flex items-center gap-1.5 text-xs data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-soft sm:text-sm"
                      >
                        <TIcon className="h-3.5 w-3.5" />
                        {t.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {product.tabs.map((t) => (
                  <TabsContent key={t.id} value={t.id} className="mt-5 space-y-5">
                    <p className="text-sm leading-relaxed">{t.intro}</p>

                    <div>
                      <h4 className="text-sm font-semibold text-primary">What it may cover</h4>
                      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                        {t.covers.map((c) => (
                          <li
                            key={c}
                            className="flex gap-2 rounded-lg border bg-card p-3 text-sm shadow-soft"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {t.benefits && t.benefits.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-primary">Key benefits</h4>
                        <ul className="mt-2 space-y-1.5 text-sm">
                          {t.benefits.map((b) => (
                            <li key={b} className="flex gap-2">
                              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {t.considerations && t.considerations.length > 0 && (
                      <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-accent" />
                          <h4 className="text-sm font-semibold">Important considerations</h4>
                        </div>
                        <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
                          {t.considerations.map((c) => (
                            <li key={c} className="flex gap-2">
                              <span className="text-accent">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {t.fomo && (
                      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <p className="text-sm italic text-foreground/90">"{t.fomo}"</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {product.disclaimer && (
              <p className="mt-8 rounded-lg border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Disclaimer:</strong> {product.disclaimer}
              </p>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col gap-2 border-t bg-card px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
          <Button variant="outline" asChild>
            <Link to="/contact">
              <MessageSquare className="mr-1.5 h-4 w-4" /> Talk to an Advisor
            </Link>
          </Button>
          <Button asChild className="gradient-hero-bg text-primary-foreground">
            <Link to="/quote" search={{ product: product.id } as never}>
              Get a Quote <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof ShieldCheck;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      {children}
    </div>
  );
}

export function ProductBadge({ product }: { product: Product }) {
  return (
    <Badge variant="secondary" className="text-[10px]">
      {product.tabs.length} cover options
    </Badge>
  );
}
