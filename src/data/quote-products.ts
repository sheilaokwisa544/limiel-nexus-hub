import type { LucideIcon } from "lucide-react";
import { Users, Heart, Car, Plane, PiggyBank, GraduationCap, Scale } from "lucide-react";

export type QuoteProductId =
  | "motor" | "medical" | "life" | "education" | "travel" | "retirement" | "estate-planning";

export const quoteProductIds: QuoteProductId[] = [
  "motor", "medical", "life", "education", "travel", "retirement", "estate-planning",
];

export function isQuoteProductId(v: unknown): v is QuoteProductId {
  return typeof v === "string" && (quoteProductIds as string[]).includes(v);
}

/** Maps the marketing product / cover-option ids to a quote product id. */
export function toQuoteProductId(productId: string, tabId?: string): QuoteProductId {
  if (tabId === "education") return "education";
  switch (productId) {
    case "life": return "life";
    case "medical": return "medical";
    case "retirement": return "retirement";
    case "motor": return "motor";
    case "travel": return "travel";
    case "estate": return "estate-planning";
    default: return isQuoteProductId(productId) ? productId : "motor";
  }
}

type Bi = { en: string; sw: string };

export type QuoteField = {
  name: string;
  label: Bi;
  type: "text" | "number" | "date" | "select" | "textarea";
  placeholder?: Bi;
  options?: Bi[];
  required?: boolean;
};

export type QuoteProduct = {
  id: QuoteProductId;
  icon: LucideIcon;
  name: Bi;
  heading: Bi;
  blurb: Bi;
  fields: QuoteField[];
};

const bi = (en: string, sw: string): Bi => ({ en, sw });

export const quoteProducts: QuoteProduct[] = [
  {
    id: "motor",
    icon: Car,
    name: bi("Motor Insurance", "Bima ya Gari"),
    heading: bi("Motor Insurance Quote", "Nukuu ya Bima ya Gari"),
    blurb: bi(
      "Tell us about the vehicle and how it is used so we can approach suitable insurers on your behalf.",
      "Tuambie kuhusu gari na matumizi yake ili tuweze kuwasiliana na wabima wanaofaa kwa niaba yako.",
    ),
    fields: [
      { name: "vehicleType", label: bi("Vehicle type", "Aina ya gari"), type: "select", required: true,
        options: [bi("Private car", "Gari la kibinafsi"), bi("Pickup / van", "Pikipiki / van"), bi("Lorry / truck", "Lori"), bi("PSV / matatu", "PSV / matatu"), bi("Motorcycle", "Pikipiki"), bi("Special / plant", "Maalum / mtambo")] },
      { name: "makeModel", label: bi("Make and model", "Chapa na modeli"), type: "text", required: true, placeholder: bi("Toyota Vitz", "Toyota Vitz") },
      { name: "yearOfManufacture", label: bi("Year of manufacture", "Mwaka wa utengenezaji"), type: "number", required: true, placeholder: bi("2019", "2019") },
      { name: "vehicleValue", label: bi("Estimated value (KES)", "Thamani inayokadiriwa (KES)"), type: "number", required: true, placeholder: bi("900000", "900000") },
      { name: "registration", label: bi("Registration number", "Nambari ya usajili"), type: "text", placeholder: bi("KDA 123X", "KDA 123X") },
      { name: "usage", label: bi("Use of vehicle", "Matumizi ya gari"), type: "select", required: true,
        options: [bi("Private / personal", "Binafsi"), bi("Business / commercial", "Biashara"), bi("Public service", "Huduma ya umma"), bi("Hire / ride-hailing", "Kuajiri / ride-hailing")] },
      { name: "coverPreference", label: bi("Cover you are considering", "Kifuniko unachofikiria"), type: "select", required: true,
        options: [bi("Comprehensive", "Kamili"), bi("Third party, fire & theft", "Mtu wa tatu, moto na wizi"), bi("Third party only", "Mtu wa tatu tu"), bi("Not sure — advise me", "Sina hakika — nishauri")] },
    ],
  },
  {
    id: "medical",
    icon: Heart,
    name: bi("Medical Insurance", "Bima ya Matibabu"),
    heading: bi("Medical Insurance Quote", "Nukuu ya Bima ya Matibabu"),
    blurb: bi(
      "Share who needs cover and what matters most, and our team will explore suitable options with insurers.",
      "Tuambie ni nani anahitaji kifuniko na kile muhimu kwako, na timu yetu itachunguza njia zinazofaa.",
    ),
    fields: [
      { name: "coverFor", label: bi("Who should be covered?", "Nani afunikwe?"), type: "select", required: true,
        options: [bi("Individual", "Mtu mmoja"), bi("Couple", "Wanandoa"), bi("Family", "Familia"), bi("Group / corporate", "Kikundi / kampuni")] },
      { name: "numberOfPeople", label: bi("Number of people", "Idadi ya watu"), type: "number", required: true, placeholder: bi("4", "4") },
      { name: "ages", label: bi("Ages of those to be covered", "Umri wa wanaofunikwa"), type: "text", required: true, placeholder: bi("38, 35, 8, 3", "38, 35, 8, 3") },
      { name: "coverNeeds", label: bi("Cover you need", "Kifuniko unachohitaji"), type: "select", required: true,
        options: [bi("Inpatient only", "Kulazwa tu"), bi("Inpatient and outpatient", "Kulazwa na wa nje"), bi("Including maternity", "Pamoja na uzazi"), bi("Including dental & optical", "Pamoja na meno na macho")] },
      { name: "budget", label: bi("Annual budget (KES, optional)", "Bajeti ya mwaka (KES, si lazima)"), type: "number", placeholder: bi("120000", "120000") },
      { name: "medicalConsiderations", label: bi("Existing medical considerations (optional)", "Hali za kiafya zilizopo (si lazima)"), type: "textarea",
        placeholder: bi("Anything an insurer should know about", "Kitu chochote mbima anapaswa kujua") },
    ],
  },
  {
    id: "life",
    icon: Users,
    name: bi("Life Insurance", "Bima ya Maisha"),
    heading: bi("Life Insurance Quote", "Nukuu ya Bima ya Maisha"),
    blurb: bi(
      "A few details help us match your protection goal with the right type of life cover.",
      "Maelezo machache yatatusaidia kulinganisha lengo lako la ulinzi na bima ya maisha inayofaa.",
    ),
    fields: [
      { name: "age", label: bi("Your age", "Umri wako"), type: "number", required: true, placeholder: bi("35", "35") },
      { name: "gender", label: bi("Gender", "Jinsia"), type: "select",
        options: [bi("Female", "Mwanamke"), bi("Male", "Mwanaume"), bi("Prefer not to say", "Napendelea kutosema")] },
      { name: "sumAssured", label: bi("Cover amount you have in mind (KES)", "Kiasi cha kifuniko unachofikiria (KES)"), type: "number", required: true, placeholder: bi("3000000", "3000000") },
      { name: "coverDuration", label: bi("Cover duration", "Muda wa kifuniko"), type: "select", required: true,
        options: [bi("10 years", "Miaka 10"), bi("15 years", "Miaka 15"), bi("20 years or more", "Miaka 20 au zaidi"), bi("Whole life", "Maisha yote"), bi("Not sure — advise me", "Sina hakika — nishauri")] },
      { name: "purpose", label: bi("Main purpose of the cover", "Lengo kuu la kifuniko"), type: "select", required: true,
        options: [bi("Family income protection", "Kulinda mapato ya familia"), bi("Loan or mortgage protection", "Kulinda mkopo"), bi("Funeral and final expenses", "Gharama za mazishi"), bi("Savings and legacy", "Akiba na urithi")] },
      { name: "dependants", label: bi("Dependants (optional)", "Wategemezi (si lazima)"), type: "text", placeholder: bi("Spouse and 2 children", "Mwenzi na watoto 2") },
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    name: bi("Education Policy", "Bima ya Elimu"),
    heading: bi("Education Policy Quote", "Nukuu ya Bima ya Elimu"),
    blurb: bi(
      "Tell us about the child and your savings goal so we can compare education plans for you.",
      "Tuambie kuhusu mtoto na lengo lako la kuweka akiba ili tulinganishe mipango ya elimu.",
    ),
    fields: [
      { name: "childAge", label: bi("Child's current age", "Umri wa mtoto sasa"), type: "number", required: true, placeholder: bi("6", "6") },
      { name: "educationStage", label: bi("Education stage you are planning for", "Hatua ya elimu unayopanga"), type: "select", required: true,
        options: [bi("Primary", "Msingi"), bi("Secondary", "Sekondari"), bi("College / university", "Chuo / chuo kikuu"), bi("Overseas studies", "Masomo ya nje")] },
      { name: "yearsToPayout", label: bi("Years until you need the funds", "Miaka hadi unahitaji fedha"), type: "number", required: true, placeholder: bi("12", "12") },
      { name: "savingsGoal", label: bi("Target amount (KES)", "Kiasi lengwa (KES)"), type: "number", required: true, placeholder: bi("2000000", "2000000") },
      { name: "contribution", label: bi("Preferred contribution", "Mchango unaopendelea"), type: "select", required: true,
        options: [bi("Monthly", "Kila mwezi"), bi("Quarterly", "Kila robo mwaka"), bi("Annually", "Kila mwaka")] },
      { name: "guardianName", label: bi("Parent / guardian name", "Jina la mzazi / mlezi"), type: "text", required: true, placeholder: bi("Jane Wanjiku", "Jane Wanjiku") },
    ],
  },
  {
    id: "travel",
    icon: Plane,
    name: bi("Travel Insurance", "Bima ya Safari"),
    heading: bi("Travel Insurance Quote", "Nukuu ya Bima ya Safari"),
    blurb: bi(
      "Share your trip details and we will look for travel cover that fits your itinerary.",
      "Tuambie maelezo ya safari yako na tutatafuta kifuniko kinachofaa ratiba yako.",
    ),
    fields: [
      { name: "destination", label: bi("Destination(s)", "Unakoenda"), type: "text", required: true, placeholder: bi("Dubai, UAE", "Dubai, UAE") },
      { name: "departureDate", label: bi("Departure date", "Tarehe ya kuanza safari"), type: "date", required: true },
      { name: "returnDate", label: bi("Return date", "Tarehe ya kurudi"), type: "date", required: true },
      { name: "travellers", label: bi("Number of travellers", "Idadi ya wasafiri"), type: "number", required: true, placeholder: bi("2", "2") },
      { name: "travellerAges", label: bi("Traveller ages", "Umri wa wasafiri"), type: "text", required: true, placeholder: bi("34, 31", "34, 31") },
      { name: "tripPurpose", label: bi("Purpose of trip", "Lengo la safari"), type: "select", required: true,
        options: [bi("Holiday", "Mapumziko"), bi("Business", "Biashara"), bi("Study", "Masomo"), bi("Medical", "Matibabu"), bi("Group tour", "Safari ya kikundi")] },
      { name: "coverNeeds", label: bi("Cover that matters most", "Kifuniko muhimu zaidi"), type: "select", required: true,
        options: [bi("Medical emergency & evacuation", "Dharura ya matibabu na uokoaji"), bi("Trip cancellation & delay", "Kughairi na kuchelewa safari"), bi("Baggage & personal effects", "Mizigo na vitu binafsi"), bi("Schengen / visa requirement", "Mahitaji ya Schengen / visa")] },
    ],
  },
  {
    id: "retirement",
    icon: PiggyBank,
    name: bi("Retirement Planning", "Mpango wa Uzeeni"),
    heading: bi("Retirement Planning Quote", "Nukuu ya Mpango wa Uzeeni"),
    blurb: bi(
      "Let us know your retirement goal and we will compare suitable pension and annuity plans.",
      "Tuambie lengo lako la uzeeni na tutalinganisha mipango ya pensheni inayofaa.",
    ),
    fields: [
      { name: "currentAge", label: bi("Current age", "Umri wa sasa"), type: "number", required: true, placeholder: bi("38", "38") },
      { name: "retirementAge", label: bi("Desired retirement age", "Umri unaotaka kustaafu"), type: "number", required: true, placeholder: bi("60", "60") },
      { name: "monthlyContribution", label: bi("Contribution you can commit (KES)", "Mchango unaoweza kutoa (KES)"), type: "number", required: true, placeholder: bi("15000", "15000") },
      { name: "contributionFrequency", label: bi("Contribution frequency", "Mara ya mchango"), type: "select", required: true,
        options: [bi("Monthly", "Kila mwezi"), bi("Quarterly", "Kila robo mwaka"), bi("Annually", "Kila mwaka"), bi("Lump sum", "Kiasi kimoja")] },
      { name: "objective", label: bi("Main objective", "Lengo kuu"), type: "select", required: true,
        options: [bi("Monthly income in retirement", "Mapato ya kila mwezi uzeeni"), bi("Long-term tax-efficient savings", "Akiba ya muda mrefu"), bi("Convert savings into an annuity", "Kubadilisha akiba kuwa annuity"), bi("Top up an employer scheme", "Kuongeza mpango wa mwajiri")] },
      { name: "existingScheme", label: bi("Existing pension or NSSF details (optional)", "Pensheni au NSSF iliyopo (si lazima)"), type: "textarea" },
    ],
  },
  {
    id: "estate-planning",
    icon: Scale,
    name: bi("Estate Planning", "Mipango ya Urithi"),
    heading: bi("Estate Planning Quote", "Nukuu ya Mipango ya Urithi"),
    blurb: bi(
      "Tell us about your planning needs and our advisors will guide you on suitable arrangements.",
      "Tuambie mahitaji yako ya mipango na washauri wetu watakuongoza kuhusu mipango inayofaa.",
    ),
    fields: [
      { name: "objective", label: bi("Planning objective", "Lengo la mipango"), type: "select", required: true,
        options: [bi("Provide for beneficiaries", "Kuwahudumia warithi"), bi("Protect family assets", "Kulinda mali ya familia"), bi("Fund a legacy or business succession", "Urithi au mrithi wa biashara"), bi("Cover final expenses and liabilities", "Gharama za mwisho na madeni")] },
      { name: "dependants", label: bi("Family and dependants", "Familia na wategemezi"), type: "text", required: true, placeholder: bi("Spouse, 3 children, one parent", "Mwenzi, watoto 3, mzazi mmoja") },
      { name: "assets", label: bi("Assets requiring planning", "Mali inayohitaji mipango"), type: "textarea", required: true,
        placeholder: bi("Land, family home, business shares, savings", "Ardhi, nyumba, hisa za biashara, akiba") },
      { name: "estateValue", label: bi("Approximate estate value (KES, optional)", "Thamani ya karibu ya mali (KES, si lazima)"), type: "number" },
      { name: "protectionNeeds", label: bi("Protection you are considering", "Ulinzi unaofikiria"), type: "select", required: true,
        options: [bi("Life cover for beneficiaries", "Bima ya maisha kwa warithi"), bi("Trust or will arrangement guidance", "Mwongozo wa dhamana au wosia"), bi("Business succession cover", "Bima ya mrithi wa biashara"), bi("Not sure — advise me", "Sina hakika — nishauri")] },
    ],
  },
];

export function getQuoteProduct(id: QuoteProductId): QuoteProduct {
  return quoteProducts.find((p) => p.id === id) ?? quoteProducts[0];
}
