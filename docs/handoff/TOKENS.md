# Design Tokens

All tokens live in [`src/theme/tokens.ts`](../../src/theme/tokens.ts). Read them via `useTheme()`:

```tsx
import { useTheme } from '@/theme/useTheme';

function MyComponent() {
  const t = useTheme();
  return <View style={{ backgroundColor: t.colors.bg, padding: t.spacing._6 }} />;
}
```

## Colors

### Dark (default)

| Token | Hex / rgba | Use |
|-------|------------|-----|
| `bg`        | #0B0F0E | App background |
| `bg2`       | #11181A | Section background, code blocks |
| `surface`   | #17201F | Cards, list items |
| `surface2`  | #1F2A28 | Flashcard, input bg, elevated cards |
| `line`      | rgba(255,255,255,0.07) | Subtle dividers |
| `line2`     | rgba(255,255,255,0.12) | Borders, accents |
| `fg`        | #F4F6F3 | Primary text |
| `fgDim`     | 62% `fg` | Body text, secondary |
| `fgMute`    | 38% `fg` | Captions, meta |
| `accent`    | #6EC7A9 | Primary brand (teal) |
| `accent2`   | #A7E3CB | Highlights |
| `accentInk` | #0B2F24 | Text on `accent` BG |
| `caramel`   | #D9A55E | Streak, mascot warmth |
| `caramel2`  | #F0C37C | Caramel highlights |
| `caramelInk`| #2A1A07 | Text on caramel |
| `ok`        | #6EC7A9 | Quiz correct |
| `bad`       | #E58E7C | Quiz wrong, error states |

### Light (v1.1)

Same shape, different palette. See `src/theme/tokens.ts`. UI toggle not in v1.0.

## Typography

| Role | Size | Family | Letter-spacing | Line-height |
|------|------|--------|----------------|-------------|
| display | 44 | Urbanist-SemiBold | -1.10 | 45 |
| phrase  | 32 | Urbanist-SemiBold | -0.64 | 35 |
| title   | 22 | Urbanist-SemiBold | -0.22 | 26 |
| body    | 15 | Urbanist-Regular  | 0     | 22 |
| label   | 13 | Urbanist-Medium   | 0     | 18 |
| eyebrow | 11 | Urbanist-SemiBold | +1.54 | 14 (uppercase) |
| meta    | 12 | Urbanist-Medium   | 0     | 16 |

Numbers: always `fontVariant: ['tabular-nums']` for progress counters, IPA-adjacent numerals, stat tiles.

## Spacing (8pt grid)

```ts
_1: 2,  _2: 4,  _3: 8,  _4: 12,  _5: 16,  _6: 24,  _7: 32,  _8: 48,  _9: 64
```

Rule of thumb: use `_5` (16) for default card padding, `_6` (24) for screen padding.

## Radius

| Token | Value | Use |
|-------|-------|-----|
| sm    | 10 | Small buttons, badges |
| md    | 16 | Card options, MC quiz |
| lg    | 22 | Primary cards (continue, level) |
| xl    | 28 | Flashcard, hero |
| full  | 999 | Pills, primary/ghost buttons, chips |

## Shadows

| Token | iOS | Android elevation |
|-------|-----|-------------------|
| sm | `{ offset: 0,1; opacity: 0.30; radius: 3 }` | 2 |
| md | `{ offset: 0,8; opacity: 0.35; radius: 24 }` | 6 |
| lg | `{ offset: 0,20; opacity: 0.45; radius: 40 }` | 12 |

## Motion

| Token | Value | Use |
|-------|-------|-----|
| fast  | 150ms | Press, hover, focus |
| base  | 200ms | Color, opacity |
| slow  | 340ms | Screen transitions |
| flip  | 700ms | Flashcard rotateY |

Easing: `Easing.bezier(0.4, 0, 0.2, 1)` everywhere.

## Hit areas

Min touch target: **44×44 dp**. Use `hitSlop` on small icons to expand. Never bypass.
