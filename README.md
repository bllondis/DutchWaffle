# Wafel – learn Dutch phrase by phrase

A mobile app for adults learning Dutch at **B1–B2 level**: the stage where textbooks run out and you need the phrases people actually use at work, with neighbours and in conversations.

**[Live web demo](https://bllondis.github.io/DutchWaffle/)** · Expo / React Native · iOS, Android, Web

<!-- TODO: add 2–3 screenshots or a short GIF here: lesson intro → flashcard → quiz -->
<!--
<p align="center">
  <img src="docs/screens/lesson-intro.png" width="240" alt="Lesson intro" />
  <img src="docs/screens/flashcard.png" width="240" alt="Flashcard" />
  <img src="docs/screens/quiz.png" width="240" alt="Quiz" />
</p>
-->

> Status: in development. Lessons are seeded locally; a backend is planned.

---

## The idea

Most language apps stop at vocabulary. At B1 the real gap is different: knowing how to *hedge*, *disagree politely* or *nuance an opinion*. Wafel teaches short, themed lessons (around 9 minutes each) built from real phrases, each with:

- the Dutch phrase, IPA pronunciation and English meaning
- a usage note explaining *when* to use it
- an example sentence in context

## Lesson flow

1. **Lesson intro** – theme, level, time and number of new phrases
2. **Flashcards** – flip cards; mark each phrase as *known* or *hard*
3. **Quiz** – questions built from the lesson's phrases
4. **Complete** – score and progress

## Design

The UI runs on a single token file (`src/theme/tokens.ts`), read through a `useTheme()` hook. No colours, spacing or fonts are hardcoded in components.

- **Light and dark themes** with matching semantic tokens (`bg`, `surface`, `fg`, `accent`, `ok`, `bad`)
- **Palette** – deep green for focus and correct answers, caramel as a warm "stroopwafel" accent
- **Type** – Urbanist, with named text styles (`display`, `phrase`, …)
- **Spacing and radius scales** defined once and reused everywhere
- Shared components: `Button`, `Chip`, `TextField`, `ProgressBar`, `Skeleton`, `FlipCard`, `QuizOption`

## Tech

- **Expo** + **Expo Router** (file-based routing, typed routes)
- **React Native** + **react-native-web** – one codebase for iOS, Android and web
- **TypeScript**
- **TanStack Query** for data loading, **Zustand** for lesson state
- **Reanimated** + **Gesture Handler** for the flip-card interaction, **expo-haptics** for feedback
- **GitHub Actions** – every push to `main` builds the web version and deploys it to GitHub Pages

```
src/
  app/            screens (Expo Router): index, lesson-intro, flashcard, quiz, complete
  features/lesson api, hooks and components for the lesson flow
  components/     shared UI components
  theme/          design tokens + ThemeProvider
  data/           types and seeded lesson content
```

## How it was built

I designed the product and built it with AI coding tools (Claude Code and others). I set the structure, the design tokens and the rules the code has to follow (see `AGENTS.md`), then reviewed and refined what the AI produced. The aim of the project is to show how a designer can take an idea all the way to a working, deployed app.

## Run locally

```bash
npm install
npx expo start
```

Then open it in Expo Go, an iOS simulator, an Android emulator, or press `w` for the web version.

## Roadmap

- [ ] Audio playback for every phrase
- [ ] More themes and levels (B1, B1+, B2)
- [ ] Backend and saved progress across devices
- [ ] Spaced repetition for phrases marked *hard*

---

Designed and built by [Tetiana Dovgalenko](https://bllondis.github.io/portfolio-site/) – Product Designer & AI Design Engineer, The Hague.
