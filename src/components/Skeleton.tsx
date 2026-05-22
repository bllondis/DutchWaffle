import React from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/theme/useTheme';

type Props = { width?: number | `${number}%`; height?: number; radius?: number; style?: ViewStyle };

export default function Skeleton({ width = '100%', height = 14, radius = 6, style }: Props) {
  const t = useTheme();
  const opacity = useSharedValue(0.6);

  React.useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: radius, backgroundColor: t.colors.surface2 },
        animStyle,
        style,
      ]}
    />
  );
}
