import { Host, Switch } from '@expo/ui/jetpack-compose';
import { View } from 'react-native';
import type { AnimatedSwitchProps } from './types';

/**
 * Android: React Native's own Switch (0.86, New Architecture) doesn't animate; the thumb jumps in one frame
 * even with plain local state. Expo UI's Jetpack Compose switch slides (Material 3) and handles touch itself.
 * It can't take an accessibility label, so the outer View is the screen-reader element: role switch, label,
 * checked state and the double-tap `activate` action. The inner switch is hidden from accessibility.
 */
export function AnimatedSwitch({
  value,
  onValueChange,
  disabled,
  accessibilityLabel,
  testID,
  colors,
  onToggle,
}: AnimatedSwitchProps) {
  const toggle = (next: boolean) => {
    onToggle?.();
    onValueChange?.(next);
  };
  return (
    <View
      accessible
      testID={testID}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled: !!disabled }}
      accessibilityActions={[{ name: 'activate' }]}
      onAccessibilityAction={(e) => e.nativeEvent.actionName === 'activate' && !disabled && toggle(!value)}
    >
      <View importantForAccessibility="no-hide-descendants">
        <Host matchContents>
          <Switch
            value={value}
            enabled={!disabled}
            onCheckedChange={toggle}
            colors={
              colors && {
                checkedTrackColor: colors.onTrack,
                checkedBorderColor: colors.onTrack,
                checkedThumbColor: colors.onThumb,
                uncheckedTrackColor: colors.offTrack,
                uncheckedBorderColor: colors.offBorder ?? colors.offThumb,
                uncheckedThumbColor: colors.offThumb,
              }
            }
          />
        </Host>
      </View>
    </View>
  );
}
