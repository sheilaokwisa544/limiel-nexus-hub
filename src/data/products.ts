import type { LucideIcon } from "lucide-react";
import {
  Users, Heart, Wallet, Car, Plane, Landmark,
  ShieldCheck, GraduationCap, PiggyBank,
  Hospital, Stethoscope, Baby, Eye,
  Coins, CalendarClock, RefreshCw, Infinity as InfinityIcon,
  ShieldAlert, Flame, FileWarning,
  Ban, Ambulance, Luggage, PlaneTakeoff,
  UserCheck, Shield, Scale, Vault,
} from "lucide-react";

export type ProductTab = {
  id: string;
  label: string;
  icon: LucideIcon;
  intro: string;
  covers: string[];
  benefits?: string[];
  considerations?: string[];
  fomo?: string;
};

export type Product = {
  id: string;
  icon: LucideIcon;
  title: string;
  cardDesc: string;
  hook: string;
  overview: string;
  suitableFor: string[];
  fomo: string;
  disclaimer?: string;
  tabs: ProductTab[];
};

const SHARED_DISCLAIMER =
  "Benefits, limits, exclusions, waiting periods, premiums and eligibility requirements vary by insurer and policy. Final cover is subject to the selected policy terms and conditions. Speak to a Limiel Insurance advisor for guidance based on your individual needs.";

export const products: Product[] = [
  {
    id: "life",
    icon: Users,
    title: "Life Insurance",
    cardDesc: "Protect your family's income, debts and long-term financial legacy.",
    hook: "Protect the people who depend on you today — and leave behind a financial legacy tomorrow.",
    overview:
      "Life insurance provides long-term financial protection for your loved ones. Depending on the plan you choose, it can help cover final expenses, replace lost income, clear outstanding debts and support the goals you had planned for your family.",
    suitableFor: [
      "Parents and guardians with dependants",
      "Spouses and primary income earners",
      "Homeowners with a mortgage or ongoing loans",
      "Business owners with succession obligations",
      "Anyone building a long-term financial legacy",
    ],
    fomo:
      "Many families only think about life insurance after a major event — a new child, a serious illness, a loan or the loss of a loved one. By then options may be more expensive or more limited. Starting earlier generally means more affordable and flexible cover.",
    disclaimer: SHARED_DISCLAIMER,
    tabs: [
      {
        id: "whole-life",
        label: "Whole Life",
        icon: ShieldCheck,
        intro:
          "Whole Life Insurance is designed to provide long-term or lifetime protection subject to the terms of the selected policy, helping ensure your family has financial support when they need it most.",
        covers: [
          "Long-term or lifetime protection, subject to policy terms",
          "Financial support for nominated beneficiaries",
          "Funeral and final expenses",
          "Income replacement for dependants",
          "Outstanding loans and financial obligations",
          "Estate and legacy planning",
          "Optional cash value or savings component on selected policies",
          "Optional riders for accidental death or specified conditions",
        ],
        benefits: [
          "Peace of mind that dependants are financially supported",
          "Helps avoid forced sale of family assets to settle debts",
          "Can be aligned with estate planning and wealth transfer",
          "Earlier entry may unlock more affordable long-term premiums",
        ],
        considerations: [
          "Premiums, benefits and exclusions vary by insurer and plan",
          "Medical underwriting may apply based on age and health",
          "Cash-value components depend on the specific product",
        ],
        fomo:
          "The younger and healthier you are when you take cover, the more options you typically have. Waiting until it feels urgent often means paying more — or being declined.",
      },
      {
        id: "education",
        label: "Education Policy",
        icon: GraduationCap,
        intro:
          "An Education Policy helps parents and guardians save systematically for a child's future education while potentially providing life protection for the policyholder.",
        covers: [
          "Structured savings toward future education costs",
          "Lump-sum or scheduled maturity payouts, depending on the product",
          "Primary, secondary, college or university planning",
          "Tuition, accommodation, books and related expenses",
          "Life protection for the parent or policyholder",
          "Potential bonuses or investment-linked growth on selected products",
        ],
        benefits: [
          "Turns education planning into a disciplined financial commitment",
          "Cushions the plan against loss of the policyholder's income",
          "Aligns payouts with major education milestones",
        ],
        considerations: [
          "Waiting periods and product-specific conditions apply",
          "Investment returns, where offered, are not guaranteed unless explicitly stated",
        ],
        fomo:
          "Education costs generally rise year after year. The longer you delay starting, the more pressure future school fees may place on your income.",
      },
      {
        id: "endowment",
        label: "Endowment Savings",
        icon: PiggyBank,
        intro:
          "An Endowment Policy combines long-term savings with life protection, giving you a structured way to save toward a defined future goal.",
        covers: [
          "Maturity benefit at the end of the policy term",
          "Life protection during the savings period",
          "Structured savings discipline",
          "Potential bonuses or investment returns, depending on the product",
          "Financial protection for beneficiaries during the term",
        ],
        benefits: [
          "Helps convert income today into a defined financial outcome tomorrow",
          "Suitable for goals such as home ownership, business capital or retirement top-up",
          "Combines protection with a savings mindset in one plan",
        ],
        considerations: [
          "Returns are not guaranteed unless expressly stated in the policy",
          "Early surrender may reduce or forfeit benefits",
        ],
        fomo:
          "Good financial intentions rarely survive unexpected expenses. An endowment turns saving from a wish into a structured commitment.",
      },
    ],
  },

  {
    id: "medical",
    icon: Heart,
    title: "Medical Insurance",
    cardDesc: "Inpatient, outpatient, maternity, dental and optical cover for your family.",
    hook: "A medical emergency can happen in a moment. The financial impact can last for years.",
    overview:
      "Medical Insurance gives you access to healthcare while protecting your savings from unexpected hospital and treatment bills. Choose cover that matches your family's healthcare needs, budget and preferred providers.",
    suitableFor: [
      "Families managing routine and unexpected healthcare costs",
      "Individuals with chronic conditions or specialist needs",
      "Employers building staff benefit packages",
      "Expectant parents planning ahead",
    ],
    fomo:
      "A single admission or emergency procedure can consume years of savings. The right cover today keeps a health crisis from becoming a financial crisis.",
    disclaimer: SHARED_DISCLAIMER,
    tabs: [
      {
        id: "inpatient",
        label: "Inpatient",
        icon: Hospital,
        intro:
          "Inpatient cover helps with eligible medical treatment that requires hospital admission.",
        covers: [
          "Hospital admission and room charges",
          "Doctor and specialist fees",
          "Surgery and theatre charges",
          "Prescribed medication during admission",
          "Diagnostic tests and imaging",
          "Intensive care, subject to policy limits",
        ],
        considerations: [
          "Room limits, co-pays and provider panels vary by plan",
          "Pre-existing condition rules and waiting periods may apply",
        ],
        fomo:
          "One hospital admission can cost more than most families keep in emergency savings.",
      },
      {
        id: "outpatient",
        label: "Outpatient",
        icon: Stethoscope,
        intro:
          "Outpatient cover helps with day-to-day medical services that do not require overnight admission.",
        covers: [
          "Doctor and specialist consultations",
          "Prescribed medication",
          "Laboratory tests",
          "X-rays and diagnostic procedures",
          "Minor procedures",
        ],
        considerations: [
          "Annual limits and network restrictions vary by plan",
          "Repeat conditions can quickly consume basic outpatient limits",
        ],
      },
      {
        id: "maternity",
        label: "Maternity",
        icon: Baby,
        intro:
          "Maternity cover helps expectant mothers manage eligible pregnancy and childbirth costs.",
        covers: [
          "Antenatal care",
          "Normal delivery",
          "Caesarean section, where covered",
          "Postnatal care",
          "Newborn-related benefits on selected plans",
        ],
        considerations: [
          "Maternity commonly has waiting periods (often 9–12 months)",
          "Sub-limits and eligibility requirements apply",
          "Planning early is essential — cover must usually be in force before conception",
        ],
      },
      {
        id: "dental-optical",
        label: "Dental & Optical",
        icon: Eye,
        intro:
          "Dental and optical benefits help with everyday healthcare needs that basic plans often exclude.",
        covers: [
          "Dental consultations and cleaning",
          "Basic dental procedures",
          "Eye examinations",
          "Prescription glasses and lenses",
          "Optical services on selected plans",
        ],
        considerations: [
          "Usually offered as an add-on with annual sub-limits",
          "Cosmetic procedures are typically excluded",
        ],
      },
    ],
  },

  {
    id: "retirement",
    icon: Wallet,
    title: "Retirement Plans",
    cardDesc: "Build retirement income you can rely on when your salary stops.",
    hook: "Your salary may stop one day. Your financial needs will not.",
    overview:
      "Retirement planning helps you build income and savings for the years when you no longer rely on employment income. The earlier you begin, the more time your contributions have to accumulate.",
    suitableFor: [
      "Salaried employees planning for retirement",
      "Business owners and self-employed professionals",
      "Freelancers and individuals with irregular income",
      "Anyone topping up an existing pension",
    ],
    fomo:
      "Delaying retirement planning has a real cost — time. Every year you wait is a year your contributions cannot work for you.",
    disclaimer: SHARED_DISCLAIMER,
    tabs: [
      {
        id: "tax-free",
        label: "Tax-Free Growth",
        icon: Coins,
        intro:
          "Eligible retirement products may offer tax advantages under applicable Kenyan law, improving the long-term efficiency of your savings.",
        covers: [
          "Potential tax relief on qualifying contributions",
          "Tax-advantaged growth on invested contributions",
          "Long-term compounding within a regulated retirement structure",
        ],
        considerations: [
          "Tax treatment depends on the product, contribution level and current regulations",
          "Rules and thresholds may change over time — professional advice is recommended",
        ],
      },
      {
        id: "monthly-income",
        label: "Monthly Income",
        icon: CalendarClock,
        intro:
          "A retirement plan can convert accumulated savings into a regular income stream after you stop working.",
        covers: [
          "Regular retirement income aligned to living expenses",
          "Support for housing, food, healthcare and family needs",
          "Flexibility to combine with other retirement assets",
        ],
        considerations: [
          "Income levels depend on contributions, term and investment performance",
          "Retirement should not mean financial dependence on children or relatives",
        ],
      },
      {
        id: "flexible",
        label: "Flexible Contributions",
        icon: RefreshCw,
        intro:
          "Many retirement products allow contributions that flex with your income and financial situation.",
        covers: [
          "Regular, top-up or lump-sum contributions on selected products",
          "Suitable for employees, business owners and self-employed professionals",
          "Ability to adjust contributions over time within product rules",
        ],
        considerations: [
          "Minimums, maximums and contribution rules vary by product",
          "Consistency matters more than size — the habit is the asset",
        ],
      },
      {
        id: "annuity",
        label: "Lifetime Annuity",
        icon: InfinityIcon,
        intro:
          "An annuity can provide regular income for life, depending on the product structure and selected terms.",
        covers: [
          "Guaranteed regular income for life, subject to product terms",
          "Options for joint-life or guaranteed periods on selected products",
          "Reduces the risk of outliving your retirement savings",
        ],
        considerations: [
          "Once purchased, annuity terms are typically not reversible",
          "Rates depend on age, product and prevailing market conditions",
        ],
        fomo:
          "The biggest retirement risk isn't retiring — it's outliving your money.",
      },
    ],
  },

  {
    id: "motor",
    icon: Car,
    title: "Motor Insurance",
    cardDesc: "Comprehensive, third-party fire & theft, and third-party only cover.",
    hook: "Your car is more than a vehicle — it is an asset, a responsibility and often part of your livelihood.",
    overview:
      "The right motor insurance protects you from the financial consequences of accidents, theft and other covered risks, while keeping you compliant with the law.",
    suitableFor: [
      "Private car owners",
      "Commercial and PSV operators",
      "Ride-hail and delivery drivers",
      "Fleet owners and small businesses",
    ],
    fomo:
      "A single accident can trigger repair costs, third-party claims and legal expenses. Driving under-insured turns manageable incidents into serious financial setbacks.",
    disclaimer: SHARED_DISCLAIMER,
    tabs: [
      {
        id: "comprehensive",
        label: "Comprehensive",
        icon: ShieldCheck,
        intro:
          "Comprehensive cover is the broadest motor protection, combining own-vehicle protection with third-party liability.",
        covers: [
          "Accidental damage to your vehicle",
          "Theft of the insured vehicle",
          "Fire damage",
          "Third-party liability for injury or property damage",
          "Malicious damage, subject to policy terms",
          "Optional add-ons: towing, windscreen, PA cover, courtesy car",
        ],
        considerations: [
          "Excess amounts and no-claim discounts vary by insurer",
          "Some risks (e.g. political violence, terrorism) may be optional add-ons",
        ],
      },
      {
        id: "tpft",
        label: "Third-Party Fire & Theft",
        icon: Flame,
        intro:
          "Third-Party Fire & Theft combines mandatory third-party protection with limited own-vehicle cover against fire and theft.",
        covers: [
          "Third-party liability for injury or property damage",
          "Fire damage to the insured vehicle",
          "Theft of the insured vehicle",
        ],
        considerations: [
          "Accidental damage to your own vehicle is not covered",
          "Often selected for older vehicles where comprehensive is not cost-effective",
        ],
      },
      {
        id: "third-party",
        label: "Third-Party Only",
        icon: FileWarning,
        intro:
          "Third-Party Only cover provides the legally required protection for injury or damage caused to other people or their property.",
        covers: [
          "Bodily injury liability to third parties",
          "Property damage liability to third parties",
          "Legal defence costs, subject to policy terms",
        ],
        considerations: [
          "No cover for damage to your own vehicle",
          "Meets minimum legal requirements but leaves you exposed to own-vehicle losses",
        ],
      },
    ],
  },

  {
    id: "travel",
    icon: Plane,
    title: "Travel Insurance",
    cardDesc: "Trip, medical, baggage and evacuation cover for local and international travel.",
    hook: "Your holiday may be planned months in advance. Emergencies are not.",
    overview:
      "Travel Insurance protects you against unexpected events that can disrupt your trip or create significant expenses while you are away from home.",
    suitableFor: [
      "Leisure travellers and families on holiday",
      "Business travellers",
      "Students studying abroad",
      "Pilgrims and group tours",
    ],
    fomo:
      "A medical emergency abroad can cost far more than the trip itself. Travel insurance is often one of the smallest costs of a journey but protects against some of the biggest unexpected expenses.",
    disclaimer: SHARED_DISCLAIMER,
    tabs: [
      {
        id: "cancellation",
        label: "Trip Cancellation",
        icon: Ban,
        intro:
          "Reimbursement for eligible prepaid travel expenses when a covered event forces you to cancel your trip.",
        covers: [
          "Non-refundable flights and accommodation, subject to policy terms",
          "Prepaid tours and activities",
          "Covered reasons such as illness, injury or specified emergencies",
        ],
        considerations: [
          "Only listed cancellation reasons are covered — read the policy carefully",
          "Documentation is required to support any claim",
        ],
      },
      {
        id: "medical",
        label: "Medical Emergency",
        icon: Ambulance,
        intro:
          "Support for eligible emergency medical expenses incurred while travelling outside your home country or region.",
        covers: [
          "Emergency doctor and hospital treatment",
          "Prescribed medication during the trip",
          "Emergency dental treatment on selected plans",
          "24/7 emergency assistance",
        ],
        considerations: [
          "Pre-existing conditions are typically excluded unless declared and accepted",
          "Cover limits differ by destination and plan",
        ],
      },
      {
        id: "baggage",
        label: "Lost Baggage",
        icon: Luggage,
        intro:
          "Protection against eligible loss, theft or damage to your checked and personal baggage.",
        covers: [
          "Lost, stolen or damaged checked baggage",
          "Delayed baggage benefits on selected plans",
          "Personal effects up to policy sub-limits",
        ],
        considerations: [
          "Valuables and electronics often have separate sub-limits",
          "Proof of ownership and airline reports are typically required",
        ],
      },
      {
        id: "evacuation",
        label: "Medical Evacuation",
        icon: PlaneTakeoff,
        intro:
          "Support for emergency transportation or evacuation where medically necessary and covered under the policy.",
        covers: [
          "Emergency medical evacuation to the nearest suitable facility",
          "Repatriation to your home country on selected plans",
          "Return of mortal remains, subject to policy terms",
        ],
        considerations: [
          "Evacuation must usually be pre-authorised by the assistance provider",
          "Selected plans may also include travel delays, missed connections, personal liability and loss of travel documents",
        ],
      },
    ],
  },

  {
    id: "estate",
    icon: Landmark,
    title: "Estate Planning",
    cardDesc: "Organise beneficiaries, protect legacy and structure wealth transfer.",
    hook: "Building wealth is only half the journey. The other half is ensuring it reaches the people and causes you intended to protect.",
    overview:
      "Estate Planning helps you organise your assets, beneficiaries and legacy so that your wealth can be transferred in a structured, intentional way — reducing disputes and delays for the people who matter to you.",
    suitableFor: [
      "Anyone with dependants or financial responsibilities",
      "Homeowners and property investors",
      "Business owners planning succession",
      "Families with cross-generational wealth goals",
    ],
    fomo:
      "Without a clear plan, wealth can become tied up in disputes, legal processes and unnecessary delays. Estate planning is not only for the wealthy — it is for anyone who has something worth protecting.",
    disclaimer: SHARED_DISCLAIMER,
    tabs: [
      {
        id: "beneficiary",
        label: "Beneficiary Nomination",
        icon: UserCheck,
        intro:
          "Ensure that your insurance benefits and selected assets are directed according to your wishes and applicable legal requirements.",
        covers: [
          "Clear nomination of beneficiaries on life and retirement products",
          "Reduced ambiguity during claim and distribution processes",
          "Alignment with wills, trusts and succession structures",
        ],
        considerations: [
          "Beneficiary details should be reviewed after major life events",
          "Legal formalities vary by product and asset type",
        ],
      },
      {
        id: "legacy",
        label: "Legacy Protection",
        icon: Shield,
        intro:
          "Protect the wealth you have spent years building and create a clear plan for the people who depend on you.",
        covers: [
          "Life insurance structured to protect long-term family goals",
          "Coordinated planning across assets, insurance and business interests",
          "Provisions for dependants with special needs where required",
        ],
        considerations: [
          "Legacy planning is most effective when started early",
          "Regular reviews keep the plan aligned to changing family circumstances",
        ],
      },
      {
        id: "tax-efficient",
        label: "Tax-Efficient Transfers",
        icon: Scale,
        intro:
          "Proper planning can help reduce unnecessary financial friction during wealth transfer, subject to applicable Kenyan law and professional advice.",
        covers: [
          "Structured use of life insurance in estate liquidity planning",
          "Coordination with legal and tax professionals",
          "Alignment with trusts and succession vehicles where appropriate",
        ],
        considerations: [
          "Tax rules change and depend on the specific assets and structures used",
          "Independent legal and tax advice is strongly recommended",
        ],
      },
      {
        id: "asset",
        label: "Asset Preservation",
        icon: Vault,
        intro:
          "Protect your family's financial future by planning before a crisis occurs — not after.",
        covers: [
          "Documented plan for key assets and dependants",
          "Insurance-backed liquidity to avoid forced asset sales",
          "Clear succession pathway for family businesses",
        ],
        considerations: [
          "Asset preservation depends on documentation and regular review",
          "Estate planning complements — but does not replace — a valid will",
        ],
      },
    ],
  },
];
