import type { ColorValue } from 'react-native';

export interface AnimatedSwitchColors {
  /** Track when on. Also the border when on (Android). */
  onTrack: ColorValue;
  /** Thumb when on. */
  onThumb: ColorValue;
  /** Track when off. */
  offTrack: ColorValue;
  /** Thumb when off. On iOS the thumb uses `onThumb`/`offThumb` too. */
  offThumb: ColorValue;
  /** Outline when off (Android Material 3 draws one). Pick something with 3:1 contrast against the background. */
  offBorder?: ColorValue;
}

export interface AnimatedSwitchProps {
  value: boolean;
  onValueChange?: ((value: boolean) => void | Promise<void>) | null;
  disabled?: boolean;
  /** Read by screen readers. Expo UI's switch can't take one itself, so the wrapper carries it on Android. */
  accessibilityLabel?: string;
  testID?: string;
  /** Leave out to use the platform defaults. */
  colors?: AnimatedSwitchColors;
  /** Runs on every user toggle, before onValueChange (e.g. a haptic tick). */
  onToggle?: () => void;
}
