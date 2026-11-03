import React from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';

import { useTheme } from '@/theme/useTheme';

/** Width of the app column when the browser preview runs on a wide screen. */
const PHONE_WIDTH = 430;
/** Below this window width the app fills the screen, as on a phone. */
const WIDE_BREAKPOINT = 600;

/**
 * Wafel is a mobile app. In the browser preview on a desktop screen, keep it in a
 * phone-width column in the centre instead of stretching it across the window.
 * On iOS and Android it renders its children unchanged; in a narrow browser window
 * the column simply fills the screen.
 */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  const { width } = useWindowDimensions();
  // The page is pre-rendered without a real window, so the width is only trusted
  // after the first client render. Until then the column fills the screen.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  // The view tree stays the same at every width, so the pre-rendered page hydrates
  // cleanly; only the styles change once the real window width is known.
  const wide = mounted && width >= WIDE_BREAKPOINT;

  return (
    <View style={[styles.backdrop, { backgroundColor: wide ? t.colors.bg2 : t.colors.bg }]}>
      <View
        style={[
          styles.column,
          wide
            ? [styles.columnWide, { borderColor: t.colors.line2 }]
            : styles.columnFull,
          { backgroundColor: t.colors.bg },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
  },
  column: {
    flex: 1,
    overflow: 'hidden',
  },
  columnFull: {
    width: '100%',
  },
  columnWide: {
    width: PHONE_WIDTH,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
});
