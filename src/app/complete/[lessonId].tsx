import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/theme/useTheme';
import Button from '@/components/Button';
import Stroopwafel from '@/components/Stroopwafel';
import { useLesson } from '@/features/lesson/hooks/useLesson';
import { useLessonState } from '@/features/lesson/hooks/useLessonState';
import { mockUser } from '@/data/mock';

export default function CompleteScreen() {
  const t = useTheme();
  const { lessonId, score, total } = useLocalSearchParams<{
    lessonId: string; score: string; total: string;
  }>();
  const { data: lesson } = useLesson(lessonId);
  const { marks } = useLessonState();

  const scoreNum  = parseInt(score  ?? '0', 10);
  const totalNum  = parseInt(total  ?? '8',  10);
  const scorePct  = totalNum > 0 ? Math.round((scoreNum / totalNum) * 100) : 0;
  const knownCount = Object.values(marks).filter((m) => m === 'known').length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      {/* Header (only close button) */}
      <View style={[styles.headerRow, { paddingHorizontal: t.spacing._6 }]}>
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={() => router.dismissAll()}
          accessibilityLabel="Close and go home"
          style={[styles.iconBtn, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}
        >
          <Text style={{ color: t.colors.fgDim, fontSize: 18 }}>✕</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: t.spacing._6, gap: t.spacing._5, paddingBottom: 120, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={{ alignItems: 'center', gap: t.spacing._3, marginTop: t.spacing._5 }}>
          <Stroopwafel size={104} mood="happy" />
          <Text style={[t.font.eyebrow, { color: t.colors.accent }]}>Les voltooid</Text>
          <Text style={[t.font.display, { color: t.colors.fg, textAlign: 'center' }]}>
            Lekker bezig,{'\n'}{mockUser.firstName}!
          </Text>
          {lesson && (
            <Text style={[t.font.body, { color: t.colors.fgDim, textAlign: 'center' }]}>
              Je hebt <Text style={{ color: t.colors.fg, fontFamily: t.font.family.semibold }}>{lesson.title}</Text> afgerond.
            </Text>
          )}
        </View>

        {/* Stat tiles */}
        <View style={styles.statGrid}>
          <View style={[styles.statTile, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}>
            <Text style={[t.font.display, { color: t.colors.fg, fontVariant: ['tabular-nums'] }]}>
              {totalNum}
            </Text>
            <Text style={[t.font.meta, { color: t.colors.fgMute }]}>Zinnen</Text>
          </View>
          <View style={[styles.statTile, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}>
            <Text style={[t.font.display, { color: t.colors.accent, fontVariant: ['tabular-nums'] }]}>
              {scorePct}%
            </Text>
            <Text style={[t.font.meta, { color: t.colors.fgMute }]}>Score</Text>
          </View>
          <View style={[styles.statTile, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}>
            <Text style={[t.font.display, { color: t.colors.caramel, fontVariant: ['tabular-nums'] }]}>
              🔥 {mockUser.streakDays + 1}
            </Text>
            <Text style={[t.font.meta, { color: t.colors.fgMute }]}>Streak</Text>
          </View>
        </View>

        {/* Phrase recap */}
        {lesson && (
          <View style={{ gap: t.spacing._2, alignSelf: 'stretch' }}>
            <Text style={[t.font.label, { color: t.colors.fgDim, fontFamily: t.font.family.semibold }]}>
              Vandaag geleerd
            </Text>
            {lesson.phrases.map((phrase) => (
              <View
                key={phrase.id}
                style={[styles.phraseRow, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}
              >
                <Text style={[t.font.body, { color: t.colors.ok, fontSize: 16 }]}>✓</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[t.font.label, { color: t.colors.fg, fontFamily: t.font.family.semibold }]}>
                    {phrase.nl}
                  </Text>
                  <Text style={[t.font.meta, { color: t.colors.fgMute }]}>{phrase.en}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Sticky CTA bar */}
      <View style={[styles.ctaBar, {
        backgroundColor: t.colors.bg,
        borderTopColor: t.colors.line,
        paddingHorizontal: t.spacing._6,
      }]}>
        <Button variant="ghost" block onPress={() => router.dismissAll()}>Klaar</Button>
        <View style={{ flex: 1.4 }}>
          <Button variant="primary" block onPress={() => router.dismissAll()}>Volgende les</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  iconBtn:   { width: 40, height: 40, borderRadius: 999, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  statGrid:  { flexDirection: 'row', gap: 10, alignSelf: 'stretch' },
  statTile:  { flex: 1, alignItems: 'center', paddingVertical: 20, borderRadius: 18, borderWidth: 1, gap: 4 },
  phraseRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, borderWidth: 1 },
  ctaBar:    { flexDirection: 'row', gap: 10, paddingVertical: 16, borderTopWidth: 1 },
});
