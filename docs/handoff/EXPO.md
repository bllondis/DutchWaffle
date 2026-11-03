# Expo-specific Recommendations

## Why Expo SDK 51 (managed)?

- React Native 0.74 with new architecture support
- Expo Router optional (we use `@react-navigation/native` instead for this v1)
- EAS Build + EAS Submit for store delivery
- OTA updates via `expo-updates` — ship bug fixes without store review

## Required plugins (in `app.json`)

```json
{
  "expo": {
    "plugins": [
      "expo-font",
      "expo-av",
      ["expo-build-properties", {
        "ios": { "deploymentTarget": "15.1" },
        "android": { "compileSdkVersion": 34, "targetSdkVersion": 34 }
      }]
    ]
  }
}
```

## Native modules we use

| Module | Purpose | Notes |
|--------|---------|-------|
| `react-native-reanimated` | Flashcard flip, progress bar | Add `react-native-reanimated/plugin` LAST in babel.config |
| `react-native-gesture-handler` | Swipe gestures | Wrap root with `GestureHandlerRootView` |
| `react-native-svg` | Stroopwafel mascot, icons | First-class Expo support |
| `react-native-mmkv` | Synchronous local storage | Requires dev client OR config plugin; falls back to AsyncStorage if not present |
| `expo-av` | Audio playback | `Audio.Sound.createAsync({ uri })` |
| `expo-file-system` | Audio cache | `documentDirectory + 'audio/'` |
| `expo-haptics` | Feedback on correct/wrong | Use `ImpactFeedbackStyle.Light/Medium` and `NotificationFeedbackType.Success/Error` |
| `expo-font` | Urbanist loading | Place .ttf in `assets/fonts/` |
| `expo-splash-screen` | Hold splash until fonts ready | `SplashScreen.preventAutoHideAsync()` |
| `expo-secure-store` | Auth tokens (v1.1) | Keychain / EncryptedSharedPreferences |
| `expo-linear-gradient` | Hero card gradients | Better than image asset |

## ⚠️ MMKV note

`react-native-mmkv` requires native code. In Expo managed:

1. Build a dev client (one-time): `eas build --profile development`
2. Or use `@react-native-async-storage/async-storage` as a fallback if you must stay in Expo Go

For v1.0 ship, MMKV via dev client is recommended (faster, sync API perfect for streak/prefs).

## Fonts

Download Urbanist from Google Fonts. Place these in `assets/fonts/`:

- Urbanist-Regular.ttf
- Urbanist-Medium.ttf
- Urbanist-SemiBold.ttf
- Urbanist-Bold.ttf

Then in `App.tsx`:

```tsx
const [loaded] = useFonts({
  'Urbanist-Regular':  require('./assets/fonts/Urbanist-Regular.ttf'),
  'Urbanist-Medium':   require('./assets/fonts/Urbanist-Medium.ttf'),
  'Urbanist-SemiBold': require('./assets/fonts/Urbanist-SemiBold.ttf'),
  'Urbanist-Bold':     require('./assets/fonts/Urbanist-Bold.ttf'),
});
```

`SplashScreen.hideAsync()` once `loaded === true`.

## Reanimated setup

In `babel.config.js`, the Reanimated plugin **must be last**:

```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', { alias: { '@': './src' } }],
      'react-native-reanimated/plugin', // <- last
    ],
  };
};
```

If you skip this, animations silently freeze. Don't ask me how I know.

## EAS Build profiles

```json
// eas.json
{
  "cli": { "version": ">= 5.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": { "resourceClass": "m-medium" }
    },
    "preview": {
      "distribution": "internal",
      "ios": { "simulator": true }
    },
    "production": {
      "autoIncrement": true,
      "ios": { "resourceClass": "m-medium" }
    }
  },
  "submit": {
    "production": {}
  }
}
```

Build:
```bash
eas build --profile production --platform ios
eas build --profile production --platform android
eas submit -p ios
eas submit -p android
```

## OTA updates

After v1.0 ships, ship JS-only fixes via:

```bash
eas update --branch production --message "Fix progress bar animation"
```

Native changes (new modules, plugin changes) require a new build.

## Performance tips

- **Use `InteractionManager.runAfterInteractions`** for non-critical work after navigation, so the screen renders first.
- **`FlashList`** (from Shopify) over `FlatList` if user lists grow past 20 items.
- **`React.memo`** lesson list items and quiz options (props rarely change).
- **`useCallback`** for nav handlers passed to children.
- **Reanimated worklets**: keep `useAnimatedStyle` body small and pure. No state reads.

## Debug & profiling

- React Native Debugger (Hermes-compatible) for breakpoints
- Flipper for network + layout inspect
- `Perf Monitor` (Cmd+D → Show Perf Monitor) for FPS during flip
- Sentry SDK auto-captures unhandled rejections

## Store submission checklist

**iOS:**
- ✅ App icon 1024×1024
- ✅ Privacy manifest (`expo-build-properties` handles this)
- ✅ ATT prompt if you add analytics with IDFA
- ✅ App Privacy questions answered in App Store Connect

**Android:**
- ✅ Adaptive icon (foreground + bg)
- ✅ targetSdkVersion 34
- ✅ Data Safety form in Play Console
- ✅ Sign with EAS-managed credentials

## Useful EAS env vars

```bash
EXPO_PUBLIC_API_URL=https://api.wafel.app
EXPO_PUBLIC_SENTRY_DSN=...
EXPO_PUBLIC_POSTHOG_KEY=...
```

Set via `eas secret:create` or via your hosted EAS env config.
