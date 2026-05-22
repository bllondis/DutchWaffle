import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/useTheme';
import Chip from '@/components/Chip';
import ProgressBar from '@/components/ProgressBar';
import Stroopwafel from '@/components/Stroopwafel';
import { mockUser, mockLevels, mockThemes } from '@/data/mock';

export default function HomeScreen() {
  const t = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      {/* Header row */}
      <View style={[styles.header, { paddingHorizontal: t.spacing._6 }]}>
        <View style={styles.headerLeft}>
          <Stroopwafel size={36} />
          <View>
            <Text style={[t.font.meta, { color: t.colors.fgMute }]}>{mockUser.greeting}</Text>
            <Text style={[t.font.label, { color: t.colors.fg, fontFamily: t.font.family.semibold, fontSize: 16 }]}>
              {mockUser.firstName}
            </Text>
          </View>
        </View>
        <Chip tone="caramel">🔥 {mockUser.streakDays}</Chip>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: t.spacing._6, gap: t.spacing._5 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Continue card with gradient */}
        <Pressable
          onPress={() => router.push('/lesson-intro/mening-01')}
          accessibilityLabel="Continue lesson: Je mening nuanceren"
          style={{ borderRadius: t.radius.lg, overflow: 'hidden' }}
        >
          <LinearGradient
            colors={['#1A3F35', '#0F2820']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.continueCard, { borderColor: t.colors.line2 }]}
          >
            <Text style={[t.font.eyebrow, { color: t.colors.accent }]}>Verder gaan</Text>
            <Text style={[t.font.title, { color: t.colors.fg, marginTop: 6 }]}>
              Je mening{'\n'}nuanceren
            </Text>
            <View style={{ marginTop: t.spacing._4 }}>
              <ProgressBar value={0.38} />
            </View>
            <View style={[styles.metaRow, { marginTop: t.spacing._3 }]}>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>9 min</Text>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>·</Text>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>B1+</Text>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>·</Text>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>8 zinnen</Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Your level section */}
        <View style={{ gap: t.spacing._2, marginTop: t.spacing._2 }}>
          <Text style={[t.font.label, { color: t.colors.fgDim, fontFamily: t.font.family.semibold }]}>
            Jouw niveau
          </Text>
          {mockLevels.map((level) => (
            <Pressable
              key={level.id}
              onPress={() => router.push('/lesson-intro/mening-01')}
              style={[styles.levelRow, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}
            >
              <View style={[styles.levelBadge, { backgroundColor: 'rgba(110,199,169,0.12)', borderColor: 'rgba(110,199,169,0.25)' }]}>
                <Text style={[t.font.label, { color: t.colors.accent, fontFamily: t.font.family.bold }]}>
                  {level.code}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[t.font.label, { color: t.colors.fg, fontFamily: t.font.family.semibold }]}>
                  {level.name}
                </Text>
                <Text style={[t.font.meta, { color: t.colors.fgMute }]}>{level.tagline}</Text>
              </View>
              <Text style={[t.font.body, { color: t.colors.fgMute }]}>›</Text>
            </Pressable>
          ))}
        </View>

        {/* Themes 2×2 grid */}
        <View style={{ gap: t.spacing._2, marginTop: t.spacing._2 }}>
          <Text style={[t.font.label, { color: t.colors.fgDim, fontFamily: t.font.family.semibold }]}>
            Thema's
          </Text>
          <View style={styles.themeGrid}>
            {mockThemes.slice(0, 4).map((theme) => (
              <Pressable
                key={theme.id}
                style={[styles.themeCard, { backgroundColor: t.colors.surface, borderColor: t.colors.line }]}
              >
                <Text style={[t.font.label, { color: t.colors.fg, fontFamily: t.font.family.semibold }]}>
                  {theme.name}
                </Text>
                <Text style={[t.font.meta, { color: t.colors.fgMute }]}>{theme.en}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  headerLeft:  { flexDirection: 'row', gap: 10, alignItems: 'center' },
  continueCard:{ padding: 20, borderWidth: 1 },
  metaRow:     { flexDirection: 'row', gap: 8 },
  levelRow:    { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, borderWidth: 1 },
  levelBadge:  { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  themeGrid:   { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  themeCard:   { width: '47%', padding: 16, borderRadius: 16, borderWidth: 1, gap: 4 },
});
