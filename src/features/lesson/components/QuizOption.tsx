import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';

type State = 'idle' | 'selected' | 'correct' | 'wrong' | 'disabled';
type Props = { letter: 'A' | 'B' | 'C' | 'D'; label: string; state: State; onPress: () => void };

export default function QuizOption({ letter, label, state, onPress }: Props) {
  const t = useTheme();

  const colors = (() => {
    switch (state) {
      case 'correct':  return { bg: 'rgba(110,199,169,0.12)', border: t.colors.ok,     bullet: t.colors.ok,     bulletText: t.colors.accentInk };
      case 'wrong':    return { bg: 'rgba(229,142,124,0.10)', border: t.colors.bad,    bullet: t.colors.bad,    bulletText: '#fff' };
      case 'selected': return { bg: 'rgba(110,199,169,0.07)', border: t.colors.accent, bullet: 'transparent',   bulletText: t.colors.accent };
      default:         return { bg: t.colors.surface,         border: t.colors.line,   bullet: 'transparent',   bulletText: t.colors.fgMute };
    }
  })();

  return (
    <Pressable
      onPress={onPress}
      disabled={state === 'disabled' || state === 'correct' || state === 'wrong'}
      accessibilityLabel={`Option ${letter}: ${label}`}
      style={[styles.opt, { backgroundColor: colors.bg, borderColor: colors.border }]}
    >
      <View style={[
        styles.bullet,
        { backgroundColor: colors.bullet, borderColor: state === 'idle' ? t.colors.line2 : colors.border },
      ]}>
        <Text style={[t.font.label, { color: colors.bulletText, fontFamily: t.font.family.bold }]}>
          {letter}
        </Text>
      </View>
      <Text style={[t.font.body, { color: t.colors.fg, flex: 1, fontFamily: t.font.family.medium }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  opt:    { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18, borderRadius: 16, borderWidth: 1 },
  bullet: { width: 24, height: 24, borderRadius: 999, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5 },
});
