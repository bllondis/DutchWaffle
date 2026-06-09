export type Level = { id: 'b1' | 'b1plus' | 'b2'; code: string; name: string; tagline: string; done: number; total: number };

export type Theme = { id: string; name: string; en: string };

export type Phrase = {
  id: string;
  nl: string;
  ipa: string;
  en: string;
  note: string;
  example: { nl: string; en: string };
  audio: string;
};

export type Lesson = {
  id: string;
  theme: string;
  level: 'b1' | 'b1plus' | 'b2';
  title: string;
  subtitle: string;
  minutes: number;
  newWords: number;
  phrases: Phrase[];
};

export type UserProgress = {
  lessonId: string;
  completed: boolean;
  score: number;
  phraseMarks: Record<string, 'known' | 'hard'>;
  updatedAt: string;
};
