import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ShieldCheck, ShieldAlert, ListChecks, MessageCircleQuestion, Loader2, Phone } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { explainCoverage, type PolicyExplanation } from "@/lib/policy-explainer.functions";

export const Route = createFileRoute("/explain")({
  component: ExplainPage,
  head: () => ({
    meta: [
      { title: "Explain My Cover | Limiel Insurance Limited" },
      {
        name: "description",
        content:
          "Ask a coverage question or paste your policy wording and get a plain-language explanation of what is covered, what is excluded, and what to do next.",
      },
      { property: "og:title", content: "Explain My Cover | Limiel Insurance Limited" },
      {
        property: "og:description",
        content: "Plain-language answers on cover, exclusions and next steps — with Limiel advisors on hand to confirm the details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const copy = {
  en: {
    kicker: "Cover explainer",
    title: "Understand your cover in plain language",
    intro:
      "Ask a question about your cover, or paste the wording from your policy document. You'll get a clear summary of what is likely covered, what is commonly excluded, and the practical next steps.",
    questionLabel: "Your coverage question",
    questionPlaceholder: "e.g. Does my comprehensive motor cover pay for a cracked windscreen?",
    policyLabel: "Paste policy text (optional)",
    policyPlaceholder: "Paste the relevant section of your policy schedule or wording here…",
    submit: "Explain my cover",
    working: "Reading your cover…",
    summary: "In short",
    covered: "Likely covered",
    exclusions: "Commonly excluded or limited",
    nextSteps: "Your next steps",
    questions: "Questions to ask your insurer",
    advisor: "Talk to a Limiel advisor",
    reset: "Start over",
    empty: "Add a question or paste some policy text to begin.",
  },
  sw: {
    kicker: "Mfafanuzi wa bima",
    title: "Elewa bima yako kwa lugha rahisi",
    intro:
      "Uliza swali kuhusu bima yako, au nakili maandishi kutoka kwenye hati yako ya bima. Utapata muhtasari wa kile kinachoweza kulipwa, kile kinachoachwa, na hatua za kufuata.",
    questionLabel: "Swali lako kuhusu bima",
    questionPlaceholder: "mf. Bima yangu kamili ya gari inalipa kioo cha mbele kilichovunjika?",
    policyLabel: "Nakili maandishi ya bima (si lazima)",
    policyPlaceholder: "Nakili sehemu muhimu ya hati yako ya bima hapa…",
    submit: "Fafanua bima yangu",
    working: "Tunapitia bima yako…",
    summary: "Kwa kifupi",
    covered: "Kinachoweza kulipwa",
    exclusions: "Kinachoachwa au kikomo",
    nextSteps: "Hatua zako zinazofuata",
    questions: "Maswali ya kumuuliza mtoa bima",
    advisor: "Zungumza na mshauri wa Limiel",
    reset: "Anza upya",
    empty: "Ongeza swali au nakili maandishi ya bima kuanza.",
  },
} as const;

function ExplainPage() {
  const { lang } = useI18n();
  const c = copy[lang] ?? copy.en;
  const run = useServerFn(explainCoverage);

  const [question, setQuestion] = useState("");
  const [policyText, setPolicyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PolicyExplanation | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() && !policyText.trim()) {
      setError(c.empty);
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await run({ data: { question, policyText, lang } });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sections: { key: keyof PolicyExplanation; title: string; icon: React.ReactNode }[] = [
    { key: "covered", title: c.covered, icon: <ShieldCheck className="h-4 w-4 text-primary" /> },
    { key: "exclusions", title: c.exclusions, icon: <ShieldAlert className="h-4 w-4 text-secondary" /> },
    { key: "nextSteps", title: c.nextSteps, icon: <ListChecks className="h-4 w-4 text-primary" /> },
    { key: "questionsForInsurer", title: c.questions, icon: <MessageCircleQuestion className="h-4 w-4 text-secondary" /> },
  ];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          <Sparkles className="h-4 w-4" /> {c.kicker}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">{c.title}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{c.intro}</p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="question">{c.questionLabel}</Label>
            <Textarea
              id="question"
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={c.questionPlaceholder}
              maxLength={4000}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="policy">{c.policyLabel}</Label>
            <Textarea
              id="policy"
              rows={8}
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              placeholder={c.policyPlaceholder}
              maxLength={20000}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={loading} className="gradient-hero-bg text-primary-foreground shadow-soft">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {c.working}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> {c.submit}
                </>
              )}
            </Button>
            {(result || error) && !loading && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setResult(null);
                  setError(null);
                  setQuestion("");
                  setPolicyText("");
                }}
              >
                {c.reset}
              </Button>
            )}
          </div>
        </form>

        {error && (
          <p className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{error}</p>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10 grid gap-5">
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{c.summary}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">{result.summary}</CardContent>
            </Card>

            <div className="grid gap-5 md:grid-cols-2">
              {sections.map((s) => {
                const items = (result[s.key] as string[]) ?? [];
                if (items.length === 0) return null;
                return (
                  <Card key={s.key} className="shadow-soft">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        {s.icon} {s.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {items.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {result.confidenceNote && (
              <p className="rounded-xl border bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">
                {result.confidenceNote}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <Button asChild className="gradient-hero-bg text-primary-foreground">
                <Link to="/contact">
                  <Phone className="mr-2 h-4 w-4" /> {c.advisor}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="tel:+254713268806">+254 713 268 806</a>
              </Button>
            </div>
          </motion.div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
