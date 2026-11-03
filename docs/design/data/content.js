// Dutch content – B1→B2 phrases inspired by "Nederlands op niveau"
// Each phrase: Dutch, IPA (simplified), English, theme, example sentence, difficulty

window.DUTCH_CONTENT = {
  levels: [
    {
      id: 'b1',
      code: 'B1',
      name: 'Onderweg',
      tagline: 'Fluent essentials',
      desc: 'Everyday fluency – opinions, work, routines.',
      lessons: 12,
      completed: 4,
      minutes: 8,
    },
    {
      id: 'b1plus',
      code: 'B1+',
      name: 'Op niveau',
      tagline: 'Bridging register',
      desc: 'More formal Dutch: news, workplace, written style.',
      lessons: 16,
      completed: 2,
      minutes: 10,
    },
    {
      id: 'b2',
      code: 'B2',
      name: 'Doorstromen',
      tagline: 'Nuanced & confident',
      desc: 'Argue, nuance, idiom. Academic & professional.',
      lessons: 14,
      completed: 0,
      minutes: 12,
    },
  ],

  themes: [
    { id: 'werk',       name: 'Werk & carrière',       en: 'Work & career' },
    { id: 'mening',     name: 'Je mening geven',       en: 'Giving opinions' },
    { id: 'maatsch',    name: 'Maatschappij',          en: 'Society' },
    { id: 'onderwijs',  name: 'Onderwijs',             en: 'Education' },
    { id: 'gezondheid', name: 'Gezondheid',            en: 'Health' },
    { id: 'media',      name: 'Media & nieuws',        en: 'Media & news' },
  ],

  // Full lesson (used in flashcard & quiz flows). Theme: "Je mening geven" (B1→B2)
  lesson: {
    id: 'mening-01',
    theme: 'mening',
    title: 'Je mening nuanceren',
    subtitle: 'Expressing a nuanced opinion',
    level: 'B1+',
    minutes: 9,
    new_words: 8,
    phrases: [
      {
        nl: 'Enerzijds … anderzijds',
        ipa: '/ˈeːnərˌzɛits … ˈɑndərˌzɛits/',
        en: 'On the one hand … on the other hand',
        note: 'Classic construction to weigh two sides before concluding.',
        example: {
          nl: 'Enerzijds werk ik graag thuis, anderzijds mis ik mijn collega’s.',
          en: 'On one hand I like working from home, on the other I miss my colleagues.',
        },
      },
      {
        nl: 'Het hangt ervan af',
        ipa: '/ˈɦɛt ɦɑŋt ˈɛrvɑn ˈɑf/',
        en: 'It depends',
        note: 'Hedge before committing to a position.',
        example: {
          nl: 'Of ik meega? Het hangt ervan af wie er nog komt.',
          en: 'Whether I’ll join? It depends who else is coming.',
        },
      },
      {
        nl: 'Ik ben het er niet mee eens',
        ipa: '/ɪk bɛn ət ɛr nit meː ˈeːns/',
        en: "I don't agree with that",
        note: 'Neutral, polite disagreement. Very common in meetings.',
        example: {
          nl: 'Ik ben het er niet mee eens dat we het project moeten stopzetten.',
          en: 'I don’t agree that we should halt the project.',
        },
      },
      {
        nl: 'Dat valt wel mee',
        ipa: '/dɑt vɑlt ʋɛl ˈmeː/',
        en: "It's not that bad / better than expected",
        note: 'Idiomatic understatement – a signature Dutch response.',
        example: {
          nl: 'De deadline is krap, maar dat valt wel mee.',
          en: 'The deadline is tight, but it’s not so bad.',
        },
      },
      {
        nl: 'In grote lijnen',
        ipa: '/ɪn ˈɣroːtə ˈlɛinə(n)/',
        en: 'Broadly speaking / in broad strokes',
        note: 'Signals a summary or high-level position.',
        example: {
          nl: 'In grote lijnen zijn we het eens over de aanpak.',
          en: 'Broadly speaking, we agree on the approach.',
        },
      },
      {
        nl: 'Dat neemt niet weg dat…',
        ipa: '/dɑt neːmt nit vɛx dɑt/',
        en: 'That said… / that doesn’t change the fact that…',
        note: 'Concessive connector – advanced register.',
        example: {
          nl: 'Het plan is goed. Dat neemt niet weg dat we risico’s moeten benoemen.',
          en: 'The plan is good. That said, we should name the risks.',
        },
      },
      {
        nl: 'Om eerlijk te zijn',
        ipa: '/ɔm ˈeːrlək tə ˈzɛin/',
        en: 'To be honest',
        note: 'Softens a stronger opinion that follows.',
        example: {
          nl: 'Om eerlijk te zijn, vond ik de presentatie te lang.',
          en: 'To be honest, I found the presentation too long.',
        },
      },
      {
        nl: 'Daar zit wat in',
        ipa: '/daːr zɪt vɑt ɪn/',
        en: "You've got a point",
        note: 'Conceding to someone else’s argument.',
        example: {
          nl: 'Daar zit wat in – we kunnen het beter uitstellen.',
          en: 'You’ve got a point – better to postpone it.',
        },
      },
    ],
  },
};
