import { Switch } from 'react-native';
import type { AnimatedSwitchProps } from './types';

/** iOS (and web): React Native's Switch animates fine here, so it's used as is. */
export function AnimatedSwitch({ value, onValueChange, disabled, accessibilityLabel, testID, colors, onToggle }: AnimatedSwitchProps) {
  return (
    <Switch
      value={value}
      onValueChange={(next) => {
        onToggle?.();
        onValueChange?.(next);
      }}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      trackColor={colors && { false: colors.offTrack, true: colors.onTrack }}
      thumbColor={colors && (value ? colors.onThumb : colors.offThumb)}
      ios_backgroundColor={colors?.offTrack}
    />
  );
}
