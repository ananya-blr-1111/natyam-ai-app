import { ReactNode, useRef } from 'react';
import { Animated, Pressable, PressableProps, ViewStyle } from 'react-native';

type Props = Omit<PressableProps, 'style' | 'children'> & {
  style?: ViewStyle | ViewStyle[];
  scaleTo?: number;
  children?: ReactNode;
};

// Gentle spring-scale on press — used for logo/avatar taps throughout the app.
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
    <Pressable onPressIn={pressIn} onPressOut={pressOut} {...rest}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
