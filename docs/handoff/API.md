# API & Mock Data

## v1.0 strategy: offline-first with seeded content

- **Lessons + phrases** are bundled in the app as JSON (`src/data/content.ts` and `src/data/mock.ts`).
- **User progress** is stored locally in MMKV; synced to backend opportunistically.
- App works fully offline after first load.

## Entities

```ts
type Level = {
  id: 'b1' | 'b1plus' | 'b2';
  code: string;          // 'B1', 'B1+', 'B2'
  name: string;          // 'Op niveau'
  tagline: string;
};

type Theme = {
  id: string;            // 'mening', 'werk', …
  name: string;          // 'Je mening geven'
  en: string;            // 'Giving opinions'
};

type Phrase = {
  id: string;            // 'mening-01-enerzijds'
  nl: string;
  ipa: string;
  en: string;
  note: string;
  example: { nl: string; en: string };
  audio: string;         // CDN MP3 URL
};

type Lesson = {
  id: string;
  theme: string;         // Theme.id
  level: Level['id'];
  title: string;
  subtitle: string;
  minutes: number;
  newWords: number;
  phrases: Phrase[];
};

type UserProgress = {
  lessonId: string;
  completed: boolean;
  score: number;         // 0..1
  phraseMarks: Record<string, 'known' | 'hard'>;
  updatedAt: string;     // ISO 8601
};
```

## Mock data

See `src/data/content.ts` (one B1+ lesson, "Je mening nuanceren") and `src/data/mock.ts` (additional lessons for navigation testing).

## REST API (v1.1+ – when backend exists)

Base: `https://api.wafel.app/v1`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/me` | Bearer | Profile, level, streak |
| PATCH | `/me` | Bearer | Update level, daily goal, preferences |
| GET | `/lessons?level={id}` | Bearer | List lessons with user progress |
| GET | `/lessons/:id` | Bearer | Lesson detail |
| POST | `/lessons/:id/progress` | Bearer | Save attempt |
| GET | `/streak` | Bearer | Current streak + heatmap (last 30 days) |

### POST /lessons/:id/progress

Request:
```json
{
  "score": 0.875,
  "phraseMarks": { "mening-01-enerzijds": "known", "mening-01-valtwelmee": "hard" },
  "completedAt": "2026-05-22T18:42:13Z",
  "durationMs": 540000
}
```

Response: `204 No Content`.

## Offline-first plumbing

1. **TanStack Query** with `@tanstack/react-query-persist-client` and MMKV storage.
2. **Mutations queue:** when offline, `POST /lessons/:id/progress` is stored in MMKV and replayed on reconnect. Use `networkMode: 'offlineFirst'`.
3. **Audio cache:** `shared/audio.ts` downloads MP3 to `FileSystem.documentDirectory + 'audio/'` on first play, reused thereafter.
4. **Conflict resolution:** server returns `updatedAt`; latest wins. On exact timestamp tie, server wins.

## Error handling

| Status | Behavior |
|--------|----------|
| 401 | Trigger re-auth flow |
| 403 | Toast "Geen toegang"; nav back |
| 404 | Lesson screen → empty state with retry |
| 5xx | Banner top + use cached data; auto-retry with backoff (2 attempts) |
| Network fail | Banner "Geen verbinding"; cached data still rendered |
