import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "sw";

type Dict = Record<string, string>;

const en: Dict = {
  // nav
  "nav.home": "Home",
  "nav.products": "Products",
  "nav.explain": "Explain My Cover",
  "nav.providers": "Providers",
  "nav.claims": "Claims",
  "nav.about": "About",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  "nav.login": "Login",
  "nav.getQuote": "Get Quote",
  "nav.dashboard": "Dashboard",
  "nav.signOut": "Sign out",
  "nav.language": "Language",

  // dashboard
  "dash.welcome": "Welcome back, {name} 👋",
  "dash.subtitle": "Here's what's happening with your policies today.",
  "dash.search": "Search…",
  "dash.overview": "Overview",
  "dash.policies": "Policies",
  "dash.claims": "Claims",
  "dash.favorites": "Favorites",
  "dash.payments": "Payments",
  "dash.settings": "Settings",
  "dash.backToSite": "Back to site",
  "dash.signOut": "Sign out",
  "dash.stat.active": "Active Policies",
  "dash.stat.renewals": "Upcoming Renewals",
  "dash.stat.claims": "Claims Open",
  "dash.stat.paid": "Total Paid (YTD)",
  "dash.premiumSpend": "Premium spend",
  "dash.last7": "Last 7 months",
  "dash.claimsStatus": "Claims Status",
  "dash.activePolicies": "Active Policies",
  "dash.newPolicy": "New policy",
  "dash.col.policy": "Policy",
  "dash.col.type": "Type",
  "dash.col.provider": "Provider",
  "dash.col.premium": "Premium",
  "dash.col.renewal": "Renewal",
  "dash.col.status": "Status",
  "dash.col.date": "Date",
  "dash.col.amount": "Amount",
  "dash.col.method": "Method",
  "dash.paymentHistory": "Payment History",
  "dash.viewAdmin": "View admin dashboard preview →",
  "dash.pdfDownloaded": "Policy document downloaded",
  "dash.claim.approved": "Approved",
  "dash.claim.review": "Under review",
  "dash.claim.info": "Info required",
  "dash.claim.detail": "Motor / windshield",
  "dash.mom": "+12% MoM",

  // quote wizard
  "q.tag": "Quote Wizard",
  "q.title": "Get your personalized quote",
  "q.subtitle": "Takes about 3 minutes. Your progress saves automatically.",
  "q.step": "Step {n} of {total}",
  "q.back": "Back",
  "q.continue": "Continue",
  "q.pay": "Pay & Apply",
  "q.submitted": "🎉 Application submitted! Check your email.",
  "q.alreadyApplied": "Already applied?",
  "q.goToDashboard": "Go to dashboard",
  "q.step.personal": "Personal",
  "q.step.insurance": "Insurance",
  "q.step.coverage": "Coverage",
  "q.step.review": "Review",
  "q.step.payment": "Payment",

  "q.personal.title": "Personal details",
  "q.field.fullName": "Full name",
  "q.field.age": "Age",
  "q.field.email": "Email",
  "q.field.phone": "Phone",

  "q.insurance.title": "Insurance details",
  "q.field.insuranceType": "Insurance type",
  "q.field.vehicle": "Vehicle / asset details",
  "q.field.location": "Location",
  "type.motor": "Motor",
  "type.health": "Health",
  "type.travel": "Travel",
  "type.life": "Life",
  "type.home": "Home",
  "type.business": "Business",

  "q.coverage.title": "Choose coverage",
  "q.cov.third": "Third Party",
  "q.cov.thirdDesc": "Basic liability",
  "q.cov.comp": "Comprehensive",
  "q.cov.compDesc": "Most popular",
  "q.cov.premium": "Premium Plus",
  "q.cov.premiumDesc": "Everything + agreed value",
  "q.field.budget": "Monthly budget (KES)",

  "q.review.title": "Review your details",
  "q.review.name": "Name",
  "q.review.email": "Email",
  "q.review.phone": "Phone",
  "q.review.type": "Type",
  "q.review.location": "Location",
  "q.review.coverage": "Coverage",
  "q.review.budget": "Budget",

  "q.payment.title": "Secure payment",
  "q.field.cardName": "Cardholder name",
  "q.field.cardNumber": "Card number",
  "q.field.expiry": "Expiry",
  "q.field.cvv": "CVV",
  "q.payment.note": "🔒 Encrypted end-to-end. We never store card details.",
  "q.validation.required": "{label} is required",
};

const sw: Dict = {
  "nav.home": "Nyumbani",
  "nav.products": "Bidhaa",
  "nav.explain": "Fafanua Bima Yangu",
  "nav.providers": "Watoa Huduma",
  "nav.claims": "Madai",
  "nav.about": "Kuhusu",
  "nav.blog": "Blogu",
  "nav.contact": "Wasiliana",
  "nav.login": "Ingia",
  "nav.getQuote": "Pata Nukuu",
  "nav.dashboard": "Dashibodi",
  "nav.signOut": "Toka",
  "nav.language": "Lugha",

  "dash.welcome": "Karibu tena, {name} 👋",
  "dash.subtitle": "Haya ndio yanayoendelea na sera zako leo.",
  "dash.search": "Tafuta…",
  "dash.overview": "Muhtasari",
  "dash.policies": "Sera",
  "dash.claims": "Madai",
  "dash.favorites": "Vipendwa",
  "dash.payments": "Malipo",
  "dash.settings": "Mipangilio",
  "dash.backToSite": "Rudi kwenye tovuti",
  "dash.signOut": "Toka",
  "dash.stat.active": "Sera Zinazotumika",
  "dash.stat.renewals": "Kufanywa Upya",
  "dash.stat.claims": "Madai Yaliyofunguliwa",
  "dash.stat.paid": "Jumla Iliyolipwa (YTD)",
  "dash.premiumSpend": "Matumizi ya Premium",
  "dash.last7": "Miezi 7 iliyopita",
  "dash.claimsStatus": "Hali ya Madai",
  "dash.activePolicies": "Sera Zinazotumika",
  "dash.newPolicy": "Sera mpya",
  "dash.col.policy": "Sera",
  "dash.col.type": "Aina",
  "dash.col.provider": "Mtoa huduma",
  "dash.col.premium": "Premium",
  "dash.col.renewal": "Upya",
  "dash.col.status": "Hali",
  "dash.col.date": "Tarehe",
  "dash.col.amount": "Kiasi",
  "dash.col.method": "Njia",
  "dash.paymentHistory": "Historia ya Malipo",
  "dash.viewAdmin": "Tazama dashibodi ya msimamizi →",
  "dash.pdfDownloaded": "Hati ya sera imepakuliwa",
  "dash.claim.approved": "Imeidhinishwa",
  "dash.claim.review": "Inakaguliwa",
  "dash.claim.info": "Inahitaji taarifa",
  "dash.claim.detail": "Gari / kioo cha mbele",
  "dash.mom": "+12% MoM",

  "q.tag": "Mwongozo wa Nukuu",
  "q.title": "Pata nukuu yako binafsi",
  "q.subtitle": "Inachukua dakika 3. Maendeleo yako yanahifadhiwa moja kwa moja.",
  "q.step": "Hatua {n} kati ya {total}",
  "q.back": "Rudi",
  "q.continue": "Endelea",
  "q.pay": "Lipa na Omba",
  "q.submitted": "🎉 Ombi limewasilishwa! Angalia barua pepe yako.",
  "q.alreadyApplied": "Umeshaomba?",
  "q.goToDashboard": "Nenda kwenye dashibodi",
  "q.step.personal": "Binafsi",
  "q.step.insurance": "Bima",
  "q.step.coverage": "Kifuniko",
  "q.step.review": "Kagua",
  "q.step.payment": "Malipo",

  "q.personal.title": "Maelezo binafsi",
  "q.field.fullName": "Jina kamili",
  "q.field.age": "Umri",
  "q.field.email": "Barua pepe",
  "q.field.phone": "Simu",

  "q.insurance.title": "Maelezo ya bima",
  "q.field.insuranceType": "Aina ya bima",
  "q.field.vehicle": "Maelezo ya gari / mali",
  "q.field.location": "Mahali",
  "type.motor": "Gari",
  "type.health": "Afya",
  "type.travel": "Safari",
  "type.life": "Maisha",
  "type.home": "Nyumbani",
  "type.business": "Biashara",

  "q.coverage.title": "Chagua kifuniko",
  "q.cov.third": "Mtu wa Tatu",
  "q.cov.thirdDesc": "Dhima ya msingi",
  "q.cov.comp": "Kamili",
  "q.cov.compDesc": "Maarufu zaidi",
  "q.cov.premium": "Premium Plus",
  "q.cov.premiumDesc": "Yote + thamani iliyokubaliwa",
  "q.field.budget": "Bajeti ya kila mwezi (KES)",

  "q.review.title": "Kagua maelezo yako",
  "q.review.name": "Jina",
  "q.review.email": "Barua pepe",
  "q.review.phone": "Simu",
  "q.review.type": "Aina",
  "q.review.location": "Mahali",
  "q.review.coverage": "Kifuniko",
  "q.review.budget": "Bajeti",

  "q.payment.title": "Malipo salama",
  "q.field.cardName": "Jina la mmiliki wa kadi",
  "q.field.cardNumber": "Nambari ya kadi",
  "q.field.expiry": "Muda wa kuisha",
  "q.field.cvv": "CVV",
  "q.payment.note": "🔒 Imesimbwa mwisho hadi mwisho. Hatuhifadhi maelezo ya kadi.",
  "q.validation.required": "{label} inahitajika",
};

const dicts: Record<Lang, Dict> = { en, sw };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string, vars?: Record<string, string | number>) => string };
const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "limiel_lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "sw") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  const t = (k: string, vars?: Record<string, string | number>) => {
    let s = dicts[lang][k] ?? dicts.en[k] ?? k;
    if (vars) for (const [key, val] of Object.entries(vars)) s = s.replace(`{${key}}`, String(val));
    return s;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
