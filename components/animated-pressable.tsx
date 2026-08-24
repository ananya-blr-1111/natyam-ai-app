import { ReactNode, useRef } from 'react';
import { Animated, Pressable, PressableProps, ViewStyle } from 'react-native';

type Props = Omit<PressableProps, 'style' | 'children'> & {
  style?: ViewStyle | ViewStyle[];
  scaleTo?: number;
  children?: ReactNode;
};

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

// Gentle spring-scale on press — used for logo/avatar taps throughout the app.
// A single animated component (not a Pressable wrapping a separate Animated.View)
// so the passed `style` — including position:absolute, margins, flex layout —
// applies directly to the one real box in the tree, instead of being split
// across two nested views with different sizing/positioning behaviour.
export function AnimatedPressable({ style, scaleTo = 0.93, onPressIn, onPressOut, children, ...rest }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = (e: any) => {
    Animated.spring(scale, { toValue: scaleTo, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
    onPressIn?.(e);
  };
  const pressOut = (e: any) => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 24, bounciness: 8 }).start();
    onPressOut?.(e);
  };

  return (
    <AnimatedPressableBase
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={[style, { transform: [{ scale }] }]}
      {...rest}
    >
      {children}
    </AnimatedPressableBase>
  );
}
