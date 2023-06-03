import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Page from './Page';
import CubeAnimation from './CubeAnimation';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const DATA = [1, 2, 3, 4, 5];

const fullWidth = (DATA.length - 1) * SCREEN_WIDTH;

const App = () => {
  const translateX = useSharedValue(0);

  type contextType = {
    x: number;
  };

  const clampedTranslateX = useDerivedValue(() => {
    const MAX_TRANSLATE_X = -(SCREEN_WIDTH * (DATA.length - 1));

    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    contextType
  >({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
    },
    onActive: (event, context) => {
      console.log(event.translationX);

      if (event.translationX < -fullWidth) {
        translateX.value = withSpring(event.translationX + context.x, {
          damping: 50,
        });
      } else {
        translateX.value = withSpring(event.translationX + context.x, {
          damping: 50,
        });
      }
    },
    onEnd: event => {
      console.log('on end event', event.translationX + fullWidth);

      translateX.value = withDecay({velocity: event.velocityX});
      // translateX.value = withSpring(event.translationX + fullWidth);
    },
  });

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: 250,
            backgroundColor: 'red',
            marginBottom: 30,
          }}
        />
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={{
              width: SCREEN_WIDTH,
              height: 350,
              flexDirection: 'row',
            }}>
            {DATA.map((item, index) => (
              <Page
                data={DATA}
                item={item}
                index={index}
                translateX={clampedTranslateX}
              />
            ))}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
    // <CubeAnimation />
  );
};

export default App;
