import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Zap, ShieldCheck, Wallet, HeadphonesIcon,
  ArrowRight, Check, Mail, Phone, MapPin, MessageSquare,
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
  head: () => ({ meta: [
    { title: "Limiel Insurance — Your Security, Our Commitment" },
    { name: "description", content: "Independent Kenyan insurance brokerage. Motor, health, travel, life and business cover — we compare options across underwriters for you." },
    { property: "og:title", content: "Limiel Insurance — Your Security, Our Commitment" },
    { property: "og:description", content: "Motor, health, travel, life and business insurance from an independent Kenyan brokerage." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], scripts: [{ type: "application/ld+json", children: JSON.stringify({
    "@context": "https://schema.org", "@type": "InsuranceAgency", name: "Limiel Insurance Limited",
    url: "https://limielinsurance.co.ke", email: "limielinsurance@gmail.com", telephone: "+254719401804",
    address: { "@type": "PostalAddress", streetAddress: "Real Towers, Upper Hill", addressLocality: "Nairobi", addressCountry: "KE" },
    sameAs: ["https://www.linkedin.com/in/limiel-insurance-company"],
  }) }] }),
});


const whyItems = [
  { icon: Zap, title: "Fast Quotes", desc: "Tell us what you need and our team comes back with options — fast." },
  { icon: ShieldCheck, title: "Trusted Insurers", desc: "We only place you with licensed, regulated insurers." },
  { icon: Wallet, title: "Cover That Fits", desc: "We compare options across underwriters to match your budget." },
  { icon: HeadphonesIcon, title: "Personal Support", desc: "Real humans by chat, phone, WhatsApp and email." },
];


const faqs: { q: string; a: React.ReactNode }[] = [
  { q: "How much will it cost me to get covered?", a: "The cost of getting coverage depends on several factors such as age, and medical plan of choice. To get an estimate of the medical premium you would be expected to pay, we offer an online premium calculator which can provide a quick and easy quote based on your specific requirements. This can be accessed on our website or by contacting one of our customer service representatives who will be happy to assist you in finding a plan that fits your budget and coverage needs." },
  { q: "Is it possible to pay my premium in installments?", a: "Our flexible and friendly payment plans make it possible to settle your premium in instalments through financial credit services and bank IPF (Investment Project Financing)." },
  { q: "What should I consider when choosing a health plan that suits my need?", a: (<><p>Cover benefits, convenience, affordability, customer service and value-added benefits are some of the things to consider before signing on the dotted line. Our covers offer customized solutions with comprehensive benefits and rewards.</p><p className="mt-2">Some of the value-adds include:</p><ul className="mt-1 list-disc pl-5"><li>Cover for medical injuries resulting from political violence</li><li>Local and international rescue and evacuation services</li><li>Nutritional advice</li><li>24-hour call centre</li><li>Health camps and health alerts</li></ul></>) },
  { q: "Can I get maternity cover if I join while pregnant?", a: "Our medical plans have maternity benefits with a waiting period of 1 year." },
  { q: "Can I get an outpatient with inpatient cover?", a: "You must have inpatient cover for you to enjoy outpatient cover." },
  { q: "Can I be refunded if I cancel my membership before my contract lapses?", a: "Refunds are considered for individuals who cancel their membership within 30 days of the policy. Otherwise, members withdrawing from the policy are not eligible for a premium refund." },
  { q: "What is a pre-existing condition?", a: "A pre-existing condition is a medical condition which you knew or ought reasonably to have known of and can be medically proven to have existed prior to becoming a member or renewing a policy." },
  { q: "Why do I need to make payment at some hospitals even though I have both outpatient and inpatient cover?", a: (<><p>You may be needed to pay under the following circumstances:</p><ol className="mt-1 list-decimal pl-5"><li>Visiting a provider without a referral note from the Insurance Company where one is required.</li><li>The condition being attended to may not be provided for under the Insurance Medical Scheme.</li><li>Visiting a hospital that is not in our panel of providers.</li><li>When you have exhausted your benefit limits.</li><li>Where a visit fee or copayment is applicable.</li></ol></>) },
  { q: "What should I do if I have a complaint?", a: (<><p>For complaints or feedback please contact us on:</p><p className="mt-1"><strong>Email:</strong> <a className="text-primary underline" href="mailto:limielinsurance@gmail.com">limielinsurance@gmail.com</a></p><p><strong>Telephone:</strong> <a className="text-primary underline" href="tel:+254719401804">+254 719 401 804</a></p></>) },
];

function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <Hero />
      <Categories />
      <WhyChoose />
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
        <img src={heroImg} alt="Limiel Insurance — protecting families and businesses in Kenya" className="h-full w-full object-cover" width={1600} height={1100} />
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
            Your security, our commitment
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
              <Link to="/products">Explore Cover</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/85">
            {["Instant PDF quotes", "No hidden fees"].map((s) => (
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

function Blog() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="Journal" title="The Limiel Journal" desc="Guides and news to help you insure smarter." />
      <p className="mx-auto mt-10 max-w-md rounded-lg border border-dashed p-10 text-center font-display text-xl font-semibold text-muted-foreground">Coming Soon</p>
    </section>
  );
}

function FAQ() {
  const [q, setQ] = useState("");
  const list = faqs.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()));
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="FAQ" title="Frequently Asked Questions" desc="Have questions about medical insurance? Find answers to some of the most common questions about our medical covers, payments, benefits and claims." />
      <Input className="mt-8" placeholder="Search frequently asked questions..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search FAQs" />
      <Accordion type="single" collapsible className="mt-6 space-y-3">
        {list.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="rounded-xl border bg-card px-4 shadow-soft">
            <AccordionTrigger className="py-4 text-left text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
        {list.length === 0 && <p className="text-center text-sm text-muted-foreground">No questions match your search.</p>}
      </Accordion>
      <div className="mt-10 rounded-2xl border bg-muted/40 p-6 text-center">
        <h3 className="text-xl font-semibold">Still have questions?</h3>
        <p className="mt-2 text-muted-foreground">Our team is ready to help you understand your medical insurance options and find a cover that suits your needs.</p>
        <Button asChild className="mt-4 gradient-hero-bg text-primary-foreground">
          <Link to="/quote" search={{ product: "medical" } as never}>Get a Quote</Link>
        </Button>
      </div>
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
              { icon: Mail, label: "limielinsurance@gmail.com", sub: "Email us anytime", href: "mailto:limielinsurance@gmail.com" },
              { icon: Phone, label: "0719 401 804", sub: "Call or WhatsApp", href: "tel:+254719401804" },
              { icon: MapPin, label: "Real Towers, Upper Hill, Nairobi, Kenya", sub: "Come say hi", href: "" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  {c.href ? <a href={c.href} className="cursor-pointer font-semibold hover:text-primary hover:underline">{c.label}</a> : <p className="font-semibold">{c.label}</p>}
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
