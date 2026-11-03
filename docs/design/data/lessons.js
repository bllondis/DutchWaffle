// Lessenbank – expanded B1→B2 phrase database for the lesson library.
// Authentic Dutch idioms & expressions (uitdrukkingen, gezegden, verbindingen),
// thematically organised after "Nederlands op niveau". Example sentences are original.
// Each entry: nl, ipa (simplified), en, type, level, note, example{nl,en}.

window.DUTCH_LESSONS = {
  levels: [
    { code: 'B1',  name: 'Onderweg',   hue: '#6EC7A9' },
    { code: 'B1+', name: 'Op niveau',  hue: '#D9A55E' },
    { code: 'B2',  name: 'Doorstromen', hue: '#E58E7C' },
  ],

  types: [
    { id: 'idioom',     nl: 'Idioom',      en: 'Idiom' },
    { id: 'uitdrukking', nl: 'Uitdrukking', en: 'Expression' },
    { id: 'verbinding',  nl: 'Verbinding',  en: 'Connector' },
  ],

  themes: [
    {
      id: 'werk',
      name: 'Werk & carrière',
      en: 'Work & career',
      desc: 'Idiomen over beginnen, doorzetten en het roer omgooien.',
      phrases: [
        { nl: 'De handen uit de mouwen steken', ipa: '/də ˈɦɑndə(n) ʏt də ˈmɑuʋə(n) ˈsteːkə(n)/', en: 'To roll up your sleeves', type: 'idioom', level: 'B1', note: 'Aan het werk gaan, flink aanpakken.', example: { nl: 'Genoeg vergaderd – tijd om de handen uit de mouwen te steken.', en: 'Enough meetings – time to roll up our sleeves.' } },
        { nl: 'Iets onder de knie krijgen', ipa: '/its ˈɔndər də ˈkniː ˈkrɛiɣə(n)/', en: 'To get the hang of something', type: 'idioom', level: 'B1', note: 'Een vaardigheid leren beheersen.', example: { nl: 'Na een week had ze de nieuwe software onder de knie.', en: 'After a week she had the new software down.' } },
        { nl: 'De kop is eraf', ipa: '/də ˈkɔp ɪs ˈɛrɑf/', en: 'The hardest part is behind us', type: 'uitdrukking', level: 'B1+', note: 'Het moeilijke begin is gemaakt.', example: { nl: 'De eerste klant is binnen – de kop is eraf.', en: 'First client signed – we’ve broken the back of it.' } },
        { nl: 'Met de deur in huis vallen', ipa: '/mɛt də ˈdøːr ɪn ˈɦœys ˈfɑlə(n)/', en: 'To get straight to the point', type: 'idioom', level: 'B1+', note: 'Meteen ter zake komen, zonder inleiding.', example: { nl: 'Sorry dat ik met de deur in huis val, maar we moeten praten.', en: 'Sorry to be so blunt, but we need to talk.' } },
        { nl: 'Het roer omgooien', ipa: '/ɦət ˈruːr ˈɔmɣoːiə(n)/', en: 'To change course drastically', type: 'idioom', level: 'B2', note: 'Een ingrijpende koerswijziging maken.', example: { nl: 'Het bedrijf gooide het roer om en ging volledig digitaal.', en: 'The company changed tack and went fully digital.' } },
        { nl: 'Een wit voetje halen', ipa: '/ən ˈʋɪt ˈfutjə ˈɦaːlə(n)/', en: 'To get in someone’s good books', type: 'idioom', level: 'B2', note: 'In de gunst proberen te komen.', example: { nl: 'Hij haalt graag een wit voetje bij de baas.', en: 'He likes to curry favour with the boss.' } },
        { nl: 'De kantjes ervan aflopen', ipa: '/də ˈkɑncəs ˈɛrvɑn ˈɑfloːpə(n)/', en: 'To cut corners / slack off', type: 'idioom', level: 'B2', note: 'Net genoeg doen, geen moeite extra.', example: { nl: 'Als je de kantjes ervan afloopt, valt dat snel op.', en: 'If you slack off, it shows quickly.' } },
      ],
    },
    {
      id: 'mening',
      name: 'Je mening geven',
      en: 'Giving opinions',
      desc: 'Nuanceren, toegeven en beleefd van mening verschillen.',
      phrases: [
        { nl: 'Dat valt wel mee', ipa: '/dɑt ˈfɑlt ʋɛl ˈmeː/', en: 'It’s not that bad', type: 'uitdrukking', level: 'B1', note: 'Typisch Nederlandse understatement.', example: { nl: 'De deadline is krap, maar dat valt wel mee.', en: 'The deadline is tight, but it’s not so bad.' } },
        { nl: 'Het hangt ervan af', ipa: '/ɦət ˈɦɑŋt ˈɛrvɑn ˈɑf/', en: 'It depends', type: 'verbinding', level: 'B1', note: 'Voorbehoud voordat je een standpunt inneemt.', example: { nl: 'Of ik meega? Het hangt ervan af wie er nog komt.', en: 'Whether I’ll join? It depends who else is coming.' } },
        { nl: 'Daar zit wat in', ipa: '/daːr ˈzɪt ʋɑt ˈɪn/', en: 'You’ve got a point', type: 'uitdrukking', level: 'B1+', note: 'Toegeven aan andermans argument.', example: { nl: 'Daar zit wat in – we kunnen het beter uitstellen.', en: 'You’ve got a point – better to postpone it.' } },
        { nl: 'Enerzijds … anderzijds', ipa: '/ˈeːnərzɛits … ˈɑndərzɛits/', en: 'On the one hand … on the other', type: 'verbinding', level: 'B1+', note: 'Twee kanten afwegen voor een conclusie.', example: { nl: 'Enerzijds werk ik graag thuis, anderzijds mis ik collega’s.', en: 'On one hand I like working from home, on the other I miss colleagues.' } },
        { nl: 'Een slag om de arm houden', ipa: '/ən ˈslɑɣ ɔm də ˈɑrm ˈɦɑudə(n)/', en: 'To keep your options open', type: 'idioom', level: 'B2', note: 'Je niet volledig vastleggen.', example: { nl: 'Ik houd nog een slag om de arm tot het rapport er is.', en: 'I’ll reserve judgement until the report is in.' } },
        { nl: 'Dat neemt niet weg dat…', ipa: '/dɑt ˈneːmt nit ˈʋɛx dɑt/', en: 'That said… / that doesn’t change that…', type: 'verbinding', level: 'B2', note: 'Concessieve verbinding, formeler register.', example: { nl: 'Het plan is goed. Dat neemt niet weg dat er risico’s zijn.', en: 'The plan is good. That said, there are risks.' } },
        { nl: 'Ergens niet over uit zijn', ipa: '/ˈɛrɣəns nit ˈoːvər ˈʏt ˈzɛin/', en: 'To be undecided about something', type: 'uitdrukking', level: 'B2', note: 'Nog geen mening gevormd hebben.', example: { nl: 'Ik ben er nog niet over uit of het een goed idee is.', en: 'I haven’t made up my mind whether it’s a good idea.' } },
      ],
    },
    {
      id: 'maatsch',
      name: 'Maatschappij',
      en: 'Society',
      desc: 'Debat, compromis en heikele kwesties.',
      phrases: [
        { nl: 'Water bij de wijn doen', ipa: '/ˈʋaːtər bɛi də ˈʋɛin ˈduːn/', en: 'To compromise / water it down', type: 'idioom', level: 'B1+', note: 'Eisen matigen om er samen uit te komen.', example: { nl: 'Beide partijen moesten water bij de wijn doen.', en: 'Both sides had to make concessions.' } },
        { nl: 'Een heet hangijzer', ipa: '/ən ˈɦeːt ˈɦɑŋɛizər/', en: 'A hot-button issue', type: 'uitdrukking', level: 'B2', note: 'Een gevoelig, omstreden onderwerp.', example: { nl: 'Woningnood blijft een heet hangijzer in de politiek.', en: 'Housing shortage remains a hot-button issue.' } },
        { nl: 'Met twee maten meten', ipa: '/mɛt ˈtʋeː ˈmaːtə(n) ˈmeːtə(n)/', en: 'To apply double standards', type: 'idioom', level: 'B2', note: 'Gelijke gevallen ongelijk behandelen.', example: { nl: 'De krant meet met twee maten, vinden critici.', en: 'Critics say the paper applies double standards.' } },
        { nl: 'Het tij keren', ipa: '/ɦət ˈtɛi ˈkeːrə(n)/', en: 'To turn the tide', type: 'idioom', level: 'B2', note: 'Een ongunstige ontwikkeling ombuigen.', example: { nl: 'Nieuwe maatregelen moeten het tij keren.', en: 'New measures should turn the tide.' } },
        { nl: 'De kloof tussen arm en rijk', ipa: '/də ˈkloːf ˈtʏsə(n) ˈɑrm ɛn ˈrɛik/', en: 'The gap between rich and poor', type: 'uitdrukking', level: 'B1+', note: 'Veelgebruikte collocatie in nieuwsteksten.', example: { nl: 'De kloof tussen arm en rijk wordt steeds groter.', en: 'The gap between rich and poor keeps widening.' } },
        { nl: 'Aan de kaak stellen', ipa: '/aːn də ˈkaːk ˈstɛlə(n)/', en: 'To expose / call out', type: 'idioom', level: 'B2', note: 'Een misstand openlijk aanwijzen.', example: { nl: 'De documentaire stelt misstanden in de zorg aan de kaak.', en: 'The documentary exposes abuses in healthcare.' } },
      ],
    },
    {
      id: 'onderwijs',
      name: 'Onderwijs',
      en: 'Education',
      desc: 'Leren, snappen en de draad kwijtraken.',
      phrases: [
        { nl: 'Iets uit je hoofd leren', ipa: '/its ʏt jə ˈɦoːft ˈleːrə(n)/', en: 'To memorise / learn by heart', type: 'uitdrukking', level: 'B1', note: 'Letterlijk onthouden, niet begrijpend.', example: { nl: 'We moesten de hele lijst uit ons hoofd leren.', en: 'We had to learn the whole list by heart.' } },
        { nl: 'De draad kwijt zijn', ipa: '/də ˈdraːt ˈkʋɛit ˈzɛin/', en: 'To lose the thread', type: 'idioom', level: 'B1', note: 'Niet meer kunnen volgen.', example: { nl: 'Sorry, ik ben even de draad kwijt – waar waren we?', en: 'Sorry, I lost the thread – where were we?' } },
        { nl: 'Er gaat een licht op', ipa: '/ɛr ˈɣaːt ən ˈlɪxt ˈɔp/', en: 'A light goes on', type: 'idioom', level: 'B1+', note: 'Plotseling iets begrijpen.', example: { nl: 'Toen de docent het tekende, ging er een licht op.', en: 'When the teacher drew it, it clicked.' } },
        { nl: 'Door de bomen het bos niet meer zien', ipa: '/doːr də ˈboːmə(n) ɦət ˈbɔs nit meːr ˈziːn/', en: 'To not see the forest for the trees', type: 'idioom', level: 'B2', note: 'Het overzicht verliezen door details.', example: { nl: 'Met al die regels zie je door de bomen het bos niet meer.', en: 'With all those rules you can’t see the wood for the trees.' } },
        { nl: 'Met vlag en wimpel slagen', ipa: '/mɛt ˈflɑɣ ɛn ˈʋɪmpəl ˈslaːɣə(n)/', en: 'To pass with flying colours', type: 'idioom', level: 'B2', note: 'Glansrijk, ruim voldoende slagen.', example: { nl: 'Ze slaagde met vlag en wimpel voor het staatsexamen.', en: 'She passed the state exam with flying colours.' } },
        { nl: 'Een bok schieten', ipa: '/ən ˈbɔk ˈsxiːtə(n)/', en: 'To make a blunder', type: 'idioom', level: 'B2', note: 'Een flinke vergissing maken.', example: { nl: 'In de presentatie schoot hij een flinke bok.', en: 'He made a real blunder in the presentation.' } },
      ],
    },
    {
      id: 'gezondheid',
      name: 'Gezondheid',
      en: 'Health',
      desc: 'Herstellen, uitgeput zijn en een frisse neus halen.',
      phrases: [
        { nl: 'Een frisse neus halen', ipa: '/ən ˈfrɪsə ˈnøːs ˈɦaːlə(n)/', en: 'To get some fresh air', type: 'uitdrukking', level: 'B1', note: 'Even naar buiten om op te frissen.', example: { nl: 'Ik ga even een frisse neus halen voor de lunch.', en: 'I’m going to get some fresh air before lunch.' } },
        { nl: 'Aan de beterende hand zijn', ipa: '/aːn də ˈbeːtərəndə ˈɦɑnt ˈzɛin/', en: 'To be on the mend', type: 'uitdrukking', level: 'B1+', note: 'Langzaam herstellen na ziekte.', example: { nl: 'Gelukkig is opa weer aan de beterende hand.', en: 'Thankfully grandpa is on the mend.' } },
        { nl: 'Er bovenop komen', ipa: '/ɛr ˈboːvənɔp ˈkoːmə(n)/', en: 'To pull through / recover', type: 'idioom', level: 'B1+', note: 'Herstellen van ziekte of tegenslag.', example: { nl: 'Het was zwaar, maar hij is er bovenop gekomen.', en: 'It was tough, but he pulled through.' } },
        { nl: 'Op je tandvlees lopen', ipa: '/ɔp jə ˈtɑntfleːs ˈloːpə(n)/', en: 'To be running on empty', type: 'idioom', level: 'B2', note: 'Volledig uitgeput zijn.', example: { nl: 'Na drie nachtdiensten liep ze op haar tandvlees.', en: 'After three night shifts she was running on empty.' } },
        { nl: 'Niet lekker in je vel zitten', ipa: '/nit ˈlɛkər ɪn jə ˈfɛl ˈzɪtə(n)/', en: 'To feel out of sorts', type: 'idioom', level: 'B2', note: 'Je mentaal/fysiek niet prettig voelen.', example: { nl: 'Hij zit de laatste tijd niet lekker in zijn vel.', en: 'He’s been feeling out of sorts lately.' } },
        { nl: 'Zo fit als een hoentje', ipa: '/zoː ˈfɪt ɑls ən ˈɦuːncə/', en: 'Fit as a fiddle', type: 'idioom', level: 'B2', note: 'Helemaal gezond en energiek.', example: { nl: 'Na de vakantie voel ik me zo fit als een hoentje.', en: 'After the holiday I feel fit as a fiddle.' } },
      ],
    },
    {
      id: 'media',
      name: 'Media & nieuws',
      en: 'Media & news',
      desc: 'Bronnen wegen, raak formuleren en olie op het vuur.',
      phrases: [
        { nl: 'De spijker op zijn kop slaan', ipa: '/də ˈspɛikər ɔp zɛin ˈkɔp ˈslaːn/', en: 'To hit the nail on the head', type: 'idioom', level: 'B1+', note: 'Precies de kern raken.', example: { nl: 'Met die opmerking sloeg ze de spijker op zijn kop.', en: 'With that remark she hit the nail on the head.' } },
        { nl: 'Iets met een korreltje zout nemen', ipa: '/its mɛt ən ˈkɔrəltjə ˈzɑut ˈneːmə(n)/', en: 'To take with a grain of salt', type: 'idioom', level: 'B1+', note: 'Niet alles voor waar aannemen.', example: { nl: 'Online reviews neem ik met een korreltje zout.', en: 'I take online reviews with a grain of salt.' } },
        { nl: 'Olie op het vuur gooien', ipa: '/ˈoːli ɔp ɦət ˈvyːr ˈɣoːiə(n)/', en: 'To add fuel to the fire', type: 'idioom', level: 'B2', note: 'Een conflict verergeren.', example: { nl: 'Die kop in de krant gooide alleen maar olie op het vuur.', en: 'That headline only added fuel to the fire.' } },
        { nl: 'Uit de lucht gegrepen', ipa: '/ʏt də ˈlʏxt ɣəˈɣreːpə(n)/', en: 'Made up / out of thin air', type: 'uitdrukking', level: 'B2', note: 'Zonder enige grond, verzonnen.', example: { nl: 'Die cijfers lijken volledig uit de lucht gegrepen.', en: 'Those figures seem completely made up.' } },
        { nl: 'In het nieuws komen', ipa: '/ɪn ɦət ˈnyːs ˈkoːmə(n)/', en: 'To make the news', type: 'uitdrukking', level: 'B1', note: 'Aandacht krijgen in de media.', example: { nl: 'Het kleine dorp kwam plots landelijk in het nieuws.', en: 'The small village suddenly made national news.' } },
        { nl: 'Het hoge woord is eruit', ipa: '/ɦət ˈɦoːɣə ˈʋoːrt ɪs ˈɛrʏt/', en: 'The truth is finally out', type: 'uitdrukking', level: 'B2', note: 'Iets moeilijks is eindelijk gezegd.', example: { nl: 'Na lang aarzelen is het hoge woord eruit: ze stopt.', en: 'After much hesitation it’s finally out: she’s quitting.' } },
      ],
    },
  ],
};
