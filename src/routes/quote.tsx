import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft, ArrowRight, Shield, User, ClipboardList, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import {
  getQuoteProduct, quoteProducts, isQuoteProductId, type QuoteProductId, type QuoteField,
} from "@/data/quote-products";

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>): { product?: QuoteProductId } => ({
    product: isQuoteProductId(search.product) ? search.product : undefined,
  }),
  component: QuoteWizard,
  head: () => ({ meta: [
    { title: "Request a Quote — Limiel Insurance" },
    { name: "description", content: "Tell us what you need and a Limiel Insurance advisor will explore suitable cover options with insurers on your behalf." },
    { property: "og:title", content: "Request a Quote — Limiel Insurance" },
    { property: "og:description", content: "Product-specific quote requests for motor, medical, life, education, travel, retirement and estate planning." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});

const copy = {
  tag: { en: "Quote Request", sw: "Ombi la Nukuu" },
  chooseTitle: { en: "What would you like cover for?", sw: "Unahitaji kifuniko cha nini?" },
  chooseDesc: {
    en: "Pick a product. You can change it at any point and the questions will update.",
    sw: "Chagua bidhaa. Unaweza kuibadilisha wakati wowote na maswali yatabadilika.",
  },
  selected: { en: "Selected", sw: "Imechaguliwa" },
  change: { en: "Change product", sw: "Badilisha bidhaa" },
  step: { en: "Step", sw: "Hatua" },
  of: { en: "of", sw: "kati ya" },
  stepProduct: { en: "Product", sw: "Bidhaa" },
  stepDetails: { en: "Details", sw: "Maelezo" },
  stepContact: { en: "Contact", sw: "Mawasiliano" },
  stepReview: { en: "Review", sw: "Kagua" },
  contactTitle: { en: "How can we reach you?", sw: "Tunawezaje kukufikia?" },
  fullName: { en: "Full name", sw: "Jina kamili" },
  email: { en: "Email", sw: "Barua pepe" },
  phone: { en: "Phone", sw: "Namba ya simu" },
  notes: { en: "Anything else we should know? (optional)", sw: "Kingine tunapaswa kujua? (si lazima)" },
  reviewTitle: { en: "Review your request", sw: "Kagua ombi lako" },
  product: { en: "Insurance product", sw: "Bidhaa ya bima" },
  back: { en: "Back", sw: "Nyuma" },
  continue: { en: "Continue", sw: "Endelea" },
  submit: { en: "Request My Quote", sw: "Omba Nukuu Yangu" },
  required: { en: "is required", sw: "inahitajika" },
  invalidEmail: { en: "Enter a valid email address", sw: "Weka barua pepe sahihi" },
  invalidPhone: { en: "Enter a valid phone number", sw: "Weka namba sahihi ya simu" },
  choose: { en: "Select an option", sw: "Chagua" },
  notProvided: { en: "Not provided", sw: "Haijatolewa" },
  disclaimer: {
    en: "Submitting this form does not create an insurance policy. Limiel Insurance is an insurance agent and intermediary — our team will review your request, approach suitable insurers and contact you with the options available to you.",
    sw: "Kutuma fomu hii hakuanzishi bima. Limiel Insurance ni wakala wa bima — timu yetu itakagua ombi lako, iwasiliane na wabima wanaofaa na ikujulishe njia zilizopo.",
  },
  successTitle: { en: "Request received", sw: "Ombi limepokelewa" },
  successBody: {
    en: "Thank you. A Limiel Insurance advisor will review your request and contact you with suitable options. No policy has been issued yet.",
    sw: "Asante. Mshauri wa Limiel Insurance atakagua ombi lako na kuwasiliana nawe kuhusu njia zinazofaa. Hakuna bima iliyotolewa bado.",
  },
  another: { en: "Request another quote", sw: "Omba nukuu nyingine" },
  home: { en: "Back to home", sw: "Rudi mwanzo" },
  failed: { en: "We couldn't send your request. Please try again.", sw: "Hatuweza kutuma ombi lako. Tafadhali jaribu tena." },
} as const;

type Lang = "en" | "sw";
const tx = (k: keyof typeof copy, lang: Lang) => copy[k][lang];

const steps = [
  { key: "stepProduct", icon: Shield },
  { key: "stepDetails", icon: ClipboardList },
  { key: "stepContact", icon: User },
  { key: "stepReview", icon: Sparkles },
] as const;

function QuoteWizard() {
  const { lang } = useI18n();
  const nav = useNavigate();
  const search = Route.useSearch();

  const [product, setProduct] = useState<QuoteProductId>(search.product ?? "motor");
  const [step, setStep] = useState(search.product ? 2 : 1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ fullName: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const active = useMemo(() => getQuoteProduct(product), [product]);
  const progress = (step / steps.length) * 100;

  const selectProduct = (id: QuoteProductId) => {
    if (id === product) return;
    setProduct(id);
    setValues({}); // never carry irrelevant answers across products
    setErrors({});
    nav({ to: "/quote", search: { product: id }, replace: true });
  };

  const validateDetails = () => {
    const e: Record<string, string> = {};
    for (const f of active.fields) {
      if (f.required && !values[f.name]?.trim()) e[f.name] = `${f.label[lang]} ${tx("required", lang)}`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (!contact.fullName.trim()) e.fullName = `${tx("fullName", lang)} ${tx("required", lang)}`;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim())) e.email = tx("invalidEmail", lang);
    if (contact.phone.replace(/\D/g, "").length < 9) e.phone = tx("invalidPhone", lang);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 2 && !validateDetails()) return;
    if (step === 3 && !validateContact()) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, steps.length));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (!validateDetails()) { setStep(2); return; }
    if (!validateContact()) { setStep(3); return; }
    setSending(true);
    const { data: sess } = await supabase.auth.getSession();
    const details: Record<string, string> = {};
    for (const f of active.fields) {
      if (values[f.name]) details[f.label.en] = values[f.name];
    }
    const { error } = await supabase.from("quote_requests").insert({
      user_id: sess.session?.user.id ?? null,
      product: active.id,
      full_name: contact.fullName.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      notes: contact.notes.trim() || null,
      details,
    });
    setSending(false);
    if (error) { toast.error(tx("failed", lang)); return; }
    setDone(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <SiteNav />
        <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <CheckCircle2 className="mx-auto h-16 w-16 text-secondary" />
            <h1 className="mt-6 font-display text-3xl font-bold">{tx("successTitle", lang)}</h1>
            <p className="mt-3 text-muted-foreground">{tx("successBody", lang)}</p>
            <div className="mt-6 rounded-xl border bg-card p-4 text-left text-sm">
              <p className="font-semibold">{active.name[lang]}</p>
              <p className="mt-1 text-muted-foreground">{contact.fullName} · {contact.phone} · {contact.email}</p>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => { setDone(false); setStep(1); setValues({}); setContact({ fullName: "", email: "", phone: "", notes: "" }); }}>
                {tx("another", lang)}
              </Button>
              <Button asChild className="gradient-hero-bg text-primary-foreground">
                <Link to="/">{tx("home", lang)}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <SiteNav />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{tx("tag", lang)}</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{active.heading[lang]}</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{active.blurb[lang]}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border bg-card p-4 shadow-soft">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <active.icon className="h-5 w-5" />
          </span>
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{tx("selected", lang)}</p>
            <p className="font-semibold">{active.name[lang]}</p>
          </div>
          {step !== 1 && (
            <Button variant="outline" size="sm" className="ml-auto" onClick={() => setStep(1)}>
              {tx("change", lang)}
            </Button>
          )}
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <p className="font-medium">
              {tx("step", lang)} {step} {tx("of", lang)} {steps.length}:{" "}
              <span className="text-primary">{tx(steps[step - 1].key, lang)}</span>
            </p>
            <p className="text-muted-foreground">{Math.round(progress)}%</p>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-6 hidden justify-between sm:flex">
            {steps.map((s, i) => {
              const n = i + 1;
              const isDone = n < step, isActive = n === step;
              return (
                <div key={s.key} className="flex flex-col items-center gap-1">
                  <div className={`grid h-10 w-10 place-items-center rounded-full border-2 transition ${
                    isDone ? "border-primary bg-primary text-primary-foreground"
                    : isActive ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                    {isDone ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                  </div>
                  <span className={`text-xs ${isActive ? "font-semibold" : "text-muted-foreground"}`}>{tx(s.key, lang)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="mt-8 overflow-hidden shadow-elevated">
          <CardContent className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step}-${product}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
              >
                {step === 1 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold">{tx("chooseTitle", lang)}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{tx("chooseDesc", lang)}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {quoteProducts.map((p) => {
                        const on = p.id === product;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => selectProduct(p.id)}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft ${
                              on ? "border-primary bg-primary/5 shadow-soft" : ""}`}
                          >
                            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${on ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                              <p.icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-semibold">{p.name[lang]}</span>
                              <span className="block truncate text-xs text-muted-foreground">{p.heading[lang]}</span>
                            </span>
                            {on && <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold">{active.name[lang]} — {tx("stepDetails", lang)}</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {active.fields.map((f) => (
                        <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                          <FieldInput
                            field={f}
                            lang={lang}
                            value={values[f.name] ?? ""}
                            onChange={(v) => setValues((s) => ({ ...s, [f.name]: v }))}
                            placeholderChoose={tx("choose", lang)}
                          />
                          {errors[f.name] && <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-2xl font-semibold">{tx("contactTitle", lang)}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>{tx("fullName", lang)}</Label>
                        <Input value={contact.fullName} onChange={(e) => setContact({ ...contact, fullName: e.target.value })} placeholder="Jane Wanjiku" />
                        {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
                      </div>
                      <div>
                        <Label>{tx("phone", lang)}</Label>
                        <Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+254 700 000 000" />
                        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <Label>{tx("email", lang)}</Label>
                        <Input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="jane@example.com" />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <Label>{tx("notes", lang)}</Label>
                        <textarea
                          className="mt-1.5 min-h-24 w-full rounded-md border border-input bg-background p-3 text-sm"
                          value={contact.notes}
                          onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold">{tx("reviewTitle", lang)}</h2>
                    <div className="mt-6 overflow-hidden rounded-xl border">
                      <Row label={tx("product", lang)} value={active.name[lang]} highlight />
                      <Row label={tx("fullName", lang)} value={contact.fullName} />
                      <Row label={tx("phone", lang)} value={contact.phone} />
                      <Row label={tx("email", lang)} value={contact.email} />
                      {active.fields.map((f) => (
                        <Row key={f.name} label={f.label[lang]} value={values[f.name] || tx("notProvided", lang)} />
                      ))}
                      {contact.notes && <Row label={tx("notes", lang)} value={contact.notes} />}
                    </div>
                    <p className="mt-5 rounded-lg border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
                      {tx("disclaimer", lang)}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <Button variant="ghost" onClick={back} disabled={step === 1}>
                <ArrowLeft className="mr-1 h-4 w-4" /> {tx("back", lang)}
              </Button>
              {step < steps.length ? (
                <Button onClick={next} className="gradient-hero-bg text-primary-foreground">
                  {tx("continue", lang)} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={sending} className="gradient-hero-bg text-primary-foreground">
                  {sending ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
                  {tx("submit", lang)}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <SiteFooter />
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex flex-wrap justify-between gap-2 border-b p-4 last:border-0 ${highlight ? "bg-primary/5" : ""}`}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function FieldInput({
  field, lang, value, onChange, placeholderChoose,
}: {
  field: QuoteField; lang: Lang; value: string; onChange: (v: string) => void; placeholderChoose: string;
}) {
  const label = (
    <Label>
      {field.label[lang]}
      {field.required && <span className="ml-0.5 text-destructive">*</span>}
    </Label>
  );

  if (field.type === "select") {
    return (
      <div>
        {label}
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger><SelectValue placeholder={placeholderChoose} /></SelectTrigger>
          <SelectContent>
            {field.options?.map((o) => (
              <SelectItem key={o.en} value={o.en}>{o[lang]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        {label}
        <textarea
          className="mt-1.5 min-h-24 w-full rounded-md border border-input bg-background p-3 text-sm"
          value={value}
          placeholder={field.placeholder?.[lang]}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      {label}
      <Input
        type={field.type}
        value={value}
        placeholder={field.placeholder?.[lang]}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
