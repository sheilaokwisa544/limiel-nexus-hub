import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import {
  ArrowRight, Briefcase, Building2, Car, CheckCircle2, ClipboardList, GraduationCap, Handshake,
  Heart, HeartPulse, Landmark, Loader2, MessageSquare, ShieldCheck, Sparkles, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { supabase } from "@/integrations/supabase/client";

const PAGE_URL = "https://limielinsurance.co.ke/partnerships";
const TITLE = "Insurance Partnerships in Kenya | Limiel Insurance";
const DESCRIPTION =
  "Partner with Limiel Insurance to provide tailored insurance solutions for employees, members, customers and institutions across Kenya.";

export const Route = createFileRoute("/partnerships")({
  component: Partnerships,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
});

const FORM_ID = "partnership-enquiry";

const partnerTypes = [
  { icon: Briefcase, title: "Businesses & Employers", body: "Insurance solutions designed to support employees and businesses with practical cover options." },
  { icon: Landmark, title: "Financial Institutions", body: "Partnership opportunities for banks, financial institutions and other organizations serving customers with insurance needs." },
  { icon: HeartPulse, title: "Healthcare Institutions", body: "Collaborative insurance solutions that can support healthcare-related needs and improve access to appropriate cover." },
  { icon: GraduationCap, title: "Schools & Universities", body: "Insurance solutions and partnership opportunities for educational institutions, staff, students and their communities." },
  { icon: Users, title: "SACCOs & Membership Organizations", body: "Insurance programs designed around the needs of members and organized groups." },
  { icon: Heart, title: "NGOs & Community Organizations", body: "Partnership opportunities that help organizations provide relevant insurance solutions to the communities they serve." },
  { icon: Car, title: "Automotive & Mobility Businesses", body: "Insurance partnership opportunities for dealerships, automotive businesses and customers with motor insurance needs." },
  { icon: Building2, title: "Other Institutions", body: "We are open to exploring partnerships with other institutions where insurance solutions can create meaningful value." },
];

const ways = [
  { icon: Briefcase, title: "Employee Insurance Programs", body: "Help employees access relevant insurance solutions through structured workplace arrangements." },
  { icon: Users, title: "Member Insurance Programs", body: "Provide insurance options designed around the needs of members, associations and organized groups." },
  { icon: Building2, title: "Institutional Insurance Solutions", body: "Work with your organization to identify insurance solutions aligned with its operational and risk needs." },
  { icon: Handshake, title: "Referral & Strategic Partnerships", body: "Explore mutually beneficial opportunities where organizations can connect their customers, members or networks with appropriate insurance solutions." },
];

const reasons = [
  { icon: ClipboardList, title: "Tailored Solutions", body: "We take time to understand the needs of each organization and the people it serves." },
  { icon: ShieldCheck, title: "Professional Support", body: "Our team helps partners navigate insurance options and communicate them clearly to their audiences." },
  { icon: Sparkles, title: "Practical Approach", body: "We focus on solutions that are relevant, understandable and practical for real-world needs." },
  { icon: Handshake, title: "Relationship Focus", body: "We aim to build long-term working relationships with the institutions we partner with." },
  { icon: MessageSquare, title: "Responsive Service", body: "Partners have a point of contact for questions, coordination and ongoing support." },
];

const steps = [
  { title: "Start a Conversation", body: "Tell us about your organization and what you would like to achieve." },
  { title: "Understand Your Needs", body: "We learn about your institution, audience and insurance requirements." },
  { title: "Explore Solutions", body: "Together, we identify suitable insurance solutions and a practical partnership approach." },
  { title: "Build the Partnership", body: "Once the approach is agreed, we work together to implement and support the partnership." },
];

const institutionTypes = [
  "Business / Employer",
  "Financial Institution",
  "Healthcare Institution",
  "School / University",
  "SACCO / Membership Organization",
  "NGO / Community Organization",
  "Automotive / Mobility Business",
  "Other",
];

const partnershipInterests = [
  "Employee Insurance Program",
  "Member Insurance Program",
  "Institutional Insurance",
  "Referral Partnership",
  "Strategic Partnership",
  "Other",
];

type FormValues = {
  organization: string;
  contactPerson: string;
  email: string;
  phone: string;
  institutionType: string;
  interest: string;
  size: string;
  message: string;
};

const emptyForm: FormValues = {
  organization: "", contactPerson: "", email: "", phone: "",
  institutionType: "", interest: "", size: "", message: "",
};

// Field ids, in the order they appear in the form (used to focus the first invalid field).
const fieldIds: Record<keyof FormValues, string> = {
  organization: `${FORM_ID}-organization`,
  contactPerson: `${FORM_ID}-contact-person`,
  email: `${FORM_ID}-email`,
  phone: `${FORM_ID}-phone`,
  institutionType: `${FORM_ID}-institution-type`,
  interest: `${FORM_ID}-interest`,
  size: `${FORM_ID}-size`,
  message: `${FORM_ID}-message`,
};

function scrollToForm() {
  if (typeof document === "undefined") return;
  const section = document.getElementById(FORM_ID);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => document.getElementById(fieldIds.organization)?.focus({ preventScroll: true }), 450);
}

function Partnerships() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="bg-gradient-to-b from-muted/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">PARTNERSHIPS</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Strategic Insurance Partnerships That Create Value</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We work with institutions and organizations to make insurance more accessible, relevant and easier to manage for the people they serve.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="gradient-hero-bg text-primary-foreground shadow-soft hover:opacity-95">
              <a href={`#${FORM_ID}`} onClick={(e) => { e.preventDefault(); scrollToForm(); }}>
                Become a Partner <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/products">Explore Our Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-3xl font-bold">Building Partnerships That Work</h2>
        <p className="mt-4 text-muted-foreground">
          At Limiel Insurance, we believe strong partnerships can make it easier for organizations, employees, members and customers to access the right insurance solutions.
        </p>
        <p className="mt-4 text-muted-foreground">
          We work with institutions and organizations to develop practical insurance arrangements that align with their needs, structure and the people they serve.
        </p>
      </section>

      {/* Who we partner with */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-3xl font-bold">Who We Partner With</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          We welcome partnerships with organizations that want to create meaningful insurance solutions for their employees, members, customers or communities.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partnerTypes.map((p) => (
            <Card key={p.title} className="group h-full transition hover:-translate-y-1 hover:shadow-elevated">
              <CardContent className="p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Ways we can partner */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-3xl font-bold">Ways We Can Partner</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {ways.map((w) => (
            <Card key={w.title} className="h-full shadow-soft">
              <CardContent className="flex gap-4 p-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary/10 text-secondary">
                  <w.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why partner with Limiel */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-3xl font-bold">Why Partner With Limiel?</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <r.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-3xl font-bold">How It Works</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-hero-bg font-display text-lg font-bold text-primary-foreground" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                <span className="sr-only">Step {i + 1}: </span>
                {i + 1}. {s.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Enquiry form */}
      <section id={FORM_ID} className="mx-auto max-w-3xl scroll-mt-24 px-4 py-12 sm:px-6" aria-labelledby={`${FORM_ID}-heading`}>
        <h2 id={`${FORM_ID}-heading`} className="font-display text-3xl font-bold">Let's Build a Partnership</h2>
        <p className="mt-3 text-muted-foreground">
          Interested in partnering with Limiel Insurance? Tell us a little about your organization and how we can work together.
        </p>
        <PartnershipForm />
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center">
          <h2 className="font-display text-2xl font-bold">Ready to Explore a Partnership?</h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Let's discuss how Limiel can work with your organization to provide relevant insurance solutions for the people you serve.
          </p>
          <Button asChild className="gradient-hero-bg text-primary-foreground">
            <a href={`#${FORM_ID}`} onClick={(e) => { e.preventDefault(); scrollToForm(); }}>
              Start a Partnership Conversation <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function PartnershipForm() {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const inFlight = useRef(false); // blocks double submits even before state re-renders
  const confirmRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormValues, string>> = {};
    if (!values.organization.trim()) e.organization = "Please enter your institution or organization name.";
    if (!values.contactPerson.trim()) e.contactPerson = "Please enter a contact person.";
    if (!values.email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = "Please enter a valid email address.";
    if (!values.phone.trim()) e.phone = "Please enter your phone number.";
    else if (values.phone.replace(/\D/g, "").length < 9) e.phone = "Please enter a valid phone number.";
    if (!values.institutionType) e.institutionType = "Please choose an institution type.";
    if (!values.interest) e.interest = "Please choose a partnership interest.";
    if (!values.message.trim()) e.message = "Please tell us a little about how we can work together.";
    return e;
  };

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (inFlight.current) return;

    const found = validate();
    setErrors(found);
    const firstInvalid = (Object.keys(fieldIds) as (keyof FormValues)[]).find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(fieldIds[firstInvalid])?.focus();
      return;
    }

    inFlight.current = true;
    setSending(true);
    setSubmitError(null);
    try {
      const { data: sess } = await supabase.auth.getSession();
      // Partnership enquiries are stored in the same table as quote requests, tagged with
      // product = "partnership" so the existing Admin > Quote requests list shows them
      // and they can be filtered apart from normal quotes.
      const { error } = await supabase.from("quote_requests").insert({
        user_id: sess.session?.user.id ?? null,
        product: "partnership",
        full_name: values.contactPerson.trim().slice(0, 200),
        email: values.email.trim().slice(0, 254),
        phone: values.phone.trim().slice(0, 40),
        notes: null,
        details: {
          "Institution / Organization Name": values.organization.trim().slice(0, 200),
          "Institution Type": values.institutionType,
          "Partnership Interest": values.interest,
          "Estimated Number of Employees / Members / Customers": values.size.trim().slice(0, 100) || null,
          "Message": values.message.trim().slice(0, 3000),
        },
      });
      if (error) throw error;
      setDone(true);
      window.setTimeout(() => confirmRef.current?.focus(), 50);
    } catch {
      setSubmitError(
        "We couldn't send your enquiry just now. Please try again in a moment, or reach us through the details on our Contact page.",
      );
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  if (done) {
    return (
      <Card className="mt-6 shadow-elevated">
        <CardContent className="p-6 text-center sm:p-10">
          <div ref={confirmRef} tabIndex={-1} role="status" className="outline-none">
            <CheckCircle2 className="mx-auto h-14 w-14 text-secondary" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold">
              Thank you. Your partnership enquiry has been received. Our team will review your request and get back to you.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const describedBy = (k: keyof FormValues) => (errors[k] ? `${fieldIds[k]}-error` : undefined);
  const FieldError = ({ k }: { k: keyof FormValues }) =>
    errors[k] ? <p id={`${fieldIds[k]}-error`} className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;
  const Req = () => <span className="text-destructive" aria-hidden="true"> *</span>;

  return (
    <Card className="mt-6 shadow-elevated">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={submit} noValidate className="space-y-4" aria-busy={sending}>
          <p className="text-xs text-muted-foreground">Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>

          <div>
            <Label htmlFor={fieldIds.organization}>Institution / Organization Name<Req /></Label>
            <Input
              id={fieldIds.organization} name="organization" autoComplete="organization" maxLength={200}
              value={values.organization} onChange={(e) => set("organization", e.target.value)}
              aria-required="true" aria-invalid={!!errors.organization} aria-describedby={describedBy("organization")}
            />
            <FieldError k="organization" />
          </div>

          <div>
            <Label htmlFor={fieldIds.contactPerson}>Contact Person<Req /></Label>
            <Input
              id={fieldIds.contactPerson} name="contactPerson" autoComplete="name" maxLength={200}
              value={values.contactPerson} onChange={(e) => set("contactPerson", e.target.value)}
              aria-required="true" aria-invalid={!!errors.contactPerson} aria-describedby={describedBy("contactPerson")}
            />
            <FieldError k="contactPerson" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor={fieldIds.email}>Email Address<Req /></Label>
              <Input
                id={fieldIds.email} name="email" type="email" autoComplete="email" maxLength={254}
                value={values.email} onChange={(e) => set("email", e.target.value)}
                aria-required="true" aria-invalid={!!errors.email} aria-describedby={describedBy("email")}
              />
              <FieldError k="email" />
            </div>
            <div>
              <Label htmlFor={fieldIds.phone}>Phone Number<Req /></Label>
              <Input
                id={fieldIds.phone} name="phone" type="tel" autoComplete="tel" maxLength={40}
                value={values.phone} onChange={(e) => set("phone", e.target.value)}
                aria-required="true" aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")}
              />
              <FieldError k="phone" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor={fieldIds.institutionType}>Institution Type<Req /></Label>
              <Select value={values.institutionType} onValueChange={(v) => set("institutionType", v)}>
                <SelectTrigger
                  id={fieldIds.institutionType} className="mt-1.5 w-full"
                  aria-required="true" aria-invalid={!!errors.institutionType} aria-describedby={describedBy("institutionType")}
                >
                  <SelectValue placeholder="Select institution type" />
                </SelectTrigger>
                <SelectContent>
                  {institutionTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <FieldError k="institutionType" />
            </div>
            <div>
              <Label htmlFor={fieldIds.interest}>Partnership Interest<Req /></Label>
              <Select value={values.interest} onValueChange={(v) => set("interest", v)}>
                <SelectTrigger
                  id={fieldIds.interest} className="mt-1.5 w-full"
                  aria-required="true" aria-invalid={!!errors.interest} aria-describedby={describedBy("interest")}
                >
                  <SelectValue placeholder="Select partnership interest" />
                </SelectTrigger>
                <SelectContent>
                  {partnershipInterests.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <FieldError k="interest" />
            </div>
          </div>

          <div>
            <Label htmlFor={fieldIds.size}>Estimated Number of Employees / Members / Customers</Label>
            <Input
              id={fieldIds.size} name="size" maxLength={100}
              value={values.size} onChange={(e) => set("size", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor={fieldIds.message}>Message<Req /></Label>
            <Textarea
              id={fieldIds.message} name="message" rows={5} maxLength={3000} className="mt-1.5"
              value={values.message} onChange={(e) => set("message", e.target.value)}
              aria-required="true" aria-invalid={!!errors.message} aria-describedby={describedBy("message")}
            />
            <FieldError k="message" />
          </div>

          {submitError && (
            <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {submitError}
            </p>
          )}

          <Button type="submit" disabled={sending} className="w-full gradient-hero-bg text-primary-foreground sm:w-auto">
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
            Send Partnership Enquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
