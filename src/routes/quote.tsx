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

export const Route = createFileRoute("/quote")({
  component: QuoteWizard,
});

type FormValues = {
  fullName: string; email: string; phone: string; age: string;
  insuranceType: string; vehicle: string; location: string;
  coverage: string; budget: string;
  cardName: string; cardNumber: string; expiry: string; cvv: string;
};

const steps = [
  { id: 1, name: "Personal", icon: User },
  { id: 2, name: "Insurance", icon: Car },
  { id: 3, name: "Coverage", icon: Shield },
  { id: 4, name: "Review", icon: Sparkles },
  { id: 5, name: "Payment", icon: CreditCard },
];

const STORAGE_KEY = "limiel_quote_draft";

function QuoteWizard() {
  const [step, setStep] = useState(1);
  const methods = useForm<FormValues>({
    defaultValues: {
      fullName: "", email: "", phone: "", age: "",
      insuranceType: "motor", vehicle: "", location: "",
      coverage: "comprehensive", budget: "",
      cardName: "", cardNumber: "", expiry: "", cvv: "",
    },
  });

  // auto-save
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) try { methods.reset(JSON.parse(saved)); } catch {}
    const sub = methods.watch((v) => localStorage.setItem(STORAGE_KEY, JSON.stringify(v)));
    return () => sub.unsubscribe();
  }, [methods]);

  const progress = (step / steps.length) * 100;
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
    if (step < steps.length) setStep(step + 1);
    else {
      toast.success("🎉 Application submitted! Check your email.");
      localStorage.removeItem(STORAGE_KEY);
    }
  };
  const back = () => step > 1 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <SiteNav />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Quote Wizard</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Get your personalized quote</h1>
          <p className="mt-2 text-muted-foreground">Takes about 3 minutes. Your progress saves automatically.</p>
        </div>

        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">Step {step} of {steps.length}: <span className="text-primary">{steps[step - 1].name}</span></p>
            <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-6 hidden justify-between sm:flex">
            {steps.map((s) => {
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
                  <span className={`text-xs ${active ? "font-semibold" : "text-muted-foreground"}`}>{s.name}</span>
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
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <Button onClick={next} className="gradient-hero-bg text-primary-foreground">
                  {step === steps.length ? "Pay & Apply" : "Continue"} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </FormProvider>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already applied? <Link to="/dashboard" className="text-primary underline">Go to dashboard</Link>
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}

function Field({ name, label, ...rest }: { name: keyof FormValues; label: string } & React.ComponentProps<typeof Input>) {
  const { register, formState: { errors } } = useFormContext<FormValues>();
  return (
    <div>
      <Label>{label}</Label>
      <Input {...register(name, { required: `${label} is required` })} {...rest} />
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]?.message as string}</p>}
    </div>
  );
}

function StepPersonal() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Personal details</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="fullName" label="Full name" placeholder="Jane Doe" />
        <Field name="age" label="Age" type="number" placeholder="32" />
        <Field name="email" label="Email" type="email" placeholder="jane@example.com" />
        <Field name="phone" label="Phone" placeholder="+254 700 000 000" />
      </div>
    </div>
  );
}

function StepInsurance() {
  const { setValue, watch } = useFormContext<FormValues>();
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Insurance details</h2>
      <div>
        <Label>Insurance type</Label>
        <Select value={watch("insuranceType")} onValueChange={(v) => setValue("insuranceType", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {["motor","health","travel","life","home","business"].map((c) => (
              <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Field name="vehicle" label="Vehicle / asset details" placeholder="Toyota Vitz 2019, KDA 123X" />
      <Field name="location" label="Location" placeholder="Nairobi, Kenya" />
    </div>
  );
}

function StepCoverage() {
  const { setValue, watch } = useFormContext<FormValues>();
  const coverage = watch("coverage");
  const options = [
    { id: "third-party", name: "Third Party", price: "KES 1,200/mo", desc: "Basic liability" },
    { id: "comprehensive", name: "Comprehensive", price: "KES 3,200/mo", desc: "Most popular" },
    { id: "premium", name: "Premium Plus", price: "KES 5,400/mo", desc: "Everything + agreed value" },
  ];
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Choose coverage</h2>
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
      <Field name="budget" label="Monthly budget (KES)" type="number" placeholder="3500" />
    </div>
  );
}

function StepReview() {
  const { getValues } = useFormContext<FormValues>();
  const v = getValues();
  const rows = [
    ["Name", v.fullName], ["Email", v.email], ["Phone", v.phone],
    ["Type", v.insuranceType], ["Location", v.location], ["Coverage", v.coverage], ["Budget", `KES ${v.budget}`],
  ];
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Review your details</h2>
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
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Secure payment</h2>
      <Field name="cardName" label="Cardholder name" placeholder="Jane Doe" />
      <Field name="cardNumber" label="Card number" placeholder="4242 4242 4242 4242" />
      <div className="grid grid-cols-2 gap-4">
        <Field name="expiry" label="Expiry" placeholder="12/28" />
        <Field name="cvv" label="CVV" placeholder="123" />
      </div>
      <p className="text-xs text-muted-foreground">🔒 Encrypted end-to-end. We never store card details.</p>
    </div>
  );
}
