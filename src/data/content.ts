import type { Lesson } from './types';

const meningLesson: Lesson = {
  id: 'mening-01',
  theme: 'mening',
  level: 'b1plus',
  title: 'Je mening nuanceren',
  subtitle: 'Expressing a nuanced opinion',
  minutes: 9,
  newWords: 8,
  phrases: [
    {
      id: 'mening-01-enerzijds',
      nl: 'Enerzijds … anderzijds',
      ipa: '/ˈeːnərˌzɛits … ˈɑndərˌzɛits/',
      en: 'On the one hand … on the other hand',
      note: 'Classic construction to weigh two sides before concluding.',
      example: {
        nl: 'Enerzijds werk ik graag thuis, anderzijds mis ik mijn collega\'s.',
        en: 'On one hand I like working from home, on the other I miss my colleagues.',
      },
      audio: 'https://cdn.wafel.app/audio/mening-01-enerzijds.mp3',
    },
    {
      id: 'mening-01-hangtervanaf',
      nl: 'Het hangt ervan af',
      ipa: '/ˈɦɛt ɦɑŋt ˈɛrvɑn ˈɑf/',
      en: 'It depends',
      note: 'Hedge before committing to a position.',
      example: {
        nl: 'Of ik meega? Het hangt ervan af wie er nog komt.',
        en: 'Whether I will join? It depends who else is coming.',
      },
      audio: 'https://cdn.wafel.app/audio/mening-01-hangtervanaf.mp3',
    },
    {
      id: 'mening-01-nietmeeens',
      nl: 'Ik ben het er niet mee eens',
      ipa: '/ɪk bɛn ət ɛr nit meː ˈeːns/',
      en: "I don't agree with that",
      note: 'Neutral, polite disagreement. Common in meetings.',
      example: {
        nl: 'Ik ben het er niet mee eens dat we het project moeten stopzetten.',
        en: 'I disagree that we should halt the project.',
      },
      audio: 'https://cdn.wafel.app/audio/mening-01-nietmeeens.mp3',
    },
    {
      id: 'mening-01-valtwelmee',
      nl: 'Dat valt wel mee',
      ipa: '/dɑt vɑlt ʋɛl ˈmeː/',
      en: "It's not that bad",
      note: 'Idiomatic understatement — a signature Dutch response.',
      example: {
        nl: 'De deadline is krap, maar dat valt wel mee.',
        en: 'The deadline is tight, but it is not that bad.',
      },
      audio: 'https://cdn.wafel.app/audio/mening-01-valtwelmee.mp3',
    },
    {
      id: 'mening-01-grotelijnen',
      nl: 'In grote lijnen',
      ipa: '/ɪn ˈɣroːtə ˈlɛinə(n)/',
      en: 'Broadly speaking',
      note: 'Signals a summary or high-level position.',
      example: {
        nl: 'In grote lijnen zijn we het eens over de aanpak.',
        en: 'Broadly speaking, we agree on the approach.',
      },
      audio: 'https://cdn.wafel.app/audio/mening-01-grotelijnen.mp3',
    },
    {
      id: 'mening-01-neemtnietweg',
      nl: 'Dat neemt niet weg dat…',
      ipa: '/dɑt neːmt nit vɛx dɑt/',
      en: "That said… / that doesn't change the fact that…",
      note: 'Concessive connector — advanced register.',
      example: {
        nl: 'Het plan is goed. Dat neemt niet weg dat we risico\'s moeten benoemen.',
        en: 'The plan is good. That said, we should name the risks.',
      },
      audio: 'https://cdn.wafel.app/audio/mening-01-neemtnietweg.mp3',
    },
    {
      id: 'mening-01-omeerlijk',
      nl: 'Om eerlijk te zijn',
      ipa: '/ɔm ˈeːrlək tə ˈzɛin/',
      en: 'To be honest',
      note: 'Softens a stronger opinion that follows.',
      example: {
        nl: 'Om eerlijk te zijn, vond ik de presentatie te lang.',
        en: 'To be honest, I found the presentation too long.',
      },
      audio: 'https://cdn.wafel.app/audio/mening-01-omeerlijk.mp3',
    },
    {
      id: 'mening-01-daarzitwatin',
      nl: 'Daar zit wat in',
      ipa: '/daːr zɪt vɑt ɪn/',
      en: "You've got a point",
      note: 'Conceding to another argument.',
      example: {
        nl: 'Daar zit wat in — we kunnen het beter uitstellen.',
        en: 'You have a point — better to postpone.',
      },
      audio: 'https://cdn.wafel.app/audio/mening-01-daarzitwatin.mp3',
    },
  ],
};

export const content = {
  lessons: [meningLesson],
};
