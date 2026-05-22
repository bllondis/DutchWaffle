import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/useTheme';
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import Stroopwafel from '@/components/Stroopwafel';
import { useLesson } from '@/features/lesson/hooks/useLesson';

export default function LessonIntroScreen() {
  const t = useTheme();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { data: lesson, isLoading } = useLesson(lessonId);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={t.colors.accent} />
      </SafeAreaView>
    );
  }
  if (!lesson) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      {/* Header row */}
      <View style={[styles.headerRow, { paddingHorizontal: t.spacing._6 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Close lesson intro"
          style={[styles.iconBtn, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}
        >
          <Text style={{ color: t.colors.fgDim, fontSize: 18 }}>✕</Text>
        </Pressable>
        <Text style={[t.font.eyebrow, { color: t.colors.fgMute }]}>Les 1 van 8</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: t.spacing._6, gap: t.spacing._5, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <View style={{ borderRadius: t.radius.xl, overflow: 'hidden' }}>
          <LinearGradient
            colors={['#1A3F35', '#0F2820']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.heroCard, { borderColor: t.colors.line2 }]}
          >
            <View style={styles.heroTop}>
              <View style={styles.chipRow}>
                <Chip tone="accent">{lesson.level.toUpperCase()}</Chip>
                <Chip>Mening</Chip>
              </View>
              <Stroopwafel size={52} mood="focus" />
            </View>
            <Text style={[t.font.eyebrow, { color: t.colors.caramel2, marginTop: t.spacing._4 }]}>
              Thema · Je mening geven
            </Text>
            <Text style={[t.font.phrase, { color: t.colors.fg, marginTop: t.spacing._2 }]}>
              {lesson.title}
            </Text>
            <Text style={[t.font.body, { color: t.colors.fgDim, marginTop: t.spacing._2 }]}>
              {lesson.subtitle}
            </Text>

            {/* Metadata strip */}
            <View style={[styles.metaStrip, { borderTopColor: t.colors.line, marginTop: t.spacing._5 }]}>
              <View style={styles.metaTile}>
                <Text style={[t.font.label, { color: t.colors.fg, fontFamily: t.font.family.semibold, fontVariant: ['tabular-nums'] }]}>
                  {lesson.minutes} min
                </Text>
                <Text style={[t.font.meta, { color: t.colors.fgMute }]}>Duur</Text>
              </View>
              <View style={[styles.metaDivider, { backgroundColor: t.colors.line }]} />
              <View style={styles.metaTile}>
                <Text style={[t.font.label, { color: t.colors.fg, fontFamily: t.font.family.semibold, fontVariant: ['tabular-nums'] }]}>
                  {lesson.phrases.length}
                </Text>
                <Text style={[t.font.meta, { color: t.colors.fgMute }]}>Zinnen</Text>
              </View>
              <View style={[styles.metaDivider, { backgroundColor: t.colors.line }]} />
              <View style={styles.metaTile}>
                <Text style={[t.font.label, { color: t.colors.fg, fontFamily: t.font.family.semibold, fontVariant: ['tabular-nums'] }]}>
                  {lesson.newWords}
                </Text>
                <Text style={[t.font.meta, { color: t.colors.fgMute }]}>Nieuw</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Phrase preview list */}
        <View style={{ gap: t.spacing._2 }}>
          <Text style={[t.font.label, { color: t.colors.fgDim, fontFamily: t.font.family.semibold }]}>
            Wat ga je leren
          </Text>
          {lesson.phrases.slice(0, 4).map((phrase) => (
            <View
              key={phrase.id}
              style={[styles.phraseRow, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}
            >
              <Text style={[t.font.body, { color: t.colors.fg, flex: 1, fontFamily: t.font.family.medium }]}>
                {phrase.nl}
              </Text>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>{phrase.en}</Text>
            </View>
          ))}
          {lesson.phrases.length > 4 && (
            <Text style={[t.font.label, { color: t.colors.accent }]}>
              +{lesson.phrases.length - 4} meer
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[styles.ctaBar, { backgroundColor: t.colors.bg, borderTopColor: t.colors.line, paddingHorizontal: t.spacing._6 }]}>
        <Button
          variant="primary"
          block
          size="lg"
          onPress={() => router.replace(`/flashcard/${lessonId}`)}
        >
          Begin de les
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  iconBtn:    { width: 40, height: 40, borderRadius: 999, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  heroCard:   { padding: 20, borderWidth: 1 },
  heroTop:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  chipRow:    { flexDirection: 'row', gap: 8 },
  metaStrip:  { flexDirection: 'row', paddingTop: 16, borderTopWidth: 1 },
  metaTile:   { flex: 1, alignItems: 'center', gap: 4 },
  metaDivider:{ width: 1, height: '100%' },
  phraseRow:  { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, borderWidth: 1 },
  ctaBar:     { paddingVertical: 16, borderTopWidth: 1 },
});
