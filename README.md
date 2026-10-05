# expo-animated-switch

A switch for Expo apps that **animates on Android**, keeps React Native's own `Switch` on iOS, and stays fully accessible.

## Why

On React Native 0.86 (New Architecture) the Android `Switch` doesn't animate: the thumb jumps from off to on in a single frame, even with plain local state. Expo UI's Jetpack Compose `Switch` slides properly (Material 3), but it can't take an accessibility label. This package wraps it so screen readers get a labelled switch with its on/off state and the double-tap action, and falls back to React Native's `Switch` on iOS, where it already animates.

## Install

```bash
npx expo install @expo/ui
npm install github:philyoon/expo-animated-switch
```

Requires Expo SDK 57+ (`@expo/ui` ≥ 57). Works in Expo Go and dev builds; no native code of its own.

**After installing, restart Metro with `--clear`.** Metro caches which file it resolved, and won't pick up a new `.android.tsx` platform file until then (the old switch keeps showing).

## Use

```tsx
import { AnimatedSwitch } from 'expo-animated-switch';

<AnimatedSwitch
  value={enabled}
  onValueChange={setEnabled}
  accessibilityLabel="Vibrate on taps"
  testID="switch-haptics"
  colors={{ onTrack: '#B4521C', onThumb: '#FFFFFF', offTrack: '#FFFFFF', offThumb: '#5A6170', offBorder: '#5A6170' }}
  onToggle={() => Haptics.selectionAsync()}
/>
```

| Prop | |
|---|---|
| `value`, `onValueChange`, `disabled` | As React Native's `Switch` |
| `accessibilityLabel` | Always set it. On Android the wrapper carries it (role `switch`, checked state, `activate` action) |
| `testID` | Put on the wrapper, so Maestro/Detox can find and check `checked` |
| `colors` | `onTrack`, `onThumb`, `offTrack`, `offThumb`, `offBorder?`. Omit for platform defaults. Read them from your theme each render so light/dark both work |
| `onToggle` | Runs on every user toggle (haptics) |

## Gotchas

- **It's controlled.** The visual follows `value`; if your state doesn't update, the switch won't move. With the old native switch a broken state flow was hidden, because it flipped its own picture. Test that a setting can change **more than once** on screen.
- **React Compiler:** a data hook that sets state during render (derived-state pattern) can stop updating after the first change once compiled. Opt that hook out with `'use no memo'`.
- **Looks:** Android uses the Material 3 shape (slightly larger, outlined when off), so it differs from iOS.

## License

MIT
