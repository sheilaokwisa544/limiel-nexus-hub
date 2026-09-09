export type Faq = { q: string; a: string };

export const productFaqsEn: Record<string, Faq[]> = {
  life: [
    {
      q: "Who is eligible to take out life cover?",
      a: "Most insurers accept applicants between 18 and 65 years old. Eligibility depends on age, health declarations and, for larger sums assured, a medical examination.",
    },
    {
      q: "Is there a waiting period before benefits are payable?",
      a: "Accidental death is usually covered from the policy start date, while natural-cause death and some riders may carry a waiting period of up to 12 months on selected plans.",
    },
    {
      q: "What is commonly excluded?",
      a: "Typical exclusions include suicide within the first policy year, non-disclosed pre-existing conditions, death while committing a criminal act, and participation in undeclared hazardous activities.",
    },
    {
      q: "What happens if I stop paying premiums?",
      a: "Cover may lapse after the grace period. Some whole-life and endowment plans allow paid-up or surrender values once a minimum period has been completed.",
    },
  ],
  medical: [
    {
      q: "Who can be included on the policy?",
      a: "You can usually cover yourself, a spouse and children, with parents added under senior plans. Age bands and loadings differ by insurer.",
    },
    {
      q: "How long are the waiting periods?",
      a: "General waiting periods are commonly 30 days, maternity 9–12 months, and chronic or pre-existing conditions 12 months or longer where accepted.",
    },
    {
      q: "Are pre-existing conditions covered?",
      a: "They must be declared at application. Insurers may cover them after a waiting period, apply a sub-limit, or exclude them entirely.",
    },
    {
      q: "What is typically excluded?",
      a: "Cosmetic surgery, fertility treatment on basic plans, self-inflicted injury, undeclared conditions and treatment outside the approved provider panel.",
    },
  ],
  retirement: [
    {
      q: "Who can join a retirement plan?",
      a: "Any income-earning adult — employed, self-employed or in business. Contributions can be regular, irregular or lump sum depending on the product.",
    },
    {
      q: "When can I access my savings?",
      a: "Retirement benefits are normally accessible from age 50 or at the plan's retirement age. Early access rules are set by regulation and product terms.",
    },
    {
      q: "Is a waiting period applied?",
      a: "There is no medical waiting period, but vesting rules and minimum contribution periods may apply before certain benefits or transfers are allowed.",
    },
    {
      q: "What is excluded or limited?",
      a: "Tax relief applies only up to statutory limits, investment returns are not guaranteed unless stated, and early withdrawal may attract charges or tax.",
    },
  ],
  motor: [
    {
      q: "What do I need to qualify?",
      a: "A valid driving licence, current logbook or proof of ownership, and a vehicle valuation for comprehensive cover.",
    },
    {
      q: "Is there a waiting period?",
      a: "Cover generally starts once the premium is received and the certificate is issued. Some add-ons such as political violence or excess protector start on activation.",
    },
    {
      q: "What is commonly excluded?",
      a: "Driving without a valid licence, driving under the influence, wear and tear, mechanical breakdown, use outside the declared purpose (for example private cover used commercially), and unapproved repairs.",
    },
    {
      q: "Will I pay anything when I claim?",
      a: "Yes — an excess usually applies, and higher excesses may be charged for young or unnamed drivers unless an excess protector is added.",
    },
  ],
  travel: [
    {
      q: "When should I buy travel cover?",
      a: "Ideally at the time you book. Trip cancellation benefits only apply to events that occur after the policy is issued.",
    },
    {
      q: "Are there age or duration limits?",
      a: "Most plans cover travellers up to 70 years, with senior extensions available. Single-trip plans typically cap each journey at 90 or 180 days.",
    },
    {
      q: "Are pre-existing medical conditions covered?",
      a: "Usually excluded unless declared and accepted in writing, often with an additional premium.",
    },
    {
      q: "What is excluded?",
      a: "Travel against medical advice, undeclared extreme sports, incidents involving alcohol or drugs, travel to sanctioned or war-risk regions, and unattended baggage.",
    },
  ],
  estate: [
    {
      q: "Do I need significant wealth to plan my estate?",
      a: "No. If you have dependants, a home, savings, a business share or an insurance policy, a structured plan protects them from delays and disputes.",
    },
    {
      q: "How soon does a plan take effect?",
      a: "Beneficiary nominations apply immediately once recorded by the insurer. Wills and trusts take effect according to their legal terms.",
    },
    {
      q: "What does estate planning not do?",
      a: "It does not override a valid will or statutory succession law, and it does not eliminate all taxes or legal processes — it organises and speeds them up.",
    },
    {
      q: "How often should the plan be reviewed?",
      a: "After any major life event — marriage, birth, divorce, death, a property purchase or a change in business ownership — and otherwise every two to three years.",
    },
  ],
};

export const productFaqsSw: Record<string, Faq[]> = {
  life: [
    {
      q: "Nani anaweza kuchukua bima ya maisha?",
      a: "Watoa bima wengi hukubali waombaji wa miaka 18 hadi 65. Kustahiki hutegemea umri, taarifa za afya na, kwa kifuniko kikubwa, uchunguzi wa daktari.",
    },
    {
      q: "Kuna kipindi cha kusubiri kabla ya malipo?",
      a: "Kifo cha ajali huwa kimefunikwa kuanzia siku ya kwanza, lakini kifo cha kawaida na nyongeza fulani zinaweza kuwa na kipindi cha kusubiri cha hadi miezi 12.",
    },
    {
      q: "Nini hakifunikwi kwa kawaida?",
      a: "Kujiua katika mwaka wa kwanza, magonjwa yaliyofichwa, kifo wakati wa kutenda kosa la jinai, na michezo hatari isiyotangazwa.",
    },
    {
      q: "Nini kinatokea nikiacha kulipa?",
      a: "Bima inaweza kukoma baada ya kipindi cha neema. Sera fulani za maisha yote na akiba huruhusu thamani ya kujisalimisha baada ya muda wa chini kutimia.",
    },
  ],
  medical: [
    {
      q: "Nani anaweza kuingizwa kwenye sera?",
      a: "Wewe mwenyewe, mwenzi wako na watoto; wazazi huongezwa kwenye mipango ya wazee. Vikomo vya umri hutofautiana kwa mtoa bima.",
    },
    {
      q: "Vipindi vya kusubiri ni vipi?",
      a: "Kwa kawaida siku 30 kwa kifuniko cha jumla, miezi 9–12 kwa uzazi, na miezi 12 au zaidi kwa magonjwa ya kudumu yanapokubaliwa.",
    },
    {
      q: "Magonjwa yaliyokuwa yapo awali yanafunikwa?",
      a: "Yanapaswa kutangazwa wakati wa maombi. Mtoa bima anaweza kuyafunika baada ya kipindi cha kusubiri, kuweka kikomo, au kuyaacha kabisa.",
    },
    {
      q: "Nini hakifunikwi?",
      a: "Upasuaji wa urembo, matibabu ya uzazi kwenye mipango ya msingi, majeraha ya kujitakia, hali zisizotangazwa, na matibabu nje ya mtandao ulioidhinishwa.",
    },
  ],
  retirement: [
    {
      q: "Nani anaweza kujiunga na mpango wa uzeeni?",
      a: "Mtu mzima yeyote anayepata kipato — mwajiriwa, mjasiriamali au mfanyabiashara. Michango inaweza kuwa ya kawaida, isiyo ya kawaida au ya mkupuo.",
    },
    {
      q: "Ni lini nitaweza kutumia akiba yangu?",
      a: "Mafao huwa yanapatikana kuanzia miaka 50 au umri wa kustaafu wa mpango. Sheria na masharti ya bidhaa huamua upatikanaji wa mapema.",
    },
    {
      q: "Kuna kipindi cha kusubiri?",
      a: "Hakuna kipindi cha kusubiri cha kiafya, lakini sheria za kustahiki na muda wa chini wa michango zinaweza kutumika kabla ya mafao fulani.",
    },
    {
      q: "Nini kina vikomo?",
      a: "Punguzo la kodi lina kikomo cha kisheria, mapato ya uwekezaji hayahakikishwi isipokuwa yamesemwa, na kuchukua mapema kunaweza kuwa na gharama au kodi.",
    },
  ],
  motor: [
    {
      q: "Ninahitaji nini kustahiki?",
      a: "Leseni halali ya udereva, logbook au uthibitisho wa umiliki, na thamani ya gari kwa kifuniko kamili.",
    },
    {
      q: "Kuna kipindi cha kusubiri?",
      a: "Kifuniko huanza mara premium inapopokelewa na cheti kutolewa. Nyongeza kama vurugu za kisiasa huanza pale zinapowashwa.",
    },
    {
      q: "Nini hakifunikwi?",
      a: "Kuendesha bila leseni halali, kuendesha ukiwa mlevi, uchakavu, hitilafu za kiufundi, kutumia gari kinyume na matumizi yaliyotangazwa, na ukarabati usioidhinishwa.",
    },
    {
      q: "Nitalipa kitu ninapodai?",
      a: "Ndiyo — excess huwa inatumika, na inaweza kuwa kubwa kwa madereva wachanga au wasiotajwa isipokuwa umeongeza excess protector.",
    },
  ],
  travel: [
    {
      q: "Ni lini ninunue bima ya safari?",
      a: "Ni bora ununue mara unapofanya booking. Fao la kufuta safari hufunika matukio yanayotokea baada ya sera kutolewa.",
    },
    {
      q: "Kuna vikomo vya umri au muda?",
      a: "Mipango mingi hufunika wasafiri hadi miaka 70, na nyongeza kwa wazee. Safari moja huwa na kikomo cha siku 90 au 180.",
    },
    {
      q: "Magonjwa ya awali yanafunikwa?",
      a: "Kwa kawaida hayafunikwi isipokuwa yametangazwa na kukubaliwa kwa maandishi, mara nyingi kwa premium ya nyongeza.",
    },
    {
      q: "Nini hakifunikwi?",
      a: "Kusafiri kinyume na ushauri wa daktari, michezo ya hatari isiyotangazwa, matukio ya pombe au dawa za kulevya, safari katika maeneo ya vita, na mizigo iliyoachwa bila mlinzi.",
    },
  ],
  estate: [
    {
      q: "Ninahitaji utajiri mkubwa kupanga mirathi?",
      a: "Hapana. Kama unao wategemezi, nyumba, akiba, hisa ya biashara au sera ya bima, mpango ulio wazi huwakinga na migogoro na ucheleweshaji.",
    },
    {
      q: "Mpango unaanza kufanya kazi lini?",
      a: "Uteuzi wa wanufaika unaanza mara unapoandikishwa na mtoa bima. Wosia na trust huanza kufuatana na masharti yao ya kisheria.",
    },
    {
      q: "Upangaji wa mirathi haufanyi nini?",
      a: "Haubadilishi wosia halali au sheria ya mirathi, na hauondoi kodi zote au michakato ya kisheria — huipanga na kuiharakisha.",
    },
    {
      q: "Mpango ukaguliwe mara ngapi?",
      a: "Baada ya tukio kubwa la maisha — ndoa, kuzaliwa, talaka, kifo, kununua mali au mabadiliko ya umiliki wa biashara — au kila miaka miwili hadi mitatu.",
    },
  ],
};
