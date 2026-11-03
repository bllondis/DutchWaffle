# DutchWaffle – Developer Handoff Bundle

> **Note:** this is the original design handoff, written in Claude Design before development. It specifies Expo SDK 51 with React Navigation; the app in this repo has since moved to a newer Expo SDK with Expo Router (file-based routing). Screens, components, tokens and flows follow this spec. The visual handoff page is at [`docs/design/Handoff.html`](../design/Handoff.html).

> **Dutch B1→B2 phrase-learning app.** React Native + Expo SDK 51. Dark, minimal, Scandinavian. Flip-flashcards + MC quizzes.

This bundle is everything a developer (human or Claude Code) needs to build DutchWaffle v1.0.

---

## 📚 Documents in this bundle

| File | Purpose |
|------|---------|
| [`HANDOFF.md`](./HANDOFF.md) | **You are here.** Overview + index. |
| [`README.md`](../../README.md) | Getting started – install, run, build. |
| [`CLAUDE.md`](../../CLAUDE.md) | Pair-programming rules for Claude Code. |
| [`SCREENS.md`](./SCREENS.md) | Every screen: structure, layout, content. |
| [`NAVIGATION.md`](./NAVIGATION.md) | Nav map, route params, deep links, transitions. |
| [`COMPONENTS.md`](./COMPONENTS.md) | Component catalog with props & states. |
| [`TOKENS.md`](./TOKENS.md) | Design tokens reference (mirrors `tokens.ts`). |
| [`API.md`](./API.md) | API contract + mock data strategy. |
| [`FLOWS.md`](./FLOWS.md) | User flows step-by-step. |
| [`ACCEPTANCE.md`](./ACCEPTANCE.md) | Acceptance criteria – one checklist per screen. |
| [`EXPO.md`](./EXPO.md) | Expo-specific recommendations. |

---

## 🎯 v1.0 scope (MVP)

**Five screens:**

1. `Home` – Continue card, level picker, themes
2. `LessonIntro` – Theme card with metadata + phrase preview
3. `Flashcard` – 3D-flip cards (NL → EN) with audio
4. `Quiz` – Multiple choice (4 options) with feedback
5. `Complete` – Stats + phrase recap

**Out of scope for v1.0** (described for context only): Auth flow, Profile, Settings, Onboarding, Streak history. Stub navigation, but skip implementation.

---

## ⚙️ Stack

- **Runtime:** Expo SDK 51 (managed) · React Native 0.74
- **Language:** TypeScript 5.4 (strict, `noUncheckedIndexedAccess`)
- **Navigation:** `@react-navigation/native-stack`
- **State:** Zustand (UI) · TanStack Query (server data)
- **Animations:** `react-native-reanimated` v3
- **Persistence:** `react-native-mmkv`
- **Audio:** `expo-av` with file-system cache
- **Haptics:** `expo-haptics`
- **Fonts:** `expo-font` (Urbanist)
- **Analytics:** PostHog RN (stub provided)
- **Crash:** Sentry (TBD)

---

## 🏗 Architecture

```
src/
├── theme/        ← Tokens + ThemeProvider. NEVER hardcode colors/spacing.
├── components/   ← Atomic primitives (Button, Chip, …). No business logic.
├── features/     ← Domain folders (home, lesson, auth, …). Self-contained.
│   └── <name>/
│       ├── *Screen.tsx       – Top-level screens
│       ├── components/       – Feature-local UI
│       ├── hooks/            – Feature-local state/data hooks
│       ├── api/              – Feature-local API calls
│       └── types.ts
├── navigation/   ← RootStack, TabNavigator, deep linking.
├── data/         ← Seed content + global types.
├── shared/       ← Cross-feature utils only (analytics, storage, audio).
└── i18n/         ← NL (primary) + EN (fallback).
```

**Rules:**
- Features import from `@/shared`, `@/components`, `@/theme` – **never feature → feature.**
- One default export per file, named after the file.
- All styling via `useTheme()` + `StyleSheet.create`. No inline literals.

---

## 🚀 Quick start

```bash
cd wafel-app
pnpm install
pnpm start          # Expo dev server
# Then press i (iOS) or a (Android)
```

Fonts (Urbanist .ttf) need to be placed in `assets/fonts/` – download from Google Fonts.

---

## 🧪 Quality bar

- TypeScript `tsc --noEmit` passes (strict).
- ESLint clean (config provided).
- Jest unit tests on hooks + reducers.
- Maestro e2e for the full Home → Complete flow.
- 60fps on iPhone 12 / Pixel 6.
- Cold start ≤ 1.2s.

---

## 📞 Open questions for product

Before writing code, confirm with PM:

1. **Audio source** – Are MP3 files available on a CDN, or do we generate via TTS server-side?
2. **Auth provider** – Email/Pass, OAuth (Apple/Google), or magic link?
3. **Streak rules** – UTC midnight? User-local? Grace period for missed days?
4. **Push notifications** – Daily reminder time configurable?
5. **Onboarding** – One-time, or skippable? Level test or self-select?
