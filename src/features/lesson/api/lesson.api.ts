import { content } from '@/data/content';
import type { Lesson } from '@/data/types';

// v1: seeded content, offline-first. Swap fetchLesson with an HTTP call when the backend is ready.
export async function fetchLesson(id: string): Promise<Lesson> {
  const lesson = content.lessons.find((l) => l.id === id);
  if (!lesson) throw new Error(`Lesson not found: ${id}`);
  // Microtask boundary so loading states render on the first frame
  await Promise.resolve();
  return lesson;
}

export async function fetchLessons(): Promise<Lesson[]> {
  await Promise.resolve();
  return content.lessons;
}
