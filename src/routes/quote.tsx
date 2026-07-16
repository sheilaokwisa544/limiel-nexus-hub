import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft, ArrowRight, CreditCard, Shield, User, Car, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/quote")({
  component: QuoteWizard,
});

type FormValues = {
  fullName: string; email: string; phone: string; age: string;
  insuranceType: string; vehicle: string; location: string;
  coverage: string; budget: string;
  cardName: string; cardNumber: string; expiry: string; cvv: string;
};

const stepMeta = [
  { id: 1, key: "q.step.personal", icon: User },
  { id: 2, key: "q.step.insurance", icon: Car },
  { id: 3, key: "q.step.coverage", icon: Shield },
  { id: 4, key: "q.step.review", icon: Sparkles },
  { id: 5, key: "q.step.payment", icon: CreditCard },
];

const STORAGE_KEY = "limiel_quote_draft";

function QuoteWizard() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const methods = useForm<FormValues>({
    defaultValues: {
      fullName: "", email: "", phone: "", age: "",
      insuranceType: "motor", vehicle: "", location: "",
      coverage: "comprehensive", budget: "",
      cardName: "", cardNumber: "", expiry: "", cvv: "",
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) try { methods.reset(JSON.parse(saved)); } catch {}
    const sub = methods.watch((v) => localStorage.setItem(STORAGE_KEY, JSON.stringify(v)));
    return () => sub.unsubscribe();
  }, [methods]);

  const progress = (step / stepMeta.length) * 100;
  const next = async () => {
    const fields: Record<number, (keyof FormValues)[]> = {
      1: ["fullName", "email", "phone", "age"],
      2: ["insuranceType", "location"],
      3: ["coverage", "budget"],
      4: [],
      5: ["cardName", "cardNumber", "expiry", "cvv"],
    };
    const ok = await methods.trigger(fields[step]);
    if (!ok) return;
    if (step < stepMeta.length) setStep(step + 1);
    else {
      toast.success(t("q.submitted"));
      localStorage.removeItem(STORAGE_KEY);
    }
  };
  const back = () => step > 1 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <SiteNav />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t("q.tag")}</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{t("q.title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("q.subtitle")}</p>
        </div>

        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">
              {t("q.step", { n: step, total: stepMeta.length })}: <span className="text-primary">{t(stepMeta[step - 1].key)}</span>
            </p>
            <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-6 hidden justify-between sm:flex">
            {stepMeta.map((s) => {
              const done = s.id < step;
              const active = s.id === step;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1">
                  <div className={`grid h-10 w-10 place-items-center rounded-full border-2 transition ${
                    done ? "border-primary bg-primary text-primary-foreground" :
                    active ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}>
                    {done ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                  </div>
                  <span className={`text-xs ${active ? "font-semibold" : "text-muted-foreground"}`}>{t(s.key)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <FormProvider {...methods}>
          <Card className="mt-8 overflow-hidden shadow-elevated">
            <CardContent className="p-6 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 1 && <StepPersonal />}
                  {step === 2 && <StepInsurance />}
                  {step === 3 && <StepCoverage />}
                  {step === 4 && <StepReview />}
                  {step === 5 && <StepPayment />}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <Button variant="ghost" onClick={back} disabled={step === 1}>
                  <ArrowLeft className="mr-1 h-4 w-4" /> {t("q.back")}
                </Button>
                <Button onClick={next} className="gradient-hero-bg text-primary-foreground">
                  {step === stepMeta.length ? t("q.pay") : t("q.continue")} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </FormProvider>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t("q.alreadyApplied")} <Link to="/dashboard" className="text-primary underline">{t("q.goToDashboard")}</Link>
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}

function Field({ name, label, ...rest }: { name: keyof FormValues; label: string } & React.ComponentProps<typeof Input>) {
  const { register, formState: { errors } } = useFormContext<FormValues>();
  const { t } = useI18n();
  return (
    <div>
      <Label>{label}</Label>
      <Input {...register(name, { required: t("q.validation.required", { label }) })} {...rest} />
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]?.message as string}</p>}
    </div>
  );
}

function StepPersonal() {
  const { t } = useI18n();
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">{t("q.personal.title")}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="fullName" label={t("q.field.fullName")} placeholder="Jane Doe" />
        <Field name="age" label={t("q.field.age")} type="number" placeholder="32" />
        <Field name="email" label={t("q.field.email")} type="email" placeholder="jane@example.com" />
        <Field name="phone" label={t("q.field.phone")} placeholder="+254 700 000 000" />
      </div>
    </div>
  );
}

function StepInsurance() {
  const { t } = useI18n();
  const { setValue, watch } = useFormContext<FormValues>();
  const types = ["motor","health","travel","life","home","business"] as const;
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">{t("q.insurance.title")}</h2>
      <div>
        <Label>{t("q.field.insuranceType")}</Label>
        <Select value={watch("insuranceType")} onValueChange={(v) => setValue("insuranceType", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {types.map((c) => (
              <SelectItem key={c} value={c}>{t(`type.${c}`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Field name="vehicle" label={t("q.field.vehicle")} placeholder="Toyota Vitz 2019, KDA 123X" />
      <Field name="location" label={t("q.field.location")} placeholder="Nairobi, Kenya" />
    </div>
  );
}

function StepCoverage() {
  const { t } = useI18n();
  const { setValue, watch } = useFormContext<FormValues>();
  const coverage = watch("coverage");
  const options = [
    { id: "third-party", name: t("q.cov.third"), price: "KES 1,200/mo", desc: t("q.cov.thirdDesc") },
    { id: "comprehensive", name: t("q.cov.comp"), price: "KES 3,200/mo", desc: t("q.cov.compDesc") },
    { id: "premium", name: t("q.cov.premium"), price: "KES 5,400/mo", desc: t("q.cov.premiumDesc") },
  ];
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">{t("q.coverage.title")}</h2>
      <RadioGroup value={coverage} onValueChange={(v) => setValue("coverage", v)} className="gap-3">
        {options.map((o) => (
          <label key={o.id} className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${coverage === o.id ? "border-primary bg-primary/5 shadow-soft" : "hover:border-primary/40"}`}>
            <div className="flex items-center gap-3">
              <RadioGroupItem value={o.id} />
              <div>
                <p className="font-semibold">{o.name}</p>
                <p className="text-xs text-muted-foreground">{o.desc}</p>
              </div>
            </div>
            <p className="font-display font-bold text-primary">{o.price}</p>
          </label>
        ))}
      </RadioGroup>
      <Field name="budget" label={t("q.field.budget")} type="number" placeholder="3500" />
    </div>
  );
}

function StepReview() {
  const { t } = useI18n();
  const { getValues } = useFormContext<FormValues>();
  const v = getValues();
  const typeLabel = v.insuranceType ? t(`type.${v.insuranceType}`) : "";
  const rows = [
    [t("q.review.name"), v.fullName],
    [t("q.review.email"), v.email],
    [t("q.review.phone"), v.phone],
    [t("q.review.type"), typeLabel],
    [t("q.review.location"), v.location],
    [t("q.review.coverage"), v.coverage],
    [t("q.review.budget"), v.budget ? `KES ${v.budget}` : ""],
  ];
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">{t("q.review.title")}</h2>
      <div className="rounded-xl border">
        {rows.map(([k, val]) => (
          <div key={k} className="flex justify-between border-b p-4 last:border-0">
            <span className="text-sm text-muted-foreground">{k}</span>
            <span className="text-sm font-medium capitalize">{val || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepPayment() {
  const { t } = useI18n();
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">{t("q.payment.title")}</h2>
      <Field name="cardName" label={t("q.field.cardName")} placeholder="Jane Doe" />
      <Field name="cardNumber" label={t("q.field.cardNumber")} placeholder="4242 4242 4242 4242" />
      <div className="grid grid-cols-2 gap-4">
        <Field name="expiry" label={t("q.field.expiry")} placeholder="12/28" />
        <Field name="cvv" label={t("q.field.cvv")} placeholder="123" />
      </div>
      <p className="text-xs text-muted-foreground">{t("q.payment.note")}</p>
    </div>
  );
}
