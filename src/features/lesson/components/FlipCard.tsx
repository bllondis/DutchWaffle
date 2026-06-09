import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate, Extrapolation,
} from 'react-native-reanimated';
import { useTheme } from '@/theme/useTheme';

type Props = {
  flipped:  boolean;
  onPress:  () => void;
  front:    React.ReactNode;
  back:     React.ReactNode;
  style?:   ViewStyle;
};

export default function FlipCard({ flipped, onPress, front, back, style }: Props) {
  const t   = useTheme();
  const rot = useSharedValue(flipped ? 180 : 0);

  React.useEffect(() => {
    rot.value = withTiming(flipped ? 180 : 0, {
      duration: t.motion.flip,
      easing: Easing.bezier(
        t.motion.easing.x1,
        t.motion.easing.y1,
        t.motion.easing.x2,
        t.motion.easing.y2,
      ),
    });
  }, [flipped]);

  // Cross-platform flip: opacity switches at 90° so neither face bleeds through.
  // This replaces relying on backfaceVisibility (unreliable on web / Android).
  const frontAnimStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${rot.value}deg` }],
    opacity: interpolate(rot.value, [89, 90], [1, 0], Extrapolation.CLAMP),
  }));

  const backAnimStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${rot.value + 180}deg` }],
    opacity: interpolate(rot.value, [89, 90], [0, 1], Extrapolation.CLAMP),
  }));

  const faceBase: ViewStyle = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: t.radius.xl,
    padding: t.spacing._6,
    justifyContent: 'space-between',
  };

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel="Flashcard. Tap to reveal translation."
      accessibilityRole="button"
      style={[styles.wrap, style]}
    >
      <Animated.View
        style={[
          faceBase,
          { backgroundColor: t.colors.surface2, borderWidth: 1, borderColor: t.colors.line },
          frontAnimStyle,
        ]}
      >
        {front}
      </Animated.View>
      <Animated.View
        style={[
          faceBase,
          { backgroundColor: t.colors.surface, borderWidth: 1, borderColor: t.colors.line },
          backAnimStyle,
        ]}
      >
        {back}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', aspectRatio: 3 / 4 },
});
