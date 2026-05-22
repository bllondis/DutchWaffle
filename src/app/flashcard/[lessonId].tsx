import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/theme/useTheme';
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import ProgressBar from '@/components/ProgressBar';
import FlipCard from '@/features/lesson/components/FlipCard';
import { useLesson } from '@/features/lesson/hooks/useLesson';
import { useLessonState } from '@/features/lesson/hooks/useLessonState';

export default function FlashcardScreen() {
  const t          = useTheme();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { data: lesson, isLoading } = useLesson(lessonId);
  const { mark, reset } = useLessonState();

  const [idx,     setIdx]     = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  // Reset lesson state when we enter fresh
  React.useEffect(() => { reset(); }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={t.colors.accent} />
      </SafeAreaView>
    );
  }
  if (!lesson) return null;

  const phrase   = lesson.phrases[idx];
  const total    = lesson.phrases.length;
  const progress = (idx + 1) / total;
  const isLast   = idx + 1 >= total;

  const advance = (m: 'known' | 'hard') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (phrase) mark(phrase.id, m);
    if (isLast) {
      router.replace(`/quiz/${lessonId}`);
    } else {
      setFlipped(false);
      setIdx((i) => i + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: t.spacing._5 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Close flashcards"
          style={[styles.iconBtn, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}
        >
          <Text style={{ color: t.colors.fgDim, fontSize: 18 }}>✕</Text>
        </Pressable>
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <ProgressBar value={progress} />
        </View>
        <Text style={[t.font.meta, { color: t.colors.fgMute, fontVariant: ['tabular-nums'] }]}>
          {idx + 1}/{total}
        </Text>
      </View>

      {/* Flip card */}
      <View style={{ flex: 1, padding: t.spacing._6 }}>
        <FlipCard
          flipped={flipped}
          onPress={() => setFlipped((f) => !f)}
          front={
            <>
              <View style={styles.row}>
                <Chip tone="accent">NL</Chip>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={[t.font.phrase, { color: t.colors.fg }]}>{phrase?.nl}</Text>
                <Text style={{ fontFamily: 'Menlo', fontSize: 12, color: t.colors.fgMute }}>{phrase?.ipa}</Text>
              </View>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>Tik om te draaien</Text>
            </>
          }
          back={
            <>
              <View style={styles.row}>
                <Chip>EN</Chip>
                <Text style={[t.font.meta, { color: t.colors.fgMute, fontVariant: ['tabular-nums'] }]}>{idx + 1}/{total}</Text>
              </View>
              <ScrollView contentContainerStyle={{ gap: 10 }} showsVerticalScrollIndicator={false}>
                <Text style={[t.font.eyebrow, { color: t.colors.fgMute }]}>Betekenis</Text>
                <Text style={[t.font.title, { color: t.colors.fg }]}>{phrase?.en}</Text>
                <Text style={[t.font.body, { color: t.colors.fgDim }]}>{phrase?.note}</Text>
                <View style={{ padding: 12, borderRadius: 12, backgroundColor: t.colors.bg2, borderWidth: 1, borderColor: t.colors.line }}>
                  <Text style={[t.font.eyebrow, { color: t.colors.fgMute, marginBottom: 4 }]}>Voorbeeld</Text>
                  <Text style={[t.font.body, { color: t.colors.fg, fontFamily: t.font.family.medium }]}>
                    {phrase?.example.nl}
                  </Text>
                  <Text style={[t.font.meta, { color: t.colors.fgMute, fontStyle: 'italic', marginTop: 4 }]}>
                    {phrase?.example.en}
                  </Text>
                </View>
              </ScrollView>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>Tik om terug te draaien</Text>
            </>
          }
        />
      </View>

      {/* Action bar */}
      <View style={[styles.footer, { paddingHorizontal: t.spacing._5 }]}>
        <Button variant="ghost" block onPress={() => advance('hard')}>Lastig</Button>
        <View style={{ flex: 1.4 }}>
          <Button variant="primary" block onPress={() => advance('known')}>
            {isLast ? 'Quiz starten' : 'Ken ik'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:  { flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 4 },
  iconBtn: { width: 40, height: 40, borderRadius: 999, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  row:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footer:  { flexDirection: 'row', gap: 10, paddingVertical: 20 },
});
