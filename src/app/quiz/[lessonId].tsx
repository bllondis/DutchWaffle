import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/theme/useTheme';
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import ProgressBar from '@/components/ProgressBar';
import QuizOption from '@/features/lesson/components/QuizOption';
import { useLesson } from '@/features/lesson/hooks/useLesson';
import { useLessonState } from '@/features/lesson/hooks/useLessonState';
import type { Phrase } from '@/data/types';

type Option = { en: string; correct: boolean };

// Deterministic shuffle using the phrase id as a seed so options are in a stable order
function shuffleWithSeed(arr: Option[], seed: string): Option[] {
  const a = [...arr];
  let hash = Array.from(seed).reduce((h, c) => Math.imul(h * 31, c.charCodeAt(0)) | 0, 7);
  for (let i = a.length - 1; i > 0; i--) {
    hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b) | 0;
    const j = Math.abs(hash) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(phrases: Phrase[], currentIdx: number): Option[] {
  const current    = phrases[currentIdx];
  const distractors = phrases
    .filter((_, i) => i !== currentIdx)
    .slice(0, 3)
    .map((p) => ({ en: p.en, correct: false }));
  return shuffleWithSeed([{ en: current!.en, correct: true }, ...distractors], current!.id);
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export default function QuizScreen() {
  const t          = useTheme();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { data: lesson, isLoading } = useLesson(lessonId);
  const { marks }  = useLessonState();

  const [quizIdx,  setQuizIdx]  = React.useState(0);
  const [picked,   setPicked]   = React.useState<number | null>(null);
  const [checked,  setChecked]  = React.useState(false);
  const [score,    setScore]    = React.useState(0);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={t.colors.accent} />
      </SafeAreaView>
    );
  }
  if (!lesson) return null;

  const total   = lesson.phrases.length;
  const phrase  = lesson.phrases[quizIdx];
  const options = buildOptions(lesson.phrases, quizIdx);
  const progress = (quizIdx + 1) / total;
  const isLast  = quizIdx + 1 >= total;

  const handleCheck = () => {
    if (picked === null) return;
    const isCorrect = options[picked]?.correct ?? false;
    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore((s) => s + 1);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    setChecked(true);
  };

  const handleNext = () => {
    if (isLast) {
      const finalScore = score + (options[picked!]?.correct ? 1 : 0);
      router.replace(`/complete/${lessonId}?score=${finalScore}&total=${total}`);
    } else {
      setPicked(null);
      setChecked(false);
      setQuizIdx((i) => i + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: t.spacing._5 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Close quiz"
          style={[styles.iconBtn, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}
        >
          <Text style={{ color: t.colors.fgDim, fontSize: 18 }}>✕</Text>
        </Pressable>
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <ProgressBar value={progress} tone="caramel" />
        </View>
        <Chip tone="caramel">🔥 {Object.keys(marks).length}</Chip>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: t.spacing._6, gap: t.spacing._4, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[t.font.eyebrow, { color: t.colors.caramel2 }]}>
          Vraag {quizIdx + 1} / {total}
        </Text>
        <Text style={[t.font.title, { color: t.colors.fg }]}>
          Wat betekent deze uitdrukking?
        </Text>

        {/* Prompt card */}
        <View style={[styles.promptCard, { backgroundColor: t.colors.surface2, borderColor: t.colors.line }]}>
          <Text style={[t.font.title, { color: t.colors.fg }]}>{phrase?.nl}</Text>
          <Text style={{ fontFamily: 'Menlo', fontSize: 11, color: t.colors.fgMute, marginTop: 4 }}>
            {phrase?.ipa}
          </Text>
        </View>

        {/* Answer options */}
        <View style={{ gap: t.spacing._2 }}>
          {options.map((opt, i) => {
            let state: 'idle' | 'selected' | 'correct' | 'wrong' = 'idle';
            if (checked) {
              state = opt.correct ? 'correct' : i === picked ? 'wrong' : 'idle';
            } else if (picked === i) {
              state = 'selected';
            }
            return (
              <QuizOption
                key={i}
                letter={LETTERS[i] as 'A'}
                label={opt.en}
                state={state}
                onPress={() => !checked && setPicked(i)}
              />
            );
          })}
        </View>

        {/* Feedback card */}
        {checked && (
          <View style={[styles.feedbackCard, {
            backgroundColor: options[picked!]?.correct ? 'rgba(110,199,169,0.08)' : 'rgba(229,142,124,0.08)',
            borderColor: options[picked!]?.correct ? t.colors.ok : t.colors.bad,
          }]}>
            <Text style={[t.font.eyebrow, { color: options[picked!]?.correct ? t.colors.ok : t.colors.bad }]}>
              {options[picked!]?.correct ? 'Goed zo!' : 'Bijna!'}
            </Text>
            <Text style={[t.font.body, { color: t.colors.fgDim, marginTop: 6 }]}>
              {phrase?.note}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[styles.ctaBar, { backgroundColor: t.colors.bg, borderTopColor: t.colors.line, paddingHorizontal: t.spacing._6 }]}>
        <Button
          variant="primary"
          block
          size="lg"
          disabled={picked === null && !checked}
          onPress={checked ? handleNext : handleCheck}
        >
          {checked ? (isLast ? 'Resultaten bekijken' : 'Volgende') : 'Controleren'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:       { flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 4 },
  iconBtn:      { width: 40, height: 40, borderRadius: 999, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  promptCard:   { padding: 18, borderRadius: 18, borderWidth: 1 },
  feedbackCard: { padding: 16, borderRadius: 14, borderWidth: 1 },
  ctaBar:       { paddingVertical: 16, borderTopWidth: 1 },
});
