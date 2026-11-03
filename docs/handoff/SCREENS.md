# Screens

Every screen documented in the same order it appears in the user flow. Each has: **purpose**, **route**, **data dependencies**, **layout**, **interactions**, **edge cases**.

For acceptance criteria, see [`ACCEPTANCE.md`](./ACCEPTANCE.md).

---

## SCR-01 · Home

**Route:** `Home` (root)
**File:** `src/features/home/HomeScreen.tsx`

**Purpose**
Landing screen after splash. Resume current lesson at a glance, pick a level, browse themes.

**Data**
- `GET /me` → `{ name, currentLevel, streakDays }`
- `GET /lessons/current` → in-progress lesson with `{ id, title, progress }`
- `GET /levels` → list of 3 levels with progress
- `GET /themes` → 6 themes

**Layout (top → bottom)**
1. Header strip: Stroopwafel avatar · "Goedemorgen, Sander" · streak chip (caramel) · bell icon
2. Continue card (accent gradient): eyebrow "VERDER GAAN" → lesson title → progress bar → time/level meta → CTA chevron
3. Section "Jouw niveau" – 3 `LevelRow` (B1, B1+, B2)
4. Section "Thema's" – 2×2 grid of `ThemeCard`
5. Tab bar (Home / Leren / Doel / Mij)

**Interactions**
- Tap Continue card → `navigate('LessonIntro', { lessonId })`
- Tap LevelRow → filter lessons by level (v1.1 – for now: navigate to first lesson of level)
- Tap ThemeCard → list of lessons in theme (v1.1 stub)
- Tap bell → notifications modal (v1.1 stub)

**States**
- Loading: shimmer skeletons matching layout
- Empty (new user): no Continue card; show "Kies een niveau om te starten"
- Error: inline banner top + cached lessons still shown

---

## SCR-02 · Lesson Intro

**Route:** `LessonIntro` with param `{ lessonId: string }`
**File:** `src/features/lesson/LessonIntroScreen.tsx`

**Purpose**
Frame a lesson before commitment. Show theme, scope, estimated time, list of phrases the user will learn.

**Data**
- `GET /lessons/:id` → full `Lesson` (see `docs/API.md`)

**Layout**
1. Header row: Back button (×) · "Les 3 van 8" eyebrow · Bookmark icon
2. Hero card (gradient):
   - Chip row: level + theme
   - Eyebrow "Thema · Je mening geven"
   - Big title (display 32 px)
   - Subtitle (body)
   - Stroopwafel mascot (top-right corner, focus mood, optional)
   - Metadata strip: time · phrases · new words (separated by 1px divider)
3. Section "Wat ga je leren" – list of first 4 phrases, "+N meer" link
4. CTA bar (sticky bottom): "Begin de les" → primary button

**Interactions**
- Back → `navigation.goBack()` (no confirm – no progress yet)
- Bookmark → toggle saved state (v1.1)
- CTA → `navigation.replace('Flashcard', { lessonId })`

**States**
- Loading: skeleton for hero card and list
- Error (lesson not found): fullscreen `<EmptyState>` with "Probeer opnieuw"

---

## SCR-03 · Flashcard (study)

**Route:** `Flashcard` with param `{ lessonId: string }`
**File:** `src/features/lesson/FlashcardScreen.tsx`

**Purpose**
Core learning surface. Show 8 phrases as flip cards. User taps to reveal translation, marks as known/hard.

**Data**
- `useLesson(lessonId)` (cached)
- Audio URL per phrase, lazy-loaded via `shared/audio.ts`

**Layout**
1. Header: × · ProgressBar · counter (e.g., "3/8")
2. `FlipCard` (3:4 aspect ratio, padded `spacing._6`)
   - **Front:** chip "NL" · speaker icon top-right · phrase (display) · IPA (mono) · "Tik om te draaien"
   - **Back:** chip "EN" · counter · eyebrow "Betekenis" · EN text · note · example block · "Tik om terug"
3. Action bar (sticky bottom): "Lastig" (ghost, flex 1) + "Ken ik" (primary, flex 1.4)

**Interactions**
- Tap card → flip (700ms rotateY, Reanimated worklet)
- Tap speaker icon → `audio.play()` with 200ms pulse animation
- "Lastig" → mark phrase as 'hard'; requeue after 3 cards
- "Ken ik" → mark as 'known'; `idx++`
- Last card + "Ken ik" → `navigation.replace('Quiz', { lessonId })`
- × → confirm dialog "Stop met de les?" if any marks logged

**States**
- Loading: spinner over card area
- Audio error: silent (no toast), text still works
- Last card: button label becomes "Quiz starten"

---

## SCR-04 · Quiz

**Route:** `Quiz` with param `{ lessonId: string }`
**File:** `src/features/lesson/QuizScreen.tsx`

**Purpose**
Active recall. Show NL phrase → user picks correct EN translation from 4 options.

**Data**
- `useLesson(lessonId)` (cached)
- Distractors generated client-side from other phrases in lesson (deterministic seed by phrase ID)

**Layout**
1. Header: × · ProgressBar · streak chip (caramel) – keeps user feeling momentum
2. Eyebrow "Vraag 5 / 8" (caramel-2)
3. Title "Wat betekent deze uitdrukking?"
4. Prompt card: phrase (title) · IPA (mono) · speaker icon
5. Stroopwafel small mascot (focus mood) inline with prompt (optional)
6. 4 `<QuizOption>` rows (idle / selected / correct / wrong)
7. Feedback card appears after submit: eyebrow "Goed zo!" / "Bijna!" + explanation
8. CTA: "Controleren" → "Volgende"

**Interactions**
- Tap option → state 'selected'; enable CTA
- "Controleren" → reveal correct/wrong with haptic (Success / Error)
- Wrong answer → shake animation (translateX ±4, 240ms)
- "Volgende" → next question or → `navigation.replace('Complete', { lessonId })`

**States**
- Idle (no pick): CTA disabled, opacity 0.45
- Submit-loading: spinner replaces CTA text
- Network error during submit: queue locally (MMKV), continue UI

---

## SCR-05 · Voltooid (Lesson Complete)

**Route:** `Complete` with param `{ lessonId: string }`
**File:** `src/features/lesson/CompleteScreen.tsx`

**Purpose**
Reward completion. Show stats. Encourage continuation.

**Data**
- From local Zustand store: `{ score, knownIds, hardIds }`

**Layout**
1. Header: × (only, right-aligned)
2. Hero: Stroopwafel (large, happy) with sparkle accents · eyebrow "LES VOLTOOID" · display "Lekker bezig, Sander!"
3. Body text confirming theme learned
4. 3 stat tiles (grid): Phrases · Score % · Streak (with flame icon)
5. Section "Vandaag geleerd" – list of phrases with check icons
6. CTA bar: "Klaar" (ghost) + "Volgende les" (primary)

**Interactions**
- "Klaar" → `navigation.popToTop()` (back to Home)
- "Volgende les" → `navigation.replace('LessonIntro', { lessonId: nextLessonId })`
- × → same as "Klaar"

**States**
- Always success. No empty/error states (we always reach this from a completed quiz).
- If user revisits via deep link without state → reload from server, show recap of last attempt.

---

## System screens (v1.1 – stub navigation, skip impl)

| ID | Route | Description |
|----|-------|-------------|
| SCR-00 | `/splash` | Logo + font preload. ≤ 1.2s. |
| SCR-A1 | `/onboarding` | 3 slides: level, daily goal, notifications. |
| SCR-A2 | `/sign-in` | Email/Apple/Google. |
| SCR-06 | `/profile` | Streak history, all phrases, settings entry. |
| SCR-07 | `/settings` | Theme, reminders, language reverse, delete data. |
