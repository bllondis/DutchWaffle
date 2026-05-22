import { create } from 'zustand';

type Mark = 'known' | 'hard';

type LessonState = {
  marks: Record<string, Mark>;
  mark:  (phraseId: string, m: Mark) => void;
  reset: () => void;
};

export const useLessonState = create<LessonState>()((set) => ({
  marks: {},
  mark:  (id, m) => set((s) => ({ marks: { ...s.marks, [id]: m } })),
  reset: () => set({ marks: {} }),
}));
