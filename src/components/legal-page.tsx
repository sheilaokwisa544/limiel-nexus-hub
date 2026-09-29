import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({ eyebrow, title, intro, sections }: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">{intro}</p>
        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-xl font-semibold">{s.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                {s.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
          Questions about this page? Email{" "}
          <a className="text-primary hover:underline" href="mailto:limielinsurance@gmail.com">limielinsurance@gmail.com</a>
          {" "}or call{" "}
          <a className="text-primary hover:underline" href="tel:+254719401804">0719 401 804</a>.
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
