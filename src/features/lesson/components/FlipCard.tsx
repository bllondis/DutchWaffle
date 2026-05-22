import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing,
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

  const frontAnimStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${rot.value}deg` }],
  }));

  const backAnimStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${rot.value + 180}deg` }],
  }));

  const faceBase: ViewStyle = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: t.radius.xl,
    backfaceVisibility: 'hidden',
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
