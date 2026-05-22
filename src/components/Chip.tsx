import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';

type Tone = 'neutral' | 'accent' | 'caramel';
type Props = { tone?: Tone; leftIcon?: React.ReactNode; children: React.ReactNode };

export default function Chip({ tone = 'neutral', leftIcon, children }: Props) {
  const t = useTheme();

  const palette = {
    neutral: { bg: t.colors.surface,                  text: t.colors.fgDim,    border: t.colors.line },
    accent:  { bg: 'rgba(110,199,169,0.12)',           text: t.colors.accent,   border: 'rgba(110,199,169,0.25)' },
    caramel: { bg: 'rgba(217,165,94,0.12)',            text: t.colors.caramel2, border: 'rgba(217,165,94,0.25)' },
  }[tone];

  return (
    <View style={[styles.chip, { backgroundColor: palette.bg, borderColor: palette.border }]}>
      {leftIcon}
      <Text style={[t.font.meta, { color: palette.text, fontFamily: t.font.family.semibold }]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 28, paddingHorizontal: 12, borderRadius: 999,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1,
  },
});
