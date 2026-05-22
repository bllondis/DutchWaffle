import React from 'react';
import { Pressable, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/theme/useTheme';

type Variant = 'primary' | 'ghost' | 'destructive';
type Size    = 'sm' | 'md' | 'lg';

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  accessibilityLabel?: string;
  onPress: () => void;
};

const HEIGHTS: Record<Size, number> = { sm: 36, md: 44, lg: 52 };
const PAD_X:   Record<Size, number> = { sm: 14, md: 18, lg: 22 };

export default function Button({
  children, variant = 'primary', size = 'md',
  leftIcon, rightIcon, loading, disabled, block,
  accessibilityLabel, onPress,
}: Props) {
  const t = useTheme();

  const bgColor =
    variant === 'primary'     ? t.colors.accent :
    variant === 'destructive' ? t.colors.bad :
                                'transparent';

  const textColor =
    variant === 'primary'     ? t.colors.accentInk :
    variant === 'destructive' ? '#fff' :
                                t.colors.fgDim;

  const borderColor = variant === 'ghost' ? t.colors.line2 : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel ?? (typeof children === 'string' ? children : undefined)}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        {
          height: HEIGHTS[size],
          paddingHorizontal: PAD_X[size],
          backgroundColor: bgColor,
          borderColor,
          borderWidth: variant === 'ghost' ? 1 : 0,
          opacity: disabled ? 0.45 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
          alignSelf: block ? 'stretch' : 'flex-start',
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.row}>
          {leftIcon}
          <Text style={[t.font.label, { color: textColor, fontFamily: t.font.family.semibold }]}>
            {children}
          </Text>
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  row:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
