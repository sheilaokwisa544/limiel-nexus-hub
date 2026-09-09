export type ProductTabSw = {
  label: string;
  intro: string;
  covers: string[];
  benefits?: string[];
  considerations?: string[];
  fomo?: string;
};

export type ProductSw = {
  title: string;
  cardDesc: string;
  hook: string;
  overview: string;
  suitableFor: string[];
  fomo: string;
  disclaimer?: string;
  tabs: Record<string, ProductTabSw>;
};

const SHARED_DISCLAIMER_SW =
  "Mafao, vikomo, vizuizi, vipindi vya kusubiri, premium na masharti ya kustahiki hutofautiana kwa mtoa bima na sera. Kifuniko cha mwisho kinategemea masharti ya sera iliyochaguliwa. Wasiliana na mshauri wa Limiel Insurance kwa mwongozo unaolingana na mahitaji yako.";

export const productsSw: Record<string, ProductSw> = {
  life: {
    title: "Bima ya Maisha",
    cardDesc: "Linda kipato cha familia yako, madeni na urithi wa muda mrefu.",
    hook: "Linda wale wanaokutegemea leo — na waache urithi wa kifedha kesho.",
    overview:
      "Bima ya maisha hutoa ulinzi wa kifedha wa muda mrefu kwa wapendwa wako. Kutegemea mpango unaochagua, inaweza kusaidia gharama za mwisho, kubadilisha kipato kilichopotea, kulipa madeni na kuendeleza malengo uliyoyapanga kwa familia yako.",
    suitableFor: [
      "Wazazi na walezi wenye wategemezi",
      "Wenzi wa ndoa na wapataji wakuu wa kipato",
      "Wamiliki wa nyumba wenye mikopo",
      "Wafanyabiashara wenye mipango ya urithi",
      "Yeyote anayejenga urithi wa kifedha wa muda mrefu",
    ],
    fomo:
      "Familia nyingi hufikiria bima ya maisha baada ya tukio kubwa — mtoto mpya, ugonjwa mzito, mkopo au kufiwa. Wakati huo chaguzi huwa ghali au haba. Kuanza mapema kwa kawaida ni nafuu na rahisi zaidi.",
    disclaimer: SHARED_DISCLAIMER_SW,
    tabs: {
      "whole-life": {
        label: "Maisha Yote",
        intro:
          "Bima ya Maisha Yote imeundwa kutoa ulinzi wa muda mrefu au wa maisha yote kutegemea masharti ya sera, ikihakikisha familia yako inapata msaada wa kifedha inapohitaji zaidi.",
        covers: [
          "Ulinzi wa muda mrefu au wa maisha yote, kwa masharti ya sera",
          "Msaada wa kifedha kwa wanufaika waliotajwa",
          "Gharama za mazishi na za mwisho",
          "Kubadilisha kipato kwa wategemezi",
          "Mikopo na wajibu wa kifedha uliobaki",
          "Upangaji wa mirathi na urithi",
          "Sehemu ya akiba kwenye sera zilizochaguliwa",
          "Nyongeza za hiari kwa kifo cha ajali au magonjwa maalum",
        ],
        benefits: [
          "Amani ya moyo kwamba wategemezi wanalindwa",
          "Husaidia kuepuka kuuza mali za familia kulipa madeni",
          "Inaweza kuunganishwa na upangaji wa mirathi",
          "Kujiunga mapema hufungua premium nafuu zaidi",
        ],
        considerations: [
          "Premium, mafao na vizuizi hutofautiana kwa mtoa bima",
          "Uchunguzi wa kiafya unaweza kuhitajika kwa umri na hali ya afya",
          "Sehemu ya akiba hutegemea bidhaa maalum",
        ],
        fomo:
          "Kadri unavyokuwa mdogo na mwenye afya, ndivyo unapata chaguzi zaidi. Kusubiri hadi inakuwa dharura mara nyingi humaanisha kulipa zaidi — au kukataliwa.",
      },
      education: {
        label: "Sera ya Elimu",
        intro:
          "Sera ya Elimu husaidia wazazi na walezi kuweka akiba kwa mpangilio kwa elimu ya mtoto, pamoja na ulinzi wa maisha kwa mwenye sera.",
        covers: [
          "Akiba yenye mpangilio kwa gharama za elimu",
          "Malipo ya mkupuo au ya awamu, kutegemea bidhaa",
          "Upangaji wa msingi, sekondari, chuo au universiti",
          "Karo, malazi, vitabu na gharama zinazohusiana",
          "Ulinzi wa maisha kwa mzazi au mwenye sera",
          "Bonasi au ukuaji wa uwekezaji kwenye bidhaa zilizochaguliwa",
        ],
        benefits: [
          "Hubadilisha upangaji wa elimu kuwa ahadi ya kifedha yenye nidhamu",
          "Hukinga mpango dhidi ya kupoteza kipato cha mwenye sera",
          "Hulinganisha malipo na hatua kuu za elimu",
        ],
        considerations: [
          "Vipindi vya kusubiri na masharti ya bidhaa yanatumika",
          "Mapato ya uwekezaji hayahakikishwi isipokuwa yamesemwa",
        ],
        fomo:
          "Gharama za elimu hupanda kila mwaka. Kadri unavyochelewa kuanza, ndivyo karo za baadaye zitakandamiza kipato chako.",
      },
      endowment: {
        label: "Akiba ya Endowment",
        intro:
          "Sera ya Endowment huchanganya akiba ya muda mrefu na ulinzi wa maisha, ikikupa njia yenye mpangilio ya kufikia lengo maalum la baadaye.",
        covers: [
          "Fao la ukomo wa muda wa sera",
          "Ulinzi wa maisha katika kipindi cha akiba",
          "Nidhamu ya kuweka akiba",
          "Bonasi au mapato ya uwekezaji, kutegemea bidhaa",
          "Ulinzi wa kifedha kwa wanufaika katika kipindi hicho",
        ],
        benefits: [
          "Hubadilisha kipato cha leo kuwa matokeo maalum ya kesho",
          "Inafaa kwa nyumba, mtaji wa biashara au nyongeza ya uzeeni",
          "Huchanganya ulinzi na akiba katika mpango mmoja",
        ],
        considerations: [
          "Mapato hayahakikishwi isipokuwa yamesemwa kwenye sera",
          "Kujisalimisha mapema kunaweza kupunguza mafao",
        ],
        fomo:
          "Nia nzuri za kifedha huvunjika na matumizi ya dharura. Endowment hubadilisha kuweka akiba kutoka nia kuwa ahadi.",
      },
    },
  },

  medical: {
    title: "Bima ya Matibabu",
    cardDesc: "Kifuniko cha kulazwa, kliniki, uzazi, meno na macho kwa familia yako.",
    hook: "Dharura ya kiafya hutokea kwa dakika. Athari ya kifedha inaweza kudumu miaka.",
    overview:
      "Bima ya Matibabu inakupa huduma za afya na kulinda akiba yako dhidi ya bili za hospitali zisizotarajiwa. Chagua kifuniko kinacholingana na mahitaji, bajeti na hospitali unazopendelea.",
    suitableFor: [
      "Familia zinazodhibiti gharama za matibabu",
      "Watu wenye magonjwa ya kudumu au mahitaji ya wataalam",
      "Waajiri wanaojenga mafao ya wafanyakazi",
      "Wazazi wanaotarajia mtoto",
    ],
    fomo:
      "Kulazwa mara moja kunaweza kumaliza akiba ya miaka. Kifuniko sahihi leo huzuia tatizo la afya kuwa tatizo la kifedha.",
    disclaimer: SHARED_DISCLAIMER_SW,
    tabs: {
      inpatient: {
        label: "Kulazwa",
        intro: "Kifuniko cha kulazwa husaidia matibabu yanayohitaji kulazwa hospitalini.",
        covers: [
          "Kulazwa na gharama za chumba",
          "Malipo ya madaktari na wataalam",
          "Upasuaji na gharama za chumba cha upasuaji",
          "Dawa zilizoandikiwa wakati wa kulazwa",
          "Vipimo na picha za uchunguzi",
          "Chumba cha wagonjwa mahututi, kwa vikomo vya sera",
        ],
        considerations: [
          "Vikomo vya chumba, co-pay na mtandao wa hospitali hutofautiana",
          "Sheria za magonjwa ya awali na vipindi vya kusubiri zinatumika",
        ],
        fomo: "Kulazwa mara moja kunaweza kugharimu zaidi ya akiba ya dharura ya familia nyingi.",
      },
      outpatient: {
        label: "Kliniki",
        intro: "Kifuniko cha kliniki husaidia huduma za kila siku zisizohitaji kulazwa.",
        covers: [
          "Kuonana na daktari na wataalam",
          "Dawa zilizoandikiwa",
          "Vipimo vya maabara",
          "X-ray na uchunguzi",
          "Matibabu madogo",
        ],
        considerations: [
          "Vikomo vya mwaka na mtandao hutofautiana kwa mpango",
          "Magonjwa ya kujirudia yanaweza kumaliza vikomo haraka",
        ],
      },
      maternity: {
        label: "Uzazi",
        intro: "Kifuniko cha uzazi husaidia mama wajawazito kudhibiti gharama za ujauzito na kujifungua.",
        covers: [
          "Huduma za kliniki ya wajawazito",
          "Kujifungua kwa kawaida",
          "Upasuaji wa kujifungua, pale unapofunikwa",
          "Huduma baada ya kujifungua",
          "Mafao ya mtoto mchanga kwenye mipango iliyochaguliwa",
        ],
        considerations: [
          "Uzazi huwa na kipindi cha kusubiri (mara nyingi miezi 9–12)",
          "Vikomo na masharti ya kustahiki yanatumika",
          "Kupanga mapema ni muhimu — kifuniko kiwe kimeanza kabla ya ujauzito",
        ],
      },
      "dental-optical": {
        label: "Meno na Macho",
        intro: "Mafao ya meno na macho husaidia mahitaji ya kawaida ambayo mipango ya msingi huacha.",
        covers: [
          "Kuonana na daktari wa meno na kusafisha",
          "Matibabu ya msingi ya meno",
          "Uchunguzi wa macho",
          "Miwani na lenzi zilizoandikiwa",
          "Huduma za macho kwenye mipango iliyochaguliwa",
        ],
        considerations: [
          "Huwa nyongeza yenye vikomo vya mwaka",
          "Matibabu ya urembo huwa hayafunikwi",
        ],
      },
    },
  },

  retirement: {
    title: "Mipango ya Uzeeni",
    cardDesc: "Jenga kipato cha uzeeni unaweza kukitegemea mshahara ukiisha.",
    hook: "Mshahara wako unaweza kuisha siku moja. Mahitaji yako hayataisha.",
    overview:
      "Upangaji wa uzeeni hukusaidia kujenga kipato na akiba kwa miaka ambayo hutategemea mshahara. Kadri unavyoanza mapema, ndivyo michango yako inapata muda mwingi wa kukua.",
    suitableFor: [
      "Wafanyakazi wenye mshahara",
      "Wafanyabiashara na wajasiriamali",
      "Wafanyakazi huru wenye kipato kisicho cha kawaida",
      "Yeyote anayeongeza kwenye pensheni iliyopo",
    ],
    fomo: "Kuchelewa kupanga uzeeni kuna gharama halisi — muda. Kila mwaka unaosubiri ni mwaka michango yako haifanyi kazi.",
    disclaimer: SHARED_DISCLAIMER_SW,
    tabs: {
      "tax-free": {
        label: "Ukuaji Bila Kodi",
        intro:
          "Bidhaa zinazostahiki zinaweza kutoa manufaa ya kodi kwa mujibu wa sheria za Kenya, ikiongeza ufanisi wa akiba yako.",
        covers: [
          "Punguzo la kodi kwa michango inayostahiki",
          "Ukuaji wenye manufaa ya kodi kwa michango iliyowekezwa",
          "Ukuaji wa muda mrefu ndani ya mfumo unaosimamiwa",
        ],
        considerations: [
          "Utozaji wa kodi hutegemea bidhaa, kiwango cha michango na kanuni",
          "Kanuni zinaweza kubadilika — ushauri wa kitaalam unapendekezwa",
        ],
      },
      "monthly-income": {
        label: "Kipato cha Mwezi",
        intro: "Mpango wa uzeeni hubadilisha akiba iliyokusanywa kuwa kipato cha kawaida baada ya kuacha kazi.",
        covers: [
          "Kipato cha kawaida cha uzeeni",
          "Msaada wa nyumba, chakula, afya na familia",
          "Uwezo wa kuchanganya na mali nyingine za uzeeni",
        ],
        considerations: [
          "Kiwango cha kipato hutegemea michango, muda na utendaji wa uwekezaji",
          "Uzeeni haupaswi kumaanisha kutegemea watoto au ndugu",
        ],
      },
      flexible: {
        label: "Michango Nafuu",
        intro: "Bidhaa nyingi za uzeeni huruhusu michango inayolingana na kipato chako.",
        covers: [
          "Michango ya kawaida, nyongeza au mkupuo",
          "Inafaa kwa waajiriwa, wafanyabiashara na wafanyakazi huru",
          "Uwezo wa kubadilisha michango kwa muda",
        ],
        considerations: [
          "Vikomo vya chini na juu hutofautiana kwa bidhaa",
          "Uthabiti ni muhimu zaidi kuliko ukubwa — tabia ni mali",
        ],
      },
      annuity: {
        label: "Annuity ya Maisha",
        intro: "Annuity inaweza kutoa kipato cha kawaida kwa maisha yote, kutegemea muundo wa bidhaa.",
        covers: [
          "Kipato cha kawaida kilichohakikishwa kwa maisha, kwa masharti ya bidhaa",
          "Chaguzi za wanandoa au vipindi vya uhakika",
          "Hupunguza hatari ya kuishi zaidi ya akiba yako",
        ],
        considerations: [
          "Masharti ya annuity huwa hayabadiliki baada ya kununua",
          "Viwango hutegemea umri, bidhaa na hali ya soko",
        ],
        fomo: "Hatari kubwa ya uzeeni si kustaafu — ni kuishi zaidi ya pesa zako.",
      },
    },
  },

  motor: {
    title: "Bima ya Gari",
    cardDesc: "Kifuniko kamili, moto na wizi wa mtu wa tatu, na mtu wa tatu tu.",
    hook: "Gari lako ni zaidi ya usafiri — ni mali, wajibu na mara nyingi riziki yako.",
    overview:
      "Bima sahihi ya gari inakukinga dhidi ya athari za kifedha za ajali, wizi na hatari zingine zinazofunikwa, wakati unabaki kwenye sheria.",
    suitableFor: [
      "Wamiliki wa magari ya kibinafsi",
      "Waendeshaji wa biashara na PSV",
      "Madereva wa ride-hail na usafirishaji",
      "Wamiliki wa magari mengi na biashara ndogo",
    ],
    fomo:
      "Ajali moja inaweza kuleta gharama za ukarabati, madai ya mtu wa tatu na gharama za kisheria. Kuwa na bima pungufu hufanya matukio madogo kuwa misukosuko mikubwa.",
    disclaimer: SHARED_DISCLAIMER_SW,
    tabs: {
      comprehensive: {
        label: "Kamili",
        intro: "Kifuniko kamili ni ulinzi mpana zaidi, unaochanganya gari lako na dhima ya mtu wa tatu.",
        covers: [
          "Uharibifu wa ajali kwa gari lako",
          "Wizi wa gari lililowekewa bima",
          "Uharibifu wa moto",
          "Dhima ya mtu wa tatu kwa majeraha au mali",
          "Uharibifu wa kusudi, kwa masharti ya sera",
          "Nyongeza: kuvuta gari, kioo, PA, gari la muda",
        ],
        considerations: [
          "Excess na punguzo la kutokudai hutofautiana",
          "Hatari kama vurugu za kisiasa zinaweza kuwa nyongeza ya hiari",
        ],
      },
      tpft: {
        label: "Mtu wa Tatu, Moto na Wizi",
        intro: "Huchanganya ulinzi wa lazima wa mtu wa tatu na kifuniko cha moto na wizi kwa gari lako.",
        covers: [
          "Dhima ya mtu wa tatu kwa majeraha au mali",
          "Uharibifu wa moto kwa gari lako",
          "Wizi wa gari lako",
        ],
        considerations: [
          "Uharibifu wa ajali kwa gari lako haufunikwi",
          "Huchaguliwa kwa magari ya zamani ambapo kifuniko kamili ni ghali",
        ],
      },
      "third-party": {
        label: "Mtu wa Tatu Tu",
        intro: "Kifuniko cha lazima kisheria kwa majeraha au uharibifu unaosababishia watu wengine.",
        covers: [
          "Dhima ya majeraha kwa watu wengine",
          "Dhima ya uharibifu wa mali ya wengine",
          "Gharama za utetezi wa kisheria, kwa masharti ya sera",
        ],
        considerations: [
          "Hakuna kifuniko kwa gari lako",
          "Inatimiza sheria lakini inakuachia hatari ya gari lako",
        ],
      },
    },
  },

  travel: {
    title: "Bima ya Safari",
    cardDesc: "Kifuniko cha safari, matibabu, mizigo na uokoaji kwa safari za ndani na nje.",
    hook: "Safari yako inaweza kupangwa miezi mingi mapema. Dharura hazipangwi.",
    overview:
      "Bima ya Safari inakukinga dhidi ya matukio yasiyotarajiwa yanayoweza kuharibu safari yako au kuleta gharama kubwa ukiwa mbali na nyumbani.",
    suitableFor: [
      "Wasafiri wa mapumziko na familia",
      "Wasafiri wa biashara",
      "Wanafunzi wanaosoma nje",
      "Mahujaji na safari za makundi",
    ],
    fomo:
      "Dharura ya kiafya ugenini inaweza kugharimu zaidi ya safari yenyewe. Bima ya safari ni gharama ndogo lakini hukinga gharama kubwa zisizotarajiwa.",
    disclaimer: SHARED_DISCLAIMER_SW,
    tabs: {
      cancellation: {
        label: "Kufuta Safari",
        intro: "Kurejeshewa gharama zilizolipwa mapema pale tukio linalofunikwa linakulazimu kufuta safari.",
        covers: [
          "Tiketi na malazi yasiyorejeshwa, kwa masharti ya sera",
          "Matembezi na shughuli zilizolipiwa mapema",
          "Sababu zinazofunikwa kama ugonjwa, jeraha au dharura maalum",
        ],
        considerations: [
          "Sababu zilizoorodheshwa tu zinafunikwa — soma sera kwa makini",
          "Nyaraka zinahitajika kuunga mkono madai",
        ],
      },
      medical: {
        label: "Dharura ya Matibabu",
        intro: "Msaada kwa gharama za dharura za matibabu ukiwa safarini nje ya nchi au eneo lako.",
        covers: [
          "Matibabu ya dharura ya daktari na hospitali",
          "Dawa zilizoandikiwa safarini",
          "Matibabu ya dharura ya meno kwenye mipango iliyochaguliwa",
          "Msaada wa dharura saa 24",
        ],
        considerations: [
          "Magonjwa ya awali huwa hayafunikwi isipokuwa yametangazwa na kukubaliwa",
          "Vikomo hutofautiana kwa nchi na mpango",
        ],
      },
      baggage: {
        label: "Mizigo Iliyopotea",
        intro: "Ulinzi dhidi ya kupotea, wizi au uharibifu wa mizigo yako.",
        covers: [
          "Mizigo iliyopotea, kuibiwa au kuharibika",
          "Mafao ya mizigo iliyochelewa kwenye mipango iliyochaguliwa",
          "Vitu vya kibinafsi hadi vikomo vya sera",
        ],
        considerations: [
          "Vitu vya thamani na elektroniki huwa na vikomo tofauti",
          "Uthibitisho wa umiliki na ripoti ya shirika la ndege huhitajika",
        ],
      },
      evacuation: {
        label: "Uokoaji wa Kimatibabu",
        intro: "Msaada wa usafiri wa dharura au uokoaji pale inapohitajika kimatibabu na kufunikwa na sera.",
        covers: [
          "Uokoaji wa dharura hadi kituo cha karibu kinachofaa",
          "Kurejeshwa nyumbani kwenye mipango iliyochaguliwa",
          "Kurejesha mwili, kwa masharti ya sera",
        ],
        considerations: [
          "Uokoaji huhitaji idhini ya mtoa msaada kabla",
          "Mipango fulani hujumuisha ucheleweshaji, dhima ya kibinafsi na kupoteza nyaraka",
        ],
      },
    },
  },

  estate: {
    title: "Upangaji wa Mirathi",
    cardDesc: "Panga wanufaika, linda urithi na uandae uhamishaji wa mali.",
    hook: "Kujenga mali ni nusu ya safari. Nusu nyingine ni kuhakikisha inawafikia waliokusudiwa.",
    overview:
      "Upangaji wa Mirathi hukusaidia kupanga mali, wanufaika na urithi wako ili mali yako ihamishwe kwa mpangilio — kupunguza migogoro na ucheleweshaji kwa wale unaowapenda.",
    suitableFor: [
      "Yeyote aliye na wategemezi au wajibu wa kifedha",
      "Wamiliki wa nyumba na wawekezaji wa mali",
      "Wafanyabiashara wanaopanga urithi wa biashara",
      "Familia zenye malengo ya vizazi",
    ],
    fomo:
      "Bila mpango wazi, mali inaweza kufungwa katika migogoro na michakato ya kisheria. Upangaji wa mirathi si wa matajiri tu — ni wa yeyote aliye na kitu cha kulinda.",
    disclaimer: SHARED_DISCLAIMER_SW,
    tabs: {
      beneficiary: {
        label: "Uteuzi wa Wanufaika",
        intro: "Hakikisha mafao yako ya bima na mali zilizochaguliwa zinaelekezwa kulingana na matakwa yako na sheria.",
        covers: [
          "Uteuzi wazi wa wanufaika kwenye bidhaa za maisha na uzeeni",
          "Kupunguza utata wakati wa madai na mgawanyo",
          "Kulinganisha na wosia, trust na mifumo ya urithi",
        ],
        considerations: [
          "Taarifa za wanufaika zikaguliwe baada ya matukio makubwa ya maisha",
          "Taratibu za kisheria hutofautiana kwa bidhaa na aina ya mali",
        ],
      },
      legacy: {
        label: "Ulinzi wa Urithi",
        intro: "Linda mali uliyotumia miaka kujenga na uweke mpango wazi kwa wanaokutegemea.",
        covers: [
          "Bima ya maisha iliyopangwa kulinda malengo ya familia",
          "Upangaji wa pamoja wa mali, bima na biashara",
          "Maandalizi kwa wategemezi wenye mahitaji maalum",
        ],
        considerations: [
          "Upangaji wa urithi hufanya kazi vizuri ukianza mapema",
          "Ukaguzi wa kawaida huhakikisha mpango unalingana na hali ya familia",
        ],
      },
      "tax-efficient": {
        label: "Uhamishaji Bora wa Kodi",
        intro: "Upangaji sahihi husaidia kupunguza msuguano wa kifedha wakati wa uhamishaji wa mali, kwa mujibu wa sheria za Kenya.",
        covers: [
          "Matumizi ya bima ya maisha katika upangaji wa ukwasi wa mirathi",
          "Kushirikiana na wataalam wa sheria na kodi",
          "Kulinganisha na trust na mifumo ya urithi",
        ],
        considerations: [
          "Kanuni za kodi hubadilika na hutegemea mali na mifumo iliyotumika",
          "Ushauri wa kujitegemea wa sheria na kodi unapendekezwa sana",
        ],
      },
      asset: {
        label: "Kulinda Mali",
        intro: "Linda mustakabali wa familia yako kwa kupanga kabla ya msiba — sio baada.",
        covers: [
          "Mpango ulioandikwa kwa mali muhimu na wategemezi",
          "Ukwasi unaotokana na bima kuepuka kuuza mali kwa haraka",
          "Njia wazi ya urithi kwa biashara za familia",
        ],
        considerations: [
          "Kulinda mali hutegemea nyaraka na ukaguzi wa kawaida",
          "Upangaji wa mirathi huongeza — lakini haubadilishi — wosia halali",
        ],
      },
    },
  },
};
