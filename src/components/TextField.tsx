import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@/theme/useTheme';

type Props = TextInputProps & { label?: string; hint?: string; error?: string };

export default function TextField({ label, hint, error, ...rest }: Props) {
  const t = useTheme();
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={{ gap: 6 }}>
      {label && (
        <Text style={[t.font.eyebrow, { color: error ? t.colors.bad : t.colors.fgMute }]}>
          {label}
        </Text>
      )}
      <TextInput
        {...rest}
        onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
        onBlur={(e)  => { setFocused(false); rest.onBlur?.(e); }}
        placeholderTextColor={t.colors.fgMute}
        style={[
          styles.input,
          {
            backgroundColor: t.colors.surface2,
            borderColor: error ? t.colors.bad : focused ? t.colors.accent : t.colors.line,
            color: t.colors.fg,
            fontFamily: t.font.family.regular,
            fontSize: 15,
          },
          rest.style,
        ]}
      />
      {(error ?? hint) ? (
        <Text style={[t.font.meta, { color: error ? t.colors.bad : t.colors.fgMute }]}>
          {error ?? hint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: { height: 52, borderRadius: 12, paddingHorizontal: 16, borderWidth: 1 },
});
