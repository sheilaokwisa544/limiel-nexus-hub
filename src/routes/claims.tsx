import { createFileRoute } from "@tanstack/react-router";
import { FileText, UploadCloud, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { toast } from "sonner";

export const Route = createFileRoute("/claims")({
  component: Claims,
  head: () => ({ meta: [
    { title: "File a Claim — Limiel" },
    { name: "description", content: "File and track your insurance claim in minutes with Limiel." },
  ] }),
});

const steps = [
  { icon: FileText, title: "Report", desc: "Tell us what happened in a short form." },
  { icon: UploadCloud, title: "Upload", desc: "Add photos, receipts and supporting documents." },
  { icon: Clock, title: "Review", desc: "Your insurer reviews within 48 hours." },
  { icon: CheckCircle2, title: "Payout", desc: "Get paid directly to your account." },
];

function Claims() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Claims</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">File a claim in minutes</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Fast, transparent claims support with 24/7 tracking.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Card key={s.title} className="shadow-soft">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-muted-foreground">Step {i + 1}</span>
                <div className="mt-3 grid h-11 w-11 place-items-center rounded-xl gradient-hero-bg text-primary-foreground shadow-soft">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-10 shadow-elevated">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Start a claim</h2>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Claim submitted. Ref #CLM-9042"); }} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div><Label>Policy number</Label><Input placeholder="POL-001" /></div>
              <div><Label>Date of incident</Label><Input type="date" /></div>
              <div className="sm:col-span-2"><Label>Describe what happened</Label>
                <textarea className="mt-1.5 min-h-32 w-full rounded-md border border-input bg-background p-3 text-sm" placeholder="Give us the details…" />
              </div>
              <div className="sm:col-span-2">
                <Label>Upload documents</Label>
                <div className="mt-1.5 grid place-items-center rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                  <UploadCloud className="mb-2 h-8 w-8" />
                  Drop files here or click to browse
                </div>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full gradient-hero-bg text-primary-foreground sm:w-auto">Submit claim</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      <SiteFooter />
    </div>
  );
}
