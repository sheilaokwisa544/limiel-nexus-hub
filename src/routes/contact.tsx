import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({ meta: [
    { title: "Contact Limiel Insurance" },
    { name: "description", content: "Get in touch with the Limiel team for quotes, claims and support." },
    { property: "og:title", content: "Contact Limiel Insurance" },
    { property: "og:description", content: "Call, WhatsApp or email the Limiel Insurance team in Nairobi." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});

function Contact() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Talk to an expert</h1>
          <p className="mt-3 text-muted-foreground">We reply to every message within a business hour.</p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Mail, label: "limielinsurance@gmail.com", sub: "Email us anytime", href: "mailto:limielinsurance@gmail.com" },
              { icon: Phone, label: "0719 401 804", sub: "Call or WhatsApp", href: "tel:+254719401804" },
              { icon: MessageCircle, label: "WhatsApp us", sub: "Chat with our team", href: "https://wa.me/254719401804" },
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
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent. We'll be in touch."); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>First name</Label><Input required placeholder="Jane" /></div>
                <div><Label>Last name</Label><Input required placeholder="Doe" /></div>
              </div>
              <div><Label>Email</Label><Input type="email" required placeholder="jane@example.com" /></div>
              <div><Label>Phone</Label><Input placeholder="+254 700 000 000" /></div>
              <div><Label>Message</Label>
                <textarea required className="mt-1.5 min-h-28 w-full rounded-md border border-input bg-background p-3 text-sm" placeholder="How can we help?" />
              </div>
              <Button type="submit" className="w-full gradient-hero-bg text-primary-foreground">Send message</Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <SiteFooter />
    </div>
  );
}
