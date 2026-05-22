/**
 * Wafel design tokens — single source of truth.
 * Read via useTheme(). Never hardcode colors, spacing, or fonts elsewhere.
 */

export const darkColors = {
  bg:         '#0B0F0E',
  bg2:        '#11181A',
  surface:    '#17201F',
  surface2:   '#1F2A28',
  line:       'rgba(255,255,255,0.07)',
  line2:      'rgba(255,255,255,0.12)',

  fg:         '#F4F6F3',
  fgDim:      'rgba(244,246,243,0.62)',
  fgMute:     'rgba(244,246,243,0.38)',

  accent:     '#6EC7A9',
  accent2:    '#A7E3CB',
  accentInk:  '#0B2F24',

  caramel:    '#D9A55E',
  caramel2:   '#F0C37C',
  caramelInk: '#2A1A07',

  ok:         '#6EC7A9',
  bad:        '#E58E7C',
} as const;

export const lightColors = {
  bg:         '#F5F3EC',
  bg2:        '#FAF8F2',
  surface:    '#FFFFFF',
  surface2:   '#F5F3EC',
  line:       'rgba(15,25,22,0.08)',
  line2:      'rgba(15,25,22,0.16)',

  fg:         '#121816',
  fgDim:      'rgba(18,24,22,0.62)',
  fgMute:     'rgba(18,24,22,0.42)',

  accent:     '#1F7A63',
  accent2:    '#2E8B6F',
  accentInk:  '#FFFFFF',

  caramel:    '#B57A28',
  caramel2:   '#D9A55E',
  caramelInk: '#2A1A07',

  ok:         '#1F7A63',
  bad:        '#C55A47',
} as const;

export const spacing = {
  _1: 2, _2: 4, _3: 8, _4: 12, _5: 16, _6: 24, _7: 32, _8: 48, _9: 64,
} as const;

export const radius = {
  sm: 10, md: 16, lg: 22, xl: 28, full: 999,
} as const;

export const font = {
  family: {
    regular:  'Urbanist-Regular',
    medium:   'Urbanist-Medium',
    semibold: 'Urbanist-SemiBold',
    bold:     'Urbanist-Bold',
  },
  display:  { fontSize: 44, fontFamily: 'Urbanist-SemiBold', letterSpacing: -1.1,  lineHeight: 45 },
  phrase:   { fontSize: 32, fontFamily: 'Urbanist-SemiBold', letterSpacing: -0.64, lineHeight: 35 },
  title:    { fontSize: 22, fontFamily: 'Urbanist-SemiBold', letterSpacing: -0.22, lineHeight: 26 },
  body:     { fontSize: 15, fontFamily: 'Urbanist-Regular',  lineHeight: 22 },
  label:    { fontSize: 13, fontFamily: 'Urbanist-Medium',   lineHeight: 18 },
  eyebrow:  { fontSize: 11, fontFamily: 'Urbanist-SemiBold', letterSpacing: 1.54, lineHeight: 14, textTransform: 'uppercase' as const },
  meta:     { fontSize: 12, fontFamily: 'Urbanist-Medium',   lineHeight: 16 },
} as const;

export const motion = {
  fast: 150,
  base: 200,
  slow: 340,
  flip: 700,
  easing: { x1: 0.4, y1: 0, x2: 0.2, y2: 1 },
} as const;

export const shadow = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 },  shadowOpacity: 0.30, shadowRadius: 3,  elevation: 2  },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 },  shadowOpacity: 0.35, shadowRadius: 24, elevation: 6  },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.45, shadowRadius: 40, elevation: 12 },
} as const;

export type ColorScheme = 'dark' | 'light';
export type Colors = { [K in keyof typeof darkColors]: string };
export type Tokens = {
  colors:  Colors;
  spacing: typeof spacing;
  radius:  typeof radius;
  font:    typeof font;
  motion:  typeof motion;
  shadow:  typeof shadow;
  scheme:  ColorScheme;
};

export function buildTokens(scheme: ColorScheme): Tokens {
  return {
    colors: scheme === 'dark' ? darkColors : lightColors,
    spacing,
    radius,
    font,
    motion,
    shadow,
    scheme,
  };
}
