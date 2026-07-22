import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Zap, ShieldCheck, Wallet, HeadphonesIcon,
  Star, Quote, ArrowRight, Check, Mail, Phone, MapPin, MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ChatWidget } from "@/components/chat-widget";
import { ProductLearnMoreDialog } from "@/components/product-learn-more";
import { products, type Product } from "@/data/products";
import { toast } from "sonner";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});


const whyItems = [
  { icon: Zap, title: "Fast Quotes", desc: "Compare 20+ insurers in under 60 seconds." },
  { icon: ShieldCheck, title: "Trusted Insurers", desc: "Only regulated, top-rated providers." },
  { icon: Wallet, title: "Affordable Premiums", desc: "Save up to 40% on your policy." },
  { icon: HeadphonesIcon, title: "Instant Support", desc: "24/7 human help via chat, call, email." },
];

const partners = ["Britam", "Jubilee", "APA", "CIC", "Sanlam", "Old Mutual", "AAR", "Madison", "GA Insurance", "Heritage"];

const testimonials = [
  { name: "Amina Odhiambo", role: "Small Business Owner", quote: "Limiel saved me 35% on my fleet cover. The comparison was effortless.", rating: 5 },
  { name: "David Mwangi", role: "Software Engineer", quote: "Got a health plan for my family in 10 minutes. Documents in my inbox instantly.", rating: 5 },
  { name: "Grace Achieng", role: "Travel Blogger", quote: "Travel insurance for a 3-country trip was cheaper than a coffee. Highly recommend.", rating: 5 },
];

const blogPosts = [
  { title: "How to choose motor insurance in 2026", cat: "Guides", read: "5 min" },
  { title: "Health insurance vs medical cover explained", cat: "Health", read: "7 min" },
  { title: "5 things travel insurance actually covers", cat: "Travel", read: "4 min" },
];

const faqs = [
  { q: "How does Limiel make money?", a: "We earn a small commission from insurers when you buy a policy. You pay the same price as going direct." },
  { q: "Are my details safe?", a: "Yes. We use bank-grade encryption and only share your info with insurers you request quotes from." },
  { q: "How fast will I get a quote?", a: "Most quotes are instant. Complex products may take up to 15 minutes." },
  { q: "Can I cancel my policy?", a: "Yes, most policies have a 14-day cooling-off period. Terms vary by insurer." },
];

function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <Hero />
      <Categories />
      <QuoteCompare />
      <WhyChoose />
      <Partners />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
      <Newsletter />
      <SiteFooter />
      <ChatWidget />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" className="h-full w-full object-cover" width={1600} height={1100} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-secondary/70" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary-foreground"
        >
          <Badge className="mb-4 border-white/30 bg-white/15 text-white backdrop-blur">
            🇰🇪 Trusted by 250,000+ customers
          </Badge>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Compare Insurance Plans in Minutes
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/90">
            Get affordable Motor, Health, Travel, Life and Business Insurance from trusted providers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground shadow-glow hover:bg-accent/90">
              <Link to="/quote">Get Quote <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20">
              <a href="#compare">Compare Plans</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/85">
            {["A+ rated insurers", "Instant PDF quotes", "No hidden fees"].map((s) => (
              <span key={s} className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> {s}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-3xl p-6 shadow-elevated"
        >
          <QuickQuoteCard />
        </motion.div>
      </div>
    </section>
  );
}

function QuickQuoteCard() {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-white">Quick Quote</h3>
      <p className="mt-1 text-sm text-white/80">Get personalized quotes in 60 seconds.</p>
      <form
        className="mt-5 space-y-3"
        onSubmit={(e) => { e.preventDefault(); toast.success("Quotes are on the way!"); }}
      >
        <div>
          <Label className="text-white/90">Insurance type</Label>
          <Select defaultValue="motor">
            <SelectTrigger className="bg-white/95 text-foreground"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Motor","Health","Travel","Life","Home","Business"].map((c) => (
                <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-white/90">Full name</Label>
            <Input placeholder="Jane Doe" className="bg-white/95 text-foreground" />
          </div>
          <div>
            <Label className="text-white/90">Phone</Label>
            <Input placeholder="+254 700 000 000" className="bg-white/95 text-foreground" />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Show My Quotes
        </Button>
      </form>
    </div>
  );
}

function Categories() {
  const [openProduct, setOpenProduct] = useState<Product | null>(null);
  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead
        eyebrow="Products"
        title="Cover for every stage of life"
        desc="Explore our six core insurance categories. Learn what each cover includes, who it suits, and get a personalised quote."
      />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group flex h-full flex-col border-transparent bg-card transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {p.tabs.length} options
                  </Badge>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.cardDesc}</p>
                <p className="mt-3 text-xs italic text-foreground/70">{p.hook}</p>
                <div className="mt-5 flex flex-1 flex-col justify-end gap-2 sm:flex-row">
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
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border bg-gradient-to-br from-primary/5 to-secondary/5 p-6 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold">Not sure which cover is right for you?</h3>
          <p className="text-sm text-muted-foreground">
            Speak to a licensed Limiel Insurance advisor for guidance tailored to your needs.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" asChild>
            <Link to="/contact">
              <MessageSquare className="mr-1.5 h-4 w-4" /> Speak to an Advisor
            </Link>
          </Button>
          <Button asChild className="gradient-hero-bg text-primary-foreground">
            <Link to="/quote">Request a Quote <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <ProductLearnMoreDialog
        product={openProduct}
        open={!!openProduct}
        onOpenChange={(v) => !v && setOpenProduct(null)}
      />
    </section>
  );
}


function QuoteCompare() {
  const [submitted, setSubmitted] = useState(false);
  const quotes = [
    { name: "Britam", premium: 3200, coverage: "Comprehensive", benefits: ["Towing", "Windscreen", "PA Cover"], color: "from-primary to-primary-glow" },
    { name: "Jubilee", premium: 2950, coverage: "Comprehensive", benefits: ["24/7 Assist", "Courtesy Car", "Excess waiver"], color: "from-secondary to-primary" },
    { name: "APA", premium: 3450, coverage: "Comprehensive Plus", benefits: ["Agreed Value", "Terrorism", "Political Risk"], color: "from-accent to-primary" },
  ];
  return (
    <section id="compare" className="bg-gradient-to-b from-muted/40 to-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead eyebrow="Compare" title="Real quotes from real insurers" desc="Fill in a few details and see side-by-side pricing." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[380px_1fr]">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); toast.success("3 quotes ready"); }}
                className="space-y-4"
              >
                <div>
                  <Label>Insurance Type</Label>
                  <Select defaultValue="motor">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Motor","Health","Travel","Life","Home","Business"].map((c) => (
                        <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Age</Label><Input type="number" placeholder="32" /></div>
                  <div><Label>Location</Label><Input placeholder="Nairobi" /></div>
                </div>
                <div><Label>Vehicle details</Label><Input placeholder="Toyota Vitz 2019" /></div>
                <div><Label>Budget (KES / month)</Label><Input type="number" placeholder="3000" /></div>
                <Button type="submit" className="w-full gradient-hero-bg text-primary-foreground">Show Quotes</Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {quotes.map((q, i) => (
              <motion.div
                key={q.name}
                initial={{ opacity: 0, x: 24 }}
                animate={submitted ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden shadow-soft transition hover:shadow-elevated">
                  <CardContent className="grid gap-4 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                    <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${q.color} font-display text-lg font-bold text-white`}>
                      {q.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold">{q.name}</h4>
                        <Badge variant="secondary">{q.coverage}</Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {q.benefits.map((b) => <span key={b} className="flex items-center gap-1"><Check className="h-3 w-3 text-secondary" /> {b}</span>)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold text-primary">KES {q.premium.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">per month</p>
                      <Button size="sm" className="mt-2 gradient-hero-bg text-primary-foreground">Apply</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="Why Limiel" title="Insurance made human" desc="We built Limiel to make protection simple, fast, and fair." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyItems.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-6 text-center shadow-soft"
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-hero-bg text-primary-foreground shadow-glow">
              <w.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold">{w.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Partners() {
  const doubled = [...partners, ...partners];
  return (
    <section className="border-y bg-card py-10">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Backed by 20+ regulated insurers
      </p>
      <div className="mt-6 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 px-4">
          {doubled.map((p, i) => (
            <div key={i} className="grid h-12 shrink-0 place-items-center whitespace-nowrap rounded-lg border bg-background px-6 font-display text-sm font-semibold text-muted-foreground">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="Testimonials" title="Loved by our customers" desc="Real stories from people who saved on insurance." />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full shadow-soft">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="mt-3 text-sm leading-relaxed">{t.quote}</p>
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-accent text-accent" />)}
                </div>
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="Blog" title="Latest from our journal" desc="Guides and news to help you insure smarter." />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {blogPosts.map((p, i) => (
          <Card key={p.title} className="group overflow-hidden shadow-soft transition hover:-translate-y-1 hover:shadow-elevated">
            <div className={`h-40 ${["gradient-hero-bg", "gradient-accent-bg", "bg-secondary"][i]}`} />
            <CardContent className="p-6">
              <Badge variant="secondary">{p.cat}</Badge>
              <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-primary">{p.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{p.read} read</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="FAQ" title="Common questions" desc="Everything you need to know before buying." />
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`i${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-gradient-to-b from-background to-muted/40 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHead align="left" eyebrow="Contact" title="Talk to an expert" desc="Real humans, ready to help you choose." />
          <div className="mt-8 space-y-4">
            {[
              { icon: Mail, label: "hello@limiel.co", sub: "Email us anytime" },
              { icon: Phone, label: "+254 700 000 000", sub: "Mon–Sat, 8am–8pm" },
              { icon: MapPin, label: "Westlands, Nairobi", sub: "Come say hi" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{c.label}</p>
                  <p className="text-sm text-muted-foreground">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <form onSubmit={(e) => { e.preventDefault(); toast.success("We'll get back to you shortly."); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>First name</Label><Input placeholder="Jane" /></div>
                <div><Label>Last name</Label><Input placeholder="Doe" /></div>
              </div>
              <div><Label>Email</Label><Input type="email" placeholder="jane@example.com" /></div>
              <div><Label>Message</Label>
                <textarea className="mt-1.5 min-h-28 w-full rounded-md border border-input bg-background p-3 text-sm" placeholder="How can we help?" />
              </div>
              <Button type="submit" className="w-full gradient-hero-bg text-primary-foreground">Send message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl gradient-hero-bg p-10 text-primary-foreground shadow-elevated">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "var(--gradient-mesh)" }} />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Stay in the know</h3>
            <p className="mt-2 max-w-lg text-white/85">Insurance tips, product updates and exclusive deals — straight to your inbox.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed!"); }} className="flex flex-col gap-3 sm:flex-row">
            <Input type="email" required placeholder="you@example.com" className="min-w-72 bg-white/95 text-foreground" />
            <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, desc, align = "center" }: { eyebrow: string; title: string; desc: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{desc}</p>
    </div>
  );
}
