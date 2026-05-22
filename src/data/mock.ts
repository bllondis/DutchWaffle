import type { Level, Theme } from './types';

export const mockLevels: Level[] = [
  { id: 'b1',     code: 'B1',  name: 'Onderweg',    tagline: 'Fluent essentials' },
  { id: 'b1plus', code: 'B1+', name: 'Op niveau',   tagline: 'Bridging register' },
  { id: 'b2',     code: 'B2',  name: 'Doorstromen', tagline: 'Nuanced & confident' },
];

export const mockThemes: Theme[] = [
  { id: 'werk',       name: 'Werk & carrière',  en: 'Work & career' },
  { id: 'mening',     name: 'Je mening geven',  en: 'Giving opinions' },
  { id: 'maatsch',    name: 'Maatschappij',     en: 'Society' },
  { id: 'onderwijs',  name: 'Onderwijs',        en: 'Education' },
  { id: 'gezondheid', name: 'Gezondheid',       en: 'Health' },
  { id: 'media',      name: 'Media & nieuws',   en: 'Media & news' },
];

export const mockUser = {
  id: 'usr-001',
  firstName: 'Sander',
  greeting: 'Goedemorgen',
  currentLevel: 'b1plus' as const,
  currentLessonId: 'mening-01',
  streakDays: 12,
  completedLessons: ['werk-01'],
  dailyGoalMinutes: 10,
};
