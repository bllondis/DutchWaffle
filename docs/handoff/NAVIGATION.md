# Navigation Map

```
RootStack (NativeStack)
├── Home                  (root tab – gestureEnabled: true)
├── LessonIntro           (push from Home, gestureEnabled: true)
├── Flashcard             (replace from Intro, gestureEnabled: FALSE)
├── Quiz                  (replace from Flashcard, gestureEnabled: FALSE)
└── Complete              (replace from Quiz, gestureEnabled: FALSE)
```

## Flow diagram

```
   ┌──────┐  push   ┌──────────────┐  replace  ┌────────────┐  replace  ┌──────┐  replace  ┌──────────┐
   │ Home │ ──────► │ LessonIntro  │ ────────► │ Flashcard  │ ────────► │ Quiz │ ────────► │ Complete │
   └──┬───┘         └──┬───────────┘           └──┬─────────┘           └──┬───┘           └────┬─────┘
      │                │ goBack                   │ × confirm              │ × confirm          │
      │◄───────────────┘ (no progress)            │                        │                    │
      │                                           │ popToTop               │ popToTop           │ Klaar
      │◄──────────────────────────────────────────┴────────────────────────┴────────────────────┘  popToTop
      │
      │                                                                                            Volgende les
      └──────────────────────────────────────────────────────────────────────────────────────────► replace LessonIntro
```

## Route params

```ts
// src/navigation/types.ts
export type RootStackParams = {
  Home:        undefined;
  LessonIntro: { lessonId: string };
  Flashcard:   { lessonId: string };
  Quiz:        { lessonId: string };
  Complete:    { lessonId: string };
};
```

## Animations

| Transition | Animation | Duration | Notes |
|------------|-----------|----------|-------|
| Home → LessonIntro | `slide_from_right` | iOS-default | Standard push |
| LessonIntro → Flashcard | `slide_from_right` | 340ms | replace, not push |
| Flashcard → Quiz | `fade` | 340ms | Feels like phase shift |
| Quiz → Complete | `fade` | 340ms | Celebratory; no slide |
| Any → Home (popToTop) | `slide_from_left` | iOS-default | Reverse direction |

## Gesture rules

- **Home, LessonIntro:** swipe-back enabled.
- **Flashcard, Quiz, Complete:** `gestureEnabled: false`. User must use × → confirm dialog.

## Deep links

`wafel://` scheme. Universal links: `https://wafel.app/...`

| URL | Opens |
|-----|-------|
| `wafel://` | Home |
| `wafel://lesson/{id}` | LessonIntro |
| `wafel://lesson/{id}/study` | Flashcard |
| `wafel://lesson/{id}/quiz` | Quiz |
| `wafel://lesson/{id}/done` | Complete (recap) |

```ts
// src/navigation/linking.ts already in bundle
```

## Exit confirm dialog

When user taps × inside Flashcard/Quiz with progress logged:

> **Stop met de les?**
> Je voortgang wordt bewaard.
> [ Annuleren ] [ Stoppen ]

- "Annuleren" → close dialog, stay on screen
- "Stoppen" → save state to MMKV, `navigation.popToTop()`

Implement as a generic `<ConfirmDialog>` in `@/components`.
