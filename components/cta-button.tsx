import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { C } from '@/lib/analysis';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

// Pill-shaped CTA matching natyam.dance's .cta / .cta-outline buttons:
// gold fill + maroon text for primary, gold outline for secondary.
export function CtaButton({ label, onPress, variant = 'primary', icon, loading, disabled, style }: Props) {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      style={[styles.base, isPrimary ? styles.primary : styles.outline, disabled && styles.disabled, style]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={isPrimary ? C.maroonDeep : C.maroon} />
      ) : (
        <View style={styles.content}>
          {icon && (
            <Ionicons name={icon} size={17} color={isPrimary ? C.maroonDeep : C.maroon} style={styles.icon} />
          )}
          <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelOutline]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  primary: {
    backgroundColor: C.gold,
    shadowColor: C.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: C.maroon,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  labelPrimary: {
    color: C.maroonDeep,
  },
  labelOutline: {
    color: C.maroon,
  },
});
