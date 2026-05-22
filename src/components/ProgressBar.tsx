import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated';
import { useTheme } from '@/theme/useTheme';

type Props = { value: number; tone?: 'accent' | 'caramel' };

export default function ProgressBar({ value, tone = 'accent' }: Props) {
  const t = useTheme();
  const clamped = Math.max(0, Math.min(1, value));
  const progress = useSharedValue(clamped);

  React.useEffect(() => {
    progress.value = withTiming(Math.max(0, Math.min(1, value)), {
      duration: t.motion.slow,
      easing: Easing.bezier(
        t.motion.easing.x1,
        t.motion.easing.y1,
        t.motion.easing.x2,
        t.motion.easing.y2,
      ),
    });
  }, [value]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const fillColor = tone === 'caramel' ? t.colors.caramel : t.colors.accent;

  return (
    <View style={[styles.track, { backgroundColor: t.colors.line }]}>
      <Animated.View style={[styles.fill, fillStyle, { backgroundColor: fillColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 4, borderRadius: 100, overflow: 'hidden', width: '100%' },
  fill:  { height: 4, borderRadius: 100 },
});
