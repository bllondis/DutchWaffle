# Acceptance Criteria

Definition of done for each screen. Reviewer (PM or QA) walks through this checklist before approving.

> **Format:** ✅ = required for v1.0 · ⬜ = nice-to-have (v1.1)

---

## SCR-01 · Home

**Layout & content**
- ✅ Status bar dark icons on dark background
- ✅ Header shows mascot (32px) + "Goedemorgen" + user first name
- ✅ Streak chip visible in header (caramel tone) with flame icon + number
- ✅ Continue card uses accent gradient
- ✅ Progress bar in Continue card animates to value on mount (no jump)
- ✅ 3 level rows render in order: B1, B1+, B2
- ✅ Active level (B1+ for seeded user) has accent-tinted background + border
- ✅ Tab bar pinned to bottom, 4 tabs visible

**Interactions**
- ✅ Tap Continue → navigates to LessonIntro of in-progress lesson
- ✅ Tap level row → (v1.1: filtered list) – v1.0: navigates to first lesson of that level
- ✅ Tab bar Home tab is highlighted (accent color)

**States**
- ✅ Initial mount: skeletons render until data ready
- ✅ Empty (no current lesson): Continue card replaced with onboarding hint
- ⬜ Offline banner top of screen when no network

**Accessibility**
- ✅ Continue card has `accessibilityLabel` describing lesson + progress %
- ✅ Streak chip has `accessibilityLabel` "12 day streak"
- ✅ All touch targets ≥ 44×44

---

## SCR-02 · LessonIntro

**Layout & content**
- ✅ Header: back button (×), eyebrow "Les N van M", bookmark icon
- ✅ Hero card uses gradient (dark teal → charcoal)
- ✅ Level chip (accent) + theme chip visible
- ✅ Title in display font (32px)
- ✅ Mascot (when enabled in settings) positioned top-right of hero
- ✅ Metadata strip: time · phrases count · new words count, separated by 1px line
- ✅ "Wat ga je leren" section lists first 4 phrases, then "+N meer" hint
- ✅ Primary CTA "Begin de les" fixed to bottom with safe-area padding

**Interactions**
- ✅ Tap back → `goBack()` (no confirm)
- ✅ Tap "Begin de les" → `replace('Flashcard', { lessonId })`
- ⬜ Tap bookmark icon → toggle saved (v1.1)

**States**
- ✅ Loading: hero + list skeletons
- ✅ Error (lesson not found): empty state with "Probeer opnieuw"

---

## SCR-03 · Flashcard (study)

**Layout & content**
- ✅ Header: × button (left), progress bar (middle), counter (right, mono font, tabular-nums)
- ✅ Card aspect ratio is 3:4
- ✅ Front face: NL chip + speaker icon top, phrase + IPA middle, "Tik om te draaien" bottom
- ✅ Back face: EN chip + counter top, "Betekenis" eyebrow + EN + note + example block middle, "Tik om terug" bottom
- ✅ Action bar bottom: "Lastig" (ghost, flex 1) + "Ken ik" (primary, flex 1.4)
- ✅ Last card: primary CTA label = "Quiz starten"

**Interactions**
- ✅ Tap card → 3D rotateY flip animation, 700ms, easing cubic-bezier(0.4,0,0.2,1)
- ✅ Tap speaker icon → audio plays (with pulse animation)
- ✅ Speaker audio fails silently (no error UI)
- ✅ "Ken ik" → next card OR navigates to Quiz on last card
- ✅ "Lastig" → next card; phrase requeued after 3 more cards
- ✅ × → confirm dialog if any marks logged; otherwise direct popToTop

**Animations**
- ✅ Flip is 60fps on iPhone 12, Pixel 6
- ✅ Reduce Motion: flip is instant (no rotateY)
- ✅ Card change uses slide-out-left + slide-in-right (Ken ik) or right/left (Lastig)

**Accessibility**
- ✅ Card announces "Dutch phrase: …. Tap to reveal English translation" on focus
- ✅ All buttons have explicit `accessibilityLabel`

---

## SCR-04 · Quiz

**Layout & content**
- ✅ Header: × · progress bar · streak chip (caramel)
- ✅ Eyebrow "Vraag N / 8" (caramel-2)
- ✅ Title "Wat betekent deze uitdrukking?"
- ✅ Prompt card with NL phrase + IPA + speaker icon
- ✅ 4 options, letters A-D, in distinct rows
- ✅ Bottom CTA "Controleren" (disabled until pick) → "Volgende" after check

**Interactions**
- ✅ Tap option → state 'selected' (accent border tint)
- ✅ "Controleren" → reveal:
  - Correct option: green border + check icon + Haptic.Success
  - User's wrong pick: red border + Haptic.Error + 240ms shake animation
- ✅ Other options dim slightly (opacity 0.7)
- ✅ Feedback card appears with explanation
- ✅ "Volgende" → next question OR replace('Complete', …) on last

**States**
- ✅ Idle (no pick): CTA disabled (opacity 0.45)
- ✅ Loading (submit): spinner replaces text in CTA
- ⬜ Hint button (v1.1) → reveals one wrong option as crossed out

---

## SCR-05 · Voltooid

**Layout & content**
- ✅ Header: × right-aligned (only chrome)
- ✅ Large mascot (104px, happy mood) with sparkle accents
- ✅ Eyebrow "LES VOLTOOID" (accent)
- ✅ Display title "Lekker bezig, {firstName}!"
- ✅ 3 stat tiles in grid: Phrases · Score% · Streak
- ✅ Stat tiles use respective tones: neutral / accent / caramel
- ✅ "Vandaag geleerd" list of phrases with check icons

**Interactions**
- ✅ "Klaar" or × → `popToTop()`
- ✅ "Volgende les" → `replace('LessonIntro', { lessonId: nextId })`
- ✅ Confetti/burst visual fires on mount (accent glow radial gradient)

**Side effects (on mount)**
- ✅ Streak +1 (if eligible – once per UTC day)
- ✅ Lesson marked complete in MMKV
- ✅ Analytics: `lesson_completed` event fired with score

---

## Global

- ✅ Status bar style `light` (white icons) throughout app
- ✅ Safe areas respected on all screens (`react-native-safe-area-context`)
- ✅ App handles background → foreground without crashing
- ✅ No console warnings in Expo dev tools
- ✅ TypeScript: `tsc --noEmit` passes with no errors
- ✅ Font `Urbanist` loaded before first render (splash holds)
- ✅ All Pressables have `accessibilityLabel`
- ✅ Touch targets ≥ 44×44 dp everywhere
- ✅ App renders correctly on iPhone SE (smallest target)
- ✅ App renders correctly on Pixel 6 (Android baseline)
- ⬜ Light mode toggle (v1.1)
- ⬜ Dynamic Type (iOS) up to 1.4× without breaking layout
