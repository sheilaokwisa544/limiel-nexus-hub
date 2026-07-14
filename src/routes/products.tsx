import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, Heart, Plane, Users, Stethoscope, Home, Briefcase, ShieldAlert, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/products")({
  component: Products,
  head: () => ({ meta: [
    { title: "Insurance Products — Limiel" },
    { name: "description", content: "Explore Motor, Health, Travel, Life, Home, Business and Personal Accident insurance products." },
  ] }),
});

const items = [
  { icon: Car, title: "Motor Insurance", desc: "Third-party, comprehensive & fleet cover." },
  { icon: Heart, title: "Health Insurance", desc: "Inpatient, outpatient, dental & optical." },
  { icon: Plane, title: "Travel Insurance", desc: "Trip, medical & baggage cover for any journey." },
  { icon: Users, title: "Life Insurance", desc: "Term, whole life & family protection." },
  { icon: Stethoscope, title: "Medical Cover", desc: "Chronic care and wellness plans." },
  { icon: Home, title: "Home Insurance", desc: "Buildings, contents and liability." },
  { icon: Briefcase, title: "Business Insurance", desc: "Property, liability, workforce & cyber." },
  { icon: ShieldAlert, title: "Personal Accident", desc: "Injury benefits and income protection." },
];

function Products() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Products</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Cover for every part of life</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Browse our full catalogue of personal, family and business insurance products.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c) => (
            <Card key={c.title} className="group h-full transition hover:-translate-y-1 hover:shadow-elevated">
              <CardContent className="p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <Button variant="link" className="mt-3 h-auto p-0 text-primary" asChild>
                  <Link to="/quote">Get a quote <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
