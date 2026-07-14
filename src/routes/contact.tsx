import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
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
