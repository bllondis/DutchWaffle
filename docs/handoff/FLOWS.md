# User Flows

## Flow 1 – First-time user, no auth (v1.0 default)

Since v1.0 has no auth, every user starts at Home with seeded data.

```
1. App launch
   ↓
2. Splash (≤ 1.2s, fonts + MMKV hydrate)
   ↓
3. Home loads (seed content, fake user "Sander", streak 0)
   ↓
4. User taps Continue card (first lesson: 'mening-01')
   ↓
5. LessonIntro mounts
   ↓
6. User taps "Begin de les"
   ↓
7. Flashcard mounts (idx 0)
   ↓
8. User taps card → flip (700ms)
   ↓
9. User taps "Ken ik" → idx 1
   ↓
   (repeat 8 cycles)
   ↓
10. Last card "Ken ik" → Quiz mounts (idx 0)
    ↓
11. User picks answer → "Controleren" → feedback (haptic + color)
    ↓
12. User taps "Volgende" → idx 1
    ↓
    (repeat 8 questions)
    ↓
13. Last submit → Complete mounts
    ↓
14a. "Klaar" → popToTop() → Home (streak +1, lesson marked complete)
    OR
14b. "Volgende les" → replace LessonIntro with next lesson ID
```

**State transitions logged:**
- Step 6: `lesson_started` event
- Step 8: `card_flipped` event
- Step 9: `card_marked { mark: 'known' }` event
- Step 11: `quiz_answered { correct, ms_to_answer }` event
- Step 13: `lesson_completed { score, streak }` event

## Flow 2 – Returning user, mid-lesson

```
1. App launch → Splash → Home
2. Continue card shows last lesson at idx where user left off
3. Tap → LessonIntro → "Verder gaan" (button changes label) → Flashcard at saved idx
4. Continue normally
```

**MMKV keys consulted:**
- `progress.<lessonId>` → `{ idx, marks }`
- `streak.current`, `streak.lastDate`

## Flow 3 – Exit mid-lesson

```
1. User on Flashcard idx 3 (3 marks logged)
2. Tap × in header
3. ConfirmDialog appears: "Stop met de les?"
4. Tap "Stoppen"
5. State saved: progress.<lessonId> = { idx: 3, marks: {...} }
6. navigation.popToTop() → Home
7. Continue card now reflects: "Verder gaan – kaart 4/8"
```

If user taps "Annuleren": dialog dismisses, stay on Flashcard.

## Flow 4 – Wrong answer (quiz)

```
1. User picks option B (incorrect)
2. Tap "Controleren"
3. Reanimated triggers:
   - B → state 'wrong' (red border, red bullet, haptic Error)
   - Correct option → state 'correct' (green border, check icon, soft pulse)
   - Translation shake on B option (240ms)
4. Feedback card appears below: "Bijna! [phrase] betekent [translation]"
5. CTA changes to "Volgende"
6. User taps → next question
```

**No retry.** Wrong answers reduce score; user can review in Complete screen.

## Flow 5 – Offline first launch

```
1. User installs app, no internet
2. Splash → Home loads seeded content (works fine)
3. Streak chip shows 0 (no server sync)
4. All lessons playable
5. Progress saved to MMKV
6. On next online launch:
   - Replay queued POST /lessons/:id/progress mutations
   - GET /streak to sync server-side count
```

## Flow 6 – Audio fails

```
1. User on Flashcard
2. Taps speaker icon
3. expo-av throws (corrupt cache or 404)
4. Silent failure – no toast
5. Icon briefly shows 'unavailable' state (200ms)
6. User can continue without audio
```

Background: Sentry logs the failure, but UX is not interrupted.
