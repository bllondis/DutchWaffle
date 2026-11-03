# Component Catalog

Three tiers: **atoms** → **molecules** → **organisms**. Each tier composes the one below. Atoms are in `src/components/`; feature-specific molecules/organisms live inside features.

## Atoms (in `src/components/`)

### Button

```ts
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'destructive';  // default 'primary'
  size?: 'sm' | 'md' | 'lg';                       // default 'md'
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;                                  // full width
  accessibilityLabel?: string;
  onPress: () => void;
};
```

| Size | Height | Padding-X | Font  | Icon size |
|------|--------|-----------|-------|-----------|
| sm   | 36     | 14        | 13/600 | 14        |
| md   | 44     | 18        | 14/600 | 16        |
| lg   | 52     | 22        | 15/600 | 18        |

States: idle / hover / pressed (`transform: scale(0.98)`) / disabled (`opacity 0.45`) / loading (`<ActivityIndicator>`).

---

### IconButton

```ts
type IconButtonProps = {
  icon: React.ReactNode;
  variant?: 'neutral' | 'accent';   // default 'neutral'
  size?: 32 | 40 | 48;              // default 40
  accessibilityLabel: string;       // required
  onPress: () => void;
};
```

---

### Chip

```ts
type ChipProps = {
  tone?: 'neutral' | 'accent' | 'caramel';
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
};
```

Height 28 dp, radius full, border 1 dp.

---

### ProgressBar

```ts
type ProgressBarProps = {
  value: number;                     // 0..1
  tone?: 'accent' | 'caramel';       // default 'accent'
};
```

Animated with `react-native-reanimated`. 300ms cubic-bezier. Track height 4 dp.

---

### TextField

```ts
type TextFieldProps = TextInputProps & {
  label?: string;
  hint?: string;
  error?: string;
};
```

Height 52 dp, radius 12 dp. Focus ring: 3 dp `rgba(110,199,169,0.2)` halo. Error border: `bad`.

---

### Skeleton

```ts
type SkeletonProps = {
  width?: number | string;
  height?: number;
  radius?: number;
  style?: ViewStyle;
};
```

Pulsing opacity 0.6 → 1.0 via Reanimated `withRepeat`.

---

### Stroopwafel

```ts
type StroopwafelProps = {
  size?: number;                           // default 48
  mood?: 'neutral' | 'happy' | 'focus';    // default 'neutral'
};
```

Pure SVG, no animation by default. (Add `animate?: boolean` if intro bob is needed.)

---

## Molecules (feature-local)

### LessonHeader (`features/lesson/components/LessonHeader.tsx`)

```ts
type LessonHeaderProps = {
  progress: number;                  // 0..1
  counter?: { current: number; total: number };
  streak?: number;
  onClose: () => void;
};
```

Composes: IconButton (×) + ProgressBar + counter text + optional streak Chip.

---

### LevelRow (`features/home/LevelRow.tsx`)

```ts
type LevelRowProps = {
  level: Level;
  progress: { completed: number; total: number };
  active: boolean;                   // current user level
  onPress: () => void;
};
```

Composes: code badge (44×44) + name/tagline + ProgressBar + counter.

---

### QuizOption (`features/lesson/components/QuizOption.tsx`)

```ts
type QuizOptionProps = {
  letter: 'A' | 'B' | 'C' | 'D';
  label: string;
  state: 'idle' | 'selected' | 'correct' | 'wrong' | 'disabled';
  onPress: () => void;
};
```

---

### StatTile (`features/lesson/components/StatTile.tsx`)

```ts
type StatTileProps = {
  value: string | number;
  label: string;
  tone?: 'neutral' | 'accent' | 'caramel';
  icon?: React.ReactNode;
};
```

---

## Organisms

### FlipCard (`features/lesson/components/FlipCard.tsx`)

```ts
type FlipCardProps = {
  flipped: boolean;          // controlled
  onPress: () => void;
  front: React.ReactNode;
  back: React.ReactNode;
  style?: ViewStyle;
};
```

3D `rotateY` via Reanimated worklet. 700ms cubic-bezier. `backfaceVisibility: 'hidden'` on both faces.

**Reduce Motion:** when accessibility setting on, instant switch (no rotateY).

---

### TabBar (`navigation/TabBar.tsx`)

```ts
type TabBarProps = {
  active: 'home' | 'learn' | 'goal' | 'me';
  badges?: Partial<Record<RouteName, number>>;
};
```

Auto-hides on `Flashcard`/`Quiz`/`Complete` (lesson flow).
