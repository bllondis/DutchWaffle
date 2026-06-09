import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/useTheme';
import ProgressBar from '@/components/ProgressBar';
import Stroopwafel from '@/components/Stroopwafel';
import { mockUser, mockLevels, mockThemes } from '@/data/mock';

// ─── Bottom tab bar ───────────────────────────────────────────────────────────
const TABS = [
  { key: 'home',  label: 'Home',  icon: '⌂' },
  { key: 'leren', label: 'Leren', icon: '□' },
  { key: 'doel',  label: 'Doel',  icon: '⚑' },
  { key: 'mij',   label: 'Mij',   icon: '⚙' },
];

function TabBar() {
  const t = useTheme();
  const [active, setActive] = React.useState('home');
  return (
    <View style={[styles.tabBar, { backgroundColor: t.colors.bg, borderTopColor: t.colors.line }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => setActive(tab.key)}
            style={styles.tabItem}
            accessibilityLabel={tab.label}
          >
            <Text style={[styles.tabIcon, { color: isActive ? t.colors.accent : t.colors.fgMute }]}>
              {tab.icon}
            </Text>
            <Text style={[t.font.meta, { color: isActive ? t.colors.accent : t.colors.fgMute }]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── Home screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const t = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }} edges={['top']}>
      {/* Header */}
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
        <View style={styles.headerRight}>
          {/* Streak chip */}
          <View style={[styles.streakChip, { backgroundColor: 'rgba(217,165,94,0.15)', borderColor: 'rgba(217,165,94,0.3)' }]}>
            <Text style={{ fontSize: 14 }}>🔥</Text>
            <Text style={[t.font.label, { color: t.colors.caramel2, fontFamily: t.font.family.semibold }]}>
              {mockUser.streakDays}
            </Text>
          </View>
          {/* Bell button */}
          <Pressable
            style={[styles.iconCircle, { backgroundColor: t.colors.surface, borderColor: t.colors.line2 }]}
            accessibilityLabel="Notificaties"
          >
            <Text style={{ fontSize: 16 }}>🔔</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: t.spacing._6, gap: t.spacing._5 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Continue card */}
        <Pressable
          onPress={() => router.push('/lesson-intro/mening-01')}
          accessibilityLabel="Continue lesson"
          style={{ borderRadius: t.radius.lg, overflow: 'hidden' }}
        >
          <LinearGradient
            colors={['#1A3F35', '#0F2820']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.continueCard, { borderColor: t.colors.line2 }]}
          >
            <View style={styles.continueTop}>
              <View style={{ flex: 1 }}>
                <Text style={[t.font.eyebrow, { color: t.colors.accent }]}>Verder gaan</Text>
                <Text style={[t.font.title, { color: t.colors.fg, marginTop: 6 }]}>
                  Je mening{'\n'}nuanceren
                </Text>
              </View>
              {/* Arrow button */}
              <Pressable style={[styles.arrowBtn, { backgroundColor: t.colors.accent }]}>
                <Text style={{ color: t.colors.accentInk, fontSize: 18, fontWeight: '600' }}>→</Text>
              </Pressable>
            </View>
            <View style={{ marginTop: t.spacing._4 }}>
              <ProgressBar value={0.38} />
            </View>
            <View style={[styles.metaRow, { marginTop: t.spacing._3 }]}>
              <Text style={{ fontSize: 12, color: t.colors.fgMute }}>🕐</Text>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>9 min</Text>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>·</Text>
              <Text style={[t.font.meta, { color: t.colors.fgMute }]}>B1+</Text>
              <Text style={[t.font.meta, { color: t.colors.fgMute, fontVariant: ['tabular-nums'] }]}>3/8</Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Level section */}
        <View style={{ gap: t.spacing._2 }}>
          <Text style={[t.font.eyebrow, { color: t.colors.fgMute }]}>Jouw niveau</Text>
          {mockLevels.map((level) => {
            const isActive = level.id === mockUser.currentLevel;
            const progress = level.total > 0 ? level.done / level.total : 0;
            return (
              <Pressable
                key={level.id}
                onPress={() => router.push('/lesson-intro/mening-01')}
                style={[
                  styles.levelRow,
                  {
                    backgroundColor: isActive ? t.colors.surface2 : t.colors.surface,
                    borderColor: isActive ? t.colors.accent + '40' : t.colors.line,
                  },
                ]}
              >
                {/* Level badge */}
                <View style={[
                  styles.levelBadge,
                  {
                    backgroundColor: isActive ? t.colors.accent : t.colors.surface2,
                    borderColor: isActive ? t.colors.accent : t.colors.line2,
                  },
                ]}>
                  <Text style={[
                    t.font.label,
                    {
                      color: isActive ? t.colors.accentInk : t.colors.fgDim,
                      fontFamily: t.font.family.bold,
                      fontSize: 11,
                    },
                  ]}>
                    {level.code}
                  </Text>
                </View>

                {/* Name + progress bar */}
                <View style={{ flex: 1, gap: 5 }}>
                  <View style={styles.levelNameRow}>
                    <Text style={[t.font.label, { color: t.colors.fg, fontFamily: t.font.family.semibold }]}>
                      {level.name}
                    </Text>
                    <Text style={[t.font.meta, { color: t.colors.fgMute }]}>{level.tagline}</Text>
                  </View>
                  <ProgressBar value={progress} tone={isActive ? 'accent' : 'accent'} />
                </View>

                {/* Counter */}
                <Text style={[t.font.meta, { color: t.colors.fgMute, fontVariant: ['tabular-nums'] }]}>
                  {level.done}/{level.total}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Themes 2×2 grid */}
        <View style={{ gap: t.spacing._2 }}>
          <Text style={[t.font.eyebrow, { color: t.colors.fgMute }]}>Thema's</Text>
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

      {/* Bottom tab bar */}
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  headerLeft:   { flexDirection: 'row', gap: 10, alignItems: 'center' },
  headerRight:  { flexDirection: 'row', gap: 8, alignItems: 'center' },
  streakChip:   { flexDirection: 'row', alignItems: 'center', gap: 6, height: 36, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1 },
  iconCircle:   { width: 36, height: 36, borderRadius: 999, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  continueCard: { padding: 20, borderWidth: 1 },
  continueTop:  { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  arrowBtn:     { width: 44, height: 44, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  metaRow:      { flexDirection: 'row', gap: 6, alignItems: 'center' },
  levelRow:     { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, borderWidth: 1 },
  levelBadge:   { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  levelNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  themeGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  themeCard:    { width: '47%', padding: 16, borderRadius: 16, borderWidth: 1, gap: 4 },
  tabBar:       { flexDirection: 'row', borderTopWidth: 1, paddingBottom: 24, paddingTop: 10 },
  tabItem:      { flex: 1, alignItems: 'center', gap: 3 },
  tabIcon:      { fontSize: 20 },
});
